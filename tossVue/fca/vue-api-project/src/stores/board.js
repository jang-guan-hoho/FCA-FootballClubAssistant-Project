import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-board/board`

export const useBoardStore = defineStore('board', () => {
  const board = ref( {
    boardId: 1,
    title: '첫 번째 게시물',
    writer: '작성자1',
    content: '첫 번째 게시물의 내용입니다.',
    img: 'https://via.placeholder.com/150',
    video: 'https://www.example.com/video1.mp4',
    category: true,
    viewCnt: 123,
    date: '2024-5-17 09:00:00'
  })
  const boardList = ref([
    {
      boardId: 1,
      title: '첫 번째 게시물',
      writer: '작성자1',
      content: '첫 번째 게시물의 내용입니다.',
      img: 'https://via.placeholder.com/150',
      video: null,
      category: true,
      viewCnt: 123,
      date: '2024-5-17 09:00:00'
    },
    {
      boardId: 2,
      title: '두 번째 게시물',
      writer: '작성자2',
      content: '두 번째 게시물의 내용입니다.',
      img: 'https://via.placeholder.com/150',
      video: 'https://www.example.com/video2.mp4',
      category: false,
      viewCnt: 456,
      date: '2024-5-18 10:00:00'
    },
    {
      boardId: 3,
      title: '세 번째 게시물',
      writer: '작성자3',
      content: '세 번째 게시물의 내용입니다.',
      img: 'https://via.placeholder.com/150',
      video: 'https://www.example.com/video3.mp4',
      category: true,
      viewCnt: 789,
      date: '2024-5-19 11:00:00'
    }
  ]);

  const createBoard = function (boardData) {
    const formData = new FormData();
    Object.keys(boardData).forEach(key => {
        if (boardData[key] instanceof File) {
            formData.append(key, boardData[key], boardData[key].name);
        } else {
            formData.append(key, boardData[key]);
        }
    });

    return axios({
      url: REST_BOARD_API,
      method: 'POST',
      data: formData
    }).then(response => {
        router.push({name: 'boardList'})
    }).catch(err => {
        console.error('Error creating board:', err);
    });
}

    const getBoardList = function (clubId) {
    axios.get(`${REST_BOARD_API}/${clubId}`)
      .then((response) => {
      boardList.value = response.data
    })
  }


  const getBoard = function (boardId) {
    axios.get(`${REST_BOARD_API}/${boardId}`)
      .then((response) => {
      board.value = response.data
    })
  }


  const searchBoardList = function (searchCondition) {
    axios.get(REST_BOARD_API, {
      params: searchCondition
    })
      .then((res) => {
      boardList.value = res.data
    })
  }









  return { createBoard, boardList, getBoardList, board, getBoard, searchBoardList}
})
