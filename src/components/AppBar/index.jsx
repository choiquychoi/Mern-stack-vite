import Box from '@mui/material/Box'
import { useState } from 'react'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box px={2} sx = {{
            height: (theme) => theme.Trello.BoardBarHeigth,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={trelloLogo} inheritViewBox sx={{ color: 'white' }} />
                    <Typography variant="span" sx={{ fontSize: '1.5rem', fontWeight: 'Bold', color: 'white', ml: 0.5 }}>Trello</Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <WorkSpaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button
                        sx={{ color: 'white',
                            border: 2,
                            '&:hover': {
                                border: '2px solid white'
                            }
                        }}
                        variant='outlined'
                        endIcon={< LibraryAddIcon/>}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <CloseIcon
                                fontSize='small'
                                sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                                onClick={( ) => setSearchValue('')}
                            />
                        )
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '170px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root' : {
                            '& fieldset': {
                                borderColor: 'white'
                            },
                            '&:hover fieldset': {
                                borderColor: 'white'
                            },
                            '& .Mui-focused fieldset': {
                                borderColor: 'white'
                            }
                        }
                    }}
                />

                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }} >
                        <NotificationsIcon sx={{ color: 'white' }}/>
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <HelpIcon sx={{ color: 'white', cursor: 'pointer' }}/>
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar
