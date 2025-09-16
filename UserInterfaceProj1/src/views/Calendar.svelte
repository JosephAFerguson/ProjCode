<script>
  import { onMount } from "svelte";

  let currentYear = 2025;
  let currentMonth = 6; // July (0-based index)
  let days = [];
  let selectedDate = null;
  
  // Mock workout data
  let workouts = {
    "2025-07-02": { title: "Leg Day", exercises: ["Squat", "Deadlift"] },
    "2025-07-10": { title: "Push Day", exercises: ["Bench Press", "Overhead Press"] },
    "2025-07-15": { title: "Pull Day", exercises: ["Pull-ups", "Rows"] }
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020–2030

  onMount(() => {
    generateDays(currentYear, currentMonth);
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
  <!-- Month View on Top -->
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
        <div 
          class="day {selectedDate === day.toISOString().split('T')[0] ? 'selected' : ''}"
          on:click={() => selectDate(day)}
        >
          {day.getDate()}
        </div>
      {/each}
    </div>
  </div>

  <!-- Entry View Below -->
  <div class="entry-view">
    {#if selectedDate}
      <h3>{selectedDate}</h3>
      {#if workouts[selectedDate]}
        <div class="entry">
          <h4>{workouts[selectedDate].title}</h4>
          <ul>
            {#each workouts[selectedDate].exercises as ex}
              <li>{ex}</li>
            {/each}
          </ul>
        </div>
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
    flex-direction: column; /* stack vertically */
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
    padding: 1rem;
    background: #444;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .day:hover {
    background: #555;
  }

  .day.selected {
    background: darkred;
    color: white;
  }

  .entry-view {
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: left;
    flex: 1; /* grows to fill remaining space */
  }

  .entry {
    background: #444;
    padding: 0.75rem;
    border-radius: 0.25rem;
  }

  .entry h4 {
    margin-bottom: 0.5rem;
  }
</style>
