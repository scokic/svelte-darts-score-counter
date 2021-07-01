import { writable } from "svelte/store";

const PlayerData = writable([
  {
    name: "Junior",
    score: 501,
    history: [],
    active: true,
  },
  {
    name: "Senior",
    score: 501,
    history: [],
    active: false,
  },
]);

export default PlayerData;
