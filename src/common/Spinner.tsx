import React from "react";
import "./Spinner.css";

interface Spinner {
    display: boolean;
}

const Spinner = ({ display }: Spinner): JSX.Element => {
    return (
        <div>
            {display && (
                <div className="splitz-spinner">
                    <img src="/logo.png" className="black"></img>
                    <img src="/logo_white.png" className="white"></img>
                </div>
            )}
        </div>
    );
};

export default Spinner;
