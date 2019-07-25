'use strict';

angular.module('app.clique', [])

.controller('CliqueCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'cliqueService', 'memberService', 'offerService', 'TeletubbyNav',
            function($scope, $q, $state, $window, featureToggleService, cliqueService, memberService, offerService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.createClique = createClique;
    vm.getCliqueByMemberId = getCliqueByMemberId;
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
    vm.getCheckin = getCheckin;

  	init();

    // ******************************

  	function init() {
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

      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
        clique: cliqueService.getMyClique()
      })
      .then(function (response) {
        vm.loading = false;
        vm.features = response.features;
        vm.member = response.member;
        vm.loginMember = response.member;
        
        if(response.clique.length < 1){
          vm.clique = {};
          vm.showCreateClique = true;
        }
        else {
          vm.clique = response.clique;
          vm.readOnly = !isCliqueCreator();
          if(isInvitee()) {
            vm.showAcceptInviteForm = true;
          }
          else {
            vm.showClique = true;
          }
          if(vm.clique.members) {
            vm.member.reward.points = vm.clique.members[0].details.reward.points;
          }
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
            vm.clique = response.clique;
            vm.showClique = true;
            vm.showCreateClique = false;
            if(vm.clique.members) {
              vm.member.reward.points = vm.clique.members[0].details.reward.points;
            }
          }
          vm.showBusy = false;
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

    function showAddDependentForm() {
      vm.newMember = {};
      vm.newMember.gender = 'female';
      vm.showAddDependent = true;
      vm.showClique = false;
    }

    function showInvite() {
      vm.showInviteForm = true;
      vm.invite.email = '';
      vm.showNotCurrentMember = false;
    } 

    function cancelInvite() {
      vm.showInviteForm = false;
      vm.invite.email = '';
    }  

    function cancelAddDependent() {
      vm.showClique = true;
      vm.showAddDependent = false;
    }

    function addDependent() {
      vm.showBusy = true;
      vm.newMember.cliqueid = vm.clique.id;
      vm.newMember.name = vm.newMember.fname + ' ' + vm.newMember.lname;
      cliqueService.addDependent(vm.newMember)
        .then(function (response) {
          if(response.success) {
            response.member.details = vm.newMember;
            response.member.details.reward = {};
            response.member.details.reward.points = 0;
            vm.clique.members.push(response.member);
            vm.newMember = {};
            vm.showAddDependent = false;
            vm.showClique = true;
          }
          vm.showBusy = false;
        });
    }

    function getCliqueByMemberId() {
      cliqueService.getMyClique()
        .then(function (response) {
          if(response.success) {
            vm.clique = response.clique;
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

      vm.showBusy = true;
      vm.showNotCurrentMember = false;
      vm.invite.cliqueid = vm.clique.id;
      vm.invite.created_by = vm.clique.created_by;
      cliqueService.inviteMember(vm.invite)
        .then(function (response) {
          if(response.success) {
            vm.invited = response.member;
            vm.invited.details = {};
            vm.invited.details.email = vm.invite.email;
            vm.clique.members.push(vm.invited);
            vm.showInviteForm = false;
          }
          else { // response.success == false
            vm.showNotCurrentMember = true;
          }
          vm.showBusy = false;
        });

    }

    function removeMember(member) {
      vm.showBusy = true;
      vm.remove = member;
      cliqueService.removeMember(member)
        .then(function (response) {
          if(response.success) {

            if(vm.loginMember.memberid == member.member_id && vm.loginMember.memberid  != vm.clique.created_by) {
              getClique();
            }
            else {
              if(response.transfer) {
                vm.clique.members[0].details.reward.points =  response.transfer.balanceReceiver;
              }
              var index = vm.clique.members.indexOf(vm.remove);
              if (index > -1) {
                  vm.clique.members.splice(index, 1);
              }
              if(vm.clique.members) {
                vm.member.reward.points = vm.clique.members[0].details.reward.points;
              }
           }
           vm.showBusy = false;
          }
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
      vm.showClique = true;
      vm.showTransfer = false;
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
      if(!vm.transfer.amount || !vm.transfer.from || !vm.transfer.to ){
        return false;
      }
      if(vm.transfer.amount > vm.transfer.from.details.reward.points) {
        vm.showInvalidAmount = true;
        return false;
      }
      if(vm.transfer.from.member_id == vm.transfer.to.member_id) {
        vm.showSameMember = true;
        return false;
      }
      return true;
    }

    function transferPoynts() {
      vm.showBusy = true;
      vm.showInvalidAmount = false;
      vm.showSameMember = false;
      if(!checkIsTransferValid()){
        vm.showBusy = false;
        return false;
      }
      vm.transferObj = {};
      vm.transferObj.created_by = vm.clique.created_by;
      vm.transferObj.from = vm.transfer.from.member_id;
      vm.transferObj.to = vm.transfer.to.member_id;
      vm.transferObj.amount = vm.transfer.amount;
      cliqueService.transferPoynts(vm.transferObj)
        .then(function (response) {
          if(response.success) {
            vm.transfer.from.details.reward.points = response.balanceGiver;
            vm.transfer.to.details.reward.points = response.balanceReceiver;
            vm.transfer = {};
            vm.transferObj = {};
            vm.showTransfer = false;
            vm.showTransferSuccess = true;
            if(vm.clique.members) {
              vm.member.reward.points = vm.clique.members[0].details.reward.points;
            }
          }
          vm.showBusy = false;
        });
    }

    function showCliqueHome(){
      vm.showClique = true;
      vm.showTransferSuccess = false;
    }

    function isCliqueCreator(){
      return vm.member.memberid == vm.clique.created_by;
    }

    function isCliqueManager(member){
      return member.type == 'manager';
    }

    function confirmDeleteClique(){
      vm.showConfirmDelete = true;
      vm.showClique = false;
    }

    function cancelDeleteClique(){
      vm.showConfirmDelete = false;
      vm.showClique = true;
    }

    function deactivateClique() {
      vm.showBusy = true;
      cliqueService.deactivateClique(vm.clique)
        .then(function (response) {
          if(response.success) {
            vm.clique = {};
            vm.invite = {};
            vm.newMember = {};
            vm.transfer = {};
            vm.showClique = false;
            vm.showCreateClique = true;
            vm.showAddDependent = false;
            vm.showInviteForm = false;
            vm.showTransfer = false;
            vm.inviteEmail = null;
            vm.showConfirmDelete = false;
            // cheat and just re -init
            getClique();
          }
          vm.showBusy = false;
        });
    }

    function isInvitee(){
      angular.forEach(vm.clique.members, function(value) {
        if(value.status == 'invited' && vm.member.memberid == value.member_id) {
          vm.showAcceptInviteForm = true;
        }
      });
      return vm.showAcceptInviteForm;
    }

    function acceptInvite() {
      vm.showBusy = true;
      cliqueService.acceptInvite(vm.clique)
        .then(function (response) {
          if(response.success) {
            angular.forEach(vm.clique.members, function(value) {
              if(value.status == 'invited' && vm.member.memberid == value.member_id) {
                value.status = 'active';
              }
            });

            vm.showAcceptInviteForm = false;
            vm.showClique = true;
          }
          vm.showBusy = false;
        });
    }

    function denyInvite() {
      vm.showBusy = true;
      cliqueService.denyInvite(vm.clique)
        .then(function (response) {
          if(response.success) {
            //vm.showCreateClique = true;
            //vm.showAcceptInviteForm = false
            // vm.clique = {};
            vm.showBusy = false;
            // cheat and re-init
            getClique();
          }
          
        });
    }

    function setGender(val) {
      if(val != vm.newMember.gender) {
        vm.newMember.gender = val;
      }
    }

}]);