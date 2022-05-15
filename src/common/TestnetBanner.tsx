import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./TestnetBanner.css";

const TestnetBanner = (): JSX.Element => (
    <div className="banner">
        <ErrorOutlineIcon></ErrorOutlineIcon>
        <span>Using testnet network. To use mainnet remove "/testnet" from the URL.</span>
    </div>
);

export default TestnetBanner;
