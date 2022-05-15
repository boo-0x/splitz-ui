import React from "react";
import {
    appState,
    defaultOptions,
    hooks,
    ReefSigner,
    availableNetworks,
} from "@reef-defi/react-lib";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ContentRouter from "./pages/ContentRouter";
import Nav from "./common/Nav";
import OptionContext from "./context/OptionContext";
import { notify } from "./utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { TESTNET_URL } from "./urls";
import TestnetBanner from "./common/TestnetBanner";

const App = (): JSX.Element => {
    const isTestnet = useLocation().pathname.includes(TESTNET_URL);
    const { provider, loading, error } = hooks.useInitReefState("Splitz dApp", {
        network: isTestnet ? availableNetworks.testnet : availableNetworks.mainnet,
    });
    const history = useHistory();
    const currentSigner: ReefSigner | undefined = hooks.useObservableState(
        appState.selectedSigner$
    );
    hooks.useBindEvmAddressAlert(currentSigner, provider);

    return (
        <OptionContext.Provider value={{ ...defaultOptions, back: history.goBack, notify }}>
            <div className="App d-flex w-100 h-100">
                <div className="w-100 main-content">
                    {!loading && !error && (
                        <>
                            <Nav display={!loading && !error} />
                            {isTestnet && <TestnetBanner></TestnetBanner>}
                            <ContentRouter />
                        </>
                    )}

                    <ToastContainer
                        draggable
                        newestOnTop
                        closeOnClick
                        hideProgressBar
                        position={toast.POSITION.BOTTOM_LEFT}
                        autoClose={5000}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        pauseOnHover={false}
                    />
                </div>
            </div>
        </OptionContext.Provider>
    );
};

export default App;
