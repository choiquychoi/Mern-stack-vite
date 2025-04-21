/* eslint-disable no-console */
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
    const [board, setboard] = useState(null)

    useEffect(() => {
        // tạm thời fix cứng boardId, flow chuẩn chính về sau sẻ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
        const boardId = '68022a4d1ee2200940a8d59c'
        // call API
        fetchBoardDetailsAPI(boardId).then((board) => {
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                }
            })
            setboard(board)
        })
    }, [])

    // function này có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu stateBoard
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })

        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        // cap nhật lại state board
        // phía FE chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại API fetchBoardDetailsAPI)
        // lưu ý : cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẻ hổ trợ trả về luôn dữ liệu toàn bộ board
        // dù đấy có là api tạo column hay card đi chăng nữa => lúc này Fe sẻ nhàn hơn
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setboard(newBoard)
    }

    // function này có nhiệm vụ gọi API tạo mới card và làm lại dữ liệu stateBoard
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        })

        // cap nhật lại state board
        // phía FE chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại API fetchBoardDetailsAPI)
        // lưu ý : cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẻ hổ trợ trả về luôn dữ liệu toàn bộ board
        // dù đấy có là api tạo column hay card đi chăng nữa => lúc này Fe sẻ nhàn hơn

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)
        }
        setboard(newBoard)
    }

    // function này có nhiệm vụ gọi API và xữ lý khi kéo thả column xong xuôi
    const moveColumns =async (dndOrderedColumns) => {
        // cập nhâtj lại cho chuẩn
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setboard(newBoard)

        // gọi API cập nhật lại thứ tự column
        await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
    }

    return (
        <Container disableGutters maxWidth={false} sx ={ { height: '100vh' } }>

            <AppBar />

            <BoardBar board={ board} />

            <BoardContent
                board={ board}
                createNewColumn={ createNewColumn }
                createNewCard={ createNewCard }
                moveColumns = {moveColumns}
            />

        </Container>
    )
}

export default Board
