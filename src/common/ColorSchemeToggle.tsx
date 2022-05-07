import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { saveColorScheme, isColorSchemeDark } from "../store/internalStore";
import "react-toggle/style.css";
import "./ColorSchemeToggle.css";

const ColorSchemeToggle = (): JSX.Element => {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    useEffect(() => {
        setDarkMode(isColorSchemeDark());
    }, []);

    useEffect(() => {
        darkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }, [darkMode]);

    function darkModeChange(selected: boolean) {
        setDarkMode(selected);
        saveColorScheme(selected);
    }

    return (
        <div className="toggle-container">
            <Toggle
                checked={darkMode}
                onChange={(event) => darkModeChange(event.target.checked)}
                icons={{ checked: "🌙", unchecked: "🔆" }}
                aria-label="Dark mode"
            />
        </div>
    );
};

export default ColorSchemeToggle;
