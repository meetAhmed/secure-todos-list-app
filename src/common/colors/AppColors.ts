/*
Two theme modes: light and dark
*/
const themes = {
  light: {
    primary: '#3E6CFF',
    primaryBtnText: '#FFFFFF',
    inputFieldBackground: '#edededff',
    inputFieldText: '#000000',
    floatingButtonIcon: '#FFFFFF',
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: '#444444',
    card: '#e2e2e2ff',
  },
  dark: {
    primary: '#3E6CFF',
    primaryBtnText: '#FFFFFF',
    inputFieldBackground: '#FFFFFF',
    inputFieldText: '#0D0F15',
    floatingButtonIcon: '#FFFFFF',
    background: '#0D0F15',
    text: '#FFFFFF',
    textSecondary: '#B0B4C0',
    card: '#1C1F26',
  }
}

// hardcoding the dark theme as the active theme
const AppColors = themes.dark

export default AppColors