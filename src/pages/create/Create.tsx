import React from "react";
import { appState, hooks, Network, ReefSigner } from "@reef-defi/react-lib";
import { CreateComponent } from "./CreateComponent";

export const Create = (): JSX.Element => {
    const selectedSigner: ReefSigner | undefined = hooks.useObservableState(
        appState.selectedSigner$
    );
    const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);

    return <>{network && <CreateComponent signer={selectedSigner} network={network} />}</>;
};
