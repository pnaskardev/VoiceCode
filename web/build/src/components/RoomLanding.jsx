// Landing page

import React, {useEffect, useState} from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import {classnames} from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
// import { defineTheme } from "./lib/defineTheme";
// css stylesheet
import "../Styles/CustomDesign.css";
// import "dotenv";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import useKeyPress from "../hooks/useKeyPress";

// footer
// outputwindow
import OutputWindow from "./OutputWindow";
// customInput
import CustomInput from "./CustomInputs";
// outputdetails
import OutputDetails from "./OutputDetails";

// import ThemeDropdown from "./components/ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
// import { languageOptions } from "./constants/languageOptions";

const javascriptDefault = `const val = 872;
console.log(val);`;

const Landing = () =>{
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    // const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
      };
    
      useEffect(() => {
        if (enterPress && ctrlPress) {
          console.log("enterPress", enterPress);
          console.log("ctrlPress", ctrlPress);
          handleCompile();
        }
      }, [ctrlPress, enterPress]);

      const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setCode(data);
            break;
          }
          default: {
            console.warn("case not handled!", action, data);
          }
        }
      };

      const handleCompile = () => {
        // We will come to the implementation later in the code

        setProcessing(true);
        const formData = {
          language_id: language.id,
          // encode source code in base64
          source_code: btoa(code),
          stdin: btoa(customInput),
        };
          const options = {
            method: "POST",
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: { base64_encoded: "true", fields: "*" },
            headers: {
              "content-type": "application/json",
              "Content-Type": "application/json",
              "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
              "X-RapidAPI-Key": '6836415d90msh02b7332a9595888p197989jsn7785db755dcd'
            },
            data: formData,
          };
    
        axios
          .request(options)
          .then(function (response) {
            console.log("res.data", response.data);
            const token = response.data.token;
            checkStatus(token);
          })
          .catch((err) => {
            let error = err.response ? err.response.data : err;
            // get error status
            let status = err.response.status;
            console.log("status", status);
            if (status === 429) {
              console.log("too many requests", status);
    
              showErrorToast(
                `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                10000
              );
            }
            setProcessing(false);
            console.log("catch block....", error);
          });
      };
    
      const checkStatus = async (token) => {
        // We will come to the implementation later in the code
        const options = {
          method: "GET",
          url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
            "X-RapidAPI-Key": '6836415d90msh02b7332a9595888p197989jsn7785db755dcd'
          },
        };
        try {
          let response = await axios.request(options);
          let statusId = response.data.status?.id;
    
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token)
            }, 2000)
            return
          } else {
            setProcessing(false)
            setOutputDetails(response.data)
            showSuccessToast(`Compiled Successfully!`)
            console.log('response.data', response.data)
            return
          }
        } catch (err) {
          console.log("err", err);
          setProcessing(false);
          showErrorToast();
        }
      };
    
      // function handleThemeChange(th) {
      //   // We will come to the implementation later in the code
      //   const theme = th;
      //   console.log("theme...", theme);

      //   if(["light", "vs-dark"].includes(theme.value)) {
      //     setTheme(theme);
      //   }else {
      //     defineTheme(theme.value).then((_) => setTheme(theme));
      //   }
      // }
      // useEffect(() => {
      //   defineTheme("oceanic-next").then((_) =>
      //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
      //   );
      // }, []);
    
      const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      const showErrorToast = (msg, timer) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
          position: "top-right",
          autoClose: timer ? timer : 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };

      return (
        <>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="code-built">
            <div className="flex flex-row dropdown">
              <div className="px-4 py-2">
                <LanguagesDropdown onSelectChange={onSelectChange} />
              </div>
              {/* <div className="px-4 py-2">
                <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
              </div> */}
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4 spacess">
              <div className="flex flex-col w-full h-full justify-start items-end code-space">
                <CodeEditorWindow
                  onChange={onChange}
                  language={language?.value}
                  code={code}
                  // theme={theme.value}
                />
              </div>
        
              <div className="right-container flex flex-shrink-0 w-[30%] flex-col ">
                <div className="outpuut">
                <OutputWindow 
                    outputDetails={outputDetails}
                     />
                </div>
                <div className="flex flex-col items-end">
                  <div className="inpuut">
                  <CustomInput
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                  />
                  </div>
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className={classnames(
                      "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 bttno",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile and Execute"}
                  </button>
                </div>
                {outputDetails && <OutputDetails outputDetails={outputDetails} />}
              </div>
            </div>
            {/* <Footer /> */}
           </div>
        </>
      );
    };

    export default Landing;