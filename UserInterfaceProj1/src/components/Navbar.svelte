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
    padding: 0.75rem;
    background: var(--color-lm-bg2);
    border-right: 2px solid var(--color-lm-accent);
    max-height:100%;
    overflow: hidden;
  }

  .navbar a {
    color: var(--color-lm-primary);
    text-decoration: none;
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem;
    margin-bottom: 2%;
    transition: background 0.2s, color 0.2s;
    display: block; /* ensure links occupy full row */
  }

  .navbar a:hover {
    background: var(--color-lm-accent);
    color: var(--color-lm-other);
  }
</style>
