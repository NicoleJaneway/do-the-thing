import { Audio } from "expo-av";

async function loadSound(setSound) {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/bell.mp3")
  );
  console.log("Loading Sound");
  setSound(sound);
}

async function playSound(sound) {
  console.log("Before sound played: ", sound);
  console.log("Playing Sound");
  await sound.setPositionAsync(0);
  await sound.playAsync();
  console.log("After sound played: ", sound);
}

function unloadSound(sound) {
  return sound
    ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    : undefined;
}

export { loadSound, playSound, unloadSound };
