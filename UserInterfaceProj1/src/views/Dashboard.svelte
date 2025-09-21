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
  let activeMetric = null; // null = show all

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: { ticks: { display: true } },
          y: { beginAtZero: false }
        }
      }
    });

    updateChart(); // draw initial chart with all metrics
  });

  function updateChart() {
    const start = Math.max(0, labels.length - visibleDays);
    chart.data.labels = labels.slice(start);

    if (activeMetric === "squat") {
      chart.data.datasets = [
        { label: "Squat (lbs)", data: squatAmounts.slice(start), borderColor: "#4cafef", backgroundColor: "rgba(76, 175, 239, 0.2)", tension: 0, fill: false }
      ];
    } else if (activeMetric === "bench") {
      chart.data.datasets = [
        { label: "Bench (lbs)", data: benchAmounts.slice(start), borderColor: "#ef4ca5", backgroundColor: "rgba(239, 76, 165, 0.2)", tension: 0, fill: false }
      ];
    } else if (activeMetric === "deadlift") {
      chart.data.datasets = [
        { label: "Deadlift (lbs)", data: deadliftAmounts.slice(start), borderColor: "#4cef76", backgroundColor: "rgba(76, 239, 118, 0.2)", tension: 0, fill: false }
      ];
    } else {
      // show all
      chart.data.datasets = [
        { label: "Squat (lbs)", data: squatAmounts.slice(start), borderColor: "#4cafef", backgroundColor: "rgba(76, 175, 239, 0.2)", tension: 0, fill: false },
        { label: "Bench (lbs)", data: benchAmounts.slice(start), borderColor: "#ef4ca5", backgroundColor: "rgba(239, 76, 165, 0.2)", tension: 0, fill: false },
        { label: "Deadlift (lbs)", data: deadliftAmounts.slice(start), borderColor: "#4cef76", backgroundColor: "rgba(76, 239, 118, 0.2)", tension: 0, fill: false }
      ];
    }

    chart.update();
  }

  function updateChartByMetric(metric) {
    if (activeMetric === metric) {
      activeMetric = null; // second click resets filter
    } else {
      activeMetric = metric;
    }
    updateChart();
  }
</script>



<div class="dashboard">
  <div class="metrics">
    <div
      class="metrics-card {activeMetric === 'squat' ? 'active' : activeMetric ? 'inactive' : ''}"
      onclick={() => updateChartByMetric('squat')}
    >
      <p>Squat</p>
      <p>305 lbs</p>
    </div>
    <div
      class="metrics-card {activeMetric === 'bench' ? 'active' : activeMetric ? 'inactive' : ''}"
      onclick={() => updateChartByMetric('bench')}
    >
      <p>Bench</p>
      <p>225 lbs</p>
    </div>
    <div
      class="metrics-card {activeMetric === 'deadlift' ? 'active' : activeMetric ? 'inactive' : ''}"
      onclick={() => updateChartByMetric('deadlift')}
    >
      <p>Deadlift</p>
      <p>385 lbs</p>
    </div>
  </div>

  <div class="chart-container">
    <div class="scroll-wrapper">
      <div class="ticks">
        {#each labels as date, i}
          <div class="tick">{date}</div>
        {/each}
      </div>
      <input
        type="range"
        min="1"
        max={labels.length}
        step="1"
        bind:value={visibleDays}
        oninput={updateChart}
        class="time-scroll"
      />
    </div>

    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>
<style>
  .dashboard {
    display:inline;
    flex-direction: column; /* stack metrics on top of chart */
    align-items: center;
    max-height: 90%;
    max-width: 90%;
    background: var(--color-lm-bg);
  }
  .metrics {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .metrics-card {
    background: var(--color-lm-accent);
    color: var(--color-lm-primary);
    padding: 1rem 1rem;
    margin-top: 2%;
    margin-left: 7.5%;
    width: 15%;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px var(--color-lm-other);
    text-align: center;
    cursor: pointer;
  }
  .metrics-card p {
    margin: 0.25rem 0;
    font-weight: bold;
  }
  .metrics-card.active {
    outline: 2px solid var(--color-lm-bg);
    transform: scale(1.05);
  }
  .metrics-card.inactive {
    opacity: 0.4;
  }
  .chart-container {
    display: flex;
    justify-self: center;
    margin-top: 2%;
    height: 75%; 
    width: 90%;
    position: relative;
  }
  .chart-container canvas {
    box-shadow: 0 2px 8px var(--color-lm-bg);
    border-radius: 0.5rem;
  }
  .time-scroll {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    max-height: 100%;
  }
  .scroll-wrapper {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    max-height: 100%;
  }

  .ticks {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 0.5rem;
  }

  .tick {
    font-size: 0.7rem;
    color: var(--color-lm-other);
    writing-mode: horizontal-tb; 
  }

  .time-scroll {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    max-height: 100%;
  }
  canvas {
    flex: 1;
    height: 100% !important;
    width: 100% !important;
    display: block;
  }
</style>

