<!-- FUNCTIONS -->
<script>
  import PlayerScoreHistory from "./PlayerScoreHistory.svelte";

  export let playerData;
</script>

<!-- CONTENT -->

<div class="player-card {playerData.active ? 'active-player' : ''}">
  <h2 class="player-name">{playerData.name}</h2>
  <span class="player-score">{playerData.score}</span>

  <PlayerScoreHistory playerScore={playerData.history} />
</div>

<!-- STYLING  -->
<style>
  .player-card {
    text-align: center;
    width: 350px;
    padding: 2rem 3rem;
    border: 1px solid transparent;
  }

  .active-player {
    border-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.6);
  }

  .player-name {
    border-bottom: 1px solid white;
    padding-bottom: 2rem;
  }

  .player-score {
    font-size: 5rem;
  }
</style>
