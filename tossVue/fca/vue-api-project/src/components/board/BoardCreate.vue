<template>
    <div>
        <h4>게시글 등록</h4>
        <form @submit.prevent="createBoard">
            <fieldset>
                <legend>게시글 정보 입력</legend>
                <div>
                    <label for="title">제목:</label>
                    <input type="text" id="title" v-model="newBoard.title" required>
                </div>
                <div>
                    <label for="content">내용:</label>
                    <textarea id="content" cols="30" rows="10" v-model="newBoard.content" required></textarea>
                </div>
                <div>
                    <label for="category">카테고리:</label>
                    <select id="category" v-model="newBoard.category">
                        <option value="true">일반글</option>
                        <option value="false">공지</option>
                    </select>
                </div>
                <div>
                    <label for="image">이미지 업로드:</label>
                    <input type="file" id="image" ref="imageInput" @change="handleImageChange">
                </div>
                <div>
                    <label for="video">비디오 업로드:</label>
                    <input type="file" id="video" ref="videoInput" @change="handleVideoChange">
                </div>
                <button type="submit">등록</button>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBoardStore } from '@/stores/board';

const store = useBoardStore();
const newBoard = ref({
    title: '',
    writer: '나중에 user,name 가저옥',
    content: '',
    category: 'true', // 기본값을 'true'로 설정하여 공개 게시글로 초기화
    viewCnt: 0, // 초기 조회수는 0
    image: null,
    video: null
});

const imageInput = ref(null);
const videoInput = ref(null);

function handleImageChange(event) {
    const file = event.target.files[0];
    newBoard.value.image = URL.createObjectURL(file); // 미리보기 업데이트
};

function handleVideoChange(event) {
    const file = event.target.files[0];
    newBoard.value.video = URL.createObjectURL(file); // 미리보기 업데이트
};

const createBoard = async () => {
    const formData = new FormData();
    formData.append('title', newBoard.value.title);
    formData.append('writer', newBoard.value.writer);
    formData.append('content', newBoard.value.content);
    formData.append('category', newBoard.value.category);
    formData.append('viewCnt', newBoard.value.viewCnt);
    if (newBoard.value.image) {
        formData.append('image', newBoard.value.image);
    }
    if (newBoard.value.video) {
        formData.append('video', newBoard.value.video);
    }

    await store.createBoard(formData);
};
</script>

<style scoped>
fieldset {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
label {
    display: block;
    margin-bottom: 10px;
}
input[type="text"],
input[type="file"],
textarea, select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
}
button {
    margin-top: 20px;
    padding: 10px 20px;
    cursor: pointer;
}
</style>
