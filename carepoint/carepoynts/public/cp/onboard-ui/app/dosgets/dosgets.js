'use strict';

angular.module('app.dosgets',[])

.controller('DosGetsCtrl', ['$scope', '$q', '$state', '$stateParams', '$window', 'onboardService', function($scope, $q, $state, $stateParams, $window, onboardService) {
    const vm = $scope;

    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.goToMemberLogin = goToMemberLogin;
    vm.goalClick = goalClick;
    vm.goNext = goNext;
    vm.goToStep = goToStep;
    vm.goToDashboard = goToDashboard;
    vm.goDosgets = goDosgets;
    vm.checkEmail = checkEmail;
    vm.checkPhone = checkPhone;
    vm.getBrowserDetails = getBrowserDetails;
    vm.goDosgetsValidateAndGo = goDosgetsValidateAndGo;
    vm.goToDosgets = goToDosgets;
    vm.goMakeMe = goMakeMe;

    // for dev, need to remove when dev done
    vm.setValuesForDev = setValuesForDev;
    
    init();

    function init() {
      if(getCookie("dosgets") == '') {
        onboardService.goDosgetsData(window.location.hash.replace("#/", ""))
          .then(function(response) {
            vm.config = response;
            initParams();
          });
      }
      else {
        vm.config = JSON.parse(decodeURIComponent(getCookie("dosgets")));
        initParams();     
      }     
    }

    function initParams() {
      vm.steps = [false, false, false, false, false, false];
      vm.makeMeError = false;
      vm.showBusy = true;
      initGoogleAnalytics();
      trackGoogleAnalytics();

      vm.dosgets = {};
      vm.profile = {
        fname : null,
        lname : null,
        email : '',
        mPhone : null,
        dob : null,
        zip : null,
        password : null,
        passwordConfirm : null
      };
      // array of email strings
      vm.referral = {
        one : '',
        two : '',
        three : '', 
        four : '',
        five : ''
      };
      vm.clique = {
        name : 'My Family Clique',
        invite : ''
      };


      vm.acceptEula = false;
      // getMemberProfile();


      vm.myemails = [];
      // initEmailComponent();
      vm.emailReadOnly = false;

      if(getCookie('onboard_email')) {
        vm.profile.email = decodeURIComponent(getCookie('onboard_email'));
        vm.emailReadOnly = true;
      }

      vm.showBusy = false;    

      if(vm.config.landingPage) {
        vm.step = -1;
        vm.steps[-1] = true;
      }
      else {
        vm.step = 0;
        vm.steps[0] = true;
      }         
    }

    function initGoogleAnalytics() {
      if (window.location.hostname.indexOf("app.carepoynt.com") != -1) {
        ga('create', 'UA-101939205-1', 'auto');
      }
      else if(window.location.hostname.indexOf("stg.carepoynt.com") != -1) {
         ga('create', 'UA-101939205-4', 'auto');
      }
      else if(window.location.hostname.indexOf("test.carepoynt.com") != -1) {
         ga('create', 'UA-101939205-3', 'auto');
      }
      else {//localhost or dev
         ga('create', 'UA-101939205-2', 'auto');
      }
    }

    // ******************************

    function setValuesForDev() {
        // vm.profile = {
        //   fname : 'Tele',
        //   lname : 'Tubby',
        //   email : 'cpdev.tl@gmail.com',
        //   mPhone : '9876543210',
        //   dob : new Date(),
        //   zip : '92660',
        //   password : 'cpdev123',
        //   passwordConfirm : 'cpdev123',
        //   tos : true
        // };
        // vm.referral = {
        //   one : 'cpdevt.l@gmail.com',
        //   two : 'cpdev.wd@gmail.com',
        //   three : 'cpdev.wd@gmail.com',
        //   four : 'cpdev.wd@gmail.com',
        //   five : 'cpdev.wd@gmail.com'
        // };
        // vm.clique = {
        //   name : 'My Clique',
        //   invite : 'cpdev.wd@gmail.com'
        // };
    }

    function init() {
      if (window.location.hostname.indexOf("app.carepoynt.com") != -1) {
        ga('create', 'UA-101939205-1', 'auto');
      }
      else if(window.location.hostname.indexOf("stg.carepoynt.com") != -1) {
         ga('create', 'UA-101939205-4', 'auto');
      }
      else if(window.location.hostname.indexOf("test.carepoynt.com") != -1) {
         ga('create', 'UA-101939205-3', 'auto');
      }
      else {//localhost or dev
         ga('create', 'UA-101939205-2', 'auto');
      }

      vm.makeMeError = false;
      vm.showBusy = true;
      trackGoogleAnalytics();

      vm.dosgets = {};
      vm.profile = {
        fname : null,
        lname : null,
        email : '',
        mPhone : null,
        dob : null,
        zip : null,
        password : null,
        passwordConfirm : null
      };
      // array of email strings
      vm.referral = {
        one : '',
        two : '',
        three : '', 
        four : '',
        five : ''
      };
      vm.clique = {
        name : null,
        invite : ''
      };


      vm.acceptEula = false;
      // getMemberProfile();


      vm.myemails = [];
      // initEmailComponent();
      vm.emailReadOnly = false;

      if(getCookie('onboard_email')) {
        vm.profile.email = decodeURIComponent(getCookie('onboard_email'));
        vm.emailReadOnly = true;
      }

      vm.showBusy = false;
    }

    function initEmailComponent() {
      vm.$watch('profile.email', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

      vm.$watch('referral.one', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  


      vm.$watch('referral.two', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

      vm.$watch('referral.three', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

      vm.$watch('referral.four', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

      vm.$watch('referral.five', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

      vm.$watch('clique.invite', function (newValue, oldValue) {
        if(newValue.indexOf('@') > -1) {
          newValue = newValue.slice(0, newValue.indexOf('@'));
        }
        helpMe(newValue);
      });  

    }

    function helpMe(val) {
      vm.myemails = [val + '@gmail.com',
                     val + '@hotmail.com', 
                     val + '@me.com',
                     val + '@yahoo.com'];
    }

    function goTo(state) {
      $state.go(state);
    }

    function goBack() {
      $window.history.back();
    }
     

    function convertLocalDate(date) {
      date = new Date(date);
      //Local time converted to UTC
      // console.log("Time: " + date);
      var localOffset = date.getTimezoneOffset() * 60000;
      var localTime = date.getTime();
      date = localTime - localOffset;
      date = new Date(date);
      // console.log("Converted time: " + date);
      return date;
    }

    function goDosgetsValidateAndGo() {
      let dob = (new Date(vm.profile.dob));
      if(vm.profile.dob && vm.profile.dob != "") {
        vm.profile.dobDisplay = dob.getMonth()+1+'/'+dob.getDate()+'/'+dob.getFullYear();
      }
      else {
        vm.profile.dobDisplay = "";
      }

      if(!validateSubmitData()) {
        goToStep(4);
      }
      else {
        goDosgets();
      }
    }

    function goDosgets() {
      let dob = (new Date(vm.profile.dob));

      vm.showBusy = true;
      let referralArray = [];
      angular.forEach(vm.referral, function(value, key) {
        referralArray.push(value);
      });
    
      vm.dosgets.profile = vm.profile;
      vm.dosgets.profile.dob = (new Date(dob.getFullYear(), dob.getMonth(), dob.getDate())).getTime();
      vm.dosgets.referral = referralArray;
      vm.dosgets.clique = vm.clique;
      vm.dosgets.path = window.location.hash.replace("#/", "");

      onboardService.goDosgetsValidate(vm.dosgets)
        .then(function(response) {
          if(response.success) {
            vm.results = response;
            if(vm.results.profile.success && vm.results.referral.success && vm.results.clique.success) {
              vm.gotPromo = true;
              
            }

            onboardService.goDosgets(vm.dosgets)
              .then(function(response) {
                console.log('done');
              });
            goToStep(3);
            vm.showBusy = false;
          }
          else {
            goToStep(5);
            vm.showBusy = false;
            //error handling here. not sure what to do for what yet. 
          }
        });
    }

    function validateSubmitData() {
      let valid = true;
      if(!(vm.profile.fname && vm.profile.lname && vm.profile.dob && vm.profile.mPhone && vm.profile.zip && vm.profile.email && vm.profile.password) ) {
        valid = false;
      }
      if(!(vm.referral.one && vm.referral.two && vm.referral.three && vm.referral.four && vm.referral.five)) {
        valid = false;
      }
      if(!(vm.clique.name && vm.clique.invite) ) {
        valid = false;
      }
      return valid;
    }

    function getMemberProfile() {
      onboardService.getMemberProfile()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function setMemberProfile() {
      onboardService.setMemberProfile()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function getMemberEula() {
      onboardService.getEula()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function setMemberEula() {
      onboardService.setEula()
        .then(function(response) {
          if(response.success) {

          }
        });
    }





    function goToMemberLogin() {
      $window.location = '/login';
    }

    function goToDosgets() {
      $window.location = '/dosgets';
    }

    function goalClick(goalName) {
      vm.profile[goalName] = !vm.profile[goalName];
    }


    function validateProfileForm() {
      return vm.profileForm.$valid;
    }

    function goNext(step) {
      // if(!validateProfileForm()) {
      //   return;
      // }
      vm.step = step;
      trackGoogleAnalytics();
      vm.steps[step-1] = false;
      vm.steps[step] = true;
    }

    function goBack(step) {
      vm.step = step;
      trackGoogleAnalytics();
      vm.steps[step+1] = false;
      vm.steps[step] = true;
    }

    function goToStep(step) {
      vm.steps[vm.step] = false;
      vm.step = step;
      trackGoogleAnalytics();
      vm.steps[step] = true;
    }

    function goMakeMe(step) {
      // vm.step = step;
      // trackGoogleAnalytics();
      // vm.steps[step-1] = false;
      // vm.steps[step] = true;
      vm.makeMeError = false;
      vm.emailError = "";
      vm.phoneError = "";
      let dob = (new Date(vm.profile.dob));
      vm.dosgets.profile = vm.profile;
      vm.dosgets.profile.dob = (new Date(dob.getFullYear(), dob.getMonth(), dob.getDate())).getTime();
      vm.showBusy = true;
      vm.dosgets.path = window.location.hash.replace("#/", "");

      if(vm.emailReadOnly) {
        onboardService.goUpdateMe(vm.dosgets)
          .then(function(response) {
            if(response.success) {
              vm.step = step;
              trackGoogleAnalytics();
              vm.steps[step-1] = false;
              vm.steps[step] = true;
            }
            else {
              if(response.msg =="phoneExists") {
                vm.phoneError = "That phone number is taken. Try another."
              }
              else {
                vm.makeMeError = true;
              }
            }
            vm.showBusy = false;
          });
      }
      else {
        onboardService.goMakeMe(vm.dosgets)
          .then(function(response) {
            if(response.success) {
              vm.step = step;
              trackGoogleAnalytics();
              vm.steps[step-1] = false;
              vm.steps[step] = true;
            }
            else {
              if(response.msg =="memberRoleExists") {
                vm.emailError = "That email is taken. Try another."
              }
              else if(response.msg =="phoneExists") {
                vm.phoneError = "That phone number is taken. Try another."
              }
              else {
                vm.makeMeError = true;
              }
            }
            vm.showBusy = false;
          });
      }

    }

    function goToDashboard() {
      $window.location = '/cp/member-ui/app/index.html#/dashboard';
    }

    function checkEmail() {
      vm.emailError = "";
      onboardService.checkEmail(vm.profile.email)
        .then(function(response) {
          if(response.success) {
            vm.emailError = "That email is taken. Try another."
            //email in use
          }
        });
    }

    function checkPhone() {
      vm.phoneError = "";
      onboardService.checkPhone(vm.profile.mPhone)
        .then(function(response) {
          if(response.success) { 
            //phone in use
            vm.phoneError = "That phone number is taken. Try another."
          }
          else {

          }
        });
    }




    //profile dob date picked
    function getBrowserDetails(){

      var md = new MobileDetect(window.navigator.userAgent);

      if(window.navigator.userAgent.search("Chrome") > -1) {
        var isChrome = true;
      }
      else {
        var isChrome = false;
      }

      if(md.mobile())
      {
        return false;
      }
      else if(!isChrome)
      {
        return true;
      }
      else
      {
        return false;
      }
        
    }

    $scope.dateOptions = {
      showWeeks: false,
      maxDate: new Date()    
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      this.opened = true;
    };

    function trackGoogleAnalytics() {
      if(vm.step == -1) {
        //{page : location.pathname+location.hash, title : "DosGets Onboard Profile"}?
        ga('set', 'page', window.location.hash.replace("#/", "") + "-landing");
        ga('send', 'pageview');
      }      
      if(vm.step == 0) {
        //{page : location.pathname+location.hash, title : "DosGets Onboard Profile"}?
        ga('set', 'page', window.location.hash.replace("#/", "") + "-step-1");
        ga('send', 'pageview');
      }
      if(vm.step == 1) {
        ga('set', 'page', window.location.hash.replace("#/", "") + "-step-2");
        ga('send', 'pageview');
      }
      if(vm.step == 2) {
        ga('set', 'page', window.location.hash.replace("#/", "") + "-step-3");
        ga('send', 'pageview');
      }
      if(vm.step == 3) {
        if(vm.gotPromo) {
          ga('set', 'page', window.location.hash.replace("#/", "") + "-step-success");//success
        }
        else {
          ga('set', 'page', window.location.hash.replace("#/", "") + "-step-so-close");//success
        }
        ga('send', 'pageview');
      }     
      if(vm.step == 4) {
        ga('set', 'page', window.location.hash.replace("#/", "") + "-step-confirmation");
        ga('send', 'pageview');
      } 
      if(vm.step == 5) {
        ga('set', 'page', window.location.hash.replace("#/", "") + "-step-error");
        ga('send', 'pageview');
      }        
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    }



}])

.directive('cpPhoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('phoneNumber')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('phoneNumber')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})
.filter('phoneNumber', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});