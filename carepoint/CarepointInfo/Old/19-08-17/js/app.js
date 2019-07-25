    // angular.module('cpApp',['ui.router'])
    // .config(function($stateProvider, $urlRouterProvider) {
    //     $stateProvider
    //   .state('login', {
    //       url: '/login',
    //       templateUrl: 'login/index.html',
    //       controller: 'LoginCtrl'
    //     })
    // })


angular.module('cpApp', [])
.directive('attachJquery', function() {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var window_height = window.innerHeight;
                var headerHeight = $("header").innerHeight(); //header height
                $("#content_wrapper").css("padding-top", headerHeight);
                $("#left-sidebar").css("height", window_height);
                $("#content_wrapper").css("height", window_height);
                $("#main_toggle").click(function () {
                    $("#left-sidebar").toggleClass("close-sidebar");
                    $(".row-container").toggleClass("left-pannel");
                })
                
                if($(".all_active").length > 0) {
                    $(".all_active").click(function() {
                        $(".local_sec").show()
                        $(".local_active").removeClass("active")
                    $(this).addClass("active")
                    })
                    $(".local_active").click(function() {
                        $(".local_sec").hide()
                        $(".all_active").removeClass("active")
                        $(this).addClass("active")
                    })
                }
            }
        };
    })

