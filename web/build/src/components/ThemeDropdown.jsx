import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
// custom css
import DropdownDesign from "../components/DropdownDesign.css";

const ThemeDropdown = ({handleThemeChange, theme}) => {
    return (
        <Select
            className="drop"
            placeholder={'Select Theme'}
            options={Object.entries(monacoThemes).map(([themeID, themeName]) =>({
                label: themeName,
                value: themeID,
                Key: themeID,
            }))}
            value={theme}
            styles={DropdownDesign}
            onChange={handleThemeChange}
        />
    );
};

export default ThemeDropdown;