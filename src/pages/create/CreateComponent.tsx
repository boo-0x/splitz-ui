import { Components, Network, ReefSigner, utils as reefUtils } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, ContractFactory, utils } from "ethers";
import { verifyContract } from "../../utils/contract";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    metadataDeploy,
    contractsDeploy,
    metadataArtifactDeploy,
} from "./paymentSplitterDeployData";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./Create.css";

interface CreateComponent {
    signer: ReefSigner | undefined;
    network: Network;
    onTxUpdate?: reefUtils.TxStatusHandler;
}

interface Payee {
    address: string;
    shares: number;
}

export const CreateComponent = ({ signer, network }: CreateComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>();
    const [totalShares, setTotalShares] = useState<number>();
    const [contractAddress, setContractAddress] = useState<string>();

    useEffect(() => {
        addPayee({ address: "", shares: 0 });
    }, []);

    async function verify(
        contractAddress: string,
        args: string,
        network: Network
    ): Promise<boolean> {
        const { compilationTarget } = metadataArtifactDeploy.settings;
        const compTargetFileName = Object.keys(compilationTarget)[0];
        const verified = await verifyContract(
            contractAddress,
            {
                source: JSON.stringify(contractsDeploy),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                contractName: compilationTarget[compTargetFileName],
                target: metadataArtifactDeploy.settings.evmVersion,
                compilerVersion: `v${metadataArtifactDeploy.compiler.version}`,
                optimization: metadataArtifactDeploy.settings.optimizer.enabled.toString(),
                filename: compTargetFileName,
                runs: metadataArtifactDeploy.settings.optimizer.runs,
            },
            args,
            network.reefscanUrl
        );
        return verified;
    }

    async function createSplitter(
        signer?: ReefSigner,
        network?: Network,
        payees?: Payee[]
    ): Promise<void> {
        if (!signer || !network || !payees) {
            console.log("!signer || !network || !payees");
            return;
        }

        const addresses: string[] = [];
        const shares: number[] = [];
        payees.forEach((payee: Payee) => {
            if (!utils.isAddress(payee.address)) {
                alert("invalid address");
                return;
            }
            addresses.push(payee.address);
            if (payee.shares <= 0) {
                alert("invalid shares value");
                return;
            }
            shares.push(payee.shares);
        });

        const args = [addresses, shares];
        console.log(args);
        const deployAbi = metadataDeploy.abi;
        const deployBytecode = metadataDeploy.bytecode;
        const paymentSplitterContract = new ContractFactory(
            deployAbi,
            deployBytecode,
            signer?.signer
        );
        let contract: Contract | undefined;

        try {
            contract = await paymentSplitterContract.deploy(...args);
        } catch (err: any) {
            console.log("deploy err=", err);
            return;
        }
        console.log(`deployed to ${contract.address}`);
        setContractAddress(contract.address);

        try {
            const verified = await verify(contract.address, JSON.stringify(args), network);
            console.log("verified", verified);
        } catch (err) {
            console.log("verify err=", err);
        }
    }

    function addPayee(payee: Payee) {
        setPayees([...(payees || []), payee]);
    }

    function deletePayee(index: number) {
        const updatedPayees = [...(payees || [])];
        updatedPayees.splice(index, 1);
        setPayees(updatedPayees);
        setTotalShares(
            updatedPayees.reduce((acum, payee) => {
                return acum + payee.shares;
            }, 0)
        );
    }

    function addressChange(value: string, index: number) {
        let updatedPayees = [...(payees || [])];
        updatedPayees[index].address = value;
        setPayees(updatedPayees);
    }

    function sharesChange(value: string, index: number) {
        const numValue = Number(value) < 0 ? 0 : Number(value);
        let updatedPayees = [...(payees || [])];
        updatedPayees[index].shares = numValue;
        setPayees(updatedPayees);
        setTotalShares(
            updatedPayees.reduce((acum, payee) => {
                return acum + payee.shares;
            }, 0)
        );
    }

    return (
        <div className="margin-auto">
            {payees?.length && (
                <div className="header-row">
                    <div className="offset-sm col-xl">Address</div>
                    <div className="col-md">Shares</div>
                </div>
            )}

            {payees?.map((payee: Payee, i: number) => (
                <div key={i}>
                    <div className="col-sm secondary">
                        {payees.length > 1 && (
                            <IconButton
                                onClick={() => {
                                    deletePayee(i);
                                }}
                            >
                                <HighlightOffIcon></HighlightOffIcon>
                            </IconButton>
                        )}
                    </div>

                    <Components.Input.Input
                        value={payee.address}
                        onChange={(val) => addressChange(val, i)}
                        className="form-control col-xl"
                        placeholder="Address"
                    />

                    <Components.Input.NumberInput
                        value={payee.shares.toString()}
                        onChange={(val) => sharesChange(val, i)}
                        className="form-control col-md"
                        placeholder="Shares"
                    />

                    <div className="col-lg">
                        {totalShares && payee.shares && (
                            <span>{((payee.shares / totalShares) * 100).toFixed(2)} %</span>
                        )}
                    </div>
                </div>
            ))}

            <div className="footer-row">
                <div className="col-sm primary">
                    <IconButton
                        onClick={() => {
                            addPayee({ address: "", shares: 0 });
                        }}
                    >
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </IconButton>
                </div>
                <div className="col-xl text-align-right">Total shares:</div>
                <div className="col-md">{totalShares}</div>
            </div>

            <div className="center-content">
                <Components.Button.Button
                    onClick={() => {
                        createSplitter(signer, network, payees);
                    }}
                >
                    Create Splitter
                </Components.Button.Button>
            </div>

            {contractAddress && (
                <div>
                    Contract address: {contractAddress}
                    <CopyToClipboard text={contractAddress}>
                        <span>copy</span>
                    </CopyToClipboard>
                </div>
            )}
        </div>
    );
};
