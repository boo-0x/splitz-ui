import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import {
    CREATE_URL,
    INTERACT_URL,
    INTERACT_CONTRACT_URL,
    TESTNET_URL,
    TERMS_URL,
    PRIVACY_URL,
} from "../urls";
import Home from "./home/Home";
import { Create } from "./create/Create";
import { Interact } from "./interact/Interact";
import NotFound from "./not-found/NotFound";
import Terms from "./terms/Terms";
import Privacy from "./privacy/Privacy";

const ContentRouter = (): JSX.Element => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="content">
            <Switch>
                <Route exact path={["/", TESTNET_URL]} component={Home} />
                <Route exact path={[CREATE_URL, TESTNET_URL + CREATE_URL]} component={Create} />
                <Route
                    exact
                    path={[INTERACT_URL, TESTNET_URL + INTERACT_URL]}
                    component={Interact}
                />
                <Route
                    exact
                    path={[INTERACT_CONTRACT_URL, TESTNET_URL + INTERACT_CONTRACT_URL]}
                    component={Interact}
                />
                <Route exact path={[TERMS_URL, TESTNET_URL + TERMS_URL]} component={Terms} />
                <Route exact path={[PRIVACY_URL, TESTNET_URL + PRIVACY_URL]} component={Privacy} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default ContentRouter;
