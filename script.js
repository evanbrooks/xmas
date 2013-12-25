var tilt = -3,
    roll = 0,
    compass = 0;

var compass_avg = [0,0,0,0,0];
var tilt_avg = [0,0,0,0,0];

var $msg;
var msg_width = 0;

function tilt_detect(event) {

  compass_avg.pop();
  compass_avg.unshift(event.alpha);
  compass = compass_avg.reduce(function(a, b) {return a + b;}) / compass_avg.length;

  tilt_avg.pop();
  tilt_avg.unshift(event.beta);
  tilt = tilt_avg.reduce(function(a, b) {return a + b;}) / tilt_avg.length;

  roll    = parseInt( event.gamma * 1 ) / 1;
}

function move_message() {
  if (isNaN(compass)) compass = 300;
  $msg.css({
    "-webkit-transform":
      /*"rotate(" + -roll + "deg)*/ "translate3d(" + msg_progress(compass) +  "px, " + (0.01 * (tilt - 90)) + "%, 0)"
  });
}

function msg_progress(degrees) {
  if (degrees < 0) {
    return msg_progress(degrees + 360)
  }
  else if (degrees > 360) {
    return msg_progress(degrees - 360)
  }
  else {
    console.log("deg: " + degrees);
    var progress = -msg_width + ((degrees / 360) * msg_width);
    console.log(" __________________________prog: "+ progress);
    return progress;
  }
}


$(function(){
  $msg = $("#message");
  msg_width = $msg.width() + $("body").width();
  window.addEventListener("deviceorientation", tilt_detect, true);

  (function step(){
    requestAnimationFrame(step);
    move_message();
  })();

});