import React from "react";
import "./App.css";
import LoginSignup from "./components/LoginSignup";
import VerifyEmail from "./components/VerifyEmail";
import CreateAddRoom from "./components/CreateAddRoom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

  return (
      <div className="yo">
        <BrowserRouter>
          <Routes>
              <Route path="/*" element={ <LoginSignup/> } />
              <Route path="/verifyEmail/:id" element={ <VerifyEmail/> } />
              <Route path="/createAddRoom" element={ <CreateAddRoom/> } />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;