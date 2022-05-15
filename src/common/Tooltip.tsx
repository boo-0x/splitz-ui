import React from "react";
import ReactTooltip from "react-tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./Tooltip.css";

interface Tooltip {
    id?: string;
    type?: string;
}

const Tooltip: React.FC<Tooltip> = ({
    children,
    id = "tooltip",
    type = "question",
}): JSX.Element => (
    <div className={`splitz-tooltip ${type}-tooltip`}>
        <span data-tip data-for={id}>
            {type === "question" && <HelpOutlineIcon></HelpOutlineIcon>}
            {type === "exclamation" && <ErrorOutlineIcon></ErrorOutlineIcon>}
        </span>
        <ReactTooltip
            id={id}
            place="right"
            effect="solid"
            className="splitz-tooltip-message"
            backgroundColor="#e91e62"
        >
            {children}
        </ReactTooltip>
    </div>
);

export default Tooltip;
