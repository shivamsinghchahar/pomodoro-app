const PLAY          = document.getElementById('btn-play');
const STOP          = document.getElementById('btn-stop');
const COUNTER       = document.getElementById('counter');
const AUDIO         = new Audio('assets/sounds/ding.wav');
const SHORT_BREAK   = document.getElementById('btn-short');
const LONG_BREAK    = document.getElementById('btn-long');

let interval
    , currentDuration   = 1500
    , alreadyRunning    = false
    , isBreak           = false;

function startTimer(duration, COUNTER) {
    alreadyRunning = true;
    
    let timer = duration
        , minutes
        , seconds;
    
    interval = setInterval(function () {
        // Calculate minutes
        minutes = Math.floor(timer / 60);
        // Calculate seconds
        seconds = (timer % 60);

        // Pad the minutes with zero, if required
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        // Pad the seconds with zero, if required
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        // Set inner HTML of the COUNTER to current duration
        COUNTER.textContent = minutes + ":" + seconds;
        // Calculate current duration to keep record of its value when timer is paused
        currentDuration = minutes * 60 + seconds;
        
        if(currentDuration == 0) {
            AUDIO.play();
            alreadyRunning = false;
            clearInterval(interval);
            currentDuration = 1500;
            
            if(!isBreak) {
                removeBreak(SHORT_BREAK);
                removeBreak(LONG_BREAK);
            } else {
                removeBreak(PLAY);
                isBreak = false;
            }
            // make pause button disapper after timer finishes
            addBreak(STOP);
            return;
        }

        if (--timer < 0) {
            // make the timer equal to current duration
            timer = duration;
        }
    }, 1000);
}

function addBreak(PROP) {
    PROP.classList.add('break');
}

function removeBreak(PROP) {
    PROP.classList.remove('break');
}

PLAY.addEventListener('click', function() { 
    addBreak(LONG_BREAK);
    addBreak(SHORT_BREAK);
    // make play button invisible after click
    addBreak(PLAY);
    // make pause button visible
    removeBreak(STOP);
    if(!alreadyRunning) {
        startTimer(currentDuration, COUNTER);
    }  
});

STOP.addEventListener('click', function() {
    alreadyRunning = false;
    // make play button visible
    removeBreak(PLAY);
    // make pause button invisible
    addBreak(STOP);
    clearInterval(interval); 
    
});

SHORT_BREAK.addEventListener('click', function() {
    isBreak = true;
    removeBreak(STOP);
    addBreak(SHORT_BREAK);
    addBreak(LONG_BREAK);
    if(!alreadyRunning) {
        startTimer(300, COUNTER);
    }  
});

LONG_BREAK.addEventListener('click', function() {
    isBreak = true;
    removeBreak(STOP);
    addBreak(SHORT_BREAK);
    addBreak(LONG_BREAK);
    if(!alreadyRunning) {
        startTimer(900, COUNTER);
    }  
});
