import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Posts from "../pages/Posts.vue";
import Users from "../pages/Users.vue";
import PostPage from "@pages/PostPage.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/users", component: Users },
  { path: "/posts", component: Posts },
  {
    path: "/posts/:id",
    component: PostPage,
    props: (route: any) => ({
      id: Number(route.params.id),
    }),
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
