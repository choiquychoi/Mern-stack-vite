import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
// import { set } from 'lodash'
import TextField from '@mui/material/TextField'
// import InputAdornment from '@mui/material/InputAdornment'
// import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails, updateColumnCards, updateCardOrderInColumnAPI }) {
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = async() => {
        if (!newColumnTitle) {
            toast.error('please type you column!')
            return
        }

        // Tạo dữ liệu column đẻ gọi API
        const newColumnData = {
            title:  newColumnTitle
        }

        await createNewColumn(newColumnData)

        // đóng trạng thái thêm column mới và clear Input
        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }

    return (
        <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 }
            }}>
                {columns?.map(column => <Column key = {column._id}
                    column ={column}
                    createNewCard= {createNewCard}
                    deleteColumnDetails = { deleteColumnDetails }
                    updateColumnCards = { updateColumnCards }
                    updateCardOrderInColumnAPI = { updateCardOrderInColumnAPI }
                /> )}

                {/* Box Add new column CTA */}
                {!openNewColumnForm
                    ?<Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button startIcon= {<NoteAddIcon />}
                            sx={{
                                color: 'white',
                                width: '100%',
                                justifyContent: 'flex-start',
                                pl: 2.5,
                                py: 1
                            }}
                        >
                            Add New Column
                        </Button>
                    </Box>
                    : <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField
                            label="Enter column title ..."
                            type="text"
                            size='small'
                            variant='outlined'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
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

                        <Box sx = {{ display: 'flex', alignItems: 'center', gap:1 }}>
                            <Button
                                onClick={addNewColumn}
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
                                sx={{
                                    color: 'white',
                                    cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light } }}
                                onClick={toggleOpenNewColumnForm}
                            />
                        </Box>
                    </Box>
                }
            </Box>
        </SortableContext>
    )
}

export default ListColumns
