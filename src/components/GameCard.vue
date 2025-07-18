<script setup lang="ts">
import type {Game} from "@/types/Game.ts";

defineProps<{
  game: Game,
  showRibbon?: boolean;
  ribbonText?: string;
}>()

</script>

<template>
  <div class="game-card">
    <div v-if="showRibbon" class="ribbon uppercase">
      {{ ribbonText }}
    </div>
    <div v-if="game.jackpot" class="jackpot">
      ${{ game.jackpot?.toLocaleString() }}
    </div>

    <img :src="game.image" :alt="game.name">

    <div class="overlay">
      <h3>{{ game.name }}</h3>
      <button class="play-button">Play</button>
    </div>
  </div>
</template>

<style scoped>
.game-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: #FCFCFC;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.game-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ribbon {
  position: absolute;
  top: 8px;
  right: -18px;
  background-color: #8dc63f;
  color: #ffffff;
  padding: 3px 25px;
  font-size: 12px;
  font-weight: bold;
  transform: rotate(45deg);
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.jackpot {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #8dc63f;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;
  white-space: nowrap;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  text-align: center;
  padding: 10px;
}

.game-card:hover .overlay  {
  opacity: 1;
}

.overlay h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.play-button {
  background-color: #8dc63f;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.play-button:hover {
  background-color: #79ab34;
}
</style>
