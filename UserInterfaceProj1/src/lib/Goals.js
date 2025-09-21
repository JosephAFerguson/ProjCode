import { writable } from "svelte/store";

const savedGoal = localStorage.getItem("bodyweightGoal");
export const bodyweightGoal = writable(savedGoal ? JSON.parse(savedGoal) : null);

// had to google this
bodyweightGoal.subscribe((value) => {
  if (value !== null) {
    localStorage.setItem("bodyweightGoal", JSON.stringify(value));
  } else {
    localStorage.removeItem("bodyweightGoal");
  }
});
