<nav class="navbar">
  <a href="#/">Dashboard</a>
  <a href="#/calendar">Calendar</a>
  <a href="#/detail">Detail</a>
  <a href="#/log">Log</a>
  <a href="#/settings">Settings</a>
</nav>

<style>
  .navbar {
    display: grid;
    grid-area: sidebar;
    grid-auto-rows: min-content; /* each link gets its own row */
    padding: 1rem;
    background: var(--background, #3a3a3a);
    border-right: 2px solid #444;
    box-sizing: border-box;
  }

  .navbar a {
    color: var(--textcolor, red);
    text-decoration: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    transition: background 0.2s, color 0.2s;
    display: block; /* ensure links occupy full row */
  }

  .navbar a:hover {
    background: var(--background, #2e2e2e);
    color: darkred;
  }
</style>
