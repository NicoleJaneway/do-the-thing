export default function runTimer(
  countdownTime,
  setCountdownTime,
  active = true
) {
  if (active && countdownTime >= 1000) {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => setCountdownTime((prev) => prev - 1000),
      1000
    );
    return () => clearTimeout(timer);
  }
}
