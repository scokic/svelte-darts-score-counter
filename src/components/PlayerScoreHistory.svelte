<!-- FUNCTIONS -->
<script>
  import TableItem from "./TableItem.svelte";
  export let playerScore;
</script>

<!-- CONTENT -->

<div class="player-score-history">
  <div class="table-legend">
    <span>Round</span>
    <span>Hits</span>
  </div>
  <div class="score-history-table">
    {#if playerScore}
      {#each playerScore as score}
        <TableItem {score} />
      {/each}
    {:else}
      <p>Start playing!</p>
    {/if}
  </div>
</div>

<!-- STYLING  -->
<style>
  .table-legend {
    border-bottom: 1px solid white;
    margin: 0;
    padding: 1rem 0;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .score-history-table {
    margin-top: 1rem;
  }
</style>
