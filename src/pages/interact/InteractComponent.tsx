import { Components, Network, ReefSigner, TokenWithAmount } from "@reef-defi/react-lib";
import React, { useEffect, useState, useRef } from "react";
import { Contract, BigNumber } from "ethers";
import { metadataDeploy } from "../create/paymentSplitterDeployData";
import { useHistory, useParams } from "react-router-dom";
import { INTERACT_URL } from "../../urls";
import {
    addErc20ToStorage,
    getErc20Storage,
    removeErc20FromStorage,
} from "../../store/internalStore";
import SelectToken from "@reef-defi/react-lib/dist/components/SelectToken";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { TokenAmountFieldMax } from "@reef-defi/react-lib/dist/components";
import { Signer } from "crypto";

const { Display, Card: CardModule, Modal, Label } = Components;
const { Margin } = Display;
const { Card } = CardModule;
const { OpenModalButton, default: ConfirmationModal, ModalFooter, ModalBody } = Modal;
const { ConfirmLabel } = Label;

interface InteractComponent {
    signer: ReefSigner | undefined;
    network: Network;
}

interface Payee {
    address: string;
    shares: number;
}

interface ERC20 {
    address: string;
    ticker: string;
    available: number;
    logoSrc: string;
}

const CONTRACT_ADDRESS = "0x65cF551f08F0C7B60b92F07A3E1521D8975a8aeC"; // "0x61f5e2531C3f1F87bF2a79C51D8247D54Ea233B1";
const MOCK_TOKEN_2 = "0xaf5F0189542c1fE44fF10D7dc07359e57831179A";

const ERC20_LIST: ERC20[] = [
    {
        address: "0xcd32473d48204c91994b0A5A32647e538e110fF4",
        ticker: "MOCK1",
        available: 110,
        logoSrc: "./img/token-icons/token-icon-0.png",
    },
    {
        address: "0xaf5F0189542c1fE44fF10D7dc07359e57831179A",
        ticker: "MOCK2",
        available: 110,
        logoSrc: "./img/token-icons/token-icon-1.png",
    },
    {
        address: "0x111111111111aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        ticker: "DUMMY",
        available: 220,
        logoSrc: "",
    },
];

