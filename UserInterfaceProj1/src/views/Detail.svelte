<script>
  // Example exercise list
  import {exercises} from "../lib/Definitions.js";
  let filteredexercises = exercises;
  let selectedExercise = exercises[0];

  // Mock sets data
  let sets = [
    { set: 1, weight: "225 lbs", reps: 10 },
    { set: 2, weight: "245 lbs", reps: 8 },
    { set: 3, weight: "265 lbs", reps: 6 }
  ];

  function selectExercise(ex) {
    selectedExercise = ex;
  }

  function filterSetsByMuscle(muscle) {
    if (muscle === "pecs") {
      filteredexercises = exercises.filter(ex => ex.toLowerCase().includes("press"));
    } else {
      filteredexercises = exercises;
    }
  }
  
</script>

<div class="detail-view">
  <!-- Left: Muscle Viewer -->
  <div class="muscle-view">
    <div class="figurefront">Front</div>
    <!-- FRONT VIEW -->
      <svg height="300" width="200">
        <path class="na"
          style="fill:#cccccc;stroke-width:0.264583"
          d="m 71.514138,121.90488 0.508998,43.26478 28.249354,17.81491 21.88689,-15.26992 -1.78149,-45.55527 z"
          id="path8"/>
        <path class="na"
          id="path2"
          style="fill:#cccccc;stroke-width:0.264583"
          d="m 90.601543,86.020563 c -7.889462,10.688947 -9.925452,10.943445 -7.889462,10.688947 2.035989,-0.2545 29.776349,-0.2545 29.776349,-0.2545 L 98.491002,85.766066 Z M 91.11054,53.444729 c -2.89007,0.455002 -6.119032,1.709018 -8.217801,3.747327 -2.218021,2.154123 -4.359123,5.634753 -4.507136,8.723111 -0.369825,7.716528 11.961439,19.850899 11.961439,19.850899 h 8.143956 c 0,0 10.124662,-13.469204 8.838002,-21.117656 -0.57627,-3.425601 -4.14723,-6.506047 -7.0565,-8.404195 -2.67447,-1.744949 -6.007444,-3.296122 -9.16196,-2.799486 z"
          />
        <path class="pecs"
          id="pecs"
          style="fill:#ff2a2a;stroke-width:0.296642"
          d="M 96.502327,96.908089 H 120.6797 V 122.10346 H 96.502327 Z M 70.750641,96.709511 H 94.928019 V 121.90488 H 70.750641 Z"
          on:click={() => filterSetsByMuscle("pecs")} />
        <path class="shoulder"
          id="path5"
          style="fill:#ffd42a;stroke-width:0.264583"
          d="m 121.14139,96.964009 c 1.01799,0.508998 14.25192,10.434451 14.25192,10.434451 l -0.2545,12.21594 -13.48843,2.29048 z m -50.645247,0.254498 c -1.017995,0 -13.233934,9.670953 -13.233934,9.670953 l -2.799485,12.47044 16.542417,2.29048 z"
          />
        <path class="bicep"
          id="path7"
          style="fill:#00ffff;stroke-width:0.264583"
          d="m 122.15938,121.65038 2.29049,24.68638 8.65296,7.12596 c 0,0 5.34447,-7.63496 5.08997,-9.92545 -0.2545,-2.29049 -3.05399,-24.68637 -3.05399,-24.68637 z m -66.678661,-1.52699 -6.107969,23.92288 5.089974,9.41645 10.688947,-7.38046 5.344472,-24.68637 z"
          />
        <path class="abs"
          id="rect7-89"
          style="fill:#00ff00;stroke-width:0.257396"
          d="M 98.689575,147.90207 H 113.196 l 0.7635,14.50642 -13.23394,9.67095 z m -18.653114,0 H 94.542888 L 95.560883,172.33394 79.527464,161.136 Z M 98.689575,135.53973 H 113.196 v 11.19795 H 98.689575 Z m -18.653114,0 h 14.506427 v 11.19795 H 80.036461 Z M 98.689575,123.17738 H 113.196 v 11.19795 H 98.689575 Z m -18.653122,0 H 94.54288 v 11.19795 H 80.036453 Z"
          />
        <path class="quads"
          id="path10"
          style="fill:#800080;stroke-width:0.264583"
          d="m 121.90488,167.46015 c 0,0 9.16196,49.37275 8.14396,49.37275 -1.01799,0 -23.41388,6.10797 -23.41388,4.58098 0,-1.52699 -5.85347,-38.9383 -5.85347,-38.9383 z m -50.136244,-1.78149 5.089974,49.62725 19.596402,5.85347 3.817478,-38.6838 z"
          />
        <path class="na"
          id="path12"
          style="fill:#cccccc;stroke-width:0.264583"
          d="m 107.14396,221.92288 22.90488,-5.08998 5.85347,53.44474 2.29049,5.08997 5.85347,5.85346 -5.85347,3.56299 -10.43445,-5.08998 -2.03599,-6.61696 z m -30.539847,-6.10797 4.835475,47.59126 -0.2545,7.38045 -3.308483,8.65296 9.92545,3.56298 6.36247,-11.96144 1.017992,-6.61696 0.763497,-43.26478 z"
          />
      </svg>
    <div class="figureback">Back</div>
    <svg height="300" width="200">
      <path class="na"
          style="fill:#cccccc;stroke-width:0.264583"
          d="m 97.656639,44.742702 c -2.89007,0.455002 -6.119032,1.709018 -8.217801,3.747327 -2.218021,2.154123 -4.359123,5.634753 -4.507136,8.723111 -0.369825,7.716528 11.961439,19.850899 11.961439,19.850899 h 8.143959 c 0,0 10.12466,-13.469204 8.838,-21.117656 -0.57627,-3.425601 -4.14723,-6.506047 -7.0565,-8.404195 -2.67447,-1.744949 -6.00744,-3.296122 -9.161961,-2.799486 z"
          id="path1"/>
      <path class="trap"
        style="fill:#800080;stroke-width:0.264583"
        d="M 97.147642,77.318536 C 88.749183,86.480491 87.591073,85.798139 86.967692,87.752984 86.016768,90.73496 102.49224,127.196 103.83866,123.98563 L 119.03453,87.752983 105.0371,77.064039 Z"
        id="path2"/>
      <path class="lats"
        id="path4"
        style="fill:#008000;stroke-width:0.264583"
        d="m 118.5964,87.802055 10.17995,9.416452 -4.83548,41.483293 -19.8509,-13.99743 z m -32.575835,0.2545 -9.670952,8.143957 8.398457,43.773778 18.57841,-15.77892 z"
        />
      <path class="lowback"
        style="fill:#00ffff;stroke-width:0.264583"
        d="m 85.511567,139.71979 c 0,0 18.069413,11.19795 19.850903,9.67095 1.78149,-1.52699 18.8329,-10.17995 18.8329,-10.17995 l -20.1054,-13.99742 z"
        id="path5"/>
      <path class="na"
        id="path7"
        style="fill:#cccccc;stroke-width:0.264583"
        d="m 106.88946,77.367608 c 1.27249,0 32.32133,5.089975 32.32133,5.089975 l 10.17995,11.961439 -20.1054,2.290487 z M 95.946014,77.113111 67.696656,82.71208 59.043702,98.236502 75.840616,95.437017 Z"
        />
      <path class="tricep"
        id="path9"
        style="fill:#ff6600;stroke-width:0.264583"
        d="m 129.79434,96.709509 7.63496,37.411311 20.3599,-4.83548 -8.39846,-34.611821 z m -71.514136,2.03599 c -0.254497,1.781491 -3.562982,32.066841 -3.562982,32.066841 l 16.033419,2.79948 6.107969,-37.920306 z"
        />
      <path class="glutes"
        id="path11"
        style="fill:#d40000;stroke-width:0.264583"
        d="m 104.08997,150.66324 0.509,14.76092 25.44987,1.52699 -6.36247,-27.48586 -19.5964,11.19795 -19.850898,-10.17995 c 0,3.81748 -2.799484,27.23136 -2.799484,27.23136 l 23.817572,-2.1696 -1.16719,-14.88181"
        />
      <path class="hamstring"
        id="path13"
        style="fill:#ffff00;stroke-width:0.264583"
        d="m 109.68894,166.44216 c 0.2545,2.03599 5.59898,40.21079 6.61697,39.9563 1.018,-0.2545 22.90488,1.27249 22.39589,-1.018 -0.509,-2.29049 -8.65296,-38.9383 -8.65296,-38.9383 z m -27.994855,1.78149 -4.835475,36.64781 21.886889,1.78149 4.071981,-40.97429 z"
        />
      <path class="calves"
        id="path15"
        style="fill:#000080;stroke-width:0.264583"
        d="m 116.30591,206.90745 6.10797,36.64782 c 0,0 18.06941,1.01799 18.06941,-1.78149 0,-2.79949 -2.03599,-36.39332 -2.03599,-36.39332 z m -38.938302,-1.78149 -1.78149,36.90232 18.069409,0.76349 4.580975,-35.62982 z"
        />
      <path class="na"
        id="path17"
        style="fill:#b3b3b3;stroke-width:0.264583"
        d="m 122.92288,244.06426 4.07198,27.99487 -3.30849,7.63495 3.05399,3.30848 8.14396,0.25451 4.83547,-3.30849 1.018,-37.41131 z m -47.082264,-1.52699 1.781492,24.94087 0.508997,9.16196 3.053983,3.05398 7.380464,1.27249 4.07198,-3.56299 -2.29049,-9.16194 3.053985,-25.19537 z"
      />

      </svg>
    </div>

  <!-- Right: Exercise List -->
  <div class="exercise-list">
    <h3>Exercises</h3>
    <div class="scrollable">
      {#each filteredexercises as ex}
        <div
          class="exercise {selectedExercise === ex ? 'active' : ''}"
          on:click={() => selectExercise(ex)}
        >
          {ex}
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Bottom: Table -->
<div class="sets-table">
  <h3>{selectedExercise} - Sets</h3>
  <table>
    <thead>
      <tr>
        <th>Set</th>
        <th>Weight</th>
        <th>Reps</th>
      </tr>
    </thead>
    <tbody>
      {#each sets as s}
        <tr>
          <td>{s.set}</td>
          <td>{s.weight}</td>
          <td>{s.reps}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .detail-view {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    padding: 1rem;
  }

  /* Muscle figure placeholders */
  .muscle-view {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start;
    gap: 1rem;
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    flex: 1;
    width: auto;
    text-align: center;
  }


  .muscle-view svg {
    max-width: 100%;    
    max-height: 300px; 
    width: auto;         
    height: auto;
    display: block;
    margin: 0 auto;    
  }


  .figurefront, .figureback {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: white;
  }

  /* Exercise list */
  .exercise-list {
    flex: 2;
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .scrollable {
    max-height: 40rem;
    overflow-y: auto;
    margin-top: 0.5rem;
  }
  .exercise {
    padding: 0.5rem;
    background: #333;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    color: white;
  }
  .exercise:hover {
    background: #444;
  }
  .exercise.active {
    background: darkred;
    font-weight: bold;
  }

  /* Table */
  .sets-table {
    margin: 1rem;
    background: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    height: 60rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    color: white;
  }
  th, td {
    padding: 0.5rem;
    border-bottom: 1px solid #444;
    text-align: center;
  }
  th {
    background: #333;
  }
</style>
