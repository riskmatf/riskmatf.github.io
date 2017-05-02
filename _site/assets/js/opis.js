$(function () {
  $('.terminal').typed({
    strings: ['Dobrodosli na sajt studentske sekcije za racunarstvo i informatiku matematickog fakulteta, ^500<strong>RISK<strong>.','Radimo veoma kul stvari.',''],
    typeSpeed: 10,
    callback: startTerminal($('.terminal'))
  });
});

var startTerminal = function(term) {
  alert(1);
}
