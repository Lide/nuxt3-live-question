import { ref } from 'vue';
import axios from "axios";

export const useHome = () => {
  const newsList = ref([]);
  const isLoading = ref(false);

  const getNews = async () => {
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

  return { newsList, isLoading, getNews };
};
