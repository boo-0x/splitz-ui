import React from "react";
import "./Spinner.css";

interface Spinner {
    display: boolean;
    inline?: boolean;
}

const Spinner = ({ display, inline = false }: Spinner): JSX.Element => {
    return (
        <div className={`${inline ? "inline" : ""}`}>
            {display && (
                <div className="splitz-spinner">
                    <img src="/img/logo.png" className="logo-black"></img>
                    <img src="/img/logo_white.png" className="logo-white"></img>
                </div>
            )}
        </div>
    );
};

export default Spinner;
