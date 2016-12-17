// GLOBALS ------------------------------------------
var bird = new Audio('hummingbird.mp3');

var minus1 = document.getElementById('minus1');

var breakNum = document.getElementById('breakNum');

var plus1 = document.getElementById('plus1');
//---------------------------------------------------

var minus2 = document.getElementById('minus2');

var workNum = document.getElementById('workNum');

var plus2 = document.getElementById('plus2');
//---------------------------------------------------

var part0 = document.getElementById('part0');

var colon0 = document.getElementById('colon0');

var clock = document.getElementById('clock');

var one = document.getElementById('part1');

var colon = document.getElementById('colon');

var colText = document.createTextNode(':');

var two = document.getElementById('part2');
//----------------------------------------------------

var breakT = 5;

var breakSwitch = 'no';

var workT = 25;

var workSwitch = 'no';
//-------------
var hours = 0;

var minutes = 25;

var seconds = 59;

//------------------------------------------------------------------

// PART 2 - FUNCTION ----------------------------------------------------

function secDown() {

    if (clock.className == 'running') {

        console.log('EXECUTED');

        console.log('Hours:' + hours);

        if (hours > 0 && breakSwitch == 'yes') {

            console.log('BREAKSwitch-dependent-executed');

            var hourText = document.createTextNode(hours);
            part0.appendChild(hourText);

            var colText0 = document.createTextNode(':');
            colon0.appendChild(colText0);

            breakSwitch = 'no';
        }

        else if (hours === 0 && breakSwitch == 'yes') {

            breakSwitch = 'no';
        }

        if (hours > 0 && workSwitch == 'yes') {

            console.log('WORKSwitch-dependent-executed');

            var hourText = document.createTextNode(hours);
            part0.appendChild(hourText);

            var colText0 = document.createTextNode(':');
            colon0.appendChild(colText0);

            workSwitch = 'no';
        }

        else if (hours === 0 && workSwitch == 'yes') {

            workSwitch = 'no';
        }

        //---------------------------------------------------

        if (seconds == 59 && (minutes > 0 && minutes !== 59)) {
            console.log('first thing');
          //Seconds at 59 means full min. has passed,
          // thus, min. is decreased by 1.
            minutes -= 1;

            var min = document.createTextNode(minutes);
            one.removeChild(one.childNodes[0]);
            one.appendChild(min);
        }
        //-----------------------------------------------------

        if (minutes == 59) {

            var min = document.createTextNode(minutes);
            one.removeChild(one.childNodes[0]);
            one.appendChild(min);

            minutes -= 1;

            if (hours !== 0) {

                part0.removeChild(part0.childNodes[0]);
                var hourNum = document.createTextNode(hours);
                part0.appendChild(hourNum);
            }

            else if (hours === 0) {

                part0.removeChild(part0.childNodes[0]);
                colon0.removeChild(colon0.childNodes[0]);
            }
        }
        //----------------------------------------------------
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

            console.log('two removed')
            // if seconds slot is NOT empty...
            two.removeChild(two.childNodes[0]);
        }
        two.appendChild(secNode);
        seconds -= 1;
        //-------------------------------------------------------

        // Run function again with 1 sec. delay if conditions met:
        if (seconds >= 0 && minutes >= 0) {

            console.log('min & sec NOT ZERO')

            setTimeout(secDown, 1000);
        }

      // Reset seconds if they display '00' and run function
      // if also other conditions met.
        if (seconds === -1 && minutes > 0) {

            console.log('secondsZERO')

            seconds = 59;
            setTimeout(secDown, 1000);
        }

        // if hours > 0 AND minutes and seconds = 0:
        if (hours > 0 && (seconds == -1 && minutes === 0)) {
            console.log("FLOOOOO");

            console.log('hours:' + hours);

            hours -= 1;

            console.log('its ALIVE');
            minutes = 59;
            seconds = 59;

            setTimeout(secDown, 1000);

            console.log('ready');


        }

        // When clock-working reaches '0:00' do this:
        if (workNum.className == 'active' && (seconds == -1 && minutes === 0)) {

            if (hours === 0) {

                console.log('Pooooowwwwwww');

                if (breakT > 60) {

                    var hour = [];
                    hour.push(((breakT/60).toString()).split("")[0]);
                    hours = Number(hour[0]);
                }

                minutes = breakT - (60 * hours);

                seconds = 59;
                breakNum.className = 'active';
                workNum.className = 'dormant';

                breakSwitch = 'yes';

                bird.play();

                setTimeout(secDown, 1000);
            }
        } // ends 'CLOCK-WORKING' 0's

        else {
            console.log(hours + minutes + seconds + 'NOPE');
        }

        // When clock-break reaches '0:00' do this:
        if (hours === 0 && (breakNum.className == 'active' && (seconds == -1 && minutes == 0))) {

            console.log('woooooooo');

            if (workT > 60) {

                var hour = [];
                hour.push(((workT/60).toString()).split("")[0]);
                hours = Number(hour[0]);
            }

            minutes = workT - (60 * hours);

            seconds = 59;
            breakNum.className = 'dormant';
            workNum.className = 'active';

            workSwitch = 'yes';

            bird.play();

            setTimeout(secDown, 1000);
        } // ENDS 'CLOCK-BREAK' 0's

    } // ENDS 1st 'IF'

} // ENDS SECDOWN

