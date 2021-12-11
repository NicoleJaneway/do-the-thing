export default function runTimer(
  countdownTime,
  setCountdownTime,
  active = true
) {
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
}
