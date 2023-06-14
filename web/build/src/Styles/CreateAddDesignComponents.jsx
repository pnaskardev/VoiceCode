import styled from "styled-components";

export const Container = styled.div`
    ${'' /* background-color: ; */}
    align-items:center;
`;
export const OptionBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    width: 800px;
    max-width: 100%;
    min-height: 400px;
    ${'' /* display: flex; */}
    ${'' /* justify-content: center; */}
    text-align: center;
    align-items: center;
`;

export const formBox = styled.form`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    width: 800px;
    max-width: 100%;
    min-height: 400px;
    ${'' /* display: flex; */}
    ${'' /* justify-content: center; */}
    text-align: center;
    align-items: center;
`;

export const Title = styled.h1`
    color: black;
    font-weight: bold;
    margin: 0;   
    padding-top: 50px;
    padding-bottom: 25px;
`;

export const Subtitle = styled.h3`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding-bottom: 25px;
`;

export const Tagline = styled.p`
    color: black;
    font-size: 15px;
    margin: 0;    
    padding-bottom: 40px;
`;

export const AddroomBtn = styled.button`
    background-color: #484fb8;
    border-radius: 20px;
    border: 1px solid black;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 12px 45px;
    margin-right: 20px;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;

export const CreateroomBtn = styled.button`
    background-color: #484fb8;
    border-radius: 20px;
    border: 1px solid black;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    background: rgba(49,49,49,0.8);
`
export const Popup = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    max-width: 600px;
    min-width: 300px;
`
export const Command = styled.h3`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding-bottom: 25px;
`;

export const Input = styled.input`
    background-color: #eee;
    color: black;
    border: none;
    padding-left: 7px;
    ${'' /* font-weight: bold; */}
    font-size: 15px;
    ${'' /* padding: 12px 15px; */}
    ${'' /* padding-right: 50px */}
    ${'' /* padding: 10px 9px; */}
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 15px 0px;
    width: 100%;
`;

export const Inputp = styled.input`
    background-color: #eee;
    color: black;
    border: none;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align:center;
    ${'' /* align-items:center */}
    width: 100%;
    max-width: 20rem;
    display:flex;
    margin-left: 30%;
`;

export const Submitbtn = styled.button`
    background-color: #484fb8;
    border-radius: 20px;
    border: 1px solid black;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    padding: 12px 45px;
    ${'' /* margin-right: 20px; */}
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    &:active{
        transform: scale(0.95);
    }
    &:focus {
        outline: none;
    }
`;

export const Closebtn = styled.button`
    position: absolute;
    border-radius: 100%;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
`
