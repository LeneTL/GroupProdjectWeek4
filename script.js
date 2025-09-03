
//Window
let windowOpen = true;
//Sun
let sunTimer = 0;
let sunSeconds = 0;
//Water
let waterTimer = null;
let waterLevel = 100;
//Dead
let plantDead = false
 
//Water functions
function startWaterTimer(interval) {
      clearInterval(waterTimer);
      waterTimer = setInterval(() => {
        waterLevel -= 5;
        updateWaterBar(waterLevel);

        const waterIcon = document.getElementById("waterIcon");
        if (waterLevel <= 0) {
            deadPlant()
        //   deadPlant("water");
        } else if (waterLevel < 30) {
          waterIcon.classList.add("active");
          updatePlantImage("thirsty");
        } else {
          waterIcon.classList.remove("active");
          updatePlantImage("healthy");
        }
      }, interval * 1000);
    }
//  console.log (waterTimer);
function updateWaterBar(percent) {
      document.getElementById("waterBar").style.width = Math.max(percent, 0) + "%";
    }

//Window functions
function toggleWindow(){               // Funksjon som åpner eller lukker vinduet
 windowOpen = !windowOpen;             // Setter windowOpen til motsatt verdi    
if (windowOpen) {                      
 console.log("Vinduet er åpent")       // Hvis vinduet er åpent
} else {
 console.log ("Vinduet er stengt")     // Hvis vinduet er stengt
// console.log(windowOpen)             //Viser i konsollen hva windowOpen er
 }
} 

function windowState() {
  if (windowOpen){                  // if Window is open
    startWaterTimer(5);             // then water will decrease faster 
    stopSunTimer();                 //and the suntimer will stop because the plant get's sun
        
  }else{                            // if not(else)
    startWaterTimer(10);            // then water will decrease normally
    startSuntimer();                // the timer for the need for sun will start
  }
}

//Sun functions
function stopSunTimer(){
    clearInterval(sunTimer);
    sunSeconds = 0; 
}

function startSuntimer(){
    clearInterval(sunTimer);
    sunTimer = setInterval(sunwatch,1000);
}

function sunwatch(){
    sunSeconds++;
    needForSun()
//  console.log(sunSeconds)
}

function needForSun(){                      //need for sun
 if(sunSeconds <= 10 && sunSeconds > 30){   //if the timer reaches 10  and it's less than 30
    plantDead = false                       //just to make dead certain the plant is alive, might not be needed
  //show img of sun need                    //then it'll prompt the need for sun IMG
 }else if (sunSeconds < 30){                //or if the timer reaches 30 
    deadPlant()                             //then it'll die
}
}

//Dead functions

function deadPlant(){
    plantDead = true
  // Plant png = dead Plant
  // Pop up= you've lost, (try again?)
  console.log(plantDead)
}

  windowState();
  updateWaterBar(waterLevel);
