<script>
  import { exercises, allSets } from "../lib/Definitions.js";
  import blankImage from "/images/BlankImage.png";

  let imageUrl = blankImage;
  let title = "";
  let bw = "";
  let protein = "";
  let notes = "";
  let showPopup = false;
  let popupContent = "";

  // Default lifts with sets if available
  let lifts = [
    { 
      name: "Bench Press", 
      sets: allSets["Bench Press"] ? allSets["Bench Press"].map(s => ({ weight: String(s.weight ?? ""), reps: String(s.reps ?? "") })) : [{ weight: "", reps: "" }] 
    },
  ];

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
  }

  function selectExerciseSets(lift) {
    // Update sets if exercise exists in allSets
    lift.sets = allSets[lift.name]
      ? allSets[lift.name].map(s => ({ weight: String(s.weight ?? ""), reps: String(s.reps ?? "") }))
      : [{ weight: "", reps: "" }];
  }
  function addSet(liftIndex) {
    lifts[liftIndex].sets = [...lifts[liftIndex].sets, { weight: "", reps: "" }];
  }

  function removeSet(liftIndex, setIndex) {
    lifts[liftIndex].sets = lifts[liftIndex].sets.filter((_, i) => i !== setIndex);
  }

  function removeLift(liftIndex) {
    lifts = lifts.filter((_, i) => i !== liftIndex);
  }

  function addLift() {
    lifts = [...lifts, { name: "New Lift", sets: [{ weight: "", reps: "" }] }];
  }

  function submitLog() {
    popupContent = "Entry Submitted!";
    showPopup = true;
  }

  function closePopup() { showPopup = false; }
</script>

<div class="log-view">
  <!-- Left panel -->
  <div class="left-panel">
    <div class="attachment">
      <img src={imageUrl} alt="Attachment Placeholder" />
      <input type="file" accept="image/*" on:change={handleFileUpload} />
    </div>
    <textarea class="notes" placeholder="Entry notes..." bind:value={notes}></textarea>
  </div>

  <!-- Right panel -->
  <div class="right-panel">
    <div class="header">
      <input type="text" placeholder="Title" bind:value={title} />
      <button on:click={submitLog}>Submit</button>
    </div>

    <div class="stats">
      <label>BW: <input type="number" bind:value={bw} /></label>
      <label>Protein: <input type="number" bind:value={protein} /></label>
    </div>

    <div class="lifts">
      {#each lifts as lift, i}
        <div class="lift">
          <div class="lift-header">
            <h4>Lift {i + 1}:</h4>
            <button class="remove-lift" on:click={() => removeLift(i)}>Remove Lift</button>
          </div>

          <input
            list="exercise-list"
            placeholder="Exercise"
            bind:value={lift.name}
            on:change={() => selectExerciseSets(lift)}
          />
          <datalist id="exercise-list">
            {#each exercises as ex}
              <option value={ex} />
            {/each}
          </datalist>

          {#each lift.sets as set, j}
            <div class="set-row">
              <span>Set {j + 1}</span>
              <input type="text" placeholder="W" bind:value={set.weight} />
              <input type="text" placeholder="Reps" bind:value={set.reps} />
              <button class="remove-set" on:click={() => removeSet(i, j)}>✖</button>
            </div>
          {/each}

          <div class="set-controls">
            <button class="add-set" on:click={() => addSet(i)}>+ Add Set</button>
          </div>
        </div>
      {/each}


      <button class="add-lift" on:click={addLift}>+ Add Lift</button>
    </div>
  </div>
</div>

{#if showPopup}
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
      <h3>Workout Log Submitted</h3>
      <pre>{popupContent}</pre>
      <button on:click={closePopup}>Close</button>
    </div>
  </div>
{/if}

<style>
  .log-view {
    display: flex;
    gap: 1rem;
    height: 100%;
  }

  /* Left panel */
  .left-panel {
    flex: 1;
    background: #222;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .attachment {
    background: #333;
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
    color: white;
  }
  .attachment img {
    width: 100%;
    border-radius: 0.5rem;
    background: #444;
    object-fit: cover;
  }
  .attachment input[type="file"] {
    color: white;
  }
  .notes {
    flex: 1;
    margin-top: 1rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background: #333;
    color: white;
    max-height: 40rem;
  }
  textarea {
    flex: 1;
    width: 100%;
    background: #333;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    resize: none;
  }

  /* Right panel */
  .right-panel {
    flex: 2;
    background: #222;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .header input {
    flex: 1;
    padding: 0.5rem;
  }

  .header button {
    padding: 0.5rem 1rem;
    background: darkred;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .stats {
    display: flex;
    gap: 1rem;
    color: white;
  }

  .stats input {
    width: 80px;
    padding: 0.25rem;
    margin-left: 0.25rem;
  }


  .lift {
    background: #333;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    color: white;
  }

  .lift-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .set-row {
    display: flex;
    gap: 0.5rem;
    margin: 0.25rem 0;
    align-items: center;
  }

  .set-row input {
    flex: 1;
    padding: 0.25rem;
  }

  .add-set, .remove-set, .remove-lift, .add-lift {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .add-set {
    background: #444;
    color: white;
    margin-top: 0.5rem;
  }

  .remove-set {
    background: darkred;
    color: white;
  }

  .remove-lift {
    background: darkred;
    color: white;
    font-size: 0.8rem;
  }

  .add-lift {
    background: darkgreen;
    color: white;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    font-weight: bold;
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

  .popup {
    background: #222;
    color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 500px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
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

  .popup pre {
    background: #333;
    padding: 1rem;
    border-radius: 0.25rem;
    white-space: pre-wrap;
  }
</style>

