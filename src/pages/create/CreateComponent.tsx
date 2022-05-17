import { Components, Network, ReefSigner, utils as reefUtils } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, ContractFactory, utils } from "ethers";
import { verifySplitzContract } from "../../utils/contract";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { metadataDeploy } from "../../utils/deployData";
import { notify } from "../../utils/utils";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Spinner from "../../common/Spinner";
import { Payee } from "../../model/payee";
import { Progress } from "../../model/progress";
import { useHistory, useLocation } from "react-router-dom";
import { INTERACT_URL, TESTNET_URL } from "../../urls";

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
    const history = useHistory();

    useEffect(() => {
        if (!payees?.length) {
            addPayee({ address: signer ? signer.evmAddress : "", shares: 0 });
        } else if (payees[0].address === "") {
            addressChange(signer ? signer.evmAddress : "", 0);
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
        const splitzContract = new ContractFactory(deployAbi, deployBytecode, signer?.signer);
        let contract: Contract | undefined;

        setProgress({ loading: true, msg: "Creating contract..." });

        ///////////////////////// TODO remove
        setTimeout(() => {
            setContractAddress("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            setProgress({ loading: true, msg: "Verifying contract..." });
        }, 2000);

        setTimeout(() => {
            setProgress({ loading: false });
            notify("Error verifying contract.", "error");
            openModalBtn.click();
        }, 4000);
        ///////////////////////// TODO

        // try {
        //     contract = await splitzContract.deploy(...args);
        // } catch (err: any) {
        //     notify("Error deploying contract.", "error");
        //     console.log("Error deploying contract:", err);
        //     setProgress({ loading: false });
        //     return;
        // }
        // setContractAddress(contract.address);

        // setProgress({ loading: true, msg: "Verifying contract..." });
        // try {
        // const verified = await verifySplitzContract(
        //     contract.address,
        //     JSON.stringify(args),
        //     network
        // );
        // if (!verified) {
        //     notify("Error verifying contract.", "error");
        // }
        // } catch (err) {
        //     notify("Error verifying contract.", "error");
        //     console.log("Error verifying contract:", err);
        // }
        // setProgress({ loading: false });
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

    function navigateInteract() {
        history.push(
            isTestnet
                ? TESTNET_URL + INTERACT_URL + "/" + contractAddress
                : INTERACT_URL + "/" + contractAddress
        );
    }

    return (
        <div className="margin-y-auto">
            <div className="title">Create Splitzer</div>
            <div className="margin-y-auto fit-content">
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
                    <div className="col-xl text-align-right bold">Total shares:</div>
                    <div className="col-md">{totalShares}</div>
                </div>

                <div className="center-content">
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
                confirmBtnLabel="Interact"
                confirmFun={() => {
                    navigateInteract();
                }}
            >
                {contractAddress && (
                    <div>
                        <div>
                            {contractAddress}
                            <CopyToClipboard text={contractAddress}>
                                <ContentPasteIcon className="copy-button hover-pointer"></ContentPasteIcon>
                            </CopyToClipboard>
                        </div>
                    </div>
                )}
            </ConfirmationModal>
        </div>
    );
};
