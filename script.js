
//Window
let windowOpen = true;
//Sun
let sunTimer = 0;
let sunSeconds = 0;
//Water
let waterTimer = null;
let waterLevel = 100;
//Dead
let plantDead = false;



//--------------------------------------------------------------------Water functions
function startWaterTimer(interval){
      clearInterval(waterTimer);
      waterTimer = setInterval(()=>{
        waterLevel -=20;
        if(waterLevel<0) waterLevel=0;
        updateWaterBar(waterLevel);
        showIcons();
        
        if(waterLevel<=0) deadPlant("water");
        showIcons();
      }, interval*1000);
    }
function updateWaterBar(percent){ document.getElementById("waterBar").style.width = percent+"%"; }
function waterPlant(){ waterLevel=100; updateWaterBar(waterLevel); showIcons(); }


function updateWaterBar(percent) {
      document.getElementById("waterBar").style.width = Math.max(percent, 0) + "%";
    }


//-------------------------------------------------------------vannet jævkla planten

function waterPlant(){
waterLevel = 100;
updateWaterBar(waterLevel);
showIcons(); //? vet ikke om den må være her men setter'n inn
}





//---------------------------------------------------------------Window functions
function toggleWindow(){               // Funksjon som åpner eller lukker vinduet
 windowOpen = !windowOpen;             // Setter windowOpen til motsatt verdi    
if (windowOpen) {  
 document.getElementById('window').src = "Images/winsowopen.png";   //endrer img til åpen      
 console.log("Vinduet er åpent")       // Hvis vinduet er åpent
} else {
 document.getElementById('window').src = "Images/windowclose.png";  //endrer img til stengt
 console.log ("Vinduet er stengt")     // Hvis vinduet er stengt
// console.log(windowOpen)             //Viser i konsollen hva windowOpen er
 }
 windowState();
 showIcons();
} 

function windowState(){
  if (windowOpen){                  // if Window is open
    startWaterTimer(5);             // then water will decrease faster 
    stopSunTimer();                 //and the suntimer will stop because the plant get's sun
        
  }else{                            // if not(else)
    startWaterTimer(10);            // then water will decrease normally
    startSuntimer();                // the timer for the need for sun will start
  }
}


//-----------------------------------------------------------Sun functions
function stopSunTimer(){
    clearInterval(sunTimer);
    sunSeconds = 0; 
    showIcons();
}

function startSuntimer(){
    clearInterval(sunTimer);
    sunTimer = setInterval(sunwatch,1000);
}

function sunwatch(){
    sunSeconds++;
    needForSun();
//  console.log(sunSeconds)
}

function needForSun(){                      //need for sun
if(sunSeconds > 30){                      //or if the timer reaches 30 
    deadPlant(); 
    showIcons();                           //then it'll die
}else if(sunSeconds <= 10){                     //if the timer reaches 10 
    showIcons();                   //then it'll prompt the need for sun IMG
 }
}

//--------------------------------------------------Icon functions

function showIcons(){
  let icons = document.getElementsByClassName("Icon");
  for (let i = 0; i < icons.length; i++) { // (i is a counter) the loop goes through all the images(divs) 
    icons[i].style.display = "none"; // and hides them
  }
    if (plantDead == true){
        icons[1].style.display = "block"; //plant is dead
    }else if(waterLevel < 30){
        icons[2].style.display = "block"; //plant thirsty
    }else if(sunSeconds > 10){
        icons[0].style.display = "block"; //plant need sun
    }else if(waterLevel >= 30 && windowOpen == true){
        icons[3].style.display = "block"; //plant is happy
    }//else none of the images show
}

//--------------------------------------------------Dead functions

function deadPlant(){
  clearInterval(waterTimer);
  clearInterval(sunTimer);
  // updatePlantImage("dead");
  document.getElementById('plant').src = "Images/deadplant.png";
  plantDead = true;
  showIcons();

//gameoverscreen 
document.getElementById("gameOverMessage").textContent=`Your plant died bro`;
document.getElementById("gameOverScreen").style.display="flex";
 }

 //-------------------------------------------------restart
 function restartGame(){
      waterLevel=100;
      sunLevel=100;
      // updatePlantImage("healthy");
      document.getElementById('plant').src = "Images/plant.png";
      updateWaterBar(waterLevel);
      windowState();
      plantDead = false;
      showIcons();
      document.getElementById("gameOverScreen").style.display="none";
    }



//--------------------------------------------------------start game  
windowState();
updateWaterBar(waterLevel);  
showIcons();