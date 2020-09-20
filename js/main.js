/**
 * Target date for countdown
 */
const targetDate = 'Oct 23, 2020 18:00:00';

/**
 * Transition timer in seconds
 */
const transitionTimer = 18;

/**
 * Start countdown timer
 */
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
      clearInterval(counter);
    }
  }, 1000);
}

/**
 * Create half second transition to new text
 * @param {Element} element 
 * @param {String} text 
 */
function textTransition(element, text) {
  element.addClass('hide');
  setTimeout(function () {
    element.removeClass('hide');
  }, 500);
  setTimeout(function () {
    element.text(text);
  }, 500);
}

/**
 * Returns string with number in two digit format
 * @param {*} number 
 */
function updateFormat(number) {
  return number < 10 ? '0' + number : number;
}

/**
 * Returns object with calculated time values
 * @param {Date} difference 
 */
function calculateCountdown(difference) {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: updateFormat(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: updateFormat(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: updateFormat(Math.floor((difference % (1000 * 60)) / 1000))
  }
}

/**
 * Returns text in countdown format
 * @param {Object} countdownData 
 */
function getCountdown(countdownData) {
  return countdownData.days + ' : ' + countdownData.hours + ' : ' + countdownData.minutes + ' : ' + countdownData.seconds;
}

/**
 * Document ready function
 */
$(document).ready(function () {
  // document is not loaded
  let isLoaded = false;
  // interval for checking if document is fully loaded
  let documentFocusInterval = setInterval(function () {
    //console.log(interval % (transitionTimer * 2));
    if (document.hasFocus()) {
      // display elements only on initial load
      if (!isLoaded) {
        // display logo
        $('.center-panel').removeClass('hide');
        // display social media icons
        $('.bottom-panel').removeClass('hide');
        // countdown panel element
        let countdownPanel = $('.countdown-panel');
        // append and show countdown element
        countdownPanel.append('<p class="js-countdown-text countdown-font align-center">MINDSET</p>').removeClass('hide');
        // document is loaded
        isLoaded = true;

        // counter for timing transitions
        let interval = 0;
        // interval for countdown transitions
        setInterval(function () {
          // set target date and time
          let countdownDate = new Date(targetDate).getTime();
          // current date
          let now = new Date().getTime();
          // date difference
          let difference = countdownDate - now;
          // object with countdown difference data
          let countdownData = calculateCountdown(difference);
          // countdown text element
          let countdownText = $('.js-countdown-text');

          // switch for timing transitions
          switch (interval % transitionTimer) {
            case 2:
              countdownPanel.addClass('hide');
              break;
            case 3:
              countdownPanel.removeClass('hide');
              countdownText.text('COMING SOON');
              break;
            case 5:
              countdownPanel.addClass('hide');
              break;
            case 6:
              countdownPanel.removeClass('hide');
              countdownText.text(getCountdown(countdownData));
              // show blurred text if it is hidden
              if ($('.blurred-logo-text').hasClass('hide')) {
                $('.blurred-logo-text').removeClass('hide');
              }
          }

          // if timer with offset is higher than highest value in timer set text to current countdown
          if ((interval % transitionTimer) > 6) {
            countdownText.text(getCountdown(countdownData));
          }
          // reset to default position
          else if (interval != 0 && interval % transitionTimer == 0) {
            countdownText.text(getCountdown(countdownData));
            interval = 1;
          }
          // iterate interval
          interval++;
        }, 1000);
      }
      // document is loaded
      else {
        // clear document focus interval
        clearInterval(documentFocusInterval);
      }
    }
  }, 1000);
});