import { createApp } from 'vue'
import axios from 'axios';
import App from './App.vue'
import store from './store/index.js';
import router from './routes/index.js';
const app = createApp(App); 
// 로컬 스토리지에 있는 토큰을 사용하여 모든 axios 요청에 Authorization 헤더 추가
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;



app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.mount('#app');


