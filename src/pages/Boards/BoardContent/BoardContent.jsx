import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sorts'

import { 
    DndContext,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'


function BoardContent( { board } ) {

    const pointerSensor = useSensor(PointerSensor, { activationConstraint: {distance: 10 } })

    const mouseSensor = useSensor(MouseSensor, { activationConstraint: {distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

    // const mySensors = useSensors(pointerSensor)
    const mySensors = useSensors(mouseSensor, touchSensor)


    const [OrderedColumns, setOrderedColumns] = useState([])

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const HandleDragEnd = (event) => {
        console.log('handleDragEnd', event)
        const { active,over } = event

        if (!over) return

        if (active.id != over.id) {
            //lấy vị trí cũ từng thằng active
            const oldIndex = OrderedColumns.findIndex(c => c._id === active.id)
            //lấy vị trí mới từ thằng over    
            const newIndex = OrderedColumns.findIndex(c => c._id === over.id)

            const dndOrderedColumns = arrayMove(OrderedColumns, oldIndex, newIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
            // console.log('dndOrderedColumns', dndOrderedColumns)
            // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

            setOrderedColumns(dndOrderedColumns)
        }
    }

    return (
        <DndContext onDragEnd={ HandleDragEnd } sensors={ mySensors } >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: theme => theme.Trello.BoardContentHeigth,
                p: '10px 0'
            }}>
                <ListColumns columns ={OrderedColumns} />
            </Box>
        </DndContext>
    )
}

export default BoardContent