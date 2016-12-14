// GLOBALS ---------------------------------------------------------

var one = document.getElementById('part1');

var two = document.getElementById('part2');

var minutes = 2;

var seconds = 59;

//------------------------------------------------------------------

// PART 2 - FUNCTION ----------------------------------------------------

function secDown() {

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

    if (seconds < 10) {
      // adds a 0 in front of single-digit numbers
      secNode = document.createTextNode('0' + seconds);
    }

    else {

      secNode = document.createTextNode(seconds);
    }

    two.removeChild(two.childNodes[0]);
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

}

// --------------------------------------------------------------

// ON TIMER CLICK--------------------------------------------

clock.addEventListener('click', function(){

    secDown();

    // var min = document.createTextNode(minutes);
    // one.removeChild(one.childNodes[0]);
    // one.appendChild(min);

});

//-----------------------------------------------------------------
