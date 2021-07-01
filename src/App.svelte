<!-- FUNCTIONS  -->
<script>
  import Store from "./store.js";
  import PlayerScoreCard from "./components/PlayerScoreCard.svelte";

  let players;

  Store.subscribe((data) => {
    players = data;
  });
</script>

<!-- CONTENT  -->

<main>
  <div class="player-scores">
    {#each players as player}
      <PlayerScoreCard playerData={player} />
    {/each}
  </div>
</main>

<!-- STYLING  -->
<style>
  :global(body) {
    padding: 0;
  }

  :global(*) {
    box-sizing: border-box;
    color: white;
  }

  main {
    background-color: #121641;
    display: flex;
    justify-content: center;
    padding: 100px 0;
  }

  .player-scores {
    display: flex;
  }
</style>
