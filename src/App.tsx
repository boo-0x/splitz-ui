import React from "react";
import { appState, defaultOptions, hooks, ReefSigner } from "@reef-defi/react-lib";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ContentRouter from "./pages/ContentRouter";
import Nav from "./common/Nav";
import { innitialNetwork } from "./environment";
import OptionContext from "./context/OptionContext";
import { notify } from "./utils/utils";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
    const { provider, loading, error } = hooks.useInitReefState("Reef Wallet App", {
        network: innitialNetwork,
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
