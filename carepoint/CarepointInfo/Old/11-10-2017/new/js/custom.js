$(document).ready(function () {
    var window_height = window.innerHeight;
    var headerHeight = $("header").innerHeight(); //header height
    window.menuClick = 0;
    $("#content_wrapper").css("padding-top", headerHeight);
    $("#left-sidebar").css("height", window_height);
    $("#content_wrapper").css("height", window_height);
    $("#main_toggle").click(function () {
        window.menuClick = 1;
        $("#left-sidebar").toggleClass("close-sidebar");
        $(".row-container").toggleClass("left-pannel");
        $("#wrapper").toggleClass("open-full");
    });
    $(document).on("click","#wrapper.open-full .maincontainer", function () {
		if(window.menuClick === 0) {
		  $("#main_toggle").trigger("click");
		} else {
		  window.menuClick = 0;
		}
	});
})