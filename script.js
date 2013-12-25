var tilt = -3,
    roll = 0,
    compass = 0;

var $msg;
var msg_width = 0;

function tilt_detect(event) {
  compass = event.alpha;
  tilt    = parseInt( event.beta  * 1 ) / 1;
  roll    = parseInt( event.gamma * 1 ) / 1;
}

function move_message() {
  if (isNaN(compass)) compass = 0;
  $msg.css({
    "-webkit-transform":
      /*"rotate(" + -roll + "deg)*/ "translate3d(" + msg_progress(compass) +  "px, " + (tilt - 80) + "%, 0)"
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
  msg_width = $msg.width();
  window.addEventListener("deviceorientation", tilt_detect, true);

  (function step(){
    requestAnimationFrame(step);
    move_message();
  })();

});