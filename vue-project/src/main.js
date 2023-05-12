import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index"
import router from "./router/index";
import './index.css'
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true

const app = createApp(App);

app.use(store);
app.use(VueAxios, axios)
app.use(router);

app.mount("#app");
