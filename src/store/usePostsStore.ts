import { Post } from "@typesDir/Post";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref<Post[]>([]);
  const pageCounter = ref(0);
  const postPage = ref(1);

  function addPosts(newPosts: Post[]) {
    posts.value = [...posts.value, ...newPosts];
  }

  function createPost(newPost: Post) {
    posts.value = [...posts.value, newPost];
  }

  function deletePost(id: number) {
    posts.value = [...posts.value.filter((post) => post.id !== id)];
  }

  function updatePageCounter(value: number) {
    pageCounter.value = value;
  }

  function updatePosts(newPosts: Post[]) {
    posts.value = newPosts;
  }

  function updatePage(value: number) {
    postPage.value = value;
  }

  function incrementPage() {
    postPage.value++;
  }

  return {
    posts,
    pageCounter,
    postPage,
    addPosts,
    createPost,
    deletePost,
    updatePosts,
    updatePageCounter,
    updatePage,
    incrementPage,
  };
});
