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
const vehicle = document.getElementById('vehicle'); // Fahrzeug holen
console.log(vehicle.naturalWidth);
let positionX = 50; // Startposition
let isMoving = false;
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
var engineAudio = new Audio('/audio/EngineSound.mp3');
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
  isMoving = true;
  let direction = event.deltaY > 0 ? 1 : -1; // Vorwärts oder rückwärts
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

  if (isMoving && engineAudio.paused) {
    engineAudio.play();
    engineAudio.volume = 0.03;
    isEngineSoundPlaying = true;
  }

  // Wenn das Fahrzeug sich nicht bewegt und der Motorsound spielt
  if (!isMoving && !engineAudio.paused) {
    engineAudio.pause();
    isEngineSoundPlaying = false;
  }

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

  //Vehicle X/Y-Koordinate
  let vehicleRect = vehicle.getBoundingClientRect();
  let xCoordinateVehicle = vehicleRect.left;
  let yCoordinateVehicle = vehicleRect.top;
  // console.log(yCoordinateVehicle);

  //Station 1 -- Erstes Minigame
  let station1 = document.getElementById('Station_1');
  var station1rect = station1.getBoundingClientRect();
  let xCoordinateStation1 = station1rect.left;
  let yCoordinateStation1 = station1rect.top;
  // console.log(yCoordinateStation1);
  // HiddenBox 1
  let hiddenboxLevel1 = document.getElementById('hiddenBoxLevel1');

  //Station 2 -- Zweites Minigame
  let station2 = document.getElementById('Station_2');
  var station2rect = station2.getBoundingClientRect();
  let xCoordinateStation2 = station2rect.left;
  let yCoordinateStation2 = station2rect.top;
  // console.log(yCoordinateStation2);
  // HiddenBox 2
  let hiddenboxLevel2 = document.getElementById('hiddenBoxLevel2');

  //Station 3 -- Drittes Minigame
  let station3 = document.getElementById('Station_3');
  var station3rect = station3.getBoundingClientRect();
  let xCoordinateStation3 = station3rect.left;
  let yCoordinateStation3 = station3rect.top;
  // HiddenBox 3
  let hiddenboxLevel3 = document.getElementById('hiddenBoxLevel3');

  //Station 4 -- Viertes Minigame
  let station4 = document.getElementById('Station_4');
  var station4rect = station4.getBoundingClientRect();
  let xCoordinateStation4 = station4rect.left;
  let yCoordinateStation4 = station4rect.top;
  // HiddenBox 4
  let hiddenboxLevel4 = document.getElementById('hiddenBoxLevel4');

  //Vergleich für Erste Station
  // station1.addEventListener('click', () => {
  //   if (
  //     xCoordinateVehicle >= xCoordinateStation1 &&
  //     xCoordinateVehicle <= xCoordinateStation1 + 280 &&
  //     yCoordinateVehicle >= yCoordinateStation1
  //   ) {
  //     window.location = 'index2.html';
  //   }
  // });

  //Funktionen die einen zu den Minigames leitet

  //Standard Eventlistenet to override the last one
  function ReturnToStart(e){
    if(e.key == "Enter"){
      window.location = "";
    }
  }
  function FirstLevel(e) {
    if (e.key == 'Enter') {
      window.location = 'index2.html';
    }
  }
  function SecondLevel(e) {
    if (e.key == 'Enter') {
      window.location = 'index3.html';
    }
  }
  function ThirdLevel(e) {
    if (e.key == 'Enter') {
      window.location = 'index4.html';
    }
  }
  function FourthLevel(e) {
    if (e.key == 'Enter') {
      window.location = 'index5.html';
    }
  }

  //Station 1
  if (
    xCoordinateVehicle + 150 >= xCoordinateStation1 &&
    xCoordinateVehicle <= xCoordinateStation1 + 280 &&
    level == 0
  ) {
    hiddenboxLevel1.style.display = 'block';
    window.addEventListener('keypress', FirstLevel);
  } else {
    window.addEventListener('keypress', ReturnToStart);
    hiddenboxLevel1.style.display = 'none';
  }

  //Station 2
  if (
    xCoordinateVehicle + 150 >= xCoordinateStation2 &&
    xCoordinateVehicle <= xCoordinateStation2 + 280 &&
    level == 1
  ) {
    hiddenboxLevel2.style.display = 'block';
    window.addEventListener('keypress', SecondLevel);
  } else {
    window.addEventListener('keypress', ReturnToStart);
    hiddenboxLevel2.style.display = 'none';
  }

//Station 3
if (
  xCoordinateVehicle + 150 >= xCoordinateStation3 &&
  xCoordinateVehicle <= xCoordinateStation3 + 280 &&
  level == 2
) {
  hiddenboxLevel3.style.display = 'block';
  window.addEventListener('keypress', ThirdLevel);
} else {
  window.addEventListener('keypress', ReturnToStart);
  hiddenboxLevel3.style.display = 'none';
}

//Station 4
if (
  xCoordinateVehicle + 150 >= xCoordinateStation4 &&
  xCoordinateVehicle <= xCoordinateStation4 + 280 &&
  level == 3
) {
  hiddenboxLevel4.style.display = 'block';
  window.addEventListener('keypress', FourthLevel);
} else {
  window.addEventListener('keypress', ReturnToStart);
  hiddenboxLevel4.style.display = 'none';
}
 
});
