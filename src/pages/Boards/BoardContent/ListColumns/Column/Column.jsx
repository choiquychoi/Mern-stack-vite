import Box from '@mui/material/Box'
import { useState } from 'react'
import { toast } from 'react-toastify'
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
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


function Column({ column }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column }
    })

    const dndKitColumnStyles = {
        // touchAction: 'none',

        transform: CSS.Translate.toString(transform),
        transition,
        //  Chiều cao luôn phải được đặt ở mức tối đa (100%). Nếu không, khi kéo một cột ngắn sang một cột dài hơn, việc kéo thả ở khu vực
        //  giữa sẽ rất khó khăn (xem demo ở video 32).Lưu ý: Khi kéo thả, cần kết hợp với {...listeners} và đặt nó trong Box, thay vì ở
        //  phần tử <div> bên ngoài, để tránh tình huống kéo vào vùng không mong muốn.
        height: '100%',
        opacity: isDragging ?0.5 : undefined
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

    const [newCardTitle, setNewCardTitle] = useState('')

    const addNewCard = () => {
        if (!newCardTitle) {
            toast.error('please type you Card!', { position: 'bottom-right' })
            return
        }

        // console.log(newCardTitle)
        // Gọi API ở đây...

        // đóng trạng thái thêm Card mới và clear Input
        toggleOpenNewCardForm()
        setNewCardTitle('')
    }

    return (
        <div ref = { setNodeRef } style = { dndKitColumnStyles } {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.Trello.BoardContentHeigth} - ${theme.spacing(5)})`
                }}
            >
                {/* Box column Header */}
                <Box sx={{
                    height: (theme) => theme.Trello.ColumnFooterHeigth,
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
                        {column?.title}
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

                {/*columns Content */}
                <ListCards cards={orderedCards} />

                {/* Box column Footer */}
                <Box sx={{
                    height: (theme) => theme.Trello.ColumnFooterHeigth,
                    p: 2
                }}>
                    {!openNewCardForm
                        ?<Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Button startIcon= {<AddCardIcon /> } onClick={toggleOpenNewCardForm}>Add new card</Button>
                            <Tooltip title= "Drag to move">
                                <DragHandleIcon sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                        :<Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField
                                label="Enter Card title ..."
                                type="text"
                                size='small'
                                variant='outlined'
                                autoFocus
                                data-no-dnd ="true"
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                sx={{
                                    '& label': {
                                        color: 'text.primary'
                                    },
                                    '& input': {
                                        color: (theme) => theme.palette.primary.main,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#333643' : 'white'
                                    },
                                    '& label.Mui-focused': {
                                        color: (theme) => theme.palette.primary.main
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: (theme) => theme.palette.primary.main
                                        },
                                        '&:hover fieldset': {
                                            borderColor: (theme) => theme.palette.primary.main
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: (theme) => theme.palette.primary.main
                                        }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />

                            <Box sx = {{ display: 'flex', alignItems: 'center', gap:1 }}>
                                <Button
                                    onClick={addNewCard}
                                    data-no-dnd ="true"
                                    variant="contained" color='success' size='small'
                                    sx= {{
                                        boxShadow: 'none',
                                        border: '0.5 solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                    }}
                                >Add</Button>
                                <CloseIcon
                                    fontSize='small'
                                    sx={{ color: (theme) => theme.palette.warning.light, cursor: 'pointer' }}
                                    onClick={toggleOpenNewCardForm}
                                />
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default Column
