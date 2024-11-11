<template>
  <ul class="flex items-center justify-center w-full space-x-2">
    <li
      :class="`text-blue-500 cursor-pointer hover:text-blue-800  ${
        page === currentPage && 'underline font-bold'
      }`"
      v-for="page in visiblePages"
      :key="`page_${page}`"
      @click="newPage(page)"
    >
      {{ page }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface PaginationProps {
  currentPage: number;
  maxPage: number;
}

const { maxPage, currentPage } = defineProps<PaginationProps>();

const emit = defineEmits<{
  (event: "pageSelected", page: number): void;
}>();

const newPage = (page: number) => {
  emit("pageSelected", page);
};

const visiblePages = computed(() => {
  const maxVisible = Math.floor(window.innerWidth / 30);

  let startPage = Math.max(2, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 2;

  if (endPage >= maxPage) {
    endPage = maxPage - 1;
    startPage = Math.max(2, endPage - maxVisible + 2);
  }

  return [
    1,
    ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    maxPage,
  ];
});
</script>

<style scoped></style>
