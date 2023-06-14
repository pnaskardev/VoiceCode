import React, {useState} from "react";

import * as Components from "../Styles/CreateAddDesignComponents";

function CreateAddRoom() {

    const [popup, setPopup] = useState(false); 

    const togglePopup = () => {
        setPopup(!popup)
    };

    return (
        <Components.Container className="page">
            <Components.OptionBox>
                <Components.Title>Voice-Code</Components.Title>
                <Components.Subtitle>
                    Collaborative Code-space with voice and text channels
                </Components.Subtitle>
                <Components.Tagline>
                    You dont need to use two software at a time while Collaborative coding with people
                </Components.Tagline>
                <Components.AddroomBtn onClick={togglePopup} >Add New Room</Components.AddroomBtn>
                <Components.CreateroomBtn>Create New Room</Components.CreateroomBtn>
            </Components.OptionBox>

            {popup && (
                <Components.Overlay>
                    <Components.Popup>
                        <Components.Command>Enter the Room ID</Components.Command>
                        <Components.Input type="text" placeholder="Room ID"/>
                        <Components.Submitbtn>Submit</Components.Submitbtn>
                        <Components.Closebtn onClick={togglePopup}>X</Components.Closebtn>
                    </Components.Popup>
                </Components.Overlay>
            )}

        </Components.Container>

        
    )
}

export default CreateAddRoom;