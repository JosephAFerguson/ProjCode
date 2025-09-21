<script>
  import { bodyweightGoal } from "../lib/Goals.js";

  let currentDate = new Date().toDateString();
  export let weekStreak;
  export let userName;
  export let trendingTotal;
  export let trendingBodyweight;

  let goal = null;

  // Subscribe once when component loads
  bodyweightGoal.subscribe((value) => {
    goal = value;
  });

  //determines whether goal is met or not, had the help of ai for this equation
  $: meetsGoal = goal !== null && trendingBodyweight >= goal;
</script>

<div class="header">
  <div class="left">
    <h2 id="Name">{userName}</h2>
    <h2 id="CurrentDate">{currentDate}</h2>
  </div>
  
  <div class="right">
    <div class="card">
      <p class="label">Week Streak</p>
      <p class="value">{weekStreak} weeks</p>
    </div>
    <div class="card">
      <p class="label">Total</p>
      <p class="value">{trendingTotal} lbs</p>
    </div>
    <div class="card">
      <p class="label">Bodyweight</p>
      <p class="value {meetsGoal ? 'goal-met' : ''}">
        {trendingBodyweight} lbs
      </p>
    </div>
  </div>
</div>

<style>
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-lm-bg2);
    color: var(--color-lm-primary);
    padding: 0 2rem;
    border-bottom: 2px solid var(--color-lm-accent);
  }
  #CurrentDate {
    margin-left: 2%;
  }
  .left {
    display: flex;
    width: 30%;
    gap: 1rem;
    flex-direction: row;
    align-items: center;
  }
  .right {
    display: flex;
    gap: 1rem;
  }
  .card {
    background: var(--color-lm-accent);
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    min-width: 120px;
    max-width: 3%;
    max-height: inherit;
  }
  .label {
    font-size: 0.8rem;
    color: var(--color-lm-other);
    margin: 0;
  }
  .value {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.25rem 0 0;
    color: var(--color-lm-primary);
  }
  .goal-met {
    color: green;
  }
</style>
