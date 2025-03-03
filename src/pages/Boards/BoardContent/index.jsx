import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import Attachment from '@mui/icons-material/Attachment'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'


function BoardContent() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            width: '100%',
            height: theme => theme.Trello.BoardContentHeigth,
            p: '10px 0'
        }}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': {
                    m: 2
                }
            }}>
                {/* Box column */}
                <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.Trello.BoardContentHeigth} - ${theme.spacing(5)})`
                }}>
                    {/* Box column Header */}
                    <Box sx={{
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='h6' sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Collumn Title
                        </Typography>
                        <Box>
                            <Tooltip title= "more option">
                                <ExpandMoreIcon
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                    id="basic-button-workspaces"
                                    aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />
                            </Tooltip>

                            <Menu
                                id="basic-menu-column-dropdown"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-column-dropdown'
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Add new column</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />

                                <MenuItem>
                                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Remove this column</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                    <ListItemText>Archive this column</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Box List Card */}
                    <Box sx={{
                        p: '0 5px',
                        m: '0 5px ',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        maxHeight: (theme) => `calc( 
                            ${theme.Trello.BoardContentHeigth} - 
                            ${theme.spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} -
                            ${COLUMN_FOOTER_HEIGHT}
                        )`,
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ced0da'
                        },
                        '&::-webkit-scrollbar-thumb:hover':{
                            backgroundColor: 'white'
                        }
                    }}>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://d2zp5xs5cp8zlg.cloudfront.net/image-68676-800.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Lizard Green But Sometime ....</Typography>
                            </CardContent>
                            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                                <Button size="small" startIcon={<GroupIcon/ >}>20</Button>
                                <Button size="small" startIcon={<CommentIcon/ >}>15</Button>
                                <Button size="small" startIcon={<Attachment/ >}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column Footer */}
                    <Box sx={{
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button startIcon= {<AddCardIcon />}>Add new card</Button>
                        <Tooltip title= "Drag to move">
                            <DragHandleIcon sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>
                </Box>

                <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.Trello.BoardContentHeigth} - ${theme.spacing(5)})`
                }}>
                    {/* Box column Header */}
                    <Box sx={{
                        height: COLUMN_HEADER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='h6' sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                            Collumn Title
                        </Typography>
                        <Box>
                            <Tooltip title= "more option">
                                <ExpandMoreIcon
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                    id="basic-button-workspaces"
                                    aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />
                            </Tooltip>

                            <Menu
                                id="basic-menu-column-dropdown"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-column-dropdown'
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Add new column</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />

                                <MenuItem>
                                    <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                    <ListItemText>Remove this column</ListItemText>
                                </MenuItem>

                                <MenuItem>
                                    <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                    <ListItemText>Archive this column</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Box List Card */}
                    <Box sx={{
                        p: '0 5px',
                        m: '0 5px ',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        maxHeight: (theme) => `calc( 
                            ${theme.Trello.BoardContentHeigth} - 
                            ${theme.spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} -
                            ${COLUMN_FOOTER_HEIGHT}
                        )`,
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ced0da'
                        },
                        '&::-webkit-scrollbar-thumb:hover':{
                            backgroundColor: 'white'
                        }
                    }}>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="data:image/jpeg;base64,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"
                                title="green iguana"
                            />
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>black woman smile</Typography>
                            </CardContent>
                            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                                <Button size="small" startIcon={<GroupIcon/ >}>20</Button>
                                <Button size="small" startIcon={<CommentIcon/ >}>15</Button>
                                <Button size="small" startIcon={<Attachment/ >}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>This Bitch Niga</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column Footer */}
                    <Box sx={{
                        height: COLUMN_FOOTER_HEIGHT,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Button startIcon= {<AddCardIcon />}>Add new card</Button>
                        <Tooltip title= "Drag to move">
                            <DragHandleIcon sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default BoardContent