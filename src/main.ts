import { createApp, DirectiveHook } from "vue";
import "./style.css";
import App from "./App.vue";
import uiComponents from "@components/UI/ui-components";
import router from "@router/router";
import directives from "@directives/directives";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

uiComponents.forEach((component) => {
  app.component(component.name!, component);
});

directives.forEach((directive: DirectiveHook) => {
  app.directive(directive.name, directive);
});

app.use(pinia);
app.use(router);

app.mount("#app");
