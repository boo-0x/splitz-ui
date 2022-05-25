import { Components, Network, ReefSigner, utils as reefUtils } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, ContractFactory, utils } from "ethers";
import { verifySplitzContract } from "../../utils/contract";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { metadataDeploy } from "../../utils/deployData";
import { explorerUrl, notify } from "../../utils/utils";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Spinner from "../../common/Spinner";
import { Payee } from "../../model/payee";
import { Progress } from "../../model/progress";
import { useLocation } from "react-router-dom";
import { TESTNET_URL } from "../../urls";

const { Modal } = Components;
const { OpenModalButton, default: ConfirmationModal } = Modal;

interface CreateComponent {
    signer: ReefSigner | undefined;
    network: Network;
    onTxUpdate?: reefUtils.TxStatusHandler;
}

export const CreateComponent = ({ signer, network }: CreateComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>();
    const [totalShares, setTotalShares] = useState<number>();
    const [contractAddress, setContractAddress] = useState<string>();
    const [progress, setProgress] = useState<Progress>({ loading: false });
    const [openModalBtn, setOpenModalBtn] = useState<any>();
    const isTestnet = useLocation().pathname.includes(TESTNET_URL);

    useEffect(() => {
        if (!signer) {
            return;
        }

        if (!payees?.length) {
            addPayee({ address: signer.evmAddress, shares: 0 });
        } else {
            addressChange(signer.evmAddress, 0);
        }
    }, [signer]);

    async function createSplitzer(
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

        updatedPayees.forEach((payee: Payee) => {
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
        const splitzContract = new ContractFactory(
            metadataDeploy.abi,
            metadataDeploy.bytecode,
            signer?.signer
        );
        let contract: Contract | undefined;

        setProgress({ loading: true, msg: "Creating contract..." });

        try {
            contract = await splitzContract.deploy(...args);
        } catch (err: any) {
            notify("Error deploying contract.", "error");
            console.log("Error deploying contract:", err);
            setProgress({ loading: false });
            return;
        }
        setContractAddress(contract.address);

        setProgress({ loading: true, msg: "Verifying contract..." });
        try {
            const verified = await verifySplitzContract(
                contract.address,
                JSON.stringify(args),
                network
            );
            if (!verified) {
                notify("Error verifying contract.", "error");
            }
        } catch (err) {
            notify("Error verifying contract.", "error");
            console.log("Error verifying contract:", err);
        }

        openModalBtn.click();
        setProgress({ loading: false });
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
        <div className="margin-y-auto">
            <div className="title">Create Splitzer</div>

            <div className="create-form">
                {payees?.length && (
                    <div className="row header-row">
                        <div className="offset-1 col-7">Address</div>
                        <div className="col-4">Shares</div>
                    </div>
                )}

                {payees?.map((payee: Payee, i: number) => (
                    <div key={i} className="row">
                        <div className="col-1 secondary">
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
                        <div className="col-7">
                            <Components.Input.Input
                                value={payee.address}
                                onChange={(val) => addressChange(val, i)}
                                className={`form-control ${payee.addressError ? "error" : ""}`}
                                placeholder="Enter EVM address"
                            />
                        </div>
                        <div className="col-2">
                            <Components.Input.NumberInput
                                value={payee.shares.toString()}
                                onChange={(val) => sharesChange(val, i)}
                                className={`form-control ${payee.sharesError ? "error" : ""}`}
                                placeholder="Shares"
                            />
                        </div>
                        <div className="col-2">
                            {totalShares != undefined &&
                                payee.shares != undefined &&
                                payee.shares != 0 && (
                                    <span>{((payee.shares / totalShares) * 100).toFixed(2)} %</span>
                                )}
                        </div>
                    </div>
                ))}

                <div className="row footer-row">
                    <div className="col-1 primary">
                        <IconButton
                            onClick={() => {
                                addPayee({ address: "", shares: 0 });
                            }}
                        >
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    </div>
                    <div className="col-7 text-align-right bold">Total shares:</div>
                    <div className="col-4">{totalShares}</div>
                </div>

                <div className="center-content mt-2">
                    <Components.Button.Button
                        onClick={() => {
                            createSplitzer(signer, network, payees);
                        }}
                        disabled={progress.loading}
                    >
                        Create Splitzer
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
                title="Splitzer created"
                confirmBtnLabel="Close"
                confirmFun={() => {}}
            >
                {contractAddress && (
                    <div>
                        <div>
                            {contractAddress}
                            <CopyToClipboard text={contractAddress}>
                                <ContentPasteIcon className="copy-button hover-pointer"></ContentPasteIcon>
                            </CopyToClipboard>
                        </div>
                        <div className="open-explorer">
                            Open in explorer{" "}
                            <a
                                href={explorerUrl(isTestnet) + "/contract/" + contractAddress}
                                target="_blank"
                            >
                                <OpenInNewIcon />
                            </a>
                        </div>
                    </div>
                )}
            </ConfirmationModal>
        </div>
    );
};
