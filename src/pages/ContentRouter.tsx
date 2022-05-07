import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CREATE_URL, INTERACT_URL, INTERACT_CONTRACT_URL } from "../urls";
import Home from "./home/Home";
import { Create } from "./create/Create";
import { Interact } from "./interact/Interact";

const ContentRouter = (): JSX.Element => {
    return (
        <div className="content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path={CREATE_URL} component={Create} />
                <Route exact path={INTERACT_URL} component={Interact} />
                <Route exact path={INTERACT_CONTRACT_URL} component={Interact} />
            </Switch>
        </div>
    );
};

export default ContentRouter;
