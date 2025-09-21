<script>
  import { onMount } from "svelte";
  import { bodyweightGoal } from "../lib/Goals.js";
  import Popup from "../components/Popup.svelte";

  let darkMode = false;
  let trackProtein = true;
  let newGoal = "";
  let showPopup = false;

  //mounts the tracking of darkmode and protein using localStorage
  // some code came from google and copilot
  onMount(() => {
    const savedDark = localStorage.getItem("darkMode");
    if (savedDark) {
      darkMode = JSON.parse(savedDark);
      applyTheme();
    }

    const savedProtein = localStorage.getItem("trackProtein");
    if (savedProtein) {
      trackProtein = JSON.parse(savedProtein);
      applyProteinSetting();
    }
  });

  function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    applyTheme();
  }

  function applyTheme() {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleProteinTracking() {
    trackProtein = !trackProtein;
    localStorage.setItem("trackProtein", JSON.stringify(trackProtein));
    applyProteinSetting();
  }

  function applyProteinSetting() {
    if (!trackProtein) {
      document.documentElement.classList.add("no-protein");
    } else {
      document.documentElement.classList.remove("no-protein");
    }
  }

  function setGoal() {
    if (newGoal && !isNaN(Number(newGoal))) {
      bodyweightGoal.set(Number(newGoal));
      showPopup = true;
    }
  }
  function closePopup() { showPopup = false; }
</script>

<div class="settings-container">
  <button on:click={toggleDarkMode}>
    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  </button>

  <button on:click={toggleProteinTracking}>
    {trackProtein ? "Disable Protein Tracking" : "Enable Protein Tracking"}
  </button>

  <div class="goal-container">
    <input
      type="number"
      placeholder="Enter bodyweight goal"
      bind:value={newGoal}
    />
    <button on:click={setGoal}>Set Goal</button>
  </div>
</div>

<Popup show={showPopup} onClose={closePopup} title="Goal Added"></Popup>

<style>
  /*simple styles here, didnt have much time left*/
  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .goal-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  input {
    padding: 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid #ccc;
    width: 10rem;
  }
  button {
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background: var(--color-lm-accent);
    color: var(--color-lm-other);
  }
</style>
