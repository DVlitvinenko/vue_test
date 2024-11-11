<template>
  <div class="flex flex-wrap items-center justify-center w-full gap-2">
    <my-button class="max-w-40" variant="primary" @click="openCreating"
      >Создать новый пост</my-button
    >
    <my-select
      class="h-full p-2 m-0 text-white bg-blue-500 rounded-md min-w-40 focus:outline-none"
      :list="[
        { value: 'default', name: 'По умолчанию' },
        { value: 'desc', name: 'От а до я' },
        { value: 'asc', name: 'От я до а' },
      ]"
      v-model="selectedValue"
    />
    <my-input v-focus placeholder="Поиск по тексту" v-model="searchText" />
    <div class="text-xs max-w-28">
      Показ пагинации:
      <my-button
        @click="handlePaginationActive"
        variant="primary"
        size="small"
        :class="`py-[1px] px-[2px] transition-all text-[8px]  ${
          isPagination ? 'text-left' : 'text-right'
        }`"
      >
        <span
          class="rounded-sm p-[2px] px-2"
          :class="isPagination ? 'bg-red-500' : 'bg-green-500'"
          >{{ isPagination ? "Да" : "Нет" }}</span
        >
      </my-button>
    </div>
  </div>
  <my-dialog @close="closeCreating" :is-showed="postIsCreating">
    <PostForm @cancel="closeCreating" @create-post="createPost" />
  </my-dialog>
  <div v-if="postsStore.pageCounter > 1 && isPagination" class="mt-4 font-bold">
    Страница {{ postsStore.postPage }}:
  </div>
  <div class="mt-4 font-bold" v-else>Список постов:</div>
  <PostList
    v-if="isLoaded"
    :posts="filteredPosts!"
    @scrolled="getMorePosts"
    @delete-post="postsStore.deletePost"
  />
  <div class="" v-else>Загрузка...</div>
  <Pagination
    v-if="postsStore.pageCounter > 1 && isPagination"
    :max-page="postsStore.pageCounter"
    :current-page="postsStore.postPage"
    @page-selected="getPostsByPage"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Pagination from "@components/Pagination.vue";
import PostList from "@components/PostList.vue";
import PostForm from "@components/PostForm.vue";
import { getPosts } from "@client/posts";
import { usePostsStore } from "@store/usePostsStore";
import { Post } from "@typesDir/Post";

const postsStore = usePostsStore();
const postIsCreating = ref(false);
const isLoaded = ref(false);
const selectedValue = ref("default");
const searchText = ref("");
const postLimit = ref(5);
const isPagination = ref(false);
const isPostLoading = ref(false);

onMounted(async () => {
  const data = await getPosts(postLimit.value);
  postsStore.updatePosts(data.posts);
  postsStore.updatePageCounter(data.pageCount);
  isLoaded.value = true;
});

const getPostsByPage = async (page: number) => {
  if (isLoaded.value) {
    const data = await getPosts(postLimit.value, page);
    postsStore.updatePosts(data.posts);
    postsStore.updatePage(page);
  }
};

const getMorePosts = async () => {
  if (isLoaded.value && !isPagination.value && !isPostLoading.value) {
    isPostLoading.value = true;

    const data = await getPosts(postLimit.value, postsStore.postPage + 1);
    postsStore.addPosts(data.posts);
    postsStore.incrementPage();
    isPostLoading.value = false;
  }
};

const textFilter = (text: string, searchText: string): boolean => {
  if (!searchText) {
    return true;
  }
  return text.toLowerCase().includes(searchText.toLowerCase());
};

const filterPosts = (searchText: string, selectedValue: string) => {
  if (!postsStore.posts.length) return [];

  return postsStore.posts
    .filter((item) => {
      return (
        textFilter(item.body, searchText) || textFilter(item.title, searchText)
      );
    })
    .sort((a, b) => {
      if (selectedValue === "default") {
        return a.id - b.id;
      }
      const comparison = a.title.localeCompare(b.title);

      if (selectedValue === "desc") {
        return -comparison;
      }
      return comparison;
    });
};

const handlePaginationActive = () => {
  isPagination.value = !isPagination.value;
  postsStore.updatePage(1);
  getPostsByPage(postsStore.postPage);
  if (!isPagination.value) {
    getMorePosts();
  }
};

const createPost = (post: Post) => {
  postsStore.createPost(post);
  postIsCreating.value = false;
};

const filteredPosts = computed(() =>
  filterPosts(searchText.value, selectedValue.value)
);

const closeCreating = () => {
  postIsCreating.value = false;
};

const openCreating = () => {
  postIsCreating.value = true;
};
</script>

<style scoped></style>
