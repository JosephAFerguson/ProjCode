<script>
  let currentDate = new Date().toDateString();
  export let userName;
  export let weekStreak;
  export let trendingTotal;
  export let trendingBodyweight;
</script>

<div class="header">
  <h2 id="Name">{userName}</h2>
  <p id="CurrentDate">{currentDate}</p>
  <p id="WeekStreak">{weekStreak} Weeks Straight!</p>

  
  <div class="right">
    <div class="card">
      <p class="label">Total</p>
      <p class="value">{trendingTotal} lbs</p>
    </div>
    <div class="card">
      <p class="label">Bodyweight</p>
      <p class="value">{trendingBodyweight} lbs</p>
    </div>
  </div>
</div>

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
  }
  #WeekStreak{
    margin-left: 2%;
  }
  #CurrentDate{
    margin-left: 2%
  }
  
  .right {
    display: flex;
    gap: 1rem;
  }

  .card {
    background:var(--background, #2e2e2e);
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    min-width: 120px;
    max-width: 3%;
    max-height: inherit;
  }

  .label {
    font-size: 0.5rem;
    color: #bbb;
    margin: 0;
  }

  .value {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.25rem 0 0;
  }
</style>
