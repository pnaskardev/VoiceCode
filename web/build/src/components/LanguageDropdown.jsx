import React from "react";
import Select from "react-select"; //package used for dropdown menu

import { languageOptions } from "../constants/languageOptions";

// Custom Css design
import DropdownDesign from "../styles/DropdownDesign.css";

const LanguageDropdown = ({onSelectChange}) => {
    return (
        <Select
            className="drop"
            placeholder={'Filter By Category'}
            options={languageOptions}
            style={DropdownDesign}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguageDropdown;

