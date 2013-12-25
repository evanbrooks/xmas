var tilt = -3,
    roll = 0,
    compass = 0;

var $msg;

function tilt_detect(event) {
  compass = parseInt( event.alpha * 1 ) / 1;
  tilt    = parseInt( event.beta  * 1 ) / 1;
  roll    = parseInt( event.gamma * 1 ) / 1;
}

function move_message() {
  if (isNaN(compass)) compass = 0;
  $msg.css({
    "-webkit-transform":
      "rotate(" + -roll + "deg) translate3d(" + compass +  "%, " + (tilt - 80) + "%, 0)"
  });
}


$(function(){
  $msg = $("#message");
  window.addEventListener("deviceorientation", tilt_detect, true);

  (function step(){
    requestAnimationFrame(step);
    move_message();
  })();

});