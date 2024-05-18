<template>
    <div>
        <h4>게시글 목록</h4>
        <hr>
        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>쓰니</th>
                <th>조회수</th>
                <th>등록일</th>
            </tr>
            <tr v-for="board in store.boardList" :key="board.boardId">
                <td>{{ board.id }}</td>
                <td>
                    <RouterLink :to="{name:'boardDetail', params:{clubId: clubId, boardId:board.boardId}}">{{ board.title }}</RouterLink>
                </td>
                <td>{{ board.writer }}</td>
                <td>{{ board.viewCnt }}</td>
                <td>{{ board.regDate }}</td>
            </tr>
        </table>
        <RouterLink :to="{name: 'boardCreate'}">게시글 작성</RouterLink>
        <BoardSearchInput />
    </div>
</template>

<script setup>
import { useBoardStore } from '@/stores/board';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BoardSearchInput from './BoardSearchInput.vue';

const store = useBoardStore();
const route = useRoute();
const clubId = ref(route.params.clubId);

onMounted(() => {
    // store.getBoardList(clubId);
});
</script>

<style scoped></style>
