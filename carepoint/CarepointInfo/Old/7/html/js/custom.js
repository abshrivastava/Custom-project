$(document).ready(function () {


    var window_height = window.innerHeight;
    //header height
    var headerHeight = $("header").innerHeight();
    $("#content_wrapper").css("padding-top", headerHeight);
   // alert(window_height);
    $("#left-sidebar").css("height", window_height);
    $("#content_wrapper").css("height", window_height);
    $("#main_toggle").click(function () {
      //  debugger;
        $("#left-sidebar").toggleClass("sidebarclose");
        $("#Content_section").toggleClass("content_full");
    })

	if($(".all_active").length > 0)
	 {
	    $(".all_active").click(function(){
          $(".local_sec").show()
          $(".local_active").removeClass("active")
         $(this).addClass("active")
        })
        $(".local_active").click(function(){
          $(".local_sec").hide()
           $(".all_active").removeClass("active")
          $(this).addClass("active")
        })
	 }

})
