$(function() {
 var bkcolor;
 var textvalue;
 $('#slider').slider({
 orientation: "vertical",
  slide: function(event, ui) {
    $('.progressbar-cover').css('bottom' , ui.value + '%');  // the cover controls the bar height
  }
 });




//  function CountDownTimer(dt, id)
//  {
//      var end = new Date(dt);

//      var _second = 1000;
//      var _minute = _second * 60;
//      var _hour = _minute * 60;
//      var _day = _hour * 24;
//      var timer;

//      function showRemaining() {
//          var now = new Date();
//          var distance = end - now;
//          if (distance < 0) {

//              clearInterval(timer);
//              document.getElementById(id).innerHTML = '0';

//              return;
//          }
//          var days = Math.floor(distance / _day);
//          var hours = Math.floor((distance % _day) / _hour);
//          var minutes = Math.floor((distance % _hour) / _minute);
//          var seconds = Math.floor((distance % _minute) / _second);

//          document.getElementById(id).innerHTML = days /*+ ' days'*/;
//          //document.getElementById(id).innerHTML += hours + 'hrs ';
//          //document.getElementById(id).innerHTML += minutes + 'mins ';
//          //document.getElementById(id).innerHTML += seconds + 'secs';
//      }

//      timer = setInterval(showRemaining, 1000);
//  }




});

$(document).ready(function() {
   $(".ui-slider-handle").text("Drag me!");
});