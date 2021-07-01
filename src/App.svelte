<!-- FUNCTIONS  -->
<script>
  import Store from "./stores/playerData.js";
  import ActivePlayerOne from "./stores/activePlayer.js";
  import PlayerScoreCard from "./components/PlayerScoreCard.svelte";

  // define players and data
  let players;
  Store.subscribe((data) => {
    players = data;
  });

  // form handler functions

  // find and change active player
  let activePlayerOne;
  ActivePlayerOne.subscribe((data) => (activePlayerOne = data));

  let togglePlayer = () => {
    if (activePlayerOne) {
      players[0].active = false;
      players[1].active = true;
    } else {
      players[0].active = true;
      players[1].active = false;
    }
    activePlayerOne = !activePlayerOne;
  };

  // calculate current score for each player

  let setPlayerOneScore = () => {
    players[0].score = 0;

    let previousHits = players[0].history;
    let totalScore = 0;

    previousHits.forEach((data) => {
      let roundScore = 0;
      let scores = data.hits;
      scores.forEach((score) => (roundScore = roundScore + score));

      totalScore = Number(totalScore) + Number(roundScore);
    });

    players[0].score = 501 - totalScore;
  };

  let setPlayerTwoScore = () => {
    let previousHits = players[1].history;
    let totalScore = 0;

    previousHits.forEach((data) => {
      let roundScore = 0;
      let scores = data.hits;
      scores.forEach((score) => (roundScore = roundScore + score));

      totalScore = Number(totalScore) + Number(roundScore);
    });
    players[1].score = 501 - totalScore;
  };

  setPlayerOneScore();
  setPlayerTwoScore();

  // save score

  // add check if score is 0 you cant submit
  // add check if score is more than 180 you cant submit
  // add on input new number replaces score 0

  let currentScore = "";

  let handleScoreChange = (e) => {
    currentScore = e.target.value;
  };

  let saveScore = (e) => {
    e.preventDefault();
    //find max round

    let maxRound = 0;
    let findMaxRound = (player) => {
      player.forEach((data) => {
        if (data.round > maxRound) {
          maxRound = data.round;
        }
      });
    };

    if (activePlayerOne) {
      let player = players[0].history;
      let playerCurrentScore = players[0].score;

      if (currentScore > 180) {
        console.log(currentScore);
        findMaxRound(player);

        alert("Are you sure you wrote that well?");

        return;
      }

      if (currentScore > playerCurrentScore) {
        findMaxRound(player);
        player.push({ round: maxRound + 1, hits: [0] });
        setPlayerOneScore();

        currentScore = "";
        togglePlayer();
        return;
      }

      if (Number(currentScore) === playerCurrentScore) {
        findMaxRound(player);
        alert(`${players[0].name} won`);
        currentScore = "";
        players[0].score = 501;
        players[1].score = 501;
        players[0].history = [];
        players[1].history = [];
        return;
      }

      findMaxRound(player);
      player.push({ round: maxRound + 1, hits: [Number(currentScore)] });
      setPlayerOneScore();
    } else {
      let player = players[1].history;
      let playerCurrentScore = players[1].score;

      if (currentScore > 180) {
        console.log(currentScore);
        findMaxRound(player);

        alert("Are you sure you wrote that well?");

        return;
      }

      if (currentScore > playerCurrentScore) {
        findMaxRound(player);
        player.push({ round: maxRound + 1, hits: [0] });
        setPlayerOneScore();

        currentScore = "";
        togglePlayer();
        return;
      }

      if (Number(currentScore) > 180) {
        findMaxRound(player);

        alert("Are you sure you wrote that well?");

        return;
      }

      if (currentScore > playerCurrentScore) {
        findMaxRound(player);
        player.push({ round: maxRound + 1, hits: [0] });
        setPlayerOneScore();

        currentScore = "";
        togglePlayer();
        return;
      }

      if (Number(currentScore) === playerCurrentScore) {
        findMaxRound(player);
        alert(`${players[1].name} won`);
        currentScore = "";
        players[0].score = 501;
        players[1].score = 501;
        players[0].history = [];
        players[1].history = [];
        return;
      }

      findMaxRound(player);
      player.push({ round: maxRound + 1, hits: [Number(currentScore)] });
      setPlayerTwoScore();
    }

    currentScore = "";
    togglePlayer();
  };
</script>

<!-- CONTENT  -->

<main>
  <div class="player-scores">
    {#each players as player}
      <PlayerScoreCard playerData={player} />
    {/each}
  </div>
  <form on:submit={saveScore}>
    <input type="number" name="score" class="score-input" bind:value={currentScore} on:input={handleScoreChange} placeholder="Enter score" />
    <input type="submit" value="Submit" class="submit-button" />
  </form>
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
    min-height: 100vh;
  }

  .player-scores {
    display: flex;
  }

  .submit-button,
  .score-input {
    color: #121641;
  }
</style>
