<template>
    <div>
        <h4>게시글 상세</h4>
        <hr>
        <div>{{ store.board.title }}</div>
        <div>{{ store.board.writer }}</div>
        <div>{{ store.board.regDate }}</div>
        <div>{{ store.board.viewCnt }}</div>
        <div>{{ store.board.content }}</div>
        <div v-if="store.board.img">
            <img :src="store.board.img" alt="게시글 이미지">
        </div>
        <div v-if="store.board.video">
            <video controls>
                <source :src="store.board.video" type="video/mp4">
            </video>
        </div>

        <button @click="deleteBoard">삭제</button>
        <button @click="updateBoard">수정</button>
        <button @click="goBoardList">목록</button>
    </div>
</template>

<script setup>
import { useBoardStore } from '@/stores/board';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'

const store = useBoardStore()

const route = useRoute();
const router = useRouter();
onMounted(() => {
    //게시글 번호 어디에 있나
    store.getBoard(route.params.boardId)
})
const goBoardList = function() {
    router.push({name:'boardList'})
}
const deleteBoard = function () {
    axios.delete(`http://localhost:8080/api-board/board/${route.params.boardId}`)
        .then(() => {
            router.push({ name: 'boardList' })
        })
}

const updateBoard = function () {
    router.push({ name: 'boardUpdate' })
}

</script>

<style scoped></style>