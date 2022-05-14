import { Components, Network, ReefSigner, rpc } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, utils } from "ethers";
import { metadataDeploy } from "../create/paymentSplitterDeployData";
import { useHistory, useParams } from "react-router-dom";
import { INTERACT_URL } from "../../urls";
import {
    addErc20ToStorage,
    getErc20Storage,
    removeErc20FromStorage,
} from "../../store/internalStore";
import { notify } from "../../utils/utils";
import { ERC20 } from "../../erc20";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionTooltip from "../../common/QuestionTooltip";

const { Display, Card: CardModule, Modal } = Components;
const { Margin } = Display;
const { Card } = CardModule;
const { OpenModalButton, default: ConfirmationModal } = Modal;

interface InteractComponent {
    signer: ReefSigner | undefined;
    network: Network;
}

interface Payee {
    address: string;
    shares: number;
}

function noSharesError(error: Error): boolean {
    return error.message.includes("PaymentSplitter: account has no shares");
}

export const InteractComponent = ({ signer, network }: InteractComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>([]);
    const [availableReef, setAvailableReef] = useState<number>(0);
    const [contract, setContract] = useState<Contract>();
    const [withdrawFrom, setWithdrawFrom] = useState<string>("");
    const [withdrawFromError, setWithdrawFromError] = useState<boolean>(false);
    const [searchAddress, setSearchAddress] = useState<string>("");
    const [searchAddressError, setSearchAddressError] = useState<boolean>(false);
    const [erc20List, setERC20List] = useState<ERC20[]>([]);
    const [erc20Address, setErc20Address] = useState<string>("");
    const [erc20AddressError, setErc20AddressError] = useState<boolean>(false);
    const [openModalBtn, setOpenModalBtn] = useState<any>();
    const [evmAddress, setEvmAddress] = useState<string>("");
    const { contractAddress } = useParams<{ contractAddress: string }>();
    const history = useHistory();

    useEffect(() => {
        setPayees([]);
        setAvailableReef(0);
        setContract(undefined);
        setSearchAddress("");
        console.log("contractAddress", contractAddress);
    }, [contractAddress]);

    useEffect(() => {
        if (signer && signer.evmAddress !== evmAddress) {
            setEvmAddress(signer.evmAddress);
        }
    }, [signer]);

    useEffect(() => {
        if (evmAddress && evmAddress != "" && network && contractAddress) {
            init();
        }
    }, [evmAddress, network, contractAddress]);

    useEffect(() => {
        setWithdrawFromError(withdrawFrom != "" && !utils.isAddress(withdrawFrom));
    }, [withdrawFrom]);

    useEffect(() => {
        setSearchAddressError(searchAddress != "" && !utils.isAddress(searchAddress));
    }, [searchAddress]);

    useEffect(() => {
        setErc20AddressError(erc20Address != "" && !utils.isAddress(erc20Address));
        const btn = document.querySelector(
            "#addErc20ModalToggle .btn-reef"
        ) as HTMLButtonElement | null;
        if (btn !== null) {
            btn.disabled = !utils.isAddress(erc20Address);
        }
    }, [erc20Address]);

    async function init(): Promise<void> {
        if (!signer) {
            notify("Signer not found.", "error");
            return;
        }
        if (!network) {
            notify("Not connected to Reef network.", "error");
            return;
        }

        const newContract = new Contract(contractAddress, metadataDeploy.abi, signer.signer);
        // TODO check if it is payment splitter
        setContract(newContract);

        try {
            const totalShares = Number(await newContract.totalShares());
            const payeesResp = await newContract.getPayees();
            const mappedPayees: Payee[] = payeesResp.map((payee: any) => {
                return { address: payee.payee, shares: (Number(payee.share) * 100) / totalShares };
            });
            setPayees(mappedPayees);
        } catch (err: any) {
            console.log("Error setting payees:", err);
        }

        try {
            const availableReefRes: any = await newContract.available(evmAddress);
            setAvailableReef(Number(availableReefRes) / 1e18);
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error setting available REEF:", err);
            }
        }

        const updatedErc20List: ERC20[] = getErc20Storage();
        for (const erc20 of updatedErc20List) {
            try {
                const available: any = await newContract.availableERC20(erc20.address, evmAddress);
                erc20.available = Number(available) / 1e18;
            } catch (err: any) {
                if (!noSharesError(err)) {
                    console.log("Error getting ERC20 balance:", err);
                }
                erc20.available = 0;
            }
        }
        setERC20List(updatedErc20List);
    }

    async function withdrawFromContract(addressFrom: string) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.withdrawFromContract(addressFrom);
            notify("Amount withdrawn from contract to Payment Splitter.");
            setWithdrawFrom("");
        } catch (err: any) {
            notify("Error withdrawing from contract to Payment Splitter.", "error");
            console.log("Error withdrawing from contract", err);
        }
    }

    async function updateAvailableReef() {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            const availableReefRes: any = await contract.available(evmAddress);
            setAvailableReef(Number(availableReefRes) / 1e18);
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error setting available REEF:", err);
            }
        }
    }

    async function updateAvalilableErc20(erc20: ERC20) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            const available: any = await contract.availableERC20(erc20.address, evmAddress);
            erc20.available = Number(available) / 1e18;
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error getting ERC20 balance:", err);
            }
            erc20.available = 0;
        }
    }

    async function releaseReef() {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.release(evmAddress);
        } catch (err: any) {
            console.log("Error withdrawing REEF from Payment Splitter:", err);
        }
    }

    async function releaseErc20(erc20Address: string) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.releaseERC20(erc20Address, evmAddress);
        } catch (err: any) {
            console.log("Error withdrawing REEF from Payment Splitter:", err);
        }
    }

    function search(address: string) {
        history.push(INTERACT_URL + "/" + address);
    }

    async function addErc20(address: string) {
        if (!signer) {
            notify("Signer not found.", "error");
            return;
        }
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }
        // TODO
        utils.isAddress(address);

        setErc20Address("");

        const promisedToken = await rpc.loadToken(address, signer.signer);
        if (!promisedToken) {
            notify("ERC20 token not found.", "error");
            return;
        }

        let erc20: ERC20 = {
            address: address,
            ticker: promisedToken.symbol,
            logoSrc: promisedToken.iconUrl,
        };
        addErc20ToStorage(erc20);

        try {
            const availableErc20Res: any = await contract.availableERC20(address, evmAddress);
            erc20.available = Number(availableErc20Res) / 1e18;
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error adding ERC20 token:", err);
            }
            erc20.available = 0;
        }

        const updatedErc20List = [...(erc20List || [])];
        const index = updatedErc20List.findIndex((erc20) => erc20.address === address);
        if (index === -1) {
            updatedErc20List.push(erc20);
            setERC20List(updatedErc20List);
        }
    }

    async function removeErc20(address: string) {
        const updatedErc20List = [...(erc20List || [])];
        const index = updatedErc20List.findIndex((erc20) => erc20.address === address);
        if (index > -1) {
            updatedErc20List.splice(index, 1);
            setERC20List(updatedErc20List);
            removeErc20FromStorage(address);
        }
    }

    return (
        <div className="margin-auto">
            <div className="title">Interact with Splitter</div>

            <div className="margin-auto fit-content">
                {contractAddress && (
                    <Card>
                        <div className="bold">
                            <div className="col-xl">Contract address</div>
                        </div>
                        <div>
                            <div className="col-xl">{contractAddress}</div>
                        </div>

                        {payees && payees.length > 0 && (
                            <div className="bold">
                                <div className="col-xl">Owners</div>
                                <div className="col-md">%</div>
                            </div>
                        )}
                        {payees?.map((payee: Payee, i: number) => (
                            <div key={i}>
                                <div className="col-xl">{payee.address}</div>
                                <div className="col-md">{payee.shares}%</div>
                            </div>
                        ))}
                    </Card>
                )}

                <Margin size="3"></Margin>

                {contract && (
                    <div>
                        <Card>
                            <div>
                                <div className="offset-sm col-md">
                                    <img src="./img/reef.png" className="token-logo" />
                                    REEF
                                </div>
                                <div className="col-md text-align-right">{availableReef}</div>
                                <div className="col-sm primary">
                                    <IconButton
                                        onClick={() => {
                                            updateAvailableReef();
                                        }}
                                    >
                                        <RefreshIcon></RefreshIcon>
                                    </IconButton>
                                </div>
                                <div className="col-sm primary">
                                    {availableReef > 0 && (
                                        <IconButton
                                            onClick={() => {
                                                releaseReef();
                                            }}
                                        >
                                            <DownloadForOfflineIcon></DownloadForOfflineIcon>
                                        </IconButton>
                                    )}
                                </div>
                            </div>

                            {erc20List?.map((erc20: ERC20, i: number) => (
                                <div key={i}>
                                    <div className="col-sm secondary">
                                        <IconButton
                                            onClick={() => {
                                                removeErc20(erc20.address);
                                            }}
                                        >
                                            <HighlightOffIcon></HighlightOffIcon>
                                        </IconButton>
                                    </div>
                                    <div className="col-md">
                                        {erc20.logoSrc && erc20.logoSrc != "" ? (
                                            <img src={erc20.logoSrc} className="token-logo" />
                                        ) : (
                                            <HelpOutlineIcon className="token-logo"></HelpOutlineIcon>
                                        )}
                                        {erc20.ticker}
                                    </div>
                                    <div className="col-md text-align-right">{erc20.available}</div>
                                    <div className="col-sm primary">
                                        <IconButton
                                            onClick={() => {
                                                updateAvalilableErc20(erc20);
                                            }}
                                        >
                                            <RefreshIcon></RefreshIcon>
                                        </IconButton>
                                    </div>
                                    <div className="col-sm primary">
                                        {erc20.available != undefined && erc20.available > 0 && (
                                            <IconButton
                                                onClick={() => {
                                                    releaseErc20(erc20.address);
                                                }}
                                            >
                                                <DownloadForOfflineIcon></DownloadForOfflineIcon>
                                            </IconButton>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="col-sm primary">
                                <OpenModalButton id="addErc20ModalToggle" className="d-none">
                                    <span ref={(button) => setOpenModalBtn(button)}></span>
                                </OpenModalButton>
                                <IconButton onClick={() => openModalBtn.click()}>
                                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                </IconButton>
                            </div>
                        </Card>

                        <Margin size="3"></Margin>

                        <Card>
                            <div className="sub-title">
                                Withdraw REEF from contract
                                <QuestionTooltip id="withdrawFromContract">
                                    If the Payment Splitter is entitled to withdraw <br />
                                    REEF from a contract that exposes a <b>withdraw()</b> <br />
                                    function you can withdraw it from here
                                </QuestionTooltip>
                            </div>

                            <Components.Input.Input
                                value={withdrawFrom}
                                onChange={setWithdrawFrom}
                                className={`form-control col-xl ${
                                    withdrawFromError ? "error" : ""
                                }`}
                                placeholder="Contract address"
                            />
                            <div className="col-md">
                                <Components.Button.Button
                                    onClick={() => {
                                        withdrawFromContract(withdrawFrom);
                                    }}
                                    disabled={withdrawFromError || withdrawFrom == ""}
                                >
                                    Withdraw
                                </Components.Button.Button>
                            </div>
                        </Card>
                    </div>
                )}

                <Margin size="3"></Margin>

                <div className="search">
                    <Components.Input.Input
                        value={searchAddress}
                        onChange={setSearchAddress}
                        className={`form-control col-xl ${searchAddressError ? "error" : ""}`}
                        placeholder="Payment Splitter contract address"
                    />
                    <div className="col-md">
                        <Components.Button.Button
                            onClick={() => {
                                search(searchAddress);
                            }}
                            disabled={searchAddressError || searchAddress == ""}
                        >
                            Search Payment Splitter
                        </Components.Button.Button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                id="addErc20ModalToggle"
                title="Add ERC20 token"
                confirmBtnLabel="Add"
                confirmFun={() => addErc20(erc20Address)}
            >
                <Components.Input.Input
                    value={erc20Address}
                    onChange={setErc20Address}
                    className={`form-control col-xl ${erc20AddressError ? "error" : ""}`}
                    placeholder="Address"
                />
            </ConfirmationModal>
        </div>
    );
};
