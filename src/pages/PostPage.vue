<template>
  <div class="p-2 space-y-4">
    <div class="w-fit text-start">
      <span class="font-bold">Название:</span> {{ post?.title }}
    </div>
    <div class="w-fit text-start">
      <span class="font-bold">Описание:</span>{{ post?.body }}
    </div>
    <my-button
      class="max-w-40"
      variant="danger"
      size="small"
      @click.self="handleDelete"
      >удалить</my-button
    >
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from "@store/usePostsStore";
import { useRouter } from "vue-router";

interface PostItemProps {
  id: number;
}

const postsStore = usePostsStore();
const router = useRouter();
const post = postsStore.posts.find((post) => (post.id = id));

const handleDelete = (id: number) => {
  postsStore.deletePost(id);
  router.push("/posts");
};

const { id } = defineProps<PostItemProps>();
</script>

<style scoped></style>
