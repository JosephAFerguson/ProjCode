<script>
  import { onMount } from "svelte";
  import { entries as allEntries } from "../lib/Definitions.js";
  import blankImage from "/images/BlankImage.png";
  import Popup from "../components/Popup.svelte";

  let currentYear = 2025;
  let currentMonth = 8; 
  let days = [];
  let selectedDate = null;
  let workoutsByDate = {};
  let showPopup = false;
  let popupContent = "";
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i); 

  //had help of copilot here
  function buildWorkoutLookup() {
    workoutsByDate = {};
    for (const entry of allEntries) {
      const dateKey = entry.date; 
      if (!workoutsByDate[dateKey]) workoutsByDate[dateKey] = [];
      workoutsByDate[dateKey].push(entry);
    }
  }

  onMount(() => {
    generateDays(currentYear, currentMonth);
    buildWorkoutLookup();
  });

  //had some help from copilot here
  function generateDays(year, month) {
    const date = new Date(year, month, 1);
    const result = [];
    while (date.getMonth() === month) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    days = result;
  }

  function selectDate(day) {
    selectedDate = day.toISOString().split("T")[0];
  }

  function changeMonth(e) {
    currentMonth = +e.target.value;
    generateDays(currentYear, currentMonth);
    selectedDate = null;
  }

  function changeYear(e) {
    currentYear = +e.target.value;
    generateDays(currentYear, currentMonth);
    selectedDate = null;
  }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && selectedDate && workoutsByDate[selectedDate]?.length > 0) {
      workoutsByDate[selectedDate][0].image = URL.createObjectURL(file);
    }
  }
  function SaveEntry(date, workout) {
    workoutsByDate = { ...workoutsByDate };
    popupContent = "Entry Updated!";
    showPopup = true;
  }
  function handleRemoveSet(exercise, i) {
    exercise.Weights.splice(i, 1);
    exercise.Reps.splice(i, 1);
    workoutsByDate = { ...workoutsByDate};
  }

  function handleAddSet(exercise) {
    exercise.Weights.push("");
    exercise.Reps.push("");
    workoutsByDate = { ...workoutsByDate};
  }
  function closePopup() { showPopup = false; }
</script>

