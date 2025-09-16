<script>
  export let userName;
  export let weekStreak;
  export let trendingTotal;
  export let trendingBodyweight;
</script>

<header class="header">
  <h2 id="Name">{userName}</h2>
  <p id="WeekStreak">{weekStreak} Weeks Straight!</p>

  
  <div class="right">
    <div class="card">
      <p class="label">Total</p>
      <p class="value">{trendingTotal}</p>
    </div>
    <div class="card">
      <p class="label">Bodyweight</p>
      <p class="value">{trendingBodyweight} lbs</p>
    </div>
  </div>
</header>

<style>
  .header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background, #3a3a3a);
    color: var(--textcolor, red);
    padding: 0 2rem;
    border-bottom: 2px solid #444;
    z-index: 1000;          /* stay above navbar and content */
  }
  #WeekStreak{
    margin-right: 75em;
  }

  .right {
    display: flex;
    gap: 1rem;
  }

  .card {
    background:var(--background, #2e2e2e);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-align: center;
    min-width: 120px;
  }

  .label {
    font-size: 0.8rem;
    color: #bbb;
    margin: 0;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.25rem 0 0;
  }
</style>
