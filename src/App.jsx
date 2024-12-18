import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutLinedIcon from '@mui/icons-material/DarkModeOutLined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Container from '@mui/material/Container'
import theme from './theme'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) =>
  {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LightModeIcon fontSize='small' /> Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DarkModeOutLinedIcon fontSize='small' /> Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SettingsBrightnessIcon fontSize='small' /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx ={ { height: '100vh' } }>

      <Box sx = {{ 
        backgroundColor: 'primary.light',
        height: (theme) => theme.Trello.BoardBarHeigth,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>

      <Box sx={{ 
        backgroundColor: 'primary.dark',
        height: (theme) => theme.Trello.AppBarHeigth,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        board bar
      </Box>

      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: theme => `calc(100vh - ${theme.Trello.BoardBarHeigth} - ${theme.Trello.AppBarHeigth})`
      }}>
        Board content
      </Box>
    </Container>
  )
}

export default App
