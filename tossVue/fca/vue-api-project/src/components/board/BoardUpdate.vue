<template>
    <div>
        <h4>게시글 수정</h4>
        <fieldset>
            <legend>수정</legend>
            <div>
                <label for="title">제목:</label>
                <input type="text" id="title" v-model="store.board.title">
            </div>
            <div>
                <label for="content">내용:</label>
                <textarea id="content" cols="30" rows="10" v-model="store.board.content"></textarea>
            </div>
            <div>
                <label for="image">이미지 업로드:</label>
                <input type="file" id="image" @change="handleImageUpload">
                <!-- 이미지 미리보기 -->
                <img :src="imagePreview" alt="게시글 이미지" v-if="imagePreview">
            </div>
            <div v-if="!store.board.video">
                <label for="video">비디오 업로드:</label>
                <input type="file" id="video" @change="handleVideoUpload">
                <video controls v-if="videoPreview">
                    <source :src="videoPreview" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div>
                <button @click="updateBoard">수정</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBoardStore } from '@/stores/board';

const store = useBoardStore();
const imagePreview = ref(store.board.img); // 이미지 미리보기
const videoPreview = ref(store.board.video); // 비디오 미리보기

const handleImageUpload = event => {
    const file = event.target.files[0];
    imagePreview.value = URL.createObjectURL(file); // 미리보기 업데이트
};

const handleVideoUpload = event => {
    const file = event.target.files[0];
    videoPreview.value = URL.createObjectURL(file); // 미리보기 업데이트
};

const updateBoard = async () => {
    const formData = new FormData();
    formData.append('title', store.board.title);
    formData.append('content', store.board.content);
    
    // 이미지가 변경되었을 경우, 파일을 formData에 추가
    const imageFile = document.querySelector('#image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    // 비디오가 변경되었을 경우, 파일을 formData에 추가
    const videoFile = document.querySelector('#video').files[0];
    if (videoFile) {
        formData.append('video', videoFile);
    }

    try {
        await axios.put(`http://localhost:8080/api-board/board/${store.board.boardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('게시글이 성공적으로 업데이트 되었습니다.');
        router.push({ name: 'boardList' });
    } catch (error) {
        console.error('게시글 업데이트 중 오류가 발생했습니다.', error);
    }
};

</script>

<style scoped>
img, video {
    max-width: 30%;
    height: auto;
}
</style>
