let workTime = 60 *1000;
let restTime = 60 * 1000;
let numberOfWorkRest = 0;
let currentcycle = 0;

const LData = document.querySelectorAll('.ldata')[0];
const RData = document.querySelectorAll('.pdata')[0];
const CData = document.querySelectorAll('.cdata')[0];


const Ltimer = document.getElementById('ltimer'); 
const Rtimer = document.getElementById('ptimer');
const cycle = document.getElementById('counter');


let countdownInterval;



function countdown(pTime){
  countdownInterval = setInterval(()=>{

    pTime= pTime - 1000;
    if(pTime <= 0){
      if(currentmode == "Studio"){
        clearInterval(countdownInterval);
        updatecount(pTime);

        if(numberOfWorkRest > currentcycle){//non lo so
          updatecount(workTime);
        }

        switchtimer();
      }
      else if(numberOfWorkRest < currentcycle){
        updaterest(pTime)
        clearInterval(countdownInterval);
      }
      else{
        clearInterval(countdownInterval);
        updaterest(pTime);
        updaterest(restTime);
        switchtimer();
      }
    }else{
      if(currentmode == "Studio"){
        updatecount(pTime);
      }
      else {
        updaterest(pTime);
      }
    }

  }, 1000)
}

function updatecount(pTime){
  if(pTime == workTime){
    LData.style.setProperty('--angle', '360deg');
    LData.style.setProperty('--color', 'rgb(138, 175, 36)');  
  }
  if(pTime <= 0){
      LData.style.setProperty('--angle', '360deg');
      LData.style.setProperty('--color', 'red');
      Ltimer.innerText=`00:00`;
  } else {
      let angle = pTime / workTime * 360 + 'deg';
      LData.style.setProperty('--angle', angle);

      let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, '0');
      let seconds = Math.floor((pTime / 1000) % 60).toString().padStart(2, '0');
      Ltimer.innerText=`${minutes}:${seconds}`;
  }
} 

function updaterest(pTime){
  if(pTime == workTime){
    RData.style.setProperty('--angle', '360deg');
    RData.style.setProperty('--color', 'rgb(138, 175, 36)');  
  }
  if(pTime <= 0){
      RData.style.setProperty('--angle', '360deg');
      RData.style.setProperty('--color', 'red');
      Rtimer.innerText=`00:00`;
      if(numberOfWorkRest >= currentcycle ){
        let Cangle = currentcycle / numberOfWorkRest * 360 + 'deg';
        CData.style.setProperty('--color', 'rgb(138, 175, 36)');
        CData.style.setProperty('--angle', Cangle);
        cycle.innerText=`${currentcycle}`;
      }
  } else {
      let angle = pTime / workTime * 360 + 'deg';
      RData.style.setProperty('--angle', angle);

      let Rminutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, '0');
      let Rseconds = Math.floor((pTime / 1000) % 60).toString().padStart(2, '0');
      Rtimer.innerText=`${Rminutes}:${Rseconds}`;
  } 
}

function switchtimer(){
    currentmode = currentmode == "Studio" ? "Pausa" : "Studio";
    currentTime = currentmode == "Studio" ? workTime : restTime ;
    currentcycle = currentmode == "Studio" ? currentcycle : currentcycle+1;
    if(currentmode == "Studio"){
      updatecount(currentTime);
    }else {
      updaterest(currentTime);
    }
    countdown(currentTime);
}


function start(){
  workTime = document.getElementById("studio-in").value * 60 *1000;
  // restTime = document.getElementById("pausa-in").value *  60 * 1000;
  // workTime = 5 * 1000;
  // restTime = 5 * 1000;
  numberOfWorkRest = document.getElementById("Ncicli").value;
  currentcycle = 0;

  currentTime = workTime;
  currentmode = "Studio";

  LData.style.setProperty('--angle', '360deg');
  LData.style.setProperty('--color', 'rgb(138, 175, 36)');

  CData.style.setProperty('--angle', '360deg');
  CData.style.setProperty('--color', 'white');

  RData.style.setProperty('--angle', '360deg');
  RData.style.setProperty('--color', 'rgb(138, 175, 36)');

  cycle.innerText=`0`;
  clearInterval(countdownInterval);
  //per rendere la visualizzazione del countdown iniziale istantanea
  updatecount(currentTime);
  updaterest(restTime);
  countdown(currentTime);

}