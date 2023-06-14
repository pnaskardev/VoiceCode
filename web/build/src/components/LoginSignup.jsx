import React from "react";
import { useState } from "react";
import * as Components from '../Styles/LogSinDesignComponents';
import { useNavigate, Outlet, Route, Routes } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: '',
        email: ''
    });

    const [val, setVal] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
        // console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch("http://localhost:3000/api/users", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
          if(response.ok) {
            const data = await response.json();
            setVal(data.Id);
            navigate(`/VerifyEmail/${data.Id}`);
            showSuccessToast();
          } else {
            const error = await response.json();
            console.log(error.error);
            showErrorToast(error.error);
          }
        } catch (error) {
          console.log(error);
          // handle the error if needed
        }
      };

      const showSuccessToast = (msg) => {
        toast.success(msg || `Successfully!`, {
          position: "top-center",
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
          position: "top-center",
          autoClose: timer ? timer : 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };

     const [signIn, toggle] = React.useState(true);

      return (
        <>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        {/* <ResponseProvider value={val}></ResponseProvider> */}
          <Components.Container className="forum" >
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleSubmit} >
                      <Components.Title>Create Account</Components.Title>
                      <Components.Input 
                        type='text' 
                        name="username" 
                        placeholder='UserName'
                        value={formData.username}
                        onChange={handleChange}
                        />
                      <Components.Input 
                        type='email' 
                        name="email" 
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        />
                      <Components.Input 
                        type='password' 
                        name="password"
                        placeholder='Password'
                        value={formData.password} 
                        onChange={handleChange}
                        />
                      <Components.Input 
                        type='password' 
                        name="passwordConfirmation" 
                        placeholder='confirm password'
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        />
                      {/* navigate function added */}
                      {/* onClick={() => toggle(false)} */}
                      <Components.Button type="submit" onClick={() => toggle(false)}>
                            Sigin Up
                      </Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Sign in</Components.Title>
                       <Components.Input type='email' placeholder='Email' />
                       <Components.Input type='password' placeholder='Password' />
                       <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                       <Components.Button>Sigin In</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Titlee>Welcome Back!</Components.Titlee>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Titlee>Hello, Friend!</Components.Titlee>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
                  </Components.Overlay>
              </Components.OverlayContainer>

              <Outlet />

              <Routes>
                <Route path="/verifyEmail/:id" element={<VerifyEmail/>} />
              </Routes>

          </Components.Container>
          {/* {val && <VerifyEmail val={val} />} */}
        </>
      );
};

export default LoginSignup;
// export {derValue};

