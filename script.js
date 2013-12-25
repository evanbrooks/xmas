var tilt = -3,
    roll = 0,
    compass = 0;

var grav = 0;

var compass_avg = [0,0,0,0,0];
var tilt_avg = [0,0,0,0,0];

var $msg, $sig, $bod, $surp;
var msg_width = 0;

function motion_detect(event) {
  grav = event.accelerationIncludingGravity.z;
}

function tilt_detect(event) {

  var deg = normalize_degrees(event.alpha);

  if ( Math.abs(deg - compass_avg[0]) > 180 ) {
    compass_avg = [deg,deg,deg,deg, deg];
  }
  else {
    compass_avg.pop();
    compass_avg.unshift(event.alpha);
  }
  compass = compass_avg.reduce(function(a, b) {return a + b;}) / compass_avg.length;

  tilt_avg.pop();
  tilt_avg.unshift(event.beta);
  tilt = tilt_avg.reduce(function(a, b) {return a + b;}) / tilt_avg.length;

  roll = parseInt( event.gamma * 1 ) / 1;


  //console.log(tilt);
  if (tilt < 25) {
    if (grav < 0) $bod.addClass("flat-down");
    if (grav > 0) $bod.addClass("look-up");
  }
  else {
    $bod.removeClass("flat-down look-up");
  }

}

function move_message() {
  if (isNaN(compass)) compass = 300;
  $msg.css({
    "-webkit-transform":
      "translate3d(" + msg_progress(compass) +  "px, " + (0.01 * (tilt - 90)) + "%, 0)"
  });
  $sig.css({
    "-webkit-transform":
      "rotate(" + compass + "deg)"
  });
  $surp.css({
    "-webkit-transform":
      "rotate(" + compass + "deg)"
  });

}

function normalize_degrees(degrees) {
  if (degrees < 0) {
    return normalize_degrees(degrees + 360)
  }
  else if (degrees > 360) {
    return normalize_degrees(degrees - 360)
  }
  else return degrees;
}

function msg_progress(degrees) {
  var progress = -msg_width + ((degrees / 360) * msg_width);
  return progress;
}


$(function(){
  $bod = $("body");
  $msg = $("#message");
  $sig = $("#signature");
  $surp = $("#surprise");
  msg_width = $msg.width() + $("body").width();
  window.addEventListener("deviceorientation", tilt_detect, true);
  window.addEventListener("devicemotion", motion_detect, true);

  (function step(){
    requestAnimationFrame(step);
    move_message();
  })();

});