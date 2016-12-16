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

        // When clock-working reaches '0:00' do this:
        if (workNum.className == 'active' && (seconds == -1 && minutes == 0)) {

            minutes = breakT;
            seconds = 59;

            workNum.className = 'dormant';
            breakNum.className = 'active';

            setTimeout(secDown, 1000);
        }

        // When clock-break reaches '0:00' do this:
        if (breakNum.className == 'active' && (seconds == -1 && minutes == 0)) {

            minutes = workT;
            seconds = 59;

            breakNum.className = 'dormant';
            workNum.className = 'active';

            setTimeout(secDown, 1000);
        }

    } // ENDS 1st 'IF'

} // ENDS SECDOWN

// --------------------------------------------------------------

// ON TIME-CLICK--------------------------------------------

clock.addEventListener('click', function(){

    // if clock has NOT been clicked yet
    if (document.getElementsByClassName('active').length === 0) {

        workNum.className = 'active';
        minutes = workT;
    }

    // if clock is PAUSED
    if (clock.className == 'paused') {

        // ADDS 'running' to clock & ALLOWS for 'secDown' execution
        clock.className = 'running'

        // Adds colon to timer if not already on it at click
        if (colon.childNodes[0] == undefined) {

            colon.appendChild(colText);
        }

        // EXECUTES 'secDown'
        secDown();
    }

    // if clock IS RUNNING at time of click
    else {

        clock.className = 'paused';
    }

});

//-----------------------------------------------------------------

// 1st MINUS--------------------------------------------

minus1.addEventListener('click', function(){

    if ((clock.className == 'paused' || breakNum.className == 'dormant') && breakT > 1) {

        // removes colon from clock display if present
        if (breakNum.className == 'active' && colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (breakNum.className == 'active' && two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        // if clock-break is running
        if (breakNum.className == 'active') {

            seconds = 59;
        }

        breakT -= 1;

        // used by 'secDown' function
        if (breakNum.className == 'active') {

            minutes = breakT;
        }

        var breakText = document.createTextNode(breakT);
        breakNum.removeChild(breakNum.childNodes[0]);
        breakNum.appendChild(breakText);
        //------------------------------------------

        var clockText = document.createTextNode(breakT);

        if (breakNum.className == 'active') {

            one.removeChild(one.childNodes[0]);
            one.appendChild(clockText);
        }
    } // ENDS 1st 'IF'

});

//-----------------------------------------------------------------

// 1st PLUS--------------------------------------------

plus1.addEventListener('click', function(){

    if (clock.className == 'paused' || breakNum.className == 'dormant') {

        // removes colon from clock display if present
        if (breakNum.className == 'active' && colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (breakNum.className == 'active' && two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        // if clock-break is running
        if (breakNum.className == 'active') {

            seconds = 59;
        }

        breakT += 1;

        // used by 'secDown' function
        if (breakNum.className == 'active') {

            minutes = breakT;
        }

        var breakText = document.createTextNode(breakT);
        breakNum.removeChild(breakNum.childNodes[0]);
        breakNum.appendChild(breakText);
        //------------------------------------------

        var clockText = document.createTextNode(breakT);

        if (breakNum.className == 'active') {

            one.removeChild(one.childNodes[0]);
            one.appendChild(clockText);
        }
    } // ENDS 1st 'IF'

});

//-----------------------------------------------------------------

// 2nd MINUS--------------------------------------------

minus2.addEventListener('click', function(){

    if ((clock.className == 'paused' || workNum.className == 'dormant') && workT > 1) {

        // removes colon from clock display if present
        if (workNum.className == 'active' && colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (workNum.className == 'active' && two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        // if clock-break is running
        if (workNum.className == 'active') {

            seconds = 59;
        }

        workT -= 1;

        // used by 'secDown' function
        if (workNum.className == 'active') {

            minutes = workT;
        }

        var workText = document.createTextNode(workT);
        workNum.removeChild(workNum.childNodes[0]);
        workNum.appendChild(workText);
        //------------------------------------------

        var clockText = document.createTextNode(workT);

        if (workNum.className == 'active' || document.getElementsByClassName('active').length === 0) {

            one.removeChild(one.childNodes[0]);
            one.appendChild(clockText);
        }
    } // ENDS 1st 'IF'
});

//-----------------------------------------------------------------

// 2nd PLUS--------------------------------------------

plus2.addEventListener('click', function(){

    if (clock.className == 'paused' || workNum.className == 'dormant') {

        // removes colon from clock display if present
        if (workNum.className == 'active' && colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);
        }

        // removes seconds from clock display if present
        if (workNum.className == 'active' && two.childNodes[0] !== undefined) {

            two.removeChild(two.childNodes[0]);
        }

        // if clock-break is running
        if (workNum.className == 'active') {

            seconds = 59;
        }

        workT += 1;

        // used by 'secDown' function
        if (workNum.className == 'active') {

            minutes = workT;
        }

        var workText = document.createTextNode(workT);
        workNum.removeChild(workNum.childNodes[0]);
        workNum.appendChild(workText);
        //------------------------------------------

        var clockText = document.createTextNode(workT);

        if (workNum.className == 'active' || document.getElementsByClassName('active').length === 0) {

            one.removeChild(one.childNodes[0]);
            one.appendChild(clockText);
        }
    } // ENDS 1st 'IF'

});

//-----------------------------------------------------------------
