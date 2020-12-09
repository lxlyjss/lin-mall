/*
 * @Author: liuxinlin
 * @Date: 2020-11-11 17:07:07
 * @Last Modified by: liuxinlin
 * @Last Modified time: 2020-11-25 17:03:16
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { UseVant } from "@/utils/useVant";
import "vant/lib/button/style";

const app = createApp(App);
app.use(router);
app.mount("#app");
new UseVant(app);
