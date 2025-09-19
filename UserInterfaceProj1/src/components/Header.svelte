<script>
  let currentDate = new Date().toDateString();
  export let userName;
  export let trendingTotal;
  export let trendingBodyweight;
</script>

<div class="header">
  <div class="left">
    <h2 id="Name">{userName}</h2>
    <h2 id="CurrentDate">{currentDate}</h2>
  </div>
  
  <div class="right">
    <div class="card">
      <p class="label">Week Streak</p>
      <p class="value">4 weeks</p>
    </div>
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
    align-items: center;
    justify-content: space-between;
    background: var(--background, #3a3a3a);
    color: var(--textcolor, red);
    padding: 0 2rem;
    border-bottom: 2px solid #444;
  }

  #CurrentDate{
    margin-left: 2%
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
    background:var(--background, #2e2e2e);
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    min-width: 120px;
    max-width: 3%;
    max-height: inherit;
  }

  .label {
    font-size: 0.8rem;
    color: #bbb;
    margin: 0;
  }

  .value {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.25rem 0 0;
  }
</style>
