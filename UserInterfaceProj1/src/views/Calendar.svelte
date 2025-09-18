<script>
  import { onMount } from "svelte";
  import { entries as allEntries } from "../lib/Definitions.js";

  let currentYear = 2025;
  let currentMonth = 8; // September (0-based index)
  let days = [];
  let selectedDate = null;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020–2030

  // Create a lookup object: workoutsByDate[date] = [array of entries on that date]
  let workoutsByDate = {};
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
</script>

<div class="calendar-container">
  <!-- Month View -->
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

  <!-- Entry View -->
  <div class="entry-view">
    {#if selectedDate}
      <h3>{selectedDate}</h3>
      {#if workoutsByDate[selectedDate]?.length}
        {#each workoutsByDate[selectedDate] as workout}
          <div class="entry">
            {#if workout.image}
              <img src={workout.image} alt={workout.exercise} />
            {/if}
            <h4>{workout.exercise}</h4>
            {#if workout.entry}
              <p>{workout.entry}</p>
            {/if}
            <p>Protein: {workout.protein}g | Bodyweight: {workout.bodyweight} lbs</p>

            {#if workout.sets.length}
              <table>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Weight</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {#each workout.sets as set, i}
                    <tr>
                      <td>{i + 1}</td>
                      <td>{set.weight}</td>
                      <td>{set.reps}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            {:else}
              <p>No sets logged.</p>
            {/if}
          </div>
        {/each}
      {:else}
        <p>No workout on this date.</p>
      {/if}
    {:else}
      <p>Select a date to view details</p>
    {/if}
  </div>
</div>

<style>
  .calendar-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  .month-view {
    background: #333;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .controls {
    display: flex;
    gap: 3rem;
    margin-bottom: 1rem;
    justify-content: center;
    align-items: center;
  }

  .controls select {
    padding: 1rem;
    background: #222;
    color: white;
    border: 1px solid #555;
    border-radius: 0.25rem;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2rem;
  }

  .day {
    padding: 0.75rem 0.25rem;
    background: #444;
    border-radius: 0.25rem;
    cursor: pointer;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;
    text-align: center;
    position: relative; /* for dot positioning */
    transition: background 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dot {
    width: 6px;
    height: 6px;
    background: #ff5555; /* red dot */
    border-radius: 50%;
    margin-top: 3px;
  }


  .day:hover, .day:focus {
    background: #555;
  }

  .day.selected, .day[aria-pressed="true"] {
    background: darkred;
    color: white;
  }

  .entry-view {
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: left;
    flex: 1;
    overflow-y: auto;
  }

  .entry {
    background: #444;
    padding: 0.75rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }

  .entry img {
    width: 100%;
    border-radius: 0.5rem;
    background: #444;
    object-fit: cover;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.5rem;
  }

  th, td {
    border: 1px solid #666;
    padding: 0.25rem 0.5rem;
    text-align: center;
  }

  th {
    background: #555;
  }
</style>
