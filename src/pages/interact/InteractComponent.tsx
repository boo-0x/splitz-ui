import { Components, Network, ReefSigner, rpc } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, utils } from "ethers";
import { metadataDeploy } from "../../utils/deployData";
import { useHistory, useParams } from "react-router-dom";
import { INTERACT_URL } from "../../urls";
import {
    addErc20ToStorage,
    getErc20Storage,
    removeErc20FromStorage,
} from "../../store/internalStore";
import { notify } from "../../utils/utils";
import { ERC20 } from "../../model/erc20";
import { Payee } from "../../model/payee";
import { Progress } from "../../model/progress";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "../../common/Tooltip";
import { isContrIndexed, verifySplitzContract } from "../../utils/contract";
import Spinner from "../../common/Spinner";

const { Card: CardModule, Modal } = Components;
const { Card } = CardModule;
const { OpenModalButton, default: ConfirmationModal } = Modal;

interface InteractComponent {
    signer: ReefSigner | undefined;
    network: Network;
}

function noSharesError(error: Error): boolean {
    return error.message.includes("Splitz: account has no shares");
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
    const [contractNotVerified, setContractNotVerified] = useState<boolean>(false);
    const [progress, setProgress] = useState<Progress>({ loading: false });
    const { contractAddress } = useParams<{ contractAddress: string }>();
    const history = useHistory();

    useEffect(() => {
        setPayees([]);
        setAvailableReef(0);
        setContract(undefined);
        setSearchAddress("");
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
        setContract(newContract);

        // Set payees (owners)
        try {
            const totalShares = Number(await newContract.totalShares());
            const payeesResp = await newContract.getPayees();
            const mappedPayees: Payee[] = payeesResp.map((payee: any) => {
                return { address: payee.payee, shares: (Number(payee.share) * 100) / totalShares };
            });
            setPayees(mappedPayees);
        } catch (err: any) {
            notify("Splitzer contract not found for the provided address.", "error");
            console.log("Error setting payees:", err);
            return;
        }

        // Check if contract is verified
        // TODO implement query
        isContrIndexed(contractAddress)
            .then((verified: boolean) => setContractNotVerified(!verified))
            .catch((err: any) => console.log("Error checking if contract is verified:", err));

        // Set available REEF in Splitzer
        try {
            const availableReefRes: any = await newContract.available(evmAddress);
            setAvailableReef(Number(availableReefRes) / 1e18);
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error setting available REEF:", err);
            }
        }

        // Set available ERC20s in Splitzer
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

    async function verifyContract(): Promise<void> {
        setProgress({ loading: true });

        const addresses: string[] = [];
        const shares: number[] = [];
        payees.forEach((payee: Payee) => {
            addresses.push(payee.address);
            shares.push(payee.shares);
        });
        const args = [addresses, shares];

        try {
            const verified = await verifySplitzContract(
                contractAddress,
                JSON.stringify(args),
                network
            );
            if (verified) {
                notify("Contract has been verified.");
                setContractNotVerified(true);
            } else {
                notify("Error verifying contract.", "error");
            }
        } catch (err: any) {
            notify("Error verifying contract.", "error");
            console.log("Error verifying contract.", err);
        }

        setProgress({ loading: false });
    }

    function searchSplitzer(address: string) {
        history.push(INTERACT_URL + "/" + address);
    }

    async function withdrawFromContract(addressFrom: string) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.withdrawFromContract(addressFrom);
            notify("Amount withdrawn from contract to Splitzer.");
            setWithdrawFrom("");
        } catch (err: any) {
            notify("Error sending funds to Splitzer.", "error");
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
            console.log("Error withdrawing REEF from Splitzer:", err);
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
            console.log("Error withdrawing REEF from Splitzer:", err);
        }
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
            <div className="title">Interact with Splitzer</div>

            <div className="margin-auto fit-content">
                {contractAddress && (
                    <Card>
                        <div className="bold col-100">Contract address</div>

                        <div className="col-100">
                            {contractAddress}
                            {contractNotVerified && (
                                <IconButton
                                    onClick={() => {
                                        verifyContract();
                                    }}
                                    className="verify-btn"
                                >
                                    <Tooltip id="notVerifiedTooltip" type="exclamation">
                                        Contract not verified. Click here to verify.
                                    </Tooltip>
                                </IconButton>
                            )}

                            <Spinner display={progress.loading} inline={true}></Spinner>
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

                        <Card>
                            <div className="sub-title">
                                Withdraw REEF from contract
                                <Tooltip id="withdrawFromContractTooltip">
                                    If the Splitzer is entitled to withdraw <br />
                                    REEF from another contract that exposes a <b>withdraw()</b>{" "}
                                    <br />
                                    function you can withdraw it from here
                                </Tooltip>
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

                <div className="search">
                    <Components.Input.Input
                        value={searchAddress}
                        onChange={setSearchAddress}
                        className={`form-control col-xl ${searchAddressError ? "error" : ""}`}
                        placeholder="Splitzer address"
                    />
                    <div className="col-md">
                        <Components.Button.Button
                            onClick={() => {
                                searchSplitzer(searchAddress);
                            }}
                            disabled={searchAddressError || searchAddress == ""}
                        >
                            Search Splitzer
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
