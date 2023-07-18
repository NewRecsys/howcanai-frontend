import { createApp } from 'vue'
import axios from 'axios';
import App from './App.vue'
import store from './store/index.js';
import router from './routes/index.js';

const app = createApp(App); 

app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.mount('#app');


