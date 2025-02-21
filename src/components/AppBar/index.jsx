import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloLogo } from '~/assets/mdi--trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/recent'
import Starred from './Menus/starred'
import Templates from './Menus/templates'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import Profiles from './Menus/profiles'

function AppBar() {
    return (
        <Box px={2} sx = {{
            height: (theme) => theme.Trello.BoardBarHeigth,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <AppsIcon sx={{ color: 'primary.main'}} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5}}>
                <SvgIcon component={trelloLogo} inheritViewBox sx={{ color: 'primary.main'}} />
                <Typography variant="span" sx={{ fontSize: "1.5rem", fontWeight: 'Bold' ,color: 'primary.main', ml: 0.5}}>Trello</Typography>
            </Box>

            <WorkSpaces />

            <Recent />

            <Starred />

            <Templates />

            <Button variant="create">Create</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <TextField id="outlined-search" label="Search..." type="search" size='small' />

            <ModeSelect />

            <Tooltip title="Notification">
                <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer'}} >
                    <NotificationsIcon />
                </Badge>
            </Tooltip>

            <Tooltip title="Help">
                <HelpIcon  sx={{ cursor: 'pointer'}}/>
            </Tooltip>

            <Profiles />
        </Box>
        </Box>
    )
}

export default AppBar
