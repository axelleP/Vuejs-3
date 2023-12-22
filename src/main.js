import './assets/main.css';
import './assets/restoMenu.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$title = 'Training Vue.js 3';//variable accessible dans tous les composants

app.mount('#app');
