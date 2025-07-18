<script setup lang="ts">
import GameCard from "@/components/GameCard.vue";
import type {Game as IGame, Game} from "@/types/Game.ts";

const props = defineProps<{
  games: Game[],
  activeCategory: string;
}>();

const shouldShowRibbon = (game: IGame) => {
  const shouldShow = game.categories.includes("new") || game.categories.includes("top");

  if (props.activeCategory === "new" || props.activeCategory === "top") {
    return false;
  }

  if (game.categories.includes("new") && game.categories.includes("top")) {
    return false;
  }

  return shouldShow;
}

const getRibbonText = (game: IGame) => {
  if (game.categories.includes("new")) return "New";

  if (game.categories.includes("top")) return "Top";

  return "";
}

const shouldShowNewRibbon = (game: IGame) => {
  if (props.activeCategory === "new") {
    return false;
  }

  return game.categories.includes("new");
}

const shouldShowTopRibbon = (game: IGame) => {
  if (props.activeCategory === "top") {
    return false;
  }

  return game.categories.includes("top");
}
</script>

<template>
  <div class="game-grid">
    <div v-if="games.length === 0" class="no-games">No Games</div>
    <template v-else v-for="game in games" :key="game.id">
      <GameCard
        :game="game"
        :show-ribbon="shouldShowRibbon(game)"
        :ribbon-text="getRibbonText(game)"
        :show-new-ribbon="shouldShowNewRibbon(game)"
        :show-top-ribbon="shouldShowTopRibbon(game)"
      />
    </template>
  </div>
</template>

<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.no-games {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

@media (max-width: 480px) {
  .game-grid {
    padding: 10px;
    gap: 10px;
  }

  .no-games {
    font-size: 20px;
  }
}
</style>
