// set the date and 
var countDownDate = new Date("Oct 23, 2020 18:00:00").getTime();
var firstTransition = true;
var forceCountdown = false;

// display elements
setTimeout(function () {
  $('.center-panel').removeClass('hide');
  $('.bottom-panel').removeClass('hide');
  $('.countdown-panel').removeClass('hide').text('MINDSET');
}, 500);

// start countdown if not already forced
setTimeout(function () {
  if (!forceCountdown) {
    startCountdown();
  }
}, 3000);

// adds zero if number if less than ten
function checkNumber(number) {
  return number < 10 ? '0' + number : number;
}

// start opening party countdown
function startCountdown() {
  var counter = setInterval(function () {

    // current date
    var now = new Date().getTime();

    // find distance
    var distance = countDownDate - now;

    // calculate date and time
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // do transition if its first interval
    if (firstTransition) {
      var elem = $('.countdown-panel').get(0);
      setInterval(change, 500);

      function change() {
        $(elem).addClass('hide');
        setTimeout(function () {
          $(elem).removeClass('hide');
          $('.blurred-container').removeClass('hide');
        }, 500);
      }
      firstTransition = false;
    }
    else if (!firstTransition) {
      // display countdown for current interval
      $('.countdown-panel').text(checkNumber(days) + ' : ' + checkNumber(hours) + ' : ' + checkNumber(minutes) + ' : ' + checkNumber(seconds));
    }

    // if the count down is finished write coming soon
    if (distance < 0) {
      clearInterval(counter);
      $('.countdown-panel').text('COMING SOON');
    }
  }, 1000);
}