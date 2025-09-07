<nav class="navbar">
  <a href="#/">Dashboard</a>
  <a href="#/calendar">Calendar</a>
  <a href="#/detail">Detail</a>
  <a href="#/log">Log</a>
  <a href="#/settings">Settings</a>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 70px;  /* match header height */
    left: 0;
    bottom: 0;
    width: 200px;
    background: var(--background, #3a3a3a);
    padding: 1rem;
    border-right: 2px solid #444;
    display: flex;
    flex-direction: column;
  }

  .navbar a {
    color: var(--textcolor, red);
    text-decoration: none;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .navbar a:hover {
    background: var(--background, #2e2e2e);
    color: darkred;
  }
</style>

