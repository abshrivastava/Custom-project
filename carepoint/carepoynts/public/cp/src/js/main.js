$( document ).ready(function() {
    $('.owl-carousel').owlCarousel({
      touchDrag: true,
      autoWidth: true,
	    items: 2,
	    nav: false,
			dots: false,
	    loop: true,
	    margin: 15,
	    responsive: {
	      300:{
	        items:2
	        },
				667:{
				  items:3
	        },
				1000:{
	        items:5
	        }
			}
    });
});


$( function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: 37,
      min: 1,
      max: 700,
      slide: function( event, ui ) {
        $( "#amount" ).text( ui.value );
      }
    });
    $( "#amount" ).text( $( "#slider-range-min" ).slider( "value" ));
  } );
