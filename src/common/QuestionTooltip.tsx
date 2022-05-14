import React from "react";
import ReactTooltip from "react-tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./QuestionTooltip.css";

interface Tooltip {
    id?: string;
}

const QuestionTooltip: React.FC<Tooltip> = ({ children, id = "question-tooltip" }): JSX.Element => (
    <div className="question-tooltip">
        <span data-tip data-for={id}>
            <HelpOutlineIcon></HelpOutlineIcon>
        </span>
        <ReactTooltip
            id={id}
            place="right"
            effect="solid"
            className="tooltip-message"
            backgroundColor="#e91e62"
        >
            {children}
        </ReactTooltip>
    </div>
);

export default QuestionTooltip;
