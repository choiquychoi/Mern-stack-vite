import * as React from 'react'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { PersonAdd, Settings, Logout } from '@mui/icons-material'

function Profiles() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0 }}
                    aria-controls={open ? 'basic-menu-profiles' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{ width: 38, height: 38 }}
                        alt="choiquychoi"
                        src="https://lh3.googleusercontent.com/a/ACg8ocJkLZIUKNAFswPTMkMWwTeJv-zcQqbZ_iXjf0Wb9wXsVJF7PROw=s288-c-no"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-profiles"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button-profiles'
                }}
            >
                <MenuItem >
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
                </MenuItem>
                <MenuItem >
                    <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
                </MenuItem>
                <Divider />
                <MenuItem >
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                        Add another account
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Profiles