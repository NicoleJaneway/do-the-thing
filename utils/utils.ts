const runTimer = (countdownTime, setCountdownTime, active = true) => {
  if (active && countdownTime >= 1000) {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout>;
    if (isMounted) {
      timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
    }
    return () => {
      isMounted = false;
      clearTimeout(timer);
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
