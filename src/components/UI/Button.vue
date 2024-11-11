<template>
  <button
    :class="[
      'p-2 border-none rounded-md focus-within:border-none focus:border-none focus:outline-none active:bg-opacity-20 w-full hover:bg-opacity-80 transition-opacity',
      variant === 'primary' && 'bg-blue-500',
      variant === 'secondary' && 'bg-blue-300',
      variant === 'danger' && 'bg-red-500',
      size === 'large' && 'text-xl',
      size === 'medium' && 'text-sm',
      size === 'small' && 'text-xs',
      { disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, defineOptions } from "vue";

defineOptions({
  name: "my-button",
});

type Variant = "primary" | "secondary" | "danger";
type Size = "small" | "medium" | "large";

const props = defineProps({
  variant: {
    type: String as PropType<Variant>,
    default: "primary",
  },
  size: {
    type: String as PropType<Size>,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{ (event: "click", e: MouseEvent): void }>();

const handleClick = (e: MouseEvent) => {
  if (!props.disabled) {
    emit("click", e);
  }
};
</script>
