import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ApolloClient } from "@apollo/client";
import { ReefSigner, graphql, hooks, appState } from "@reef-defi/react-lib";
import { CREATE_ERC20_TOKEN_URL, DASHBOARD_URL, PAYMENT_SPLITTER_URL, INTERACT_URL } from "../urls";
import Dashboard from "./dashboard/Dashboard";
import { Creator } from "./creator/Creator";
import { PaymentSplitter } from "./payment-splitter/PaymentSplitter";
import { Interact } from "./interact-payment-splitter/Interact";
import TokenContext from "../context/TokenContext";

const ContentRouter = (): JSX.Element => {
    const currentSigner: ReefSigner | undefined = hooks.useObservableState(
        appState.selectedSigner$
    );
    const apollo: ApolloClient<any> | undefined = hooks.useObservableState(
        graphql.apolloClientInstance$
    );
    // Its not appropriet to have token state in this component, but the problem was apollo client.
    // Once its decared properlly in App move TokenContext in the parent component (App.tsx)
    const tokens = hooks.useAllTokens(currentSigner?.address, apollo);

    return (
        <div className="content">
            <TokenContext.Provider value={tokens}>
                <Switch>
                    <Route exact path={DASHBOARD_URL} component={Dashboard} />
                    <Route exact path={CREATE_ERC20_TOKEN_URL} component={Creator} />
                    <Route exact path={PAYMENT_SPLITTER_URL} component={PaymentSplitter} />
                    <Route exact path={INTERACT_URL} component={Interact} />
                    <Route path="/" render={() => <Redirect to={DASHBOARD_URL} />} />
                </Switch>
            </TokenContext.Provider>
        </div>
    );
};

export default ContentRouter;
