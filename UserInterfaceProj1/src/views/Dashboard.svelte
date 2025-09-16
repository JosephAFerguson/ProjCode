<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartCanvas;
  let chart;

  let labels = [
    "2025-09-01","2025-09-02","2025-09-03","2025-09-04","2025-09-05",
    "2025-09-06","2025-09-07"
  ];
  let squatAmounts = [290, 305, 265, 255, 260, 275, 305];
  let benchAmounts = [185, 200, 220, 205, 230, 215, 225];
  let deadliftAmounts = [340, 365, 355, 350, 395, 380, 385];

  let visibleDays = 7;

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Squat (lbs)", data: squatAmounts, borderColor: "#4cafef", backgroundColor: "rgba(76, 175, 239, 0.2)", tension: 0, fill: true },
          { label: "Bench (lbs)", data: benchAmounts, borderColor: "#ef4ca5", backgroundColor: "rgba(239, 76, 165, 0.2)", tension: 0, fill: true },
          { label: "Deadlift (lbs)", data: deadliftAmounts, borderColor: "#4cef76", backgroundColor: "rgba(76, 239, 118, 0.2)", tension: 0, fill: true }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { maxRotation: 0 } },
          y: { beginAtZero: false }
        }
      }
    });
  });

  function updateChart() {
    const start = Math.max(0, labels.length - visibleDays);
    chart.data.labels = labels.slice(start);
    chart.data.datasets[0].data = squatAmounts.slice(start);
    chart.data.datasets[1].data = benchAmounts.slice(start);
    chart.data.datasets[2].data = deadliftAmounts.slice(start);
    chart.update();
  }
</script>

<div class="dashboard">
  <div class="metrics">
    <div class="metrics-card">
      <p>Squat</p>
      <p>305 lbs</p>
    </div>
    <div class="metrics-card">
      <p>Bench</p>
      <p>225 lbs</p>
    </div>
    <div class="metrics-card">
      <p>Deadlift</p>
      <p>385 lbs</p>
    </div>
  </div>

  <div class="chart-container">
    <!-- Slider on the left -->
    <input
      type="range"
      min="3"
      max={labels.length}
      bind:value={visibleDays}
      on:input={updateChart}
      class="time-scroll"
    />
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>
<style>
  .dashboard {
    display: flex;
    flex-direction: column; /* stack metrics on top of chart */
    align-items: center;
    padding: 1rem;
    height: 90vh;
    box-sizing: border-box;
    gap: 1.5rem;
    overflow: hidden;
  }

  .metrics {
    display: flex;
    gap: 2rem; /* horizontal gap between cards */
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .metrics-card {
    background: #3a3a3a;
    color: white;
    padding: 1rem 1.5rem;
    margin-top: 2.5rem;
    margin-left: 10rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    text-align: center;
    min-width: 250px;
  }

  .metrics-card p {
    margin: 0.25rem 0;
    font-weight: bold;
  }

  .chart-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2.5rem;
    max-height: 70vh; /* smaller chart */
    width: 90%;
    position: relative;
  }

  .time-scroll {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    height: 100%;
  }

  canvas {
    flex: 1;
    height: 100% !important;
    width: 100% !important;
    display: block;
  }
</style>

