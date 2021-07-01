<script>
  export let score;
  let scoreHits = score.hits;
</script>

<div class="table-item">
  <span class="round-number">{score.round}</span>
  <div class="score-hits">
    {#each scoreHits as scoreHit}
      <span class="round-hit">{scoreHit}</span>
    {/each}
  </div>
</div>

<style>
  .table-item {
    margin: 0;
    padding: 0.5rem 0;
    line-height: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .round-hit {
    margin-left: 1rem;
  }
</style>
