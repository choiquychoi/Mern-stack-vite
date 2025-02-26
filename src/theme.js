import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    Trello: {
        BoardBarHeigth: '58px',
        AppBarHeigth: '60px'
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: teal,
        //         secondary: deepOrange
        //     }
        // },
        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: orange
        //     }
        // }
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
                    textTransform: 'none',
                    borderWidth:'0.5px',
                    '&:hover': {
                        borderWidth: '2px'
                    }
                }
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: { fontSize: '0.875rem' }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    '& fieldset': {
                        borderWidth: '0.5px !important'
                    },
                    '&:hover fieldset': {
                        borderWidth: '2px !important'
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '2px !important'
                    }
                }
            }
        }
    }
})

export default theme