<template>
    <div>
        <h2>Receipt</h2>
        <h4>
            <div @click="decrementMonth">&lt;</div>
            {{ year }} / {{ month }}
            <div @click="incrementMonth">&gt;</div>
        </h4>
    </div>
</template>

<script setup>
import { useScheduleStore } from '@/stores/schedule';
import ClubInfoBar from '../common/ClubInfoBar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const store = useScheduleStore();
const route = useRoute();
const year = ref('');
const month = ref('');
const newDate = ref('');

function handleDateChange(yearValue, monthValue) {
    // JavaScript Date 객체는 월을 0부터 시작하기 때문에 -1을 해야 합니다.
    const date = new Date(yearValue, monthValue - 1);
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1; // 월을 다시 1부터 시작으로 조정
    // 필요한 API 호출 또는 상태 업데이트 로직
    // 이값들로 date 형식 'YYYY-MM-DD'
    newDate.value= year.value+'-'+month.value
    store.getReceiptMap(newDate.value);
}

const incrementMonth = () => {
    const newMonth = parseInt(month.value) + 1;
    handleDateChange(year.value, newMonth);
};

const decrementMonth = () => {
    const newMonth = parseInt(month.value) - 1;
    handleDateChange(year.value, newMonth);
};

onMounted(() => {
    // store.getReceiptMap(newDate.value);
    const date = route.params.receiptDate;
    const dateParts = date.split('-');
    year.value = dateParts[0];
    month.value = parseInt(dateParts[1]); // 문자열을 숫자로 변환
});
</script>

<style scoped>
a {
    cursor: pointer; /* 링크 커서 스타일 */
    margin: 0 10px; /* 좌우 여백 */
}
</style>
