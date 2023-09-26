export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";



export const hackerLetters = e => {
  let interval = null
  let iteration = 0;
  interval = setInterval(() => {
    e.target.innerText = e.target.innerText
    .split("")
    .map((letter, index) => {
      if (index < iteration) {
        return e.target.dataset.value[index];
      }
      return letters[Math.floor(Math.random() * 26)]
    })
    .join("");

    if (iteration >= e.target.dataset.value.length) {
      clearInterval(interval);
    }
    iteration += 1 / 3;
  }, 30)
}