angular.module('app.member', ['app.dev-tools-service'])


.controller('MemberCtrl', ['$scope', '$q', '$state', 'devToolsService', '$filter', '$stateParams', function($scope, $q, $state, devToolsService, $filter, $stateParams) {
    const vm = $scope;

    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.selectEnterprise = selectEnterprise;
    vm.sortToNum = sortToNum;
    vm.getMemberDetails = getMemberDetails;
    vm.goBackToList = goBackToList;
    vm.runningBalance = runningBalance;
    vm.dateForDisplay = dateForDisplay;
    vm.convertLocalDate = convertLocalDate;
    vm.getMemberTags = getMemberTags;
    vm.createMemberTag = createMemberTag;
    vm.removeMemberTag = removeMemberTag;
    vm.newTag = {};

    init();

    // ******************************

  	function init() {
      isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'member';

    
      vm.showBusy = true;
      vm.showMemberList = true;
      vm.showMemberDetail = false;

      $q.all({
        // initialData: tangoService.getInitialData(),
        enterprises: devToolsService.getAllEnterprises()
      })
      .then(function (response) {
        // vm.initialData = response.initialData;
        vm.enterprises = response.enterprises;
        vm.showBusy = false;

        if( $stateParams.eid ) {
          if($stateParams.eid == 0) {
            $stateParams.eid = 1;
          }
          vm.selectedEnt = $filter('filter')(vm.enterprises, {'ent_id':$stateParams.eid})[0];
        }
        else {
          vm.selectedEnt = vm.enterprises[0];
        }
        getEnterpriseMembers(vm.selectedEnt.ent_id);

      });

    }

    function isLogin() {
      devToolsService.isLogin()
        .then(function(response){
          if(response.isLogin == false){
            if($state.$current.name != 'command-login'){
              goTo('command-login');
            }
          }
        });
    }

    function goTo(state, params) {
      $state.go(state, params);
    }

    function selectEnterprise(ent) {
      vm.selectedEnt = ent;
      getEnterpriseMembers(ent.ent_id)
    }

    function getEnterpriseMembers(entid) {
      devToolsService.getEnterpriseMembers(entid)
        .then(function (response) {
          vm.members = response;
          angular.forEach(vm.members, function (member) {
            member.memberDate = new Date(member.memberDate);
          });
        });
    }

    function sortToNum(val){
      return -parseInt(val.memberid);
    }

    function getMemberDetails(mid) {
      devToolsService.getMemberDetails(mid)
        .then(function (response) {
          vm.member = response;
          vm.poynts = vm.member.reward.points;
          vm.balance = vm.poynts;
          vm.transactions = vm.member.transactions;
          vm.showMemberList = false;
          vm.showMemberDetail = true;
        });
    }

    function goBackToList() {
      vm.showMemberList = true;
      vm.showMemberDetail = false;
    }

    function runningBalance(trans, index) {
      trans.balance = vm.balance;
      vm.balance = parseInt(vm.balance)-parseInt(trans.poynts);
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

    function dateForDisplay(trans) {
      trans.trans_date = convertLocalDate(trans.trans_date).toLocaleString();
      trans.reward_date = new Date(trans.reward_date).toLocaleString();
    }

    function getMemberTags(id) {
      vm.showBusy = true;
      devToolsService.getMemberTags({'member_id':id})
        .then(function(response) {
          vm.tags = response;
          console.log(response);
          vm.showBusy = false;
        });
    }

    function createMemberTag(id) {
      vm.showBusy = true;
      devToolsService.createMemberTag({'member_id':id, 'tag_name':vm.newTag.tagName, 'is_deleted': false, 'is_active': true, 'type': vm.newTag.tagType})
        .then(function(response) {

          vm.showBusy = false;
        });
    }

    function removeMemberTag(tag) {
      vm.showBusy = true;
      devToolsService.removeMemberTag({'id':tag.id})
        .then(function(response) {
          vm.tags.splice(vm.tags.indexOf(tag), 1);
          vm.showBusy = false;
        });
    }    

    

}]);