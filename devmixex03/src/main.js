import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

//폰트 어썸 전역 등록
import { FontAwesomeIcon } from '@/assets/FontAwesome';

const app = createApp(App);

// pinia 설정
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon); // 폰트어썸 컴포넌트 전역등록

app.use(router);
app.mount('#app');
