import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'


const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    px: '5px',
    borderRadius: '5px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&: hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar({ board }) {

    return (
        <Box sx={{
            height: (theme) => theme.Trello.BoardBarHeigth,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title={board?.description}>
                    <Chip
                        sx={MENU_STYLE}
                        icon={<DashboardIcon />} label= { board?.title }
                        clickable
                    />
                </Tooltip>

                <Chip
                    sx={MENU_STYLE}
                    icon={<VpnLockIcon />} label= {capitalizeFirstLetter(board?.type)}
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<AddToDriveIcon />} label="Add to Google drive"
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<BoltIcon />} label="Automations"
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<FilterListIcon />} label="Filters"
                    clickable
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant='outlined'
                    startIcon={<PersonAddIcon/>}
                    sx={{
                        color: 'white',
                        borderColor : 'white',
                        '&:hover': { borderColor: 'white' }
                    }}
                >
                    Invite
                </Button>
                <AvatarGroup
                    max={5}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            fontSize: 16,
                            border:'none',
                            color: 'white',
                            cursor: 'pointer',
                            '&: first-of-type' : { bgcolor:'#a4b0be' }
                        }
                    }}
                >
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://static.wikia.nocookie.net/444df9f9-6319-41f3-8b0f-d687a48eed62/smart/width/236/height/236"/>
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://yt3.ggpht.com/M7xruFyEs6xp_xSLlT1rsxk_WVMGdhlgL_HcXtd-Ka9OOPSWHqqNlQ8_BIV2NC9H_F4RYAhzDg=s88-c-k-c0x00ffffff-no-rj" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://a.deviantart.net/avatars-big/r/a/raydouglasfontenele.jpg?4" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71f8e4ba-d5b3-4546-8ffa-08954be1aa62/dforo63-257b0b48-9f0a-4351-94f9-538a747339a1.jpg/v1/fill/w_1192,h_670,q_70,strp/mark_grayson_by_sneakysam101_dforo63-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNzFmOGU0YmEtZDViMy00NTQ2LThmZmEtMDg5NTRiZTFhYTYyXC9kZm9ybzYzLTI1N2IwYjQ4LTlmMGEtNDM1MS05NGY5LTUzOGE3NDczMzlhMS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.3hKbiEfKItoj17QG9fexGBkaSY1MzdBtybhcU5fWuK4" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://lh3.googleusercontent.com/a/ACg8ocJkLZIUKNAFswPTMkMWwTeJv-zcQqbZ_iXjf0Wb9wXsVJF7PROw=s288-c-no" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://yt3.ggpht.com/M7xruFyEs6xp_xSLlT1rsxk_WVMGdhlgL_HcXtd-Ka9OOPSWHqqNlQ8_BIV2NC9H_F4RYAhzDg=s88-c-k-c0x00ffffff-no-rj" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/327452202_5629653343830796_8580909903780712458_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=b--5L4GzWfoQ7kNvgEzoLwa&_nc_oc=Adhk76Gk3rCAK4Q1acvW_0_W_y55eRhlEYrjcw0HhY3D7py5fdavBrNqJs-XenQzMR0&_nc_zt=24&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AN-7O3wYSfcYH7geNKSwc1X&oh=00_AYBmcriRHXMD5hIqMIhfMdYr2K5tJGFNGjqsOgNkf3ABHw&oe=67C3930E" />
                    </Tooltip>
                    <Tooltip title='Choiquychoi'>
                        <Avatar alt="Choiquychoi"
                            src="https://lh3.googleusercontent.com/a/ACg8ocIBiC0T2Ute7GXuunO1PIL7S6jLZ7me72Dpx68f-zYrml8vh-0J=s288-c-no" />
                    </Tooltip>
                </AvatarGroup>

            </Box>
        </Box>
    )
}

export default BoardBar
