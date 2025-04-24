import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

import {
    DndContext,
    // PointerSensor,
    // MouseSensor,
    // TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
    // rectIntersection,
    pointerWithin,
    getFirstCollision
    // closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitsSencor'

import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent( { board,
    createNewColumn,
    createNewCard,
    moveColumns,
    moveCardInTheSameColumn,
    moveCardToDifferentColumn,
    deleteColumnDetails } ) {

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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    // điêm va chạm cuối cùng trước đó xử lý thuật toán phát hiện va chạm
    const lastOverId = useRef(null)

    useEffect(() => {
        setOrderedColumns(board.columns)
    }, [board])

    // tìm 1 cái colunm theo cardId
    const findColumnByCardId = (cardId) => {
        // đoạn này cần lưu ý: nên dùng c.card thay vi c.CardOrderIds bởi vì ở bước handleDragOver, chúng ta sẻ làm dữ liệu cho card hoàn chỉnh trước
        // rồi mới tạo ra cardOrderIds mới
        return OrderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }

    //khởi tạo function chung xử lý việc cập nhật lại state trong trường hợp di chuyển card trong các columns khác nhau
    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        active,
        over,
        triggerFrom
    ) => {
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

            // nextActiveColumn: column cũ
            if (nextActiveColumn) {
                // Xóa cảrd ở cái column active cũ (lúc mà kéo card ra khỏi column đó để qua column khác)
                nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                }

                // cập nhật lại cái mãng cardOrderIds mới sau khi xóa card ở column active cũ
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
            }

            // nextOverColumn: column mới
            if (nextOverColumn) {
                // kiểm tra xem cái card đang kéo có tồn tại trong column đích không, nếu có thì cần xóa nó trước
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

                // phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
                const rebuilt_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                }
                // tiếp theo là thêm card vào column đích
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuilt_activeDraggingCardData)

                // xóa cái placeholder card nếu có trong column
                nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

                // cập nhật lại cái mãng cardOrderIds mới sau khi xóa card ở column active cũ
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
            }

            // nếu function nay được gọi từ handleDragEnd nghĩa là đã kéo thả xong, lúc này mới xử lý API 1 lần ở đây
            if (triggerFrom === 'handleDragEnd') {
                moveCardToDifferentColumn(
                    activeDraggingCardId,
                    oldColumnWhenDraggingCard._id,
                    nextOverColumn._id,
                    nextColumns
                )
            }

            return nextColumns
        })
    }

    // Trigger khi bắt đầu hành động kéo thả một phần tử => hành động kéo (drag)
    const handleDragStart = (event) => {
        // console.log ('handleDragStart: ')
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        // nếu là card thì mới thực hiện hành động set giá trị cho oldColumnWhenDraggingCard
        if ( event?.active?.data?.current?.columnId ) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    // Trigger trong quá trình kéo(Drag) một phần tử qua một phần tử khác => hành động kéo qua (drag over)
    const handleDragOver = (event) => {
        // console.log('handleDragOver')
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
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
                active,
                over,
                'handleDragOver'
            )
        }
    }

    // Trigger khi kết thúc hành động kéo thả một phần tử => hành động thả (drop)
    const handleDragEnd = (event) => {
        // console.log('handleDragEnd', event)

        const { active, over } = event

        // Cần đảm bảo nếu không có active hoặc không có over (khi kéo thả ra khỏi phạm vi container) thì không làm gì cả tránh lỗi
        if (!active || !over) return

        // xử lý khi kéo thả card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // activeDraggingCardData: là card đang được kéo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            // overColumnId: là card đang tương tác trên hoặc dưới so với card đang kéo ở trên
            const { id: overCardId } = over

            // tìm 2 columns theo CardId
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            // nếu không tồn tại activeColumn hoặc overColumn thì không làm gì cả
            if (!activeColumn || !overColumn ) return

            //kéo card qua 2 column khác nhau
            // phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd
            // này vì sau khi đi qua onDragOver tới đây là state của card đã bị câp nhật 1 lần rồi
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData,
                    active,
                    over,
                    'handleDragEnd'
                )
            } else {
                // hành động kéo thả card trong cùng 1 column

                //lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
                //lấy vị trí mới từ thằng over
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

                // dùng arrayMove để xử lý việc kéo thả card trong cùng 1 column tương tự logic kéo column trong cùng 1 boardContent
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
                const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

                // vẫn gọi update state delay để tránh delay hoăc flickering giao diện lúc kéo thả cần phải chờ gọi API
                setOrderedColumns (prevColumns => {
                    // clone mảng OrderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumns mới
                    const nextColumns = cloneDeep(prevColumns)

                    // tìm tới column mà chúng ta đang kéo thả
                    const targerColumn = nextColumns.find(column => column._id === overColumn._id)

                    // cập nhật lại 2 giá trị mới là card và cardOrderIds trong targerColumn
                    targerColumn.cards = dndOrderedCards
                    targerColumn.cardOrderIds = dndOrderedCardIds

                    // trả về cái OrderedColumns mới chuẩn vị trí
                    return nextColumns
                })

                /**
                 * gọi lên props function moveColumns nằm ở component cha cao nhất
                 */
                moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
            }
        }

        // xữ lý khi kéo thả column trong cùng 1 boardContent
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

            if (active.id != over.id) {
                //lấy vị trí cũ từng thằng active
                const oldColumnIndex = OrderedColumns.findIndex(c => c._id === active.id)
                //lấy vị trí mới từ thằng over
                const newColumnIndex = OrderedColumns.findIndex(c => c._id === over.id)

                const dndOrderedColumns = arrayMove(OrderedColumns, oldColumnIndex, newColumnIndex)

                // cập nhật lại state OrderedColumns để không bị flickering hoặc delay giao diện
                setOrderedColumns(dndOrderedColumns)

                /**
                 * gọi lên props function moveColumns nằm ở component cha cao nhất
                 */
                moveColumns(dndOrderedColumns)
            }
        }

        // những dữ liệu sau khi kéo thả này luôn cần reset về giá trị null mặc định
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }

    // chúng ta sẻ custom lại thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa các columns
    // args = arrouments = các đối số, tham số truyền vào
    const collisionDetectionStrategy = useCallback ((args) => {
        // trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }

        // tìm các cái điêm giao nhau với con trỏ
        const pointerInterSection = pointerWithin(args)
        // console.log('pointerInterSection:', pointerInterSection)

        if (!pointerInterSection ?.length) return

        // thuật toán phát hiện va chạm sẻ trả về một mảng các điểm giao nhau (khi thêm ifif (!pointerInterSection ?.length) return) thì không cần dòng này nữa
        // const interSection = !!pointerInterSection?.length
        //     ? pointerInterSection
        //     : rectIntersection(args)

        // tìm overId cái đầu tiên va chạm
        let overId = getFirstCollision(pointerInterSection, 'id')
        if (overId) {
        // Nếu phần tử "over" là một column, ta sẽ xác định cardId gần nhất trong khu vực va chạm.
        // Việc phát hiện va chạm có thể sử dụng thuật toán closestCenter hoặc closestCorners.
        // Tuy nhiên, ở đây dùng closestCenter vì thấy hoạt động mượt hơn.
            const checkColumn = OrderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                // console.log('overId before:', overId)
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(container => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
                    })
                })[0]?.id
                // console.log('overId after:', overId)
            }

            lastOverId.current = overId
            return [{ id : overId }]
        }

        // nếu overId = null thì sẻ trả về mảng rỗng - tranh lỗi
        return lastOverId.current ? [{ id: lastOverId.current }] : []

    }, [activeDragItemType, OrderedColumns])

    return (
        <DndContext
            sensors={ mySensors }
            // thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị
            // conflict giữa card và column), chúng ta sẻ dùng thuật toán closestCorners
            // collisionDetection={closestCorners}
            //nếu chỉ dùng closestCorner sẻ có bug flickerring + sai lệch dữ liệu

            // custom nâng cao thuật toán va chạm
            collisionDetection={collisionDetectionStrategy}

            onDragStart = {handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={ handleDragEnd }
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: theme => theme.Trello.BoardContentHeigth,
                p: '10px 0'
            }}>
                <ListColumns
                    columns ={OrderedColumns}
                    createNewColumn = {createNewColumn}
                    createNewCard = {createNewCard}
                    deleteColumnDetails = { deleteColumnDetails }
                />
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