import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components"
import React from "react";

export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
}

export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
}

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    a{
        color: ${({ theme }) => theme.text};
    }
    h2{
        color: ${({ theme }) => theme.text};
    }
    span{
        color: ${({ theme }) => theme.text};
    }
}
`

const StyledToggle = styled.button`
width: 50px;
height: 26px;
top: 15px;
border: 2px solid black;
border-radius: 20px;
background-color: #333333;
padding: 1px;
;
.container{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    .nightTheme{
        width: 24px;
        height: 24px;
        border-radius: 10000px;
    
    }
    .lightTheme{
        width: 24px;
        height: 24px;
        border-radius: 10000px;
        
    }
    .whiteBall-left {
        height: 21px;
        width: 21px;
        border-radius: 10000px;
        background-color: white;
    }
    .whiteBall-right {
        height: 21px;
        width: 21px;
        border-radius: 10000px;
        background-color: white;
    }
}
`;

export default function DarkModeSwitch({toggleTheme, theme}) {

    return (
        <StyledToggle onClick={toggleTheme}>   
            <ChangeToggle theme={theme} />
        </StyledToggle>
    )
}

function ChangeToggle({theme}) {
    if(theme === "dark"){
        return(
            <div className="container">
                <div className="whiteBall-left" />
                <div className="lightTheme">☀️</div>
            </div>
        );
    }
    return(
        <div className="container">
            <div className="lightTheme">🌙</div>
            <div className="whiteBall-right" />
        </div>
    );
    
}