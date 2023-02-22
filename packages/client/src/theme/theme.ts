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
    font-family: 'Montserrat', sans-serif;
    color: ${colors.black};
  }

  a {
    text-decoration: none;
  }
`
