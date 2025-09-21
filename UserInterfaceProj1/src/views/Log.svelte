<script>
  import Popup from "../components/Popup.svelte";
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
  <div class="left-top-panel">
    <div class="attachment">
      <img src={imageUrl} alt="Attachment Placeholder" />
      <input type="file" accept="image/*" on:change={handleFileUpload} />
    </div>
  </div>

  <div class="left-bottom-panel">
    <textarea class="notes" placeholder="Entry notes..." bind:value={notes}></textarea>
  </div>

  <div class="right-panel">
    <div class="header">
      <div class="header-row">
        <input type="text" placeholder="Title" bind:value={title} />
        <button on:click={submitLog}>Submit</button>
      </div>
    </div>

    <div class="stats">
      <div class="stats-row">
        <label>BW: <input type="number" bind:value={bw} /></label>
        <label>Protein: <input type="number" bind:value={protein} /></label>
       </div>
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

<Popup show={showPopup} onClose={closePopup} title="Workout Log Submitted" />

<style>
  .log-view {
    display: grid;
    height: 93%;
    width: 97%;
    grid-template-columns: 40% 60%;
    grid-template-rows: 60% 40%;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-lm-bg);
    color: var(--color-lm-primary);
  }
  .left-top-panel, .left-bottom-panel, .right-panel {
    display: grid;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 2px 8px var(--color-lm-other);
    border-radius: 0.5rem;
  }
  .left-top-panel {
    grid-column: 1; grid-row: 1; 
  }
  .left-bottom-panel { 
    grid-column: 1; grid-row: 2;
  }
  .right-panel { 
    grid-column: 2;
    grid-row: 1/3; 
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--color-lm-bg);
    box-shadow: 0 2px 8px var(--color-lm-other);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .attachment {
    border-radius: 0.5rem;
    padding: 1rem;
    text-align: center;
  }
  .attachment img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 0.5rem;
    background: var(--color-lm-bg3);
    object-fit: contain;
  }
  .attachment input[type="file"] {
    color: var(--color-lm-other);
  }
  .notes { 
    padding: 0.5rem; 
    border-radius: 0.5rem; 
    background: var(--color-lm-bg2); 
    color: var(--color-lm-other); 
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-row {
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }
  .header input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    background: var(--color-lm-bg);
    color: var(--color-lm-other);
    border: 1px solid var(--color-lm-accent);
    border-radius: 0.5rem;
  }
  .header button {
    padding: 0.6rem 1.2rem;
    background: var(--color-lm-secondary);
    color: var(--color-lm-bg);
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .stats {
    display: flex;
    gap: 1rem;
  }
  .stats-row {
    display: flex;
    gap: 1.25rem;
    width: 100%;
  }
  .stats label {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--color-lm-primary);
  }
  .stats input {
    flex: 1;
    margin-left: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-lm-accent);
    background: var(--color-lm-bg);
    color: var(--color-lm-other);
  }
  .lifts {
    flex: 1;
    background: var(--color-lm-bg);
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: inset 0 1px 4px var(--color-lm-other);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .lift {
    background: var(--color-lm-bg2);
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-lm-accent);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .lift-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lift-header h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-lm-primary);
  }
  .set-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .set-row span {
    font-size: 0.85rem;
    color: var(--color-lm-other);
  }
  .set-row input {
    flex: 1;
    padding: 0.5rem;
    background: var(--color-lm-bg);
    color: var(--color-lm-other);
    border: 1px solid var(--color-lm-other);
    border-radius: 0.5rem;
  }
  .add-set, .remove-set, .remove-lift, .add-lift {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .add-set {
    background: var(--color-lm-bg);
    color: var(--color-lm-primary);
    border: 1px solid var(--color-lm-other);
  }
  .remove-set, .remove-lift {
    background: var(--color-lm-secondary);
    color: var(--color-lm-bg);
  }
  .add-lift {
    align-self: center;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--color-lm-secondary);
    color: var(--color-lm-bg);
    font-weight: bold;
  }
</style>