import React from "react";
import { Route, Switch } from "react-router-dom";
import { CREATE_URL, INTERACT_URL, INTERACT_CONTRACT_URL, TESTNET_URL } from "../urls";
import Home from "./home/Home";
import { Create } from "./create/Create";
import { Interact } from "./interact/Interact";
import NotFound from "./not-found/NotFound";

const ContentRouter = (): JSX.Element => {
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
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default ContentRouter;
