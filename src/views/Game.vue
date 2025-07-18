<script setup lang="ts">
import CategoryNavigation from "@/components/CategoryNavigation.vue";
import {ref} from "vue";
import { type Category } from "@/types/Category.ts";

const categories = ref<Category[]>([
  { id: 'top', name: 'Top Games' },
  { id: 'new', name: 'New Games' },
  { id: 'slots', name: 'Slots' },
  { id: 'jackpots', name: 'Jackpots' },
  { id: 'live', name: 'Live' },
  { id: 'blackjack', name: 'Blackjack' },
  { id: 'roulette', name: 'Roulette' },
  { id: 'table', name: 'Table' },
  { id: 'poker', name: 'Poker' },
  { id: 'other', name: 'Other' },
])

const activeCategory = ref<string>('new');

const handleCategoryChanged = (category: string) => {
  activeCategory.value = category;
}
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <CategoryNavigation
        :categories="categories"
        :active-category="activeCategory"
        @categoryChanged="handleCategoryChanged"
      />
      {{ activeCategory }}
    </header>

  </div>
</template>

<style scoped>

</style>
