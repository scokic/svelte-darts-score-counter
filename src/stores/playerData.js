import { writable } from "svelte/store";

const PlayerData = writable([
  {
    name: "Player 1",
    score: 501,
    history: [],
    active: true,
  },
  {
    name: "Player 2",
    score: 501,
    history: [],
    active: false,
  },
]);

export default PlayerData;
