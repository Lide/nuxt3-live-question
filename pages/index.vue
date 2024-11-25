<script setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const newsList = ref([]);
const isLoading = ref(false);

// API 路徑 : https://nuxr3.zeabur.app/api/v1/home/news/
// 使用 ES6 fetch() 或是 axios.get() 串接 API
// 切換 isLoading 狀態
import axios from 'axios';

const fetchNews = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('https://nuxr3.zeabur.app/api/v1/home/news/');
    newsList.value = response.data.result;
  } catch (error) {
    console.error('Error fetching news:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchNews();
});


</script>

<template>
  <div class="container">
    <h1>最新消息</h1>
    <!-- <NewsCard v-for="..." :key="..."  v-bind="..." /> -->
    <NewsCard v-for="news in newsList" :key="news._id" v-bind="news" />
    <ClientOnly>
      <Loading v-model:active="isLoading" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
