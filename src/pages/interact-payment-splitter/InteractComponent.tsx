import { Components, Network, ReefSigner, utils as reefUtils } from "@reef-defi/react-lib";
import React, { useEffect, useState } from "react";
import { Contract } from "ethers";
import { metadataDeploy } from "../payment-splitter/paymentSplitterDeployData";

const { Display, Card: CardModule } = Components;
const { ComponentCenter } = Display;
const { Card } = CardModule;

interface InteractComponent {
    signer: ReefSigner | undefined;
    network: Network;
}

interface Payee {
    address: string;
    share: number;
}

interface ERC20 {
    address: string;
    ticker: string;
    available: number;
}

const CONTRACT_ADDRESS = "0x61f5e2531C3f1F87bF2a79C51D8247D54Ea233B1";
const ERC20_LIST: ERC20[] = [
    {
        address: "0xcd32473d48204c91994b0A5A32647e538e110fF4",
        ticker: "MOCK1",
        available: 110,
    },
    {
        address: "0xcd22223d48204c91994b0A5A32647e538e110fF4",
        ticker: "MOCK2",
        available: 220,
    },
];

export const InteractComponent = ({ signer, network }: InteractComponent): JSX.Element => {
    const [payees, setPayees] = useState<Payee[]>();
    const [availableReef, setAvailableReef] = useState<number>();
    const [contract, setContract] = useState<Contract>();
    const [withdrawFrom, setWithdrawFrom] = useState<string>("");
    const [erc20List, setERC20List] = useState<ERC20[]>();

    useEffect(() => {
        setPayees([]);
        setAvailableReef(0);
        setContract(undefined);
        setERC20List(ERC20_LIST);
    }, []);

    useEffect(() => {
        if (signer && network) {
            init();
        }
    }, [signer, network]);

    async function init(): Promise<void> {
        if (!signer || !network) {
            alert("!signer || !network");
            return;
        }

        const newContract = new Contract(CONTRACT_ADDRESS, metadataDeploy.abi, signer.signer);
        setContract(newContract);

        try {
            const res: any = await newContract.available(signer.evmAddress);
            setAvailableReef(Number(res) / 1e18);
        } catch (err: any) {
            console.log(err);
        }

        try {
            const totalShares = Number(await newContract.totalShares());
            const payeesResp = await newContract.getPayees();
            const mappedPayees: Payee[] = payeesResp.map((payee: any) => {
                return { address: payee.payee, share: (Number(payee.share) * 100) / totalShares };
            });
            setPayees(mappedPayees);
        } catch (err: any) {
            console.log(err);
        }
    }

    async function execute(funcName: string, args: any[]) {
        if (!contract) {
            alert("!contract");
            return;
        }

        const res: any = await contract[funcName](...args);
    }

    return (
        <ComponentCenter>
            <Card>
                {payees?.map((payee: any) => (
                    <div key={payee.address} className="payee">
                        <div>Address: {payee.address}</div>
                        <div>Share: {payee.share}%</div>
                    </div>
                ))}
            </Card>

            <Card>
                <div className="available">
                    <span>Available REEF: {availableReef}</span>
                    <Components.Button.Button
                        onClick={() => {
                            execute("available", [signer?.evmAddress]);
                        }}
                    >
                        R
                    </Components.Button.Button>
                    <Components.Button.Button
                        onClick={() => {
                            execute("release", [signer?.evmAddress]);
                        }}
                    >
                        Release
                    </Components.Button.Button>
                </div>
                <div className="withdraw">
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
                </div>
            </Card>

            <Card>
                {erc20List
                    ?.filter((erc20: ERC20) => erc20.available)
                    .map((erc20: ERC20) => (
                        <div key={erc20.address} className="available">
                            <span>
                                Available {erc20.ticker}: {erc20.available}
                            </span>
                            <Components.Button.Button
                                onClick={() => {
                                    execute("availableERC20", [erc20.address, signer?.evmAddress]);
                                }}
                            >
                                R
                            </Components.Button.Button>
                            <Components.Button.Button
                                onClick={() => {
                                    execute("releaseERC20", [erc20.address, signer?.evmAddress]);
                                }}
                            >
                                Release
                            </Components.Button.Button>
                        </div>
                    ))}
            </Card>
        </ComponentCenter>
    );
};
