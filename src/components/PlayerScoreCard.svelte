<!-- FUNCTIONS -->
<script>
  import PlayerScoreHistory from "./PlayerScoreHistory.svelte";

  export let playerData;
</script>

<!-- CONTENT -->

<div class="player-card {playerData.active ? 'active-player' : ''}">
  <div class="player-info">
    <h2 class="player-name">{playerData.name}</h2>
    <span class="player-score">{playerData.score}</span>
  </div>

  <PlayerScoreHistory playerScore={playerData.history} />
</div>

<!-- STYLING  -->
<style>
  .player-card {
    text-align: center;
    width: 350px;
    padding: 2rem 3rem;
    position: relative;
  }

  .player-card::before {
    content: "";
    height: 100%;
    width: 100%;
    border: 1px solid white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    will-change: transform;
    transform: translateX(50%);
    transition: 0.3s ease;
    z-index: 100;
  }

  .player-card:last-of-type::before {
    display: none;
  }

  .active-player::before {
    transform: translateX(-50%);
  }

  .player-name {
    border-bottom: 1px solid white;
    padding-bottom: 2rem;
  }

  .player-score {
    font-size: 5rem;
  }

  .player-info {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: #121641;
  }

  @media only screen and (max-width: 1000px) {
    .player-card {
      width: 45vw;
    }

    .player-score {
      font-size: 3rem;
    }
  }
</style>
