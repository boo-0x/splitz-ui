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
import { notify } from "../../utils/utils";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Spinner from "../../common/Spinner";
import "./Create.css";

const { Modal } = Components;
const { OpenModalButton, default: ConfirmationModal } = Modal;

interface CreateComponent {
    signer: ReefSigner | undefined;
    network: Network;
    onTxUpdate?: reefUtils.TxStatusHandler;
}

interface Payee {
    address: string;
    shares: number;
    addressError?: boolean;
    sharesError?: boolean;
}

interface Progress {
    loading: boolean;
    msg?: string;
}

export const CreateComponent = ({ signer, network }: CreateComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>();
    const [totalShares, setTotalShares] = useState<number>();
    const [contractAddress, setContractAddress] = useState<string>();
    const [progress, setProgress] = useState<Progress>({ loading: false });
    const [openModalBtn, setOpenModalBtn] = useState<any>();

    useEffect(() => {
        if (!payees?.length) {
            addPayee({ address: signer ? signer.evmAddress : "", shares: 0 });
        } else if (payees[0].address === "") {
            addressChange(signer ? signer.evmAddress : "", 0);
        }
    }, [signer]);

    async function createSplitter(
        signer?: ReefSigner,
        network?: Network,
        payees?: Payee[]
    ): Promise<void> {
        if (!signer) {
            notify("Signer not found.", "error");
            return;
        }

        if (!network) {
            notify("Not connected to Reef network.", "error");
            return;
        }

        const addresses: string[] = [];
        const shares: number[] = [];
        let updatedPayees = [...(payees || [])];
        let hasErrors = false;

        updatedPayees.forEach((payee: Payee, index: number) => {
            if (!utils.isAddress(payee.address)) {
                payee.addressError = true;
                hasErrors = true;
            }
            addresses.push(payee.address);

            if (!payee.shares) {
                payee.sharesError = true;
                hasErrors = true;
            }
            shares.push(payee.shares);
        });

        if (hasErrors) {
            setPayees(updatedPayees);
            return;
        }

        const args = [addresses, shares];
        const deployAbi = metadataDeploy.abi;
        const deployBytecode = metadataDeploy.bytecode;
        const paymentSplitterContract = new ContractFactory(
            deployAbi,
            deployBytecode,
            signer?.signer
        );
        let contract: Contract | undefined;

        setProgress({ loading: true, msg: "Creating contract..." });

        ///////////////////////// TODO
        setTimeout(() => {
            setContractAddress("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            setProgress({ loading: true, msg: "Validating contract..." });
        }, 2000);

        setTimeout(() => {
            setProgress({ loading: false });
            notify("Error verifying contract.", "error");
            openModalBtn.click();
        }, 4000);
        ///////////////////////// TODO

        // try {
        //     contract = await paymentSplitterContract.deploy(...args);
        // } catch (err: any) {
        //     setProgress({ loading: true, msg: "Validating contract..." });
        //     console.log("Error deploying contract:", err);
        //     return;
        // }
        // setContractAddress(contract.address);

        // try {
        //     await verify(contract.address, JSON.stringify(args), network);
        // } catch (err) {
        //     setProgress({ loading: false });
        //     notify("Error verifying contract.", "error");
        //     console.log("Error verifying contract:", err);
        // }
        // setProgress({ loading: false });
    }

    async function verify(contractAddress: string, args: string, network: Network): Promise<void> {
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

        if (!verified) {
            notify("Error verifying contract.", "error");
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
        updatedPayees[index].addressError = !utils.isAddress(value);
        setPayees(updatedPayees);
    }

    function sharesChange(value: string, index: number) {
        const numValue = Number(value) < 0 ? 0 : Number(value);
        let updatedPayees = [...(payees || [])];
        updatedPayees[index].shares = numValue;
        updatedPayees[index].sharesError = numValue == 0;
        setPayees(updatedPayees);
        setTotalShares(
            updatedPayees.reduce((acum, payee) => {
                return acum + payee.shares;
            }, 0)
        );
    }

    return (
        <div className="margin-auto">
            <div className="title">Create Splitter</div>
            <div className="margin-auto fit-content">
                {payees?.length && (
                    <div className="header-row">
                        <div className="offset-sm col-xl">Address</div>
                        <div className="col-md">Shares</div>
                    </div>
                )}

                {payees?.map((payee: Payee, i: number) => (
                    <div key={i} className="mb-1">
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
                            className={`form-control col-xl ${payee.addressError ? "error" : ""}`}
                            placeholder="Enter EVM address"
                        />

                        <Components.Input.NumberInput
                            value={payee.shares.toString()}
                            onChange={(val) => sharesChange(val, i)}
                            className={`form-control col-md ${payee.sharesError ? "error" : ""}`}
                            placeholder="Shares"
                        />

                        <div className="col-lg">
                            {totalShares != undefined &&
                                payee.shares != undefined &&
                                payee.shares != 0 && (
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
                        disabled={progress.loading}
                    >
                        Create Splitter
                    </Components.Button.Button>
                </div>

                {progress.loading && <div className="progress-msg">{progress.msg}</div>}

                <Spinner display={progress.loading}></Spinner>
            </div>

            <OpenModalButton id="contractCreatedModalToggle" className="d-none">
                <span ref={(button) => setOpenModalBtn(button)}></span>
            </OpenModalButton>
            <ConfirmationModal
                id="contractCreatedModalToggle"
                title="Payment Splitter created"
                confirmBtnLabel="OK"
                confirmFun={() => {}}
            >
                {contractAddress && (
                    <div>
                        {contractAddress}
                        <CopyToClipboard text={contractAddress}>
                            <ContentPasteIcon className="copy-button hover-pointer"></ContentPasteIcon>
                        </CopyToClipboard>
                    </div>
                )}
            </ConfirmationModal>
        </div>
    );
};
