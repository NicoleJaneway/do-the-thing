// const runTimer = (countdownTime, setCountdownTime, active = true) => {
//   if (active && countdownTime >= 1000) {
//     let isMounted = true;
//     let timer: ReturnType<typeof setTimeout>;
//     if (isMounted) {
//       timer = setInterval(() => setCountdownTime((prev) => prev - 1000), 1000);
//     } else if (!active && countdownTime !== 0) {
//       clearInterval(timer);
//     }
//     return () => {
//       isMounted = false;
//       clearInterval(timer);
//     };
//   }
// };

const runTimer = (countdownTime, setCountdownTime, active = true, appState) => {
  if (active && countdownTime >= 1000) {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout>;
    if (isMounted) {
      if (appState.current === "active") {
        timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
        console.log("running timer");
      }
    } else if (!active && countdownTime !== 0) {
      clearTimeout(timer);
      console.log("clearing timer");
    } else if (appState.current !== "active") {
      clearTimeout(timer);
      console.log("clearing timer");
    }
    return () => {
      isMounted = false;
      clearTimeout(timer);
      console.log("clearing timer");
    };
  }
};

const convert = (ms: number) => {
  let seconds: number = Math.floor((ms / 1000) % 60);
  let minutes: number = Math.floor(ms / (1000 * 60));

  let minutesString: string =
    minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  let secondsString: string =
    seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return minutesString + ":" + secondsString;
};

export { runTimer, convert };
