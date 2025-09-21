<script>
  import { onMount } from "svelte";

  let darkMode = false;
  let trackProtein = true;

  // Load saved preferences
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
</script>

<div class="settings-container">
  <button on:click={toggleDarkMode}>
    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  </button>

  <button on:click={toggleProteinTracking}>
    {trackProtein ? "Disable Protein Tracking" : "Enable Protein Tracking"}
  </button>
</div>

<style>
  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  button {
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background: var(--color-lm-accent);
    color: var(--color-lm-other);
  }
  :root {
    --btn-bg: #eee;
    --btn-text: #111;
  }
</style>

