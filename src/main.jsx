import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

// cấu hình react-  toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// cấu hình react-confirm
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <CssVarsProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            cancellationButtonProps: { color: 'inherit' },
            confirmationButtonProps: { color: 'primary', variant: 'outlined' }
        }}>
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="colored"/>
        </ConfirmProvider>
    </CssVarsProvider>
    // </React.StrictMode>
)
