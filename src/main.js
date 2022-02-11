import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Multiselect from "vue-multiselect";

// register globally
Vue.component("multiselect", Multiselect);

Vue.config.productionTip = false;

new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
