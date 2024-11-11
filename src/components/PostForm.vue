<template>
  <div
    class="flex flex-col flex-wrap items-center gap-2 p-2 border-2 border-blue-600 rounded-md"
  >
    <my-input
      class="w-full p-2 border-2 border-gray-500 rounded-md"
      type="text"
      v-model="title"
      placeholder="Заголовок"
    />
    <my-input
      class="w-full p-2 border-2 border-gray-500 rounded-md"
      type="text"
      v-model="body"
      placeholder="Описание"
    />
    <div class="flex items-center justify-between w-full space-x-2">
      <my-button
        class="mx-auto"
        variant="danger"
        size="large"
        @click="handleCancel"
        >Отмена</my-button
      >
      <my-button
        class="mx-auto"
        variant="primary"
        size="large"
        @click="handleClick"
        >Добавить</my-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from "@typesDir/Post";
import { ref } from "vue";

defineOptions({ name: "post-form" });

const emit = defineEmits<{
  (event: "createPost", post: Post): void;
  (event: "cancel"): void;
}>();

const title = ref("");
const body = ref("");

const handleCancel = () => {
  emit("cancel");
};

const handleClick = () => {
  if (title.value && body.value) {
    emit("createPost", {
      body: body.value,
      id: Date.now(),
      title: title.value,
    });

    title.value = "";
    body.value = "";
  }
};
</script>

<style scoped></style>
