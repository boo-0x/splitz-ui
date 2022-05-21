import React from "react";
import {
    appState,
    defaultOptions,
    hooks,
    ReefSigner,
    availableNetworks,
} from "@reef-defi/react-lib";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import ContentRouter from "./pages/ContentRouter";
import Nav from "./common/Nav";
import Footer from "./common/Footer";
import OptionContext from "./context/OptionContext";
import { notify } from "./utils/utils";
import { TESTNET_URL } from "./urls";
import TestnetBanner from "./common/TestnetBanner";
import NoExtension from "./pages/error/NoExtension";
import NoAccount from "./pages/error/NoAccount";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";

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
                            <Footer></Footer>
                        </>
                    )}

                    {error?.code === 1 && (
                        <Home>
                            <div className="splitz-card mt-5">
                                <NoExtension />
                            </div>
                        </Home>
                    )}
                    {error?.code === 2 && (
                        <Home>
                            <div className="splitz-card mt-5">
                                <NoAccount />
                            </div>
                        </Home>
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