export const InteractComponent = ({ signer, network }: InteractComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>();
    const [availableReef, setAvailableReef] = useState<number>();
    const [contract, setContract] = useState<Contract>();
    const [withdrawFrom, setWithdrawFrom] = useState<string>("");
    const [searchAddress, setSearchAddress] = useState<string>("");
    const [erc20List, setERC20List] = useState<ERC20[]>();
    const [erc20Address, setErc20Address] = useState<string>("");
    const history = useHistory();
    const { contractAddress } = useParams<{ contractAddress: string }>();
    let openModalBtn: any;

    useEffect(() => {
        setPayees([]);
        setAvailableReef(0);
        setContract(undefined);
        setERC20List(ERC20_LIST);
    }, [contractAddress]);

    useEffect(() => {
        if (signer && network && contractAddress) {
            init();
        }
    }, [signer, network, contractAddress]);

    // let token: TokenWithAmount = {
    //     name: "REEF",
    //     address: "0x0000000000000000000000000000000001000000",
    //     iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/6951.png",
    //     balance: BigNumber.from(0),
    //     decimals: 18,
    //     symbol: "REEF",
    //     amount: "",
    //     isEmpty: false,
    //     price: 0,
    // };

    // let tokens = [token];

    async function init(): Promise<void> {
        if (!signer || !network) {
            alert("!signer || !network");
            return;
        }

        const newContract = new Contract(contractAddress, metadataDeploy.abi, signer.signer);
        setContract(newContract);

        try {
            const totalShares = Number(await newContract.totalShares());
            const payeesResp = await newContract.getPayees();
            const mappedPayees: Payee[] = payeesResp.map((payee: any) => {
                return { address: payee.payee, shares: (Number(payee.share) * 100) / totalShares };
            });
            setPayees(mappedPayees);
        } catch (err: any) {
            console.log(err);
        }

        try {
            const res: any = await newContract.available(signer.evmAddress);
            setAvailableReef(Number(res) / 1e18);
        } catch (err: any) {
            console.log(err);
        }

        console.log("getErc20Storage()", getErc20Storage());

        getErc20Storage().forEach(async (address: string) => {
            try {
                const res: any = await newContract.availableERC20(address, signer.evmAddress);
                if (Number(res)) {
                    const newErc20: ERC20 = {
                        address: address,
                        ticker: "TODO",
                        available: Number(res) / 1e18,
                        logoSrc: "",
                    };
                    setERC20List([...(erc20List || []), newErc20]);
                }
            } catch (err: any) {
                console.log(err);
            }
        });
    }

    async function execute(funcName: string, args: any[]) {
        if (!contract) {
            alert("!contract");
            return;
        }

        const res: any = await contract[funcName](...args);
    }

    function search(address: string) {
        history.push(INTERACT_URL + "/" + address);
    }

    async function addErc20(address: string) {
        if (!contract || !signer) {
            alert("!contract || !signer");
            return;
        }

        console.log("getErc20Storage()", getErc20Storage());

        try {
            addErc20ToStorage(address);
            const res: any = await contract.availableERC20(address, signer.evmAddress);
            if (Number(res)) {
                const newErc20: ERC20 = {
                    address: address,
                    ticker: "TODO",
                    available: Number(res) / 1e18,
                    logoSrc: "",
                };
                const updatedErc20List = [...(erc20List || [])];
                const index = updatedErc20List.findIndex((erc20) => erc20.address === address);
                if (index === -1) {
                    updatedErc20List.push(newErc20);
                    setERC20List(updatedErc20List);
                }
                console.log("getErc20Storage()", getErc20Storage());
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    async function removeErc20(address: string) {
        if (!contract || !signer) {
            alert("!contract || !signer");
            return;
        }

        console.log("getErc20Storage()", getErc20Storage());
        const updatedErc20List = [...(erc20List || [])];
        const index = updatedErc20List.findIndex((erc20) => erc20.address === address);
        if (index > -1) {
            updatedErc20List.splice(index, 1);
            setERC20List(updatedErc20List);
            removeErc20FromStorage(address);
        }
        console.log("getErc20Storage()", getErc20Storage());
    }

    return (
        <div className="margin-auto">
            <div className="search">
                <Components.Input.Input
                    value={searchAddress}
                    onChange={setSearchAddress}
                    className="form-control col-xl"
                    placeholder="Contract address"
                />
                <div className="col-md">
                    <Components.Button.Button
                        onClick={() => {
                            search(searchAddress);
                        }}
                    >
                        Search
                    </Components.Button.Button>
                </div>
            </div>

            <Margin size="3"></Margin>

            <Card>
                {payees?.length && (
                    <div className="header-row">
                        <div className="col-xl">Address</div>
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

            <Margin size="3"></Margin>

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
                                execute("available", [signer?.evmAddress]);
                            }}
                        >
                            <RefreshIcon></RefreshIcon>
                        </IconButton>
                    </div>
                    <div className="col-sm primary">
                        <IconButton
                            onClick={() => {
                                execute("release", [signer?.evmAddress]);
                            }}
                        >
                            <DownloadForOfflineIcon></DownloadForOfflineIcon>
                        </IconButton>
                    </div>
                </div>
                {/* <div className="withdraw">
                    <Components.Input.Input
                        value={withdrawFrom}
                        onChange={setWithdrawFrom}
                        className="w-50 fs-5"
                        placeholder="Contract address"
                    />
                    <Components.Button.Button
                        onClick={() => {
                            execute("withdrawFromContract", [withdrawFrom]);
                        }}
                    >
                        Withdraw from contract
                    </Components.Button.Button>
                </div> */}
                {erc20List
                    ?.filter((erc20: ERC20) => erc20.available)
                    .map((erc20: ERC20, i: number) => (
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
                                {erc20.logoSrc != "" ? (
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
                                        execute("availableERC20", [
                                            erc20.address,
                                            signer?.evmAddress,
                                        ]);
                                    }}
                                >
                                    <RefreshIcon></RefreshIcon>
                                </IconButton>
                            </div>
                            <div className="col-sm primary">
                                <IconButton
                                    onClick={() => {
                                        execute("releaseERC20", [
                                            erc20.address,
                                            signer?.evmAddress,
                                        ]);
                                    }}
                                >
                                    <DownloadForOfflineIcon></DownloadForOfflineIcon>
                                </IconButton>
                            </div>
                        </div>
                    ))}
                <div className="col-sm primary">
                    <OpenModalButton id="addErc20ModalToggle" className="d-none">
                        <span ref={(button) => (openModalBtn = button)}></span>
                    </OpenModalButton>
                    <IconButton onClick={() => openModalBtn.click()}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </IconButton>
                </div>
                {/* <SelectToken
                    id="sel"
                    tokens={tokens}
                    signer={signer as ReefSigner}
                    iconUrl=""
                    selectedTokenName="MOCK"
                    onTokenSelect={() => alert("selected")}
                    onAddressChange={() => new Promise(() => alert("promise"))}
                    hideCommonBaseView={false}
                /> */}
            </Card>

            <ConfirmationModal
                id="addErc20ModalToggle"
                title="Add ERC20 token"
                confirmBtnLabel="Add"
                confirmFun={() => addErc20(erc20Address)}
            >
                <Components.Input.Input
                    value={erc20Address}
                    onChange={setErc20Address}
                    className="col-xl"
                    placeholder="Address"
                />
            </ConfirmationModal>
        </div>
    );
};
