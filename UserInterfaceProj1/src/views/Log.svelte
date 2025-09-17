<script>
  // Import exercises list
  import {exercises} from "../lib/Definitions.js";
  import blankImage from "../lib/BlankImage.png"; // your placeholder
  let imageUrl = blankImage; // default to placeholder

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
  }

  let title = "";
  let bw = "";
  let protein = "";
  let notes = "";
  let lifts = [
    {
      name: "Bench Press",
      sets: [{ weight: "", reps: "" }]
    },
    {
      name: "Squat",
      sets: [{ weight: "", reps: "" }]
    }
  ];

  function addSet(liftIndex) {
    lifts[liftIndex].sets = [
      ...lifts[liftIndex].sets,
      { weight: "", reps: "" }
    ];
  }

  function removeSet(liftIndex, setIndex) {
    lifts[liftIndex].sets = lifts[liftIndex].sets.filter((_, i) => i !== setIndex);
  }

  function removeLift(liftIndex) {
    lifts = lifts.filter((_, i) => i !== liftIndex);
  }

  function addLift() {
    lifts = [
      ...lifts,
      { name: "New Lift", sets: [{ weight: "", reps: "" }] }
    ];
  }

  function submitLog() {
    const log = {
      title,
      bw,
      protein,
      notes,
      lifts
    };
    alert("Workout log submitted!");
  }
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

  .scrollable {
    overflow-y: auto;
    flex: 1;
    padding-right: 0.5rem;
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
</style>
