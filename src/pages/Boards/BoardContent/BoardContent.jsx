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
import { cloneDeep } from 'lodash'

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

    // tìm 1 cái colunm theo cardId
    const findColumnByCardId = (cardId) => {
        // đoạn này cần lưu ý: nên dùng c.card thay vi c.CardOrderIds bởi vì ở bước handleDragOver, chúng ta sẻ làm dữ liệu cho card hoàn chỉnh trước
        // rồi mới tạo ra cardOrderIds mới
        return OrderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }

    // Trigger khi bắt đầu hành động kéo thả một phần tử => hành động kéo (drag)
    const handleDragStart = (event) => {
        // console.log ('handleDragStart: ', event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

    // Trigger trong quá trình kéo(Drag) một phần tử qua một phần tử khác => hành động kéo qua (drag over)
    const handleDragOver = (event) => {
        // không làm gì thêm khi kéo thả column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        // Còn nếu kéo card thì xử lý thêm để có thể kéo thả card qua lại giữa các columns
        // console.log('handleDragOver', event)
        const { active, over } = event

        // Cần đảm bảo nếu không có active hoặc không có over (khi kéo thả ra khỏi phạm vi container) thì không làm gì cả tránh lỗi
        if (!active || !over) return

        // activeDraggingCardData: là card đang được kéo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        // overColumnId: là card đang tương tác trên hoặc dưới so với card đang kéo ở trên
        const { id: overCardId } = over

        // tìm 2 columns theo CardId
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        // nếu không tồn tại activeColumn hoặc overColumn thì không làm gì cả
        if (!activeColumn || !overColumn ) return

        // Xử lý logic chỉ khi kéo card sang một column khác.
        // Nếu card vẫn nằm trong column ban đầu thì không cần làm gì.
        // Lưu ý: Đây là xử lý trong quá trình kéo (handleDragOver),
        // còn khi thả card (handleDragEnd) thì sẽ có logic khác.

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns (prevColumns => {
                // tìm vị trí Index của OverCard trong column đích (nơi mà active card sắp thả vào)
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

                // Logic tính toán "newCardIndex" (trên dưới của overCard) lấy chuẩn ra từ code của thư viện
                let newCardIndex
                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1 : 0
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

                // clone mảng OrderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumns mới
                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

                // nextActiveColumn: column cũcũ
                if (nextActiveColumn) {
                    // Xóa cảrd ở cái column active cũ (lúc mà kéo card ra khỏi column đó để qua column khác)
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

                    // cập nhật lại cái mãng cardOrderIds mới sau khi xóa card ở column active cũ
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
                }

                // nextOverColumn: column mới
                if (nextOverColumn) {
                    // kiểm tra xem cái card đang kéo có tồn tại trong column đích không, nếu có thì cần xóa nó trước
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    // tiếp theo là thêm card vào column đích
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    // cập nhật lại cái mãng cardOrderIds mới sau khi xóa card ở column active cũ
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }

                return nextColumns
            })
        }
    }

    // Trigger khi kết thúc hành động kéo thả một phần tử => hành động thả (drop)
    const HandleDragEnd = (event) => {
        // console.log('handleDragEnd', event)


        // if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
        //     console.log('Hành động kéo thả thẻ và không làm j cả')
        // }
        const { active, over } = event

        // Cần đảm bảo nếu không có active hoặc không có over (khi kéo thả ra khỏi phạm vi container) thì không làm gì cả tránh lỗi
        if (!active || !over) return

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
            onDragOver={handleDragOver}
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