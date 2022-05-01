import React from "react";
import { appState, hooks, Network, ReefSigner } from "@reef-defi/react-lib";
import { PaymentSplitterComponent } from "./PaymentSplitterComponent";

export const PaymentSplitter = (): JSX.Element => {
    const selectedSigner: ReefSigner | undefined = hooks.useObservableState(
        appState.selectedSigner$
    );
    const network: Network | undefined = hooks.useObservableState(appState.selectedNetworkSubj);

    return <>{network && <PaymentSplitterComponent signer={selectedSigner} network={network} />}</>;
};