// --------------------------------------------------------------

// ON TIME-CLICK--------------------------------------------

clock.addEventListener('click', function(){

    console.log(minutes);
    // if clock has NOT been clicked yet
    if (document.getElementsByClassName('active').length === 0) {

        workNum.className = 'active';
        minutes = workT;
    }

    if (clock.className == 'paused') {

        console.log('CURRENENNENENN' + hours);

        var hour = [];

        hour.push(((minutes/60).toString()).split("")[0]);

        hours = Number(hour[0]);

        minutes = minutes - (60 * hours);

        if (hours > 0) {

            var hourText = document.createTextNode(hours);
            part0.appendChild(hourText);

            var colText0 = document.createTextNode(':');
            colon0.appendChild(colText0);

            console.log('COLON' + ' ' + '0' + ' ' + 'APPENDED!');
        }

        console.log('clock-tick:' + hours);

    }

    console.log(minutes);

    // if clock is PAUSED
    if (clock.className == 'paused') {

        // ADDS 'running' to clock & ALLOWS for 'secDown' execution
        clock.className = 'running'

        // Adds MINUTE colon to timer if not already on it at click
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

        // removes colons from clock display if present
        if (breakNum.className == 'active' && colon.childNodes[0] !== undefined) {

            colon.removeChild(colon.childNodes[0]);

            if (colon0.childNodes[0] !== undefined) {

                colon0.removeChild(colon0.childNodes[0]);
            }
        }

        // removes hours from clock display if present
        if (breakNum.className == 'active' && part0.childNodes[0] !== undefined) {

            part0.removeChild(part0.childNodes[0]);
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

            if (colon0.childNodes[0] !== undefined) {

                colon0.removeChild(colon0.childNodes[0]);
            }
        }

        // removes hours from clock display if present
        if (breakNum.className == 'active' && part0.childNodes[0] !== undefined) {

            part0.removeChild(part0.childNodes[0]);
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

            if (colon0.childNodes[0] !== undefined) {

                colon0.removeChild(colon0.childNodes[0]);
            }
        }

        // removes hours from clock display if present
        if (workNum.className == 'active' && part0.childNodes[0] !== undefined) {

            part0.removeChild(part0.childNodes[0]);
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

            if (colon0.childNodes[0] !== undefined) {

                colon0.removeChild(colon0.childNodes[0]);
            }
        }

        // removes hours from clock display if present
        if (workNum.className == 'active' && part0.childNodes[0] !== undefined) {

            part0.removeChild(part0.childNodes[0]);
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
