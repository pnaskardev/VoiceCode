import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Components from "../Styles/CreateAddDesignComponents";
import CreateAddRoom from "./CreateAddRoom";

const VerifyEmail = () =>{

    const { id } = useParams();
    if(!id) {
        return null;
    }
    console.log(id);

    const [formData, setFormData] = useState({
        id:`${id}`,
        verificationCode:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:3000/api/verify/${formData.id}/${formData.verificationCode}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
              });
            if(response.ok){
                const data = await response.text();
                console.log(data);
                location.href = '/CreateAddRoom';
            } else {
                const error = await response.text();
                console.log(error.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(val);
    // let updateId = val;
    // console.log(updateId);

    return (
        <Components.Container className="page" path="/verifyEmail">
            <Components.formBox onSubmit={handleSubmit}>
                <Components.Title>Verify Your Email</Components.Title>
                <Components.Subtitle>
                    We have send the verification code in your registered email
                </Components.Subtitle>
                <Components.Tagline>
                    please enter the verification Code from your email
                </Components.Tagline>
                <Components.Inputp 
                    type="text" 
                    placeholder="Verification Code"
                    name="verificationCode" 
                    value={formData.verificationCode} 
                    onChange={handleChange} 
                    >    
                </Components.Inputp>
                <Components.Submitbtn type="submit"> Submit </Components.Submitbtn>
            </Components.formBox>
        </Components.Container>
    );
};

export default VerifyEmail;