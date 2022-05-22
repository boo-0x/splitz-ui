import React, { useEffect } from "react";
import { Components, appState, hooks, ReefSigner, Network } from "@reef-defi/react-lib";
import "./Nav.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { saveSignerLocalPointer } from "../store/internalStore";
import { CREATE_URL, INTERACT_URL, TESTNET_URL } from "../urls";

let menuItems = [
    { title: "Create", url: CREATE_URL },
    { title: "Interact", url: INTERACT_URL },
];

export interface Nav {
    display: boolean;
}

const Nav = ({ display }: Nav): JSX.Element => {
    const history = useHistory();
    const isTestnet = history.location.pathname.startsWith(TESTNET_URL);
    if (isTestnet) {
        menuItems = [
            { title: "Create", url: TESTNET_URL + CREATE_URL },
            { title: "Interact", url: TESTNET_URL + INTERACT_URL },
        ];
    }
    let { pathname } = useLocation();

    const signer: ReefSigner | undefined = hooks.useObservableState(appState.selectedSigner$);
    const accounts: ReefSigner[] | undefined = hooks.useObservableState(appState.signers$);
    const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);
    const selectAccount = (index: number): void => {
        saveSignerLocalPointer(index);
        appState.selectAddressSubj.next(index != null ? accounts?.[index].address : undefined);
    };

    useEffect(() => {
        // Send message after accounts are loaded to parent app (if Splitz is used in an iframe)
        if (accounts && accounts.length) {
            window.top?.postMessage({ type: "accountsLoaded", message: true }, "*");
        }

        // Listen to account change message from parent app (if Splitz is used in an iframe)
        window.addEventListener(
            "message",
            (ev: MessageEvent<{ type: string; message: string }>) => {
                if (typeof ev.data !== "object" || ev.data?.type !== "addressChange") {
                    return;
                }

                if (
                    typeof ev.data === "object" &&
                    ev.data?.type === "addressChange" &&
                    ev.data.message &&
                    accounts &&
                    accounts.length
                ) {
                    const accountIndex = (accounts || []).findIndex(
                        (account: ReefSigner) => account.address == ev.data.message
                    );
                    if (accountIndex > -1) {
                        selectAccount(accountIndex);
                    }
                }
            }
        );
    }, [accounts]);

    const menuItemsView = menuItems.map((item) => {
        let classes = "navigation_menu-items_menu-item";
        if (pathname === item.url) {
            classes += " navigation_menu-items_menu-item--active";
        }
        return (
            <li key={item.title} className={classes}>
                <Link to={item.url} className="navigation_menu-items_menu-item_link">
                    {item.title}
                </Link>
            </li>
        );
    });

    return (
        <div className="nav-content navigation d-flex d-flex-space-between">
            <div className="navigation__wrapper">
                <div>
                    <button
                        type="button"
                        className="logo-btn"
                        onClick={() => {
                            history.push(isTestnet ? TESTNET_URL : "/");
                        }}
                    >
                        <img src="/img/logo.png" height="40px"></img>
                    </button>
                </div>

                {display && (
                    <nav className="d-flex">
                        <ul className="navigation_menu-items ">{menuItemsView}</ul>
                        {accounts && !!accounts.length && network && (
                            <Components.AccountSelector
                                accounts={accounts}
                                selectedSigner={signer}
                                selectAccount={selectAccount}
                                reefscanUrl={network.reefscanUrl}
                            />
                        )}
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Nav;
