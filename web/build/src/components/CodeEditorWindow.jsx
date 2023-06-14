import React, {useState} from "react";
import Editor from "@monaco-editor/react";

// import "../components/CustomDesign.css";

const CodeEditorWindow = ({onChange, language, code }) => {

    const [value, setValue] = useState(code || "");

    //to set the value(code) of codespace inputed by the user 
    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="code-space">
            <Editor
                height = "85vh"
                width={"100%"}
                language={language || "javascript"}
                value={value}
                // theme = {theme}
                defaultValue="// some code here"
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditorWindow;