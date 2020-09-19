// countdown is active
let stopCountdown = false;
// create half second text transition to new text
function textTransition(element, text) {
  element.addClass('hide');
  setTimeout(function () {
    element.removeClass('hide');
  }, 500);
  setTimeout(function () {
    element.text(text);
  }, 500);
}

// start opening party countdown
function startCountdown() {
  // set the date and 
  let countdownDate = new Date('Oct 23, 2020 18:00:00').getTime();
  let firstTransition = true;

  // updating time every second
  let counter = setInterval(function () {
    if (!stopCountdown) {
      // current date
      let now = new Date().getTime();
      // date difference
      let difference = countdownDate - now;
      // object with countdown difference data
      let countdownData = calculateCountdown(difference);
      // countdown text element
      let countdownText = $('.js-countdown-text');

      // do transition if its first interval
      if (firstTransition) {
        setInterval(change, 500);

        function change() {
          countdownText.addClass('hide');
          setTimeout(function () {
            countdownText.removeClass('hide');
            $('.blurred-logo-text').removeClass('hide');
          }, 500);
        }
        firstTransition = false;
      }
      else {
        // display countdown for current interval
        countdownText.text(countdownData.days + ' : ' + countdownData.hours + ' : ' + countdownData.minutes + ' : ' + countdownData.seconds);
      }

      // if the count down is finished write coming soon
      if (difference < 0) {
        clearInterval(counter);
        countdownText.text('COMING SOON');
      }
    }
    else {
      firstTransition = true;
      //clearInterval(counter);
    }
  }, 1000);
}

// adds zero if number if less than ten
function updateFormat(number) {
  return number < 10 ? '0' + number : number;
}

// calculate date and time
function calculateCountdown(difference) {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: updateFormat(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: updateFormat(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: updateFormat(Math.floor((difference % (1000 * 60)) / 1000))
  }
}


$(document).ready(function () {

  // transition timer in seconds
  const transitionTimer = 12;

  let interval = 0;
  let documentFocus = setInterval(function () {

    //console.log(interval % (transitionTimer * 2));
    if (document.hasFocus()) {
      interval++;
      // display elements only on initial load
      if (interval == 1) {
        $('.center-panel').removeClass('hide');
        $('.bottom-panel').removeClass('hide');
        $('.countdown-panel').append('<p class="js-countdown-text countdown-font align-center">MINDSET</p>').removeClass('hide');

        setTimeout(function () {
          textTransition($('.js-countdown-text'), 'COMING SOON');
        }, 1500);

        // true if countdown was forced
        let forceCountdown = false;

        // start countdown if not already forced
        let countdownTimer = setTimeout(function () {
          if (!forceCountdown) {
            startCountdown();
          }
        }, 1500);

      } else if (interval > (transitionTimer * 2)) {
        // switch for loop timing
        switch (interval % (transitionTimer * 2)) {
          case 1:
            $('.countdown-panel').addClass('hide');
            stopCountdown = true;
            break;
          case 2:
            $('.countdown-panel').removeClass('hide');
            $('.js-countdown-text').text('MINDSET');
            break;
          case 8:
            $('.countdown-panel').addClass('hide');
            break;
          case 9:
            $('.countdown-panel').removeClass('hide');
            $('.js-countdown-text').text('COMING SOON');
            break;
          case 13:
            stopCountdown = false;
            break;
          case 15:
            $('.countdown-panel').addClass('hide');
            break;
          case 16:
            $('.countdown-panel').removeClass('hide');
        }
      }
    }
  }, 500);
});