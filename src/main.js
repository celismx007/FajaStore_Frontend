import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' //importo el
import '@fortawesome/fontawesome-free/css/all.css';


//creacion y montaje de la aplicaion vue
createApp(App).use(store).use(router).mount('#app')
