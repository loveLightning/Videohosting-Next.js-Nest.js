import { createGlobalStyle } from 'styled-components'

import { colors } from './colors'
import { Fonts } from './fonts'

export const AppTheme = {
  ...colors,
  ...Fonts,
}

export const GlobalStyles = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: ${colors.black};
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: 'Roboto-Light';
    src: url('/fonts/Roboto-Light.ttf') format('truetype');
    font-style: normal;
    font-weight: 300;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto-Regular';
    src: url('/fonts/Roboto-Regular.ttf') format('truetype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto-Medium';
    src: url('/fonts/Roboto-Medium.ttf') format('truetype');
    font-style: bold;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Roboto-Bold';
    src: url('/fonts/Roboto-Bold.ttf') format('truetype');
    font-style: bold;
    font-weight: 700;
    font-display: swap;
  }


`
