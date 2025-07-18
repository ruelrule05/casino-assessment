<script setup lang="ts">
import CategoryNavigation from "@/components/CategoryNavigation.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {type Category} from "@/types/Category.ts";
import {type Game as IGame} from "@/types/Game";
import {type ApiGame} from "@/types/ApiGame.ts";
import axios from "axios";
import GameGrid from "@/components/GameGrid.vue";
import type {Jackpot} from "@/types/Jackpot.ts";

let jackpotInterval: number;

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
const jackpotUri = import.meta.env.VITE_JACKPOT_URI;

const fetchInitialData = async () => {
  loading.value = true;

  try {
    const [games, jackpots] = await Promise.all([
      axios.get<ApiGame[]>(gameListUri),
      axios.get<Jackpot[]>(jackpotUri),
    ]);

    const mappedJackpot = new Map(jackpots.data.map(jackpot => [jackpot.game, jackpot.amount]))

    allGames.value = games.data.map((apiGame: ApiGame) => {
      const otherCategories = ['ball', 'virtual', 'fun'];
      const belongsToOther = apiGame.categories.some(category => otherCategories.includes(category));
      const finalCategories = belongsToOther ? [...apiGame.categories, 'other'] : apiGame.categories;

      return {
        id: apiGame.id,
        name: apiGame.name,
        image: `https://${apiGame.image}`,
        categories: finalCategories,
        jackpot: mappedJackpot.get(apiGame.id)
      }
    });
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`)
  } finally {
    loading.value = false;
  }
}

const updateJackpots = async () => {
  console.info(`Updating jackpots`)

  try {
    const response = await axios.get<Jackpot[]>(jackpotUri);
    const mappedJackpot = new Map(response.data.map(jackpot => [jackpot.game, jackpot.amount]));

    allGames.value.forEach(game => {
      if (mappedJackpot.has(game.id)) {
        game.jackpot = mappedJackpot.get(game.id);
      } else {
        game.jackpot = 0;
      }
    });
  } catch (error) {
    console.error(`Failed to update jackpots ${error}`);
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

onMounted( () => {
  fetchInitialData()

  jackpotInterval = setInterval(updateJackpots, 5000);
})

onUnmounted(() => {
  clearInterval(jackpotInterval)
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
