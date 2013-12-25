$(function(){
  var text = "this  message  entitles  you  to  one  copy  of  <a href='http://writer.pro'>Writer Pro</a>  from  the  Mac  App  Store  for  use  in  college  and  your  writing  career";
  var $msg = $("#message");

  (function randomize_text(){
    var words = text.split("  ");
    var shuffled_words = shuffle(words);
    var first_word = shuffled_words[0];
    shuffled_words[0] = first_word.charAt(0).toUpperCase() + first_word.slice(1);
    var shuffled_text = shuffled_words.reduce(function(a, b) {return a + " " + b;}) + ".";

    var typed_count = 0;
    type();

    function type() {
      if (typed_count < shuffled_text.length) {
        typed_count++;
        $msg.html(shuffled_text.slice(0, typed_count) + "<span class='cursor'></span>");

        var delay = 0;
        if (shuffled_text.charAt(typed_count) == " ") {
          delay = 120 + Math.random() * 10;
        }
        else {
          delay = 10 + Math.random() * 30;
        }
        setTimeout(type,delay);
      }
      else {
        setTimeout(erase, 1500);
      }
    }

    function erase() {
      if (typed_count > 0) {
        typed_count--;
        $msg.html(shuffled_text.slice(0, typed_count) + "<span class='cursor'></span>");

        var delay = 10;
        setTimeout(erase,delay);
      }
      else {
        setTimeout(randomize_text, 200);
      }
    }

  })();

});

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}