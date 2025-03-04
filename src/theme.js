import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
    Trello: {
        BoardBarHeigth: BOARD_BAR_HEIGHT,
        AppBarHeigth: APP_BAR_HEIGHT,
        BoardContentHeigth: BOARD_CONTENT_HEIGHT,
        ColumnHeaderHeigth: COLUMN_HEADER_HEIGHT,
        ColumnFooterHeigth: COLUMN_FOOTER_HEIGHT
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
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '9px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover':{
                        backgroundColor: 'white'
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
        MuiTypography   : {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': {
                        fontSize: '0.875rem'
                    }
                }
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