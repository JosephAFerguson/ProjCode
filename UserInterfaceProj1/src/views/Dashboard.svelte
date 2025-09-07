<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chartCanvas;
  let chart;
  
  // Example data
  let labels = [
    "2025-09-01","2025-09-02","2025-09-03","2025-09-04","2025-09-05",
    "2025-09-06","2025-09-07"
  ];
  let squatAmounts = [290, 305, 265, 255, 260, 275, 305];
  let benchAmounts = [185, 200, 220, 205, 230, 215, 225];
  let deadliftAmounts = [340, 365, 355, 350, 395, 380, 385];

  let visibleDays = 7; // controlled by slider

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Squat (lbs)",
            data: squatAmounts,
            borderColor: "#4cafef",
            backgroundColor: "rgba(76, 175, 239, 0.2)",
            tension: 0.3,
            fill: true
          },
          {
            label: "Bench (lbs)",
            data: benchAmounts,
            borderColor: "#4cafef",
            backgroundColor: "rgba(76, 175, 239, 0.2)",
            tension: 0.3,
            fill: true
          },
          {
            label: "Deadlift (lbs)",
            data: deadliftAmounts,
            borderColor: "#4cafef",
            backgroundColor: "rgba(76, 175, 239, 0.2)",
            tension: 0.3,
            fill: true
          }
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
  <!-- Vertical slider for time scroll -->
  <input
    type="range"
    min="3"
    max={labels.length}
    bind:value={visibleDays}
    on:input={updateChart}
    class="time-scroll"
  />

  <!-- Chart -->
  <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>

<style>
  .dashboard {
    display: flex;
    position: fixed;
    top:15rem;
    left: 28rem;
    align-items: stretch;
    height: 40rem;
    width: 80rem;
  }

  .time-scroll {
    writing-mode: vertical-lr; /* makes it vertical */
    transform: rotate(180deg); /* flip direction */
    margin-right: 1rem;
    height: 100%;
  }

  .chart-container {
    flex: 1;
    position: relative;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
