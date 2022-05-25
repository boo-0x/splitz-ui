import { Components, Network, ReefSigner, rpc } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract, utils } from "ethers";
import { metadataDeploy } from "../../utils/deployData";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { INTERACT_URL, TESTNET_URL } from "../../urls";
import {
    addErc20ToStorage,
    getErc20Storage,
    removeErc20FromStorage,
} from "../../store/internalStore";
import { notify, trim, formatAmount } from "../../utils/utils";
import { ERC20 } from "../../model/erc20";
import { Payee } from "../../model/payee";
import { Progress } from "../../model/progress";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Tooltip from "../../common/Tooltip";
import { isContrVerified, verifySplitzContract } from "../../utils/contract";
import Spinner from "../../common/Spinner";
import CopyToClipboard from "react-copy-to-clipboard";

const { Modal } = Components;
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
    const [pullFrom, setPullFrom] = useState<string>("");
    const [pullFromError, setPullFromError] = useState<boolean>(false);
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
    const isTestnet = useLocation().pathname.includes(TESTNET_URL);
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
        setPullFromError(pullFrom != "" && !utils.isAddress(pullFrom));
    }, [pullFrom]);

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

        setContract(newContract);

        // Check if contract is verified
        // TODO
        // isContrVerified(contractAddress)
        //     .then((verified: boolean) => setContractNotVerified(!verified))
        //     .catch((err: any) => console.log("Error checking if contract is verified:", err));

        // Set available REEF in Splitzer
        try {
            const availableReefRes: any = await newContract.available(evmAddress);
            setAvailableReef(Number(availableReefRes) / 1e18);
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error setting available REEF:", err);
            }
            setAvailableReef(0);
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
        history.push(
            isTestnet ? TESTNET_URL + INTERACT_URL + "/" + address : INTERACT_URL + "/" + address
        );
    }

    async function pullFromContract(addressFrom: string) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.withdrawFromContract(addressFrom);
            notify("Amount withdrawn from contract to Splitzer.");
            setPullFrom("");
            updateAvailableReef();
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
            const res: any = await contract.available(evmAddress);
            setAvailableReef(Number(res) / 1e18);
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error setting available REEF:", err);
            }
            setAvailableReef(0);
        }
    }

    async function updateAvalilableErc20(erc20Address: string) {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        let available = 0;
        try {
            let res: any = await contract.availableERC20(erc20Address, evmAddress);
            available = Number(res) / 1e18;
        } catch (err: any) {
            if (!noSharesError(err)) {
                console.log("Error getting ERC20 balance:", err);
                return;
            }
        }

        const updatedErc20List = [...(erc20List || [])];
        updatedErc20List.forEach((erc20: ERC20) => {
            if (erc20.address === erc20Address) {
                erc20.available = available;
            }
        });
        setERC20List(updatedErc20List);
    }

    async function releaseReef() {
        if (!contract) {
            notify("Contract not found.", "error");
            return;
        }

        try {
            await contract.release(evmAddress);
            notify("Successful withdrawal!");
            updateAvailableReef();
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
            notify("Successful withdrawal!");
            updateAvalilableErc20(erc20Address);
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
        <div className="margin-y-auto">
            <div className="title">Interact with Splitzer</div>

            <div className="margin-y-auto fit-content">
                <div className="interact-form">
                    {contract && (
                        <div className="splitz-card">
                            <div className="row">
                                <div className="offset-1 col-11 sub-title">Contract address</div>
                            </div>
                            <div className="row color-dimmed">
                                <div className="offset-1 col-11">
                                    {trim(contractAddress)}
                                    <CopyToClipboard text={contractAddress}>
                                        <ContentPasteIcon className="copy-button hover-pointer"></ContentPasteIcon>
                                    </CopyToClipboard>
                                    {contractNotVerified && (
                                        <IconButton
                                            onClick={() => {
                                                verifyContract();
                                            }}
                                            className="verify-btn"
                                        >
                                            <Tooltip id="notVerifiedTooltip" type="exclamation">
                                                Contract not verified. Click to verify now.
                                            </Tooltip>
                                        </IconButton>
                                    )}
                                    <Spinner display={progress.loading} inline={true}></Spinner>
                                </div>
                            </div>
                            {payees && payees.length > 0 && (
                                <div className="row sub-title mt-2">
                                    <div className="offset-1 col-8">Owners</div>
                                    <div className="col-3">%</div>
                                </div>
                            )}
                            {payees?.map((payee: Payee, i: number) => (
                                <div key={i} className="row color-dimmed">
                                    <div className="offset-1 col-8">
                                        {trim(payee.address)}
                                        <CopyToClipboard text={payee.address}>
                                            <ContentPasteIcon className="copy-button hover-pointer"></ContentPasteIcon>
                                        </CopyToClipboard>
                                    </div>
                                    <div className="col-3">{payee.shares.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {contract && (
                        <div className="splitz-card">
                            <div className="row">
                                <div className="offset-1 col-4">
                                    <img src="./img/reef.png" className="token-logo" />
                                    REEF
                                </div>
                                <div className="col-4 text-align-right">
                                    {formatAmount(availableReef)}
                                </div>
                                <div className="col-3 primary">
                                    <IconButton
                                        onClick={() => {
                                            updateAvailableReef();
                                        }}
                                    >
                                        <RefreshIcon></RefreshIcon>
                                    </IconButton>
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
                                <div key={i} className="row">
                                    <div className="col-1 secondary">
                                        <IconButton
                                            onClick={() => {
                                                removeErc20(erc20.address);
                                            }}
                                        >
                                            <HighlightOffIcon></HighlightOffIcon>
                                        </IconButton>
                                    </div>
                                    <div className="col-4">
                                        {erc20.logoSrc && erc20.logoSrc != "" ? (
                                            <img src={erc20.logoSrc} className="token-logo" />
                                        ) : (
                                            <HelpOutlineIcon className="token-logo"></HelpOutlineIcon>
                                        )}
                                        {erc20.ticker}
                                    </div>
                                    <div className="col-4 text-align-right">
                                        {formatAmount(erc20.available)}
                                    </div>
                                    <div className="col-3 primary">
                                        <IconButton
                                            onClick={() => {
                                                updateAvalilableErc20(erc20.address);
                                            }}
                                        >
                                            <RefreshIcon></RefreshIcon>
                                        </IconButton>
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

                            <div className="row">
                                <div className="col-1 primary">
                                    <OpenModalButton id="addErc20ModalToggle" className="d-none">
                                        <span ref={(button) => setOpenModalBtn(button)}></span>
                                    </OpenModalButton>
                                    <IconButton onClick={() => openModalBtn.click()}>
                                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    )}

                    {contract && (
                        <div className="splitz-card">
                            <div className="row pull-from-contract">
                                <div className="col-12 pb-2">
                                    <span className="sub-title">Pull REEF from contract</span>
                                    <Tooltip id="pullFromContractTooltip">
                                        If the Splitzer is entitled to withdraw REEF from
                                        <br />
                                        another contract that exposes a <b>withdraw()</b> <br />
                                        function you can withdraw it from here
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-9">
                                    <Components.Input.Input
                                        value={pullFrom}
                                        onChange={setPullFrom}
                                        className={`form-control ${pullFromError ? "error" : ""}`}
                                        placeholder="Contract address"
                                    />
                                </div>
                                <div className="col-3">
                                    <Components.Button.Button
                                        onClick={() => {
                                            pullFromContract(pullFrom);
                                        }}
                                        disabled={pullFromError || pullFrom == ""}
                                    >
                                        Pull
                                    </Components.Button.Button>
                                </div>
                            </div>
                        </div>
                    )}
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

            <div className="search text-center">
                <Components.Input.Input
                    value={searchAddress}
                    onChange={setSearchAddress}
                    className={`form-control ${searchAddressError ? "error" : ""}`}
                    placeholder="Splitzer address"
                />
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
    );
};
