<template>
  <div>
    <div>{{ store.club.clubImg }}</div>
    <div>{{ store.club.name }}</div>
    <div>{{ store.club.content }}</div>
    <button @click="openInNewWindow">
      회비 결제
    </button>
  </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useClubStore();
const router = useRouter();
const clubFee = ref(1000);

const openInNewWindow = () => {
<<<<<<< HEAD
  console.log(store.club.name)
  const url = router.resolve({
    name: 'pay',
    params: { clubId: store.club.clubId, clubFee: clubFee.value, name: store.club.name }
=======
  const url = router.resolve({
    name: 'pay',
    params: { clubId: store.club.clubId, clubFee: clubFee.value }
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
  }).href;
  window.open(url, '_blank');
};

onMounted(() => {
  console.log(store.club.fee);
  clubFee.value = store.club.fee;
});
</script>

<style scoped>
#container {
  text-align: center;
  border-radius: 45%;
}
</style>
