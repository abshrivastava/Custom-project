'use strict';

angular.module('app.cliques', ['ui.bootstrap', 'Teletubby.ui.shared.modules.nav'])

.controller('CliquesCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'cliqueService', 'memberService', 'offerService', 'TeletubbyNav',
            function($scope, $q, $state, $window, featureToggleService, cliqueService, memberService, offerService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.createClique = createClique;
    vm.getCliqueByMemberId = getCliqueByMemberId;
    vm.getCliqueById = getCliqueById;
    vm.showAddDependentForm = showAddDependentForm;
    vm.cancelAddDependent = cancelAddDependent;
    vm.addDependent = addDependent;
    vm.showInvite = showInvite;
    vm.inviteMember = inviteMember;
    vm.cancelInvite = cancelInvite;
    vm.showTransferForm = showTransferForm;
    vm.cancelTransfer = cancelTransfer;
    vm.transferPoynts = transferPoynts;
    vm.transferFromSelect = transferFromSelect;
    vm.transferToSelect = transferToSelect;
    vm.showCliqueHome = showCliqueHome;
    vm.removeMember = removeMember;
    vm.isCliqueManager = isCliqueManager;
    vm.deactivateClique = deactivateClique;
    vm.confirmDeleteClique = confirmDeleteClique;
    vm.cancelDeleteClique = cancelDeleteClique;
    vm.acceptInvite = acceptInvite;
    vm.denyInvite = denyInvite;
    vm.setGender = setGender;
    vm.showMyCliquesList = showMyCliquesList;
    vm.showCreateCliqueForm = showCreateCliqueForm;
    vm.showAdd = showAdd;
    vm.expandMe = expandMe;
    vm.isYou = isYou;
    vm.manageMembers = manageMembers;
    vm.managePoynts = managePoynts;
    vm.selectMember = selectMember;
    vm.createCancel = createCancel;
    vm.selectInviteType = selectInviteType;
    vm.showTrash = showTrash;
    $scope.checkBrowser = getBrowserDetails();
    vm.getCheckin = getCheckin;

  	init();

    // ******************************

  	function init() {
      vm.showFull = false;
      vm.showPull = false;
      vm.resultStatus = null;
      vm.showDependentCheck = false;
      vm.loading = true;
      vm.clique = {};
      vm.invite = {};
      vm.newMember = {};
      vm.transfer = {};
      vm.showClique = false;
      vm.showCreateClique = false;
      vm.showAddDependent = false;
      vm.showInviteForm = false;
      vm.showTransfer = false;
      vm.inviteEmail = null;
      vm.showConfirmDelete = false;
      vm.showAcceptInviteForm = false;
      vm.readOnly = false;
      vm.showAddToHomescreen = false;
      vm.isExpanded = false;

      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
        // clique: cliqueService.getMyClique(),
        myCliques: cliqueService.getAllMyCliques()
      })
      .then(function (response) {
        vm.loading = false;
        vm.features = response.features;
        vm.member = response.member;
        vm.loginMember = response.member;
        vm.myCliques = response.myCliques;
        
        if(response.myCliques.length < 1){
          vm.clique = {};
          vm.showCreateClique = true;
        }
        else {
          vm.showMyCliques = true;
        }

        // need to get the clique poynts total
        angular.forEach(vm.myCliques, function(clique) {
          loadCliqueDetail(clique);
        });


        vm.isManager = isManager(vm.myCliques);
        
        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

      });


    }

    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    }

    function goTo(state) {
      $state.go(state);
    }

    function goBack() {
      $window.history.back();
    }

    function createClique() {
      vm.showBusy = true;
      cliqueService.createClique(vm.clique)
        .then(function (response) {
          if(response.success) {
            
            getAllMyCliques();
            
          }
          // vm.showBusy = false;
        });
    }

    function getClique() {
      vm.showBusy = true;
      cliqueService.getMyClique()
        .then(function (response) {

            if(response.length < 1){
              vm.clique = {};
              vm.showClique = false;
              vm.showCreateClique = true;
              vm.showAcceptInviteForm = false;
            }
            else {
              vm.clique = response;
              vm.readOnly = !isCliqueCreator();
              if(isInvitee()) {
                vm.showCreateClique = false;
                vm.showAcceptInviteForm = true;
              }
              else {
                vm.showClique = true;
              }
              if(vm.clique.members) {
                vm.member.reward.points = vm.clique.members[0].details.reward.points;
              }
            }
            vm.showBusy = false;
          
        });
    }

    function getAllMyCliques() {
      vm.showBusy = true;
      cliqueService.getAllMyCliques()
        .then(function (response) {
          vm.loading = false;
          vm.myCliques = response;
          
          if(vm.myCliques.length < 1){
            vm.clique = {};
            vm.showCreateClique = true;
          }
          else {
            showMyCliquesList();
          }

          // need to get the clique poynts total
          angular.forEach(vm.myCliques, function(clique) {
            loadCliqueDetail(clique);
          });

          vm.isManager = isManager(vm.myCliques);
          vm.showBusy = false;

        });
    }

    function isManager(cliques) {
      angular.forEach(cliques, function(value) {
        if(value.type == 'manager') {
          vm.isManager = true;
        }
      });
      return vm.isManager;
    }

    function getCliqueById(id) {
      vm.showBusy = true;
      cliqueService.getCliqueById(id)
        .then(function (response) {

            if(response.length < 1){
              vm.myClique = {};
              vm.showClique = false;
              vm.showCreateClique = true;
              vm.showAcceptInviteForm = false;
            }
            else {
              vm.showMyCliques = false;
              vm.myClique = response;
              vm.readOnly = !isCliqueCreator();
              if(isInvitee()) {
                vm.showCreateClique = false;
                vm.showAcceptInviteForm = true;
              }
              else {
                vm.showClique = true;
              }
              if(vm.myClique.members) {
                vm.member.reward.points = vm.myClique.members[0].details.reward.points;
              }
            }
            vm.showBusy = false;
          
        });
    }


    function showMyCliquesList() {
      vm.showMyCliques = true;
      vm.showClique = false;
      vm.showCreateClique = false;
      vm.showAddDependent = false;
      vm.showInviteForm = false;
      vm.showTransfer = false;
      vm.inviteEmail = null;
      vm.showConfirmDelete = false;
      vm.showAcceptInviteForm = false;
      vm.readOnly = false;
    }

    function showCreateCliqueForm() {
      resetAll();
      vm.clique = {};
      vm.showCreateClique = true;
      vm.showMyCliques = false;
    } 

    function showAddDependentForm() {
      vm.newMember = {};
      vm.newMember.gender = 'female';
      vm.showAddDependent = true;
      vm.showClique = false;
    }

    function showInvite(myClique) {
      vm.showInviteForm = true;
      vm.invite.email = '';
      vm.showNotCurrentMember = false;
      vm.showMyCliques = false;
      vm.invite.type = 'email';
      if(myClique.type == 'manager') {
        vm.showDependentCheck = true;
      }
      else {
        vm.showDependentCheck = false;
      }

    } 

    function cancelInvite() {
      vm.showInviteForm = false;
      vm.invite.email = '';
      vm.showMyCliques=true;
    }  

    function cancelAddDependent() {
      // vm.showClique = true;
      // vm.showAddDependent = false;
    }

    function addDependent() {

      vm.showBusy = true;
      vm.newMember.cliqueid = vm.currentClique.clique_id;
      vm.newMember.name = vm.newMember.fname + ' ' + vm.newMember.lname;
      cliqueService.addDependent(vm.newMember)
        .then(function (response) {
          if(response.success) {
            console.log(response);
            response.member.details = vm.newMember;
            response.member.details.reward = {};
            response.member.details.reward.points = 0;
            vm.currentClique.members.push(response.member);
            vm.currentClique.poyntTotal = getPoyntTotal(vm.currentClique);
            vm.currentClique.memberCount = vm.currentClique.members.length;
            vm.newMember = {};
            vm.showAddDependent = false;
            vm.showClique = true;
            vm.resultStatus = 'success';
            vm.showMyCliques = true;
            vm.showInviteForm = false;
            resetClique(vm.currentClique);
            vm.currentClique.expanded = true;
            vm.currentClique.showDetailView = true;
          }
          else {
            vm.resultStatus = 'failure';
          }
          vm.showBusy = false;
        });
    }

    function getCliqueByMemberId() {
      cliqueService.getMyClique()
        .then(function (response) {
          if(response.success) {
            vm.myClique = response.clique;
          }
        });
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function inviteMember() {
      if(vm.invite.email == '' || vm.invite.email == vm.member.email || !validateEmail(vm.invite.email)){
        return false;
      }
      vm.showFull = false;
      vm.showBusy = true;
      vm.showNotCurrentMember = false;
      vm.invite.cliqueid = vm.currentClique.clique_id;
      vm.invite.created_by = vm.currentClique.created_by;
      cliqueService.inviteMember(vm.invite)
        .then(function (response) {
          if(response.success) {
            vm.invited = response.member;
            vm.invited.details = {};
            vm.invited.details.email = vm.invite.email;
            vm.currentClique.members.push(vm.invited);
            vm.currentClique.poyntTotal = getPoyntTotal(vm.currentClique);
            vm.currentClique.memberCount = vm.currentClique.members.length;
            vm.resultStatus = 'success';
            vm.showInviteForm = false;
            vm.showMyCliques = true;
            resetClique(vm.currentClique);
            vm.currentClique.expanded = true;
            vm.currentClique.showDetailView = true;
          }
          else if (response.msg){ // response.success == false
            vm.showFull = true;
          }
          else {
            vm.resultStatus = 'failure';            
          }
          vm.showBusy = false;
        });
    }

    function removeMember(member, myClique) { //TODO change poynts to not first member? or query so manager always first
      vm.showBusy = true;
      member.toPoynts = vm.currentClique.members[0].details.reward.points;
      vm.remove = member;
      cliqueService.removeMember(member)
        .then(function (response) {
          if(response.success) {
            if(vm.loginMember.memberid == member.member_id && vm.loginMember.memberid  != vm.currentClique.created_by) {
              getAllMyCliques();
            }
            else {
              if(response.transfer) {
                vm.currentClique.members[0].details.reward.points =  response.transfer.balanceReceiver;
              }
              var index = vm.currentClique.members.indexOf(member);
              if (index > -1) {
                  vm.currentClique.members.splice(index, 1);
              }
              if(vm.currentClique.members) {
                vm.member.reward.points = vm.currentClique.members[0].details.reward.points;
              }
              vm.currentClique.poyntTotal = getPoyntTotal(vm.currentClique);
              vm.currentClique.memberCount = vm.currentClique.members.length;
              
            }
          
          }
          vm.showBusy = false;
        });
    }

    function showTransferForm(){
      vm.transfer = {};
      vm.showTransfer = true;
      vm.showClique = false;
      vm.showTransferSuccess = false;
    }

    function cancelTransfer(){
      vm.transfer = {};
      resetAll();
    }

    function transferFromSelect(member) {
      vm.transfer.from = member;
    }

    function transferToSelect(member) {
      vm.transfer.to = member;
    }

    function checkIsTransferValid(){
      if(!(vm.transfer.amount > 0) ){
        return false;
      }
      if(!vm.transfer.amount || !vm.selectedMem.member_id || !vm.member.memberid ){
        return false;
      }
      if(vm.transfer.amount > vm.member.reward.points) {
        vm.showInvalidAmount = true;
        return false;
      }
      if(vm.member.memberid == vm.selectedMem.member_id) {
        vm.showSameMember = true;
        return false;
      }
      return true;
    }

    function transferPoynts(sender, receiver) {
      if(!sender || !receiver) {
        vm.resultStatus = 'failure';
        vm.showBusy = false;
        return false;
      }
      vm.showBusy = true;
      vm.showInvalidAmount = false;
      vm.showSameMember = false;
      if(!checkIsTransferValid()){
        vm.showBusy = false;
        return false;
      }
      vm.transferObj = {};
      // vm.transferObj.created_by = vm.clique.created_by;
      vm.transferObj.from = sender.member_id;
      vm.transferObj.fromPoynts = sender.details.reward.points;
      vm.transferObj.to = receiver.member_id;
      vm.transferObj.toPoynts = receiver.details.reward.points;
      vm.transferObj.amount = vm.transfer.amount;
      cliqueService.transferPoynts(vm.transferObj)
        .then(function (response) {
          if(response.success) {
            if(vm.member.memberid == sender.member_id)
              vm.member.reward.points = response.balanceGiver;
            else
              vm.member.reward.points = response.balanceReceiver;           
            sender.details.reward.points = response.balanceGiver;
            receiver.details.reward.points = response.balanceReceiver;
            angular.forEach(vm.myCliques, function(clique) {
              angular.forEach(clique.members, function(member) {
                if(vm.member.memberid == member.member_id) {
                  if(vm.member.memberid == sender.member_id)
                    member.details.reward.points = response.balanceGiver;
                  else
                    member.details.reward.points = response.balanceReceiver; 
                }
              });
              clique.poyntTotal = getPoyntTotal(clique);
            });
            vm.transfer = {};
            vm.transferObj = {};
            //vm.showTransferSuccess = true;
            vm.resultStatus = 'success';
            resetClique(vm.currentClique);
            vm.currentClique.expanded = true;
            vm.currentClique.showDetailView = true;
          }
          else{
            vm.resultStatus = 'failure';
          }
          vm.showBusy = false;
        });
    }

    function showCliqueHome(){
      vm.showClique = true;
      vm.showTransferSuccess = false;
    }

    function isCliqueCreator(){
      return vm.member.memberid == vm.myClique.created_by;
    }

    function isCliqueManager(member){
      return member.type == 'manager';
    }

    function confirmDeleteClique(clique){
      vm.showConfirmDelete = true;
      vm.showClique = false;
      vm.toDelete = clique;
    }

    function cancelDeleteClique(){
      vm.showConfirmDelete = false;
      vm.showClique = true;
    }

    function deactivateClique(clique) {
      vm.showBusy = true;
      cliqueService.deactivateClique(clique)
        .then(function (response) {
          if(response.success) {
            getAllMyCliques();
          }
          // vm.showBusy = false;
        });
    }

    function isInvitee(){
      angular.forEach(vm.myClique.members, function(value) {
        if(value.status == 'invited' && vm.member.memberid == value.member_id) {
          vm.showAcceptInviteForm = true;
        }
      });
      return vm.showAcceptInviteForm;
    }

    function acceptInvite(clique) {
      if(clique) {
        vm.clique = clique;
      }
      vm.showBusy = true;
      cliqueService.acceptInvite(vm.clique)
        .then(function (response) {
          if(response.success) {
            getAllMyCliques();
          }
          // vm.showBusy = false;
        });
    }

    function denyInvite(clique) {
      if(clique) {
        vm.clique = clique;
      }
      vm.showBusy = true;
      cliqueService.denyInvite(vm.clique)
        .then(function (response) {
          if(response.success) {
            //vm.showCreateClique = true;
            //vm.showAcceptInviteForm = false
            // vm.clique = {};
            // vm.showBusy = false;
            // cheat and re-init
            getAllMyCliques();
          }
          
        });
    }

    function setGender(val) {
      if(val != vm.newMember.gender) {
        vm.newMember.gender = val;
      }
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }


    /************ ***  *** *****************/

    function managePoynts(clique) {
      if(vm.currentClique != clique) {
        resetAll();
      }
      vm.resultStatus = null;
      vm.currentClique = clique;
      if(clique.expanded) {
        if(clique.showPoyntsView) {
          clique.expanded = false;
          clique.showDetailView = false;
          clique.showManageView = false;
          clique.showPoyntsView = false;
        }
        else {
          clique.showPoyntsView = true;
          clique.showDetailView = false;
          clique.showManageView = false;
          if(!clique.members) {
            getCliqueDetail(clique);
          }
        }
      }
      else {
        clique.expanded = true;
        clique.showPoyntsView = true;
        if(!clique.members) {
          getCliqueDetail(clique);
        }
      }
      vm.myMember = clique.members.filter(function(member){
        return member.member_id == vm.member.memberid;
      })[0];
    }

    function manageMembers(clique) {
      if(vm.currentClique != clique) {
        resetAll();
      }
      vm.resultStatus = null;
      vm.currentClique = clique;
      if(clique.expanded) {
        if(clique.showManageView) {
          resetClique(clique);
        }
        else {
          clique.showManageView = true;
          clique.showDetailView = false;
          clique.showPoyntsView = false;
          if(!clique.members) {
            getCliqueDetail(clique);
          }
        }
      }
      else {
        clique.expanded = true;
        clique.showManageView = true;
        if(!clique.members) {
          getCliqueDetail(clique);
        }
      }
    }

    function expandMe(clique) {
      if(vm.currentClique != clique) {
        resetAll();
      }
      vm.resultStatus = null;
      vm.currentClique = clique;
      clique.showManageView = false;
      clique.showPoyntsView = false;
      if(!clique.expanded) {
        clique.showDetailView = true;
        if(!clique.members) {
          getCliqueDetail(clique);
        }
        clique.expanded = true;
      }
      else {
        if(clique.showDetailView) {
          resetClique(clique);
        }
        else {
          resetAll();
          if(!clique.members) {
            getCliqueDetail(clique);
          }
        }
      }
    }

    function getCliqueDetail(clique) {
      vm.showBusy = true;
      cliqueService.getCliqueById(clique.clique_id)
        .then(function (response) {

          if(response.length < 1) {
            vm.clique = {};
            vm.showClique = false;
            vm.showCreateClique = true;
            vm.showAcceptInviteForm = false;
          }
          else {
            // vm.showMyCliques = false;
            vm.clique = response;
            clique.members = response.members;
            clique.poyntTotal = getPoyntTotal(clique);
            // vm.readOnly = !isCliqueCreator();
            if(isInvitee()) {
              vm.showCreateClique = false;
              vm.showAcceptInviteForm = true;
            }
            else {
              // vm.showClique = true;
            }
            // if(vm.clique.members) {
            //   vm.member.reward.points = vm.clique.members[0].details.reward.points;
            // }
          }
          vm.showBusy = false;
          
          vm.showClique = !vm.showClique;
          clique.expanded = true;
          
        });
    }

    function loadCliqueDetail(clique) {
      cliqueService.getCliqueById(clique.clique_id)
        .then(function (response) {
          vm.myClique = response;
          clique.members = response.members;
          clique.poyntTotal = getPoyntTotal(clique)
        });
    }

    function getPoyntTotal(clique) {
      clique.poyntTotal = 0;
      angular.forEach(clique.members, function(member) {
        if(member.status == 'active')
          clique.poyntTotal = clique.poyntTotal+member.details.reward.points;
      });
      return clique.poyntTotal;
    }

    function isYou(member) {
      return vm.member.memberid == member.member_id;
    }

    function selectMember(member, myClique) {
      if(vm.selectedMem && vm.selectedMem.member_id == member.member_id) {
        vm.selectedMem = null;
      }
      else {
        if(vm.member.memberid == member.member_id) {
          vm.showTransfer2 = false;
        }
        else {
          vm.showTransfer2 = true;
          if(myClique.type == 'manager' && (myClique.member_id == vm.member.memberid)) {
            if(member.type == 'dependent')
              vm.showPull = true;
            else 
              vm.showPull = false;
          }
          else {
            vm.showPull = false;
          }
        }
        vm.selectedMem = member;
      }
    }

    function resetClique(clique) {
      clique.expanded = false;
      clique.showDetailView = false;
      clique.showManageView = false;
      clique.showPoyntsView = false;
      vm.selectedMem = null;
      vm.showCreateClique = false;
    }

    function resetAll() {
      angular.forEach(vm.myCliques, function(clique) {
        clique.expanded = false;
        clique.showDetailView = false;
        clique.showManageView = false;
        clique.showPoyntsView = false;
      });
      vm.showFull = false;
      vm.showMyCliques = true;
      vm.showInviteForm = false;
      vm.selectedMem = null;
      vm.showCreateClique = false;
      vm.showPull = false;
      vm.showTransfer2 = false;
      vm.currentClique = null;
      vm.resultStatus = null;
    }

    function createCancel() {
      vm.showCreateClique = false;
      vm.showMyCliques = true;
    }

    function selectInviteType(type) {
      vm.invite.type = type;
    }

    function showTrash(mem){
      if(vm.currentClique.type == 'manager') {
        if(vm.member.memberid != mem.member_id) {
          return true;
        }
      }
      else {
        if(vm.member.memberid == mem.member_id) {
          return true;
        }
      }
      return false;
    }

    function getBrowserDetails(){

      var md = new MobileDetect(window.navigator.userAgent);
      
      // Safari 3.0+ "[object HTMLElementConstructor]" 
      var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

      // Internet Explorer 6-11
      var isIE = /*@cc_on!@*/false || !!document.documentMode;

      //Edge
      var isEdge = !isIE && !!window.StyleMedia;


      if(md.mobile())
      {
        return false;
      }
      else if(isIE || isEdge || isSafari)
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

}]);