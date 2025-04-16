import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
    const [board, setboard] = useState(null)

    useEffect(() => {
        // tạm thời fix cứng boardId, flow chuẩn chính về sau sẻ sử dụng react-router-dom để lấy chuẩn boardId từ URL về
        const boardId = '67fe651251fb95b10e9c7255'
        // call API
        fetchBoardDetailsAPI(boardId).then((board) => {
            setboard(board)
        })
    }, [])

    return (
        <Container disableGutters maxWidth={false} sx ={ { height: '100vh' } }>

            <AppBar />

            <BoardBar board={ board} />

            <BoardContent board={ board}/>

        </Container>
    )
}

export default Board
