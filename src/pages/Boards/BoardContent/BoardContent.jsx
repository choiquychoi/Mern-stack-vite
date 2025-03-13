import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sorts'

import {
    DndContext,
    // PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent( { board } ) {

    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

    // const mySensors = useSensors(pointerSensor)
    const mySensors = useSensors(mouseSensor, touchSensor)


    const [OrderedColumns, setOrderedColumns] = useState([])

    // cùng 1 thời điểm chỉ có 1 thằng được kéo
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)



    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    // Trigger khi bắt đầu hành động kéo thả một phần tử => hành động kéo (drag)    
    const handleDragStart = (event) => {
        // console.log ('handleDragStart: ', event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

    // Trigger khi kết thúc hành động kéo thả một phần tử => hành động thả (drop)
    const HandleDragEnd = (event) => {
        // eslint-disable-next-line no-console
        // console.log('handleDragEnd', event)
        const { active, over } = event

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

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }

    return (
        <DndContext
            sensors={ mySensors }
            onDragStart = {handleDragStart}
            onDragEnd={ HandleDragEnd }
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: theme => theme.Trello.BoardContentHeigth,
                p: '10px 0'
            }}>
                <ListColumns columns ={OrderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

export default BoardContent