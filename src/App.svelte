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

  // test api sap
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic U0NPS0lDOkFUSmQmNzlMXzlE");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://zeta.sportvision.lan:44300/sap/bc/zrest_test?sap-client=250&carrid=AA", requestOptions)
    .then((response) => JSON.stringify(response))
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // fetch("https://api.hnb.hr/tecajn/v2?format=json").then(response => response.text()).then(result => console.log(result))

  // test api sap

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

        alert("Hey, no cheating! Score can be maximum 180 points.");

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
  <div class="input-form-wrapper">
    <form class="input-form" on:submit={saveScore}>
      <input type="number" name="score" class="score-input" bind:value={currentScore} on:input={handleScoreChange} placeholder="Enter score" />
      <input type="submit" value="Submit" class="submit-button" />
    </form>
  </div>
</main>

<!-- STYLING  -->
<style>
  :global(body) {
    padding: 0;
    background-color: #121641;
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
    align-items: flex-start;
  }

  .submit-button,
  .score-input {
    color: #121641;
  }

  .score-input {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    padding-left: 0;
    border-bottom: 1.5px solid white;
    padding-bottom: 0.75rem;
  }

  .score-input::placeholder {
    color: white;
    transition: 0.1s ease;
  }

  /* Chrome, Safari, Edge, Opera */
  .score-input::-webkit-outer-spin-button,
  .score-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  .score-input[type="number"] {
    -moz-appearance: textfield;
  }

  .score-input:focus-within::placeholder {
    color: transparent;
  }

  form {
    display: flex;
    flex-direction: column;
    transform: translateX(15px);
  }

  .input-form {
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
  }

  .submit-button {
    top: 150px;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    text-transform: uppercase;
    padding: 0.75rem;
    cursor: pointer;
    transition: 0.15s;
  }

  .submit-button:hover {
    color: #121641;
    background-color: white;
  }

  @media only screen and (max-width: 1000px) {
    main {
      flex-direction: column;
      position: relative;
      padding-bottom: 175px;
      padding-top: 25px;
    }

    .input-form-wrapper {
      box-sizing: border-box;
      position: fixed;
      padding-top: 1rem;
      padding-bottom: 1rem;
      bottom: 0;
      width: 100vw;
      left: 0;
      align-items: center;
      z-index: 200;
      background-color: #121641;
    }

    form {
      transform: translateX(0);
      margin: auto;
      width: 90%;
    }

    .player-scores {
      margin: auto;
      margin-top: 0;
    }
  }
</style>
