import './assets/main.css'
import { createApp } from 'vue'
import App from './components/App.vue';
import PhotoPage from './components/PhotoPage.vue';

createApp(App).mount('#app')
createApp(PhotoPage).mount('#photoPage');