<template>

  <div>
    <TheHeaderNav/>
    <RouterView/>
  </div>


</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue'
</script>

<style scoped>
div{
  background-image: url('/tossVue/fca/vue-api-project/src/assets/img/background.PNG');
}
</style>
