import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, cyan, deepOrange, orange, red, teal } from '@mui/material/colors'
import App from './App'
import { colors } from '@mui/material'
import { BorderColor, Height } from '@mui/icons-material'


// Create a theme instance.
const theme = extendTheme({
    Trello: {
        BoardBarHeigth: '58px',
        AppBarHeigth: '60px'
        },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange
            }
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            }
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '::-webkit-scrollbar': {
                        width: '8px',
                        height: '9px'
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: 'red',
                        borderRadius: '8px'
                    },
                    '::-webkit-scrollbar-thumb:hover':{
                        backgroundColor: 'blue'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                textTransform: 'none'
                }
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme } ) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                })
            }
        },
        MuiOutlinedInput: { 
            styleOverrides: {
                root: ({ theme }) => ({
                    color : theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '.MuiOutlinedInput-notchedOutline': {
                        BorderColor: theme.palette.primary.light
                    },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                        BorderColor: theme.palette.primary.main
                        } 
                    }
                })
            }
        }
    }
})

export default theme