// GLOBALS ------------------------------------------
var minus1 = document.getElementById('minus1');

var breakNum = document.getElementById('breakNum');

var plus1 = document.getElementById('plus1');
//---------------------------------------------------

var minus2 = document.getElementById('minus2');

var workNum = document.getElementById('workNum');

var plus2 = document.getElementById('plus2');
//---------------------------------------------------

var clock = document.getElementById('clock');

var one = document.getElementById('part1');

var colon = document.getElementById('colon');

var colText = document.createTextNode(':');

var two = document.getElementById('part2');
//----------------------------------------------------

var breakT = 5;

var workT = 25;
//-------------
var minutes = 25;

var seconds = 59;

//------------------------------------------------------------------

// PART 2 - FUNCTION ----------------------------------------------------

function secDown() {

    if (clock.className == 'running') {

        console.log('EXECUTED');
        //------------------------------------------------------
        if (seconds == 59 && minutes > 0) {
          //Seconds at 59 means full min. has passed,
          // thus, min. is decreased by 1.
            minutes -= 1;
            var min = document.createTextNode(minutes);
            one.removeChild(one.childNodes[0]);
            one.appendChild(min);
        }
        //-------------------------------------------------------
        var secNode; // Current second
        //---------------------------------------------------
        if (seconds < 10) {
          // adds a 0 in front of single-digit numbers
          secNode = document.createTextNode('0' + seconds);
        }

        else {

          secNode = document.createTextNode(seconds);
        }
        //----------------------------------------------------
        if(two.childNodes[0]) {
            // if seconds slot is NOT empty...
            two.removeChild(two.childNodes[0]);
        }
        two.appendChild(secNode);
        seconds -= 1;
        //-------------------------------------------------------

        // Run function again with 1 sec. delay if conditions met:
        if (seconds >= 0 && minutes >= 0) {

            setTimeout(secDown, 1000);
        }

      // Reset seconds if they display '00' and run function
      // if also other conditions met.
        if (seconds === -1 && minutes > 0) {

            seconds = 59;
            setTimeout(secDown, 1000);
        }

    } // ENDS 1st 'IF'

} // ENDS SECDOWN

// --------------------------------------------------------------

// ON TIME-CLICK--------------------------------------------

clock.addEventListener('click', function(){

    if (clock.className == 'paused') {

        clock.className = 'running'

        // Adds colon to timer if not already on it at click
        if (colon.childNodes[0] == undefined) {

            colon.appendChild(colText);
        }

        secDown();
    }

    else {

        clock.className = 'paused';
    }

});

//-----------------------------------------------------------------

// 1st MINUS--------------------------------------------

minus1.addEventListener('click', function(){

    if (breakT > 1) {

        breakT -= 1;
        var breakText = document.createTextNode(breakT);
        breakNum.removeChild(breakNum.childNodes[0]);
        breakNum.appendChild(breakText);
    }

});

//-----------------------------------------------------------------

// 1st PLUS--------------------------------------------

plus1.addEventListener('click', function(){

    if (breakT >= 1) {

        breakT += 1;
        var breakText = document.createTextNode(breakT);
        breakNum.removeChild(breakNum.childNodes[0]);
        breakNum.appendChild(breakText);
    }

});

//-----------------------------------------------------------------

// 2nd MINUS--------------------------------------------

minus2.addEventListener('click', function(){

    if (clock.className == 'paused') {

        // removes colon from clock display if present
        if (colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        seconds = 59;

        workT -= 1;

        // used by 'secDown' function
        minutes = workT;

        var workText = document.createTextNode(workT);
        workNum.removeChild(workNum.childNodes[0]);
        workNum.appendChild(workText);
        //------------------------------------------

        var clockText = document.createTextNode(minutes);
        one.removeChild(one.childNodes[0]);
        one.appendChild(clockText);
    }

});

//-----------------------------------------------------------------

// 2nd PLUS--------------------------------------------

plus2.addEventListener('click', function(){

    if (clock.className == 'paused') {

        // removes colon from clock display if present
        if (colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        seconds = 59;

        workT += 1;

        // used by 'secDown' function
        minutes = workT;

        var workText = document.createTextNode(workT);
        workNum.removeChild(workNum.childNodes[0]);
        workNum.appendChild(workText);
        //------------------------------------------

        var clockText = document.createTextNode(workT);
        one.removeChild(one.childNodes[0]);
        one.appendChild(clockText);

    } // ENDS 1st 'IF'

});

//-----------------------------------------------------------------
