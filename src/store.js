import { writable } from "svelte/store";

const Store = writable([
  {
    name: "Junior",
    score: 501,
    history: [
      { round: 1, hits: [10, 3, 10] },
      { round: 2, hits: [1, 30, 60] },
      { round: 3, hits: [10, 3, 10] },
      { round: 4, hits: [1, 30, 60] },
      { round: 5, hits: [10, 3, 10] },
      { round: 6, hits: [1, 30, 60] },
      { round: 7, hits: [10, 3, 10] },
      { round: 8, hits: [1, 30, 60] },
      { round: 9, hits: [10, 3, 10] },
      { round: 10, hits: [1, 30, 60] },
      { round: 11, hits: [10, 3, 10] },
      { round: 12, hits: [1, 30, 60] },
    ],
    active: true,
  },
  {
    name: "Senior",
    score: 501,
    history: [
      { round: 1, hits: [10, 30, 10] },
      { round: 2, hits: [5, 3, 1] },
    ],
    active: false,
  },
]);

export default Store;
