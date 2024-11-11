<template>
  <div class="w-fit text-start">
    <span class="font-bold">Название:</span> {{ title }}
  </div>
  <div class="w-fit text-start">
    <span class="font-bold">Описание:</span>{{ description }}
  </div>
  <my-button
    class="max-w-40"
    variant="danger"
    size="small"
    @click.stop="handleDelete(id)"
    >удалить</my-button
  >
</template>

<script setup lang="ts">
interface PostItemProps {
  title: string;
  description: string;
  id: number;
}

const { description, title, id } = defineProps<PostItemProps>();

const emit = defineEmits<{ (event: "deletePost", id: number): void }>();

const handleDelete = (id: number) => {
  emit("deletePost", id);
};
</script>

<style scoped></style>
