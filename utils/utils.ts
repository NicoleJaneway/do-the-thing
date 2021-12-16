import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInMilliseconds } from "date-fns";

const recordStartTime = async (countdownTime) => {
  try {
    console.log("record start time");
    const now = new Date();
    await AsyncStorage.setItem("@start_time", now.toISOString());
    await AsyncStorage.setItem("@countdown_time", countdownTime.toString());
    console.log("Now: ", now.toISOString());
  } catch (err) {
    console.warn(err);
  }
};

const getElapsedTime = async () => {
  try {
    const startTime = await AsyncStorage.getItem("@start_time");
    const savedString = await AsyncStorage.getItem("@countdown_time");
    const saved = Number.parseInt(savedString);
    const now = new Date();
    const elapsed = differenceInMilliseconds(now, Date.parse(startTime));
    const newCountdownTime = saved - elapsed;
    return newCountdownTime;
  } catch (err) {
    console.warn(err);
  }
};

const clearStartTime = () => {
  console.log("clear start time");
  AsyncStorage.removeItem("@start_time");
};

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

export { recordStartTime, getElapsedTime, clearStartTime, runTimer, convert };
