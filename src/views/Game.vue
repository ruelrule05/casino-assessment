<script setup lang="ts">
import CategoryNavigation from "@/components/CategoryNavigation.vue";
import {computed, onMounted, ref} from "vue";
import {type Category} from "@/types/Category.ts";
import {type Game as IGame} from "@/types/Game";
import {type ApiGame} from "@/types/ApiGame.ts";
import axios from "axios";
import GameGrid from "@/components/GameGrid.vue";

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

const activeCategory = ref<string>('top');
const allGames = ref<IGame[]>([]);
const loading = ref<boolean>(true);

const gameListUri = import.meta.env.VITE_GAME_LIST_URI;

const fetchGames = async () => {
  loading.value = true;

  try {
    const response = await axios.get<ApiGame[]>(gameListUri);
    const data = response.data;

    allGames.value = data.map(apiGame => {
      const otherCategories = ['ball', 'virtual', 'fun'];
      const belongsToOther = apiGame.categories.some(category => otherCategories.includes(category));

      const finalCategories = belongsToOther ? [...apiGame.categories, 'other'] : apiGame.categories;

      return {
        id: apiGame.id,
        name: apiGame.name,
        image: `https://${apiGame.image}`,
        categories: finalCategories,
      }
    })
  } catch (error) {
    console.error(`Failed to fetch games: ${error}`)
  } finally {
    loading.value = false;
  }
}

const handleCategoryChanged = (category: string) => {
  activeCategory.value = category;
}

const filteredGames = computed<IGame[]>(() => {
  if (activeCategory.value === 'all') {
    return allGames.value;
  }

  return allGames.value.filter(game => {
    return game.categories.includes(activeCategory.value)
  });
})

onMounted(async () => {
  await fetchGames()
})
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <CategoryNavigation
        :categories="categories"
        :active-category="activeCategory"
        @categoryChanged="handleCategoryChanged"
      />

      <main class="game-content">
        <div v-if="loading" class="loading-message">Loading Games...</div>
        <template v-else>
          <GameGrid :active-category="activeCategory" :games="filteredGames" />
        </template>
      </main>
    </header>

  </div>
</template>

<style scoped>

</style>
