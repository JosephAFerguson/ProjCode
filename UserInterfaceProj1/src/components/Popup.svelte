<script>
  export let show = false;
  export let onClose = () => {};
  export let title = "Popup";

  function closePopup() {
    onClose();
  }
</script>

{#if show}
  <div
    class="popup-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close popup"
    on:click={closePopup}
    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closePopup(); }}
  >
    <div
      class="popup"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <h3>{title}</h3>
      <button on:click={closePopup}>Close</button>
    </div>
  </div>
{/if}

<style>
  .popup {
    background: var(--color-lm-bg);
    color: var(--color-lm-secondary);
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 500px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
  }
  .popup-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .popup button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: darkred;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
