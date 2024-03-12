// CODE SNIPPET

//-------------------- BLOCK DEFAULT EVENT ----------------------------//
window.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault(); // Unterdrückt das Scrollen der Webseite
  },
  { passive: false },
); // Option, um das Standardverhalten zu verhindern

//-------------------- VEHICLE VARIABLES ----------------------------//
let isMoving = false;
const vehicle = document.getElementById('vehicle'); // Fahrzeug holen
console.log(vehicle.naturalWidth);
let positionX = 50; // Startposition
let firstTurned = false; // Schauen ob das Fahrzeug gedreht ist
const screenWidth = window.innerWidth; // Bildschirmbreite hole
let endNotReached = true; // Schauen ob der Bagger das Ende erreicht hat
let turned = false;
let level = 0; // Aktuelle Ebene
let levelGlobal;
if (levelGlobal == undefined) {
  // Wenn noch kein Event zum erhöhen des Levels getriggerd wurde befindet sich der Bagger auf Level 0 der Starterebene
  levelGlobal = 0;
}
let ebenen = 4; // Gesamtanzahl Ebenen
const levelHeight = 100 / ebenen; // Höhe jeder Ebene in vh (Viewport Height), für 4 Ebenen

//  //-------------------- AUDIO VARIABLES ----------------------------//
let engineAudio = new Audio('/audio/EngineSound.mp3');
var level0Audio = new Audio('/audio/Level0Background.mp3');
var level1Audio = new Audio('/audio/Level1Background.mp3');
var level2Audio = new Audio('/audio/Level2Background.mp3');
var level3Audio = new Audio('/audio/Level3Background.mp3');
let isPLayingSound1 = false;
let isPLayingSound2 = false;
let isPLayingSound3 = false;
let isPLayingSound4 = false;

//-------------------- MOUSE WHEEL EVENT ----------------------------//

document.addEventListener('wheel', (event) => {
  //-------------------- VEHICLE MOVEMENT ----------------------------//
  let direction = event.deltaY > 0 ? 1 : -1; // Vorwärts oder rückwärts
  isMoving = true;
  // Drehung des Fahrzeuges
  if (direction === 1) {
    // Wenn das Fahrzeug geradeaus fährt
    vehicle.style.transform = `translateX(${positionX}px) rotateX(0deg)`;
    if (firstTurned) {
      turned = false;
    }
  } else {
    // Wenn das Fahrzeug sich dreht -> 180 Grad drehung auf der X Achse
    vehicle.style.transform = `translateX(${positionX}px) scaleX(-1)`;
    if (firstTurned) {
      turned = true;
    }
  }

  // Bewegungsschritt (50 Pixel)
  if (turned) {
    positionX -= direction * 50; //Für die Fahrtrichtung
  } else {
    positionX += direction * 50; //Für die Fahrtrichtung
  }

  // Begrenzen Sie die Position auf den Bildschirmrand für die linke Seite auf dem ersten Level
  if (positionX < 0 && level == 0) {
    positionX = 0;
  } else if (positionX >= window.outerWidth - 280 && level == 3) {
    // Stopp/Ende für das letzte Level
    positionX = window.outerWidth - 280; // 280 => Fahrzeugbreite
  } else if (positionX < 0 && level !== 0) {
    // Verhindern das man außerhalb des linken randes ist
    positionX = screenWidth;
    level -= 1;
    levelGlobal = level;
    // console.log(`LevelGlobal: ${levelGlobal}`);
    vehicle.style.top = `${2 * level * levelHeight}vh`;
    window.scrollBy(0, -window.innerHeight / 2);
  } else if (positionX > screenWidth + 200 && level !== 3) {
    positionX = 0;
    level += 1;
    levelGlobal = level;
    // console.log(`LevelGlobal: ${levelGlobal}`);
    vehicle.style.top = `${2 * level * levelHeight}vh`;
    window.scrollBy(0, window.innerHeight / 2);
  }
  //-------------------- VEHICLE SOUNDS ----------------------------//

  // if (isMoving && engineAudio.paused) {
  //   engineAudio.play();
  //   engineAudio.volume = 0.03;
  //   isEngineSoundPlaying = true;
  // }

  // // Wenn das Fahrzeug sich nicht bewegt und der Motorsound spielt
  // if (!isMoving && !engineAudio.paused) {
  //   engineAudio.pause();
  //   isEngineSoundPlaying = false;
  // }

  // Setzen Sie isMoving auf false nach einer kurzen Verzögerung

  //-------------------- BACKGROUND NOISES ----------------------------//
  if (level == 0 && isPLayingSound1 == false) {
    //Zurücketzten der flags
    isPLayingSound1 = true;
    isPLayingSound2 = false;
    //Resetten der vorherigen Audios
    level1Audio.pause();
    level1Audio.currentTime = 0;
    //Audio abspielen
    level0Audio.play();
    level0Audio.volume = 0.2;
  }
  if (level == 1 && isPLayingSound2 == false) {
    //Zurücketzten der flags
    isPLayingSound2 = true;
    isPLayingSound1 = false;
    isPLayingSound3 = false;

    //Resetten der vorherigen Audios
    level0Audio.pause();
    level0Audio.currentTime = 0;
    level2Audio.pause();
    level2Audio.currentTime = 0;
    //Audio abspielen
    level1Audio.play();
    level1Audio.volume = 0.2;
  }
  if (level == 2 && isPLayingSound3 == false) {
    //Zurücketzten der flags
    isPLayingSound3 = true;
    isPLayingSound2 = false;
    isPLayingSound4 = false;

    //Resetten der vorherigen Audios
    level1Audio.pause();
    level1Audio.currentTime = 0;
    level3Audio.pause();
    level3Audio.currentTime = 0;
    //Audio abspielen
    level2Audio.play();
    level2Audio.volume = 0.2;
  }
  if (level == 3 && isPLayingSound4 == false) {
    //Zurücketzten der flags
    isPLayingSound4 = true;
    isPLayingSound3 = false;

    //Resetten der vorherigen Audios
    level2Audio.pause();
    level2Audio.currentTime = 0;
    //Audio abspielen
    level3Audio.play();
    level3Audio.volume = 0.2;
  }

  //-------------------- STATION VERLINKUNG ----------------------------//

  //Vehicle X-Koordinate
  // let vehicleRect = vehicle.getBoundingClientRect();
  // let xCoordinateVehicle = vehicleRect.left;

  // //Station 1 -- Erstes Minigame
  // let station1 = document.getElementById('Station_1');
  // var station1rect = station1.getBoundingClientRect();
  // let xCoordinateStation1 = station1rect.left;

  // //Vergleich für Erste Station
  // station1.addEventListener('click', () => {
  //   if (
  //     xCoordinateVehicle >= xCoordinateStation1 &&
  //     xCoordinateVehicle <= xCoordinateStation1 + 280
  //   ) {
  //     window.location = 'index2.html';
  //   }
  // });
});