<div class="calendar-container">
  <div class="month-view">
    <div class="controls">
      <select on:change={changeMonth} bind:value={currentMonth}>
        {#each months as m, i}
          <option value={i}>{m}</option>
        {/each}
      </select>
      <select on:change={changeYear} bind:value={currentYear}>
        {#each years as y}
          <option value={y}>{y}</option>
        {/each}
      </select>
    </div>
    <div class="days-grid">
      {#each days as day}
        {@const dayKey = day.toISOString().split('T')[0]}
        <!--This aria/keydown stuff comes from copilot to prevent the warnings-->
        <button
          type="button"
          class="day {selectedDate === dayKey ? 'selected' : ''}"
          on:click={() => selectDate(day)}
          aria-pressed={selectedDate === dayKey}
        >
          <span>{day.getDate()}</span>
          {#if workoutsByDate[dayKey]?.length > 0}
            <span class="dot"></span>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <div class="entry-view">
    {#if selectedDate && workoutsByDate[selectedDate]?.length}
      {#each workoutsByDate[selectedDate] as workout}
        <div class="calendar-entry-side">

          <div class="image-journal-container">
            <div class="image-select-container">

              <div class="attachment">
                <img src={workout.image || blankImage} alt="WorkoutPic" />
              </div>

              <div class="imageinput">
                <label class="file-label" for="file-upload">Change Image</label>
                <input id="file-upload" type="file" accept="image/*" on:change={handleFileUpload} />
              </div>

            </div>
            <textarea placeholder="Entry notes..." bind:value={workout.entry}></textarea>

          </div>
          <div class="stats">
            <label>BW: <input type="number" bind:value={workout.bodyweight} /></label>
            <label class="protein-tracking">Protein: <input type="number" bind:value={workout.protein} /></label>
            <button on:click={() => SaveEntry()}>Save</button>
          </div>
        </div>
      {/each}
    {:else}
      <p>Select a Date</p>
    {/if}
  </div>
  <div class="workout-view">
    {#if selectedDate && workoutsByDate[selectedDate]?.length}
      {#each workoutsByDate[selectedDate] as workout}
        <div class="workout-details">
          {#each workout.workout as ithWorkout, wi}
            <div class="exercise-block">
              <div class="header">
                <input type="text" placeholder="Exercise" bind:value={ithWorkout.Exercise} />
              </div>
              {#each ithWorkout.Weights as w, si}
                <div class="set-row">
                  <span>Set {si + 1}</span>
                  <input type="text" placeholder="Weight" bind:value={ithWorkout.Weights[si]} />
                  <input type="text" placeholder="Reps" bind:value={ithWorkout.Reps[si]} />
                  <button class="removesetbutton" on:click={() => handleRemoveSet(ithWorkout, si)}>✖</button>
                </div>
              {/each}
              <button class="add-set" on:click={() => handleAddSet(ithWorkout)}>+ Add Set</button>
            </div>
          {/each}
        </div>
      {/each}
    {:else}
      <p>Select a Date</p>
    {/if}
  </div>
</div>


<Popup show={showPopup} onClose={closePopup} title="Workout Updated"/>

<style>
  .calendar-container {
    display: grid;
    grid-template-columns: 20% 20% 58%;
    grid-template-rows: 50% 50%;
    height: 97%;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-lm-bg);
    color: var(--color-lm-primary);
  }
  .month-view, .entry-view, .workout-view{
    padding: 1rem;
    box-shadow: 0 2px 8px var(--color-lm-other);
    border-radius: 0.5rem;
  }
  .month-view {
    grid-column: 1/3;
    grid-row: 1;
  }
  .entry-view {
    grid-column: 3;
    grid-row: 1;
  }
  .workout-view {
    grid-column: 1/4;
    grid-row:2;
    overflow-y: auto;
  }
  .controls {
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
  }
  .controls select {
    padding: 0.4rem 0.75rem;
    color: var(--color-lm-accent);
    border: 1px solid var(--color-lm-accent);
    box-shadow: 0 1px 4px var(--color-lm-other);
    border-radius: 0.5rem;
    font-size: 0.95rem;
  }
  .controls select:hover {
    border-color: var(--color-lm-primary);
    background: var(--color-lm-bg2)
  }
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  .day {
    background: var(--color-lm-accent);
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    color: var(--color-lm-other);
    font-size: 1rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.2s ease;
  }
  .day:hover, .day:focus {
    background: #555;
    transform: scale(1.05);
  }
  .day.selected, .day[aria-pressed="true"] {
    background: var(--color-lm-primary);
    font-weight: bold;
    box-shadow: 0 1px 4px var(--color-lm-other);
  }
  .dot {
    width: 6px;
    height: 6px;
    background: var(--color-lm-primary);
    border-radius: 50%;
    margin-top: 4px;
  }
  
  .image-journal-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .image-select-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 200px;
  }
  .image-journal-container textarea {
    flex: 1;
    resize: vertical;
    min-height: 20%;
    background: var(--color-lm-accent);
    color: var(--color-lm-other);
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
  }
  .attachment {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .attachment img {
    width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
  input[type="file"] {
    display: none;
  }
  .file-label {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: var(--color-lm-accent);
    color: var(--color-lm-other);
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .file-label:hover {
    box-shadow: 0 2px 5px var(--color-lm-other);
  }
  .stats {
    display: flex;
    gap: 1rem;
    color: var(--color-lm-other);
    justify-self: center;
    margin-top: 2%;
  }
  .stats button {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    background: var(--color-lm-secondary);
    border: none;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
  }
  .exercise-block {
    padding: 0.75rem;
    margin: 0.5rem;
    justify-items: center;
    width: 80%;
    background: var(--color-lm-accent);
    border-radius: 0.5rem;
    justify-self: center;
  }
  .set-row {
    gap: 0.5rem;
    align-items: center;
    width: 100%;
  }
  .set-row input {
    padding: 0.25rem 0.5rem;
    background: var(--color-lm-bg);
    color: var(--color-lm-accent);
    border: 1px solid var(--color-lm-other);
    border-radius: 0.3rem;
  }
  .set-row button{
    color: var(--color-lm-secondary);
  }
  .removesetbutton {
    background: transparent;
    border: none;
    color: var(--color-lm-bg);
    font-size: 1.2rem;
    cursor: pointer;
  }
  .removesetbutton:hover {
    transform: scale(1.2);
    color: var(--color-lm-primary);
  }
  .add-set {
    margin-top: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: var(--color-lm-secondary);
    color: var(--color-lm-bg);
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }
</style>
