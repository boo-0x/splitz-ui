import React from "react";
import { appState, hooks, Network, ReefSigner } from "@reef-defi/react-lib";
import { InteractComponent } from "./InteractComponent";

export const Interact = (): JSX.Element => {
    const selectedSigner: ReefSigner | undefined = hooks.useObservableState(
        appState.selectedSigner$
    );
    const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);

    return <>{network && <InteractComponent signer={selectedSigner} network={network} />}</>;
};
