import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/**
 * 📌 Lưu ý khi sử dụng Axios trong khóa MERN Stack Pro (TrungQuanDev):
 *
 * - tất cả Các function dưới đây chỉ thực hiện request và lấy data, không sử dụng try-catch để xử lý lỗi.
 * - Điều này là do phía frontend không cần xử lý lỗi cho từng request riêng lẻ, tránh việc lặp lại code không cần thiết.
 * - Giải pháp Clean Code là xử lý lỗi tập trung ở một nơi duy nhất — sử dụng Interceptors của Axios.
 * - Interceptors cho phép chặn request/response để xử lý logic lỗi một cách hiệu quả và gọn gàng.
 * - (Trong phần nâng cao của khoá học MERN Stack, mình sẽ hướng dẫn chi tiết cách sử dụng Interceptors để xử lý chuẩn hóa.)
 */

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    // lưu ý: axios sẻ trả về kết quả về qua properties của nó là data
    return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
    return response.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

export const deleteColumnDetailAPI = async (columnId) => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}

/** Cards */
export const createNewCardAPI = async (newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}