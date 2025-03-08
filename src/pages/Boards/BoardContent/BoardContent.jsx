import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sorts'


function BoardContent( { board } ) {
    const mapOrderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            width: '100%',
            height: theme => theme.Trello.BoardContentHeigth,
            p: '10px 0'
        }}>
            <ListColumns columns ={mapOrderedColumns} />
        </Box>
    )
}

export default BoardContent