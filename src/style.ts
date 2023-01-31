import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Barlow Condensed', no-serif;
  }

  html, body, #root, #root > div {
    height: 100%;
  }

  html {
    background-color: gray;
  }

  body {
    color: #333;
    background-color: #fff;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: cornflowerblue;
  }

  iframe {
    display: none;
  }
`;