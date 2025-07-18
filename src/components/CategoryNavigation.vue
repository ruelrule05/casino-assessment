<script setup lang="ts">
  import { type Category } from "@/types/Category.ts";

  defineProps<{
    categories: Category[];
    activeCategory: string;
  }>();

  defineEmits(['categoryChanged'])
</script>

<template>
  <nav class="category-nav">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <button
          :class="{active: category.id === activeCategory }"
          @click="$emit('categoryChanged', category.id)"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.category-nav {
  background-color: #373737;
  padding: 0 10px;
}

.category-nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.category-nav button {
  background: none;
  border: none;
  color: #ffffff;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.category-nav button.active {
  background-color: #8dc63f;
  color: #373737;
  border-radius: 5px 5px 0 0;
}
</style>
