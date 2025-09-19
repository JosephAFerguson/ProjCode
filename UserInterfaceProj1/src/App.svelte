<script>
  import Router from "svelte-spa-router";
  import Dashboard from './views/Dashboard.svelte';
  import Calendar from './views/Calendar.svelte';
  import Detail from './views/Detail.svelte';
  import Log from './views/Log.svelte';
  import Header from "./components/Header.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Settings from './views/Settings.svelte';

  const routes = {
    '/': Dashboard,
    '/calendar': Calendar,
    '/detail': Detail,
    '/log': Log,
    '/settings': Settings
  };
</script>


<Header 
  userName="Joe Ferguson"
  weekStreak={4} 
  trendingTotal={1205} 
  trendingBodyweight={192} 
/>

<Navbar />

<main class="content">
  <Router {routes}/>
</main>