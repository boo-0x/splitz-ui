import React from "react";
import "./NotFound.css";

const NotFound = (): JSX.Element => {
    return (
        <div className="page-not-found">
            <div className="code-error">404</div>
            <div className="error-message">Page not found</div>
        </div>
    );
};

export default NotFound;
