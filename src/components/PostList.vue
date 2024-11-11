<template>
  <div v-if="posts.length > 0">
    <TransitionGroup
      name="list"
      tag="div"
      class="flex flex-col w-full space-y-1 rounded-md"
    >
      <div
        @click="openPost(id)"
        v-for="{ id, title, body } in posts"
        :key="id"
        class="flex flex-col w-full p-2 space-y-1 border-2 border-blue-400 rounded-md"
      >
        <PostItem
          @delete-post="postsStore.deletePost"
          :description="body"
          :title="title"
          :id="id"
        />
      </div>
    </TransitionGroup>
    <div v-intersection="handleIntersection" class="h-10"></div>
  </div>

  <div v-else>
    <p class="text-xl font-semibold text-center">Постов нет</p>
  </div>
</template>

<script setup lang="ts">
import PostItem from "@components/PostItem.vue";
import router from "@router/router";
import { usePostsStore } from "@store/usePostsStore";
import { Post } from "@typesDir/Post";

interface PostListProps {
  posts: Post[];
}

const { posts } = defineProps<PostListProps>();

const postsStore = usePostsStore();

const emit = defineEmits<{
  (event: "scrolled"): void;
}>();

const openPost = (id: number) => {
  router.push({
    path: `/posts/${id}`,
  });
};

const handleIntersection = () => {
  emit("scrolled");
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
