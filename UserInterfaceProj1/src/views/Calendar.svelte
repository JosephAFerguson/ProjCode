<script>
  import { onMount } from "svelte";
  import { entries as allEntries } from "../lib/Definitions.js";
  import blankImage from "/images/BlankImage.png";
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

  function buildWorkoutLookup() {
    workoutsByDate = {};
    for (const entry of allEntries) {
      const dateKey = entry.date; // ISO format "YYYY-MM-DD"
      if (!workoutsByDate[dateKey]) workoutsByDate[dateKey] = [];
      workoutsByDate[dateKey].push(entry);
    }
  }

  onMount(() => {
    generateDays(currentYear, currentMonth);
    buildWorkoutLookup();
  });

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
  function closePopup() { showPopup = false; }

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
            <label>Protein: <input type="number" bind:value={workout.protein} /></label>
            <button on:click={() => SaveEntry()}>Save</button>
          </div>
        </div>
      {/each}
    {:else}
      <p>Select a date to view/edit</p>
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
    {/if}
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
  .calendar-container {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 50% 50%;
    height: 100%;
    gap: 1rem;
    padding: 1rem;
    background: #1a1a1a;
    color: #eee;
    font-family: system-ui, sans-serif;
  }

  .month-view {
    background: #2a2a2a;
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
  }

  .controls select {
    padding: 0.4rem 0.75rem;
    background: #1a1a1a;
    color: #eee;
    border: 1px solid #444;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    transition: border 0.2s, background 0.2s;
  }
  .controls select:hover {
    border-color: #777;
    background: #222;
  }

  .entry-view {
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    background: #111;
    color: #eee;
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
  .stats {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }
  .stats button {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    background: darkred;
    border: none;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
  .file-label {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: #444;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .file-label:hover {
    background-color: #0056b3;
  }
 
  .days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  }

.day {
  background: #3a3a3a;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;
  color: #ddd;
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
  background: #b22222;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 0 6px rgba(178,34,34,0.6);
}
.dot {
  width: 6px;
  height: 6px;
  background: #ff6b6b;
  border-radius: 50%;
  margin-top: 4px;
}
  .set-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
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
  .popup pre {
    background: #333;
    padding: 1rem;
    border-radius: 0.25rem;
    white-space: pre-wrap;
  }
</style>
