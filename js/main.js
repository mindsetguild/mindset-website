// true if countdown was forced
let forceCountdown = false;

// start countdown if not already forced
let countdownTimer = setTimeout(function () {
  if (!forceCountdown) {
    startCountdown();
  }
}, 3000);

// display elements
setTimeout(function () {
  $('.center-panel').removeClass('hide');
  $('.bottom-panel').removeClass('hide');
  $('.countdown-panel').append('<p class="countdown-text countdown-font align-center">MINDSET</p>').removeClass('hide');

  setTimeout(function () {
    textTransition($('.countdown-text'), 'COMING SOON');
  }, 1500);

  /*
  $('.countdown-panel').on('mouseover', function() {
    startCountdown();
    clearInterval(countdownTimer);
    forceCountdown = true;
  });
  */
}, 500);

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

    // current date
    let now = new Date().getTime();
    // date difference
    let difference = countdownDate - now;
    // object with countdown difference data
    let countdownData = calculateCountdown(difference);

    // do transition if its first interval
    if (firstTransition) {
      let countdown = $('.countdown-panel').get(0);
      setInterval(change, 500);

      function change() {
        $(countdown).addClass('hide');
        setTimeout(function () {
          $(countdown).removeClass('hide');
          $('.blurred-logo-text').removeClass('hide');
        }, 500);
      }
      firstTransition = false;
    }
    else {
      // display countdown for current interval
      $('.countdown-text').text(countdownData.days + ' : ' + countdownData.hours + ' : ' + countdownData.minutes + ' : ' + countdownData.seconds);
    }

    // if the count down is finished write coming soon
    if (difference < 0) {
      clearInterval(counter);
      $('.countdown-text').text('COMING SOON');
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
    days: updateFormat(Math.floor(difference / (1000 * 60 * 60 * 24))),
    hours: updateFormat(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: updateFormat(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: updateFormat(Math.floor((difference % (1000 * 60)) / 1000))
  }
}