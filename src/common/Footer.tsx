import React from "react";
import { Link, useHistory } from "react-router-dom";
import { PRIVACY_URL, TERMS_URL, TESTNET_URL } from "../urls";
import ColorSchemeToggle from "./ColorSchemeToggle";
import "./Footer.css";

const Footer = (): JSX.Element => {
    const isTestnet = useHistory().location.pathname.startsWith(TESTNET_URL);

    return (
        <div className="footer">
            <div className="container">
                <div className="logo">
                    <img src="/img/logo.png" className="logo-black"></img>
                    <img src="/img/logo_white.png" className="logo-white"></img>
                    <span>© 2022 Splitz</span>
                </div>
                <div>
                    <Link
                        to={isTestnet ? TESTNET_URL + TERMS_URL : TERMS_URL}
                        className="footer-link"
                    >
                        Terms
                    </Link>
                </div>
                <div>
                    <Link
                        to={isTestnet ? TESTNET_URL + PRIVACY_URL : PRIVACY_URL}
                        className="footer-link"
                    >
                        Privacy
                    </Link>
                </div>

                <ColorSchemeToggle></ColorSchemeToggle>
            </div>
        </div>
    );
};

export default Footer;
