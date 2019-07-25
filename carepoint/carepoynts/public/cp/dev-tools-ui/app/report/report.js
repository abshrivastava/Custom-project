angular.module('app.report', ['app.dev-tools-service', 'cp-directives'])


.controller('ReportCtrl', ['$scope', '$q', '$state', '$filter', '$timeout', 'devToolsService', 'reportService', 'tangoService', 
                  function($scope, $q, $state, $filter, $timeout, devToolsService, reportService, tangoService) {
    const vm = $scope;

    vm.isLogin = isLogin;
    vm.goTo = goTo;

    vm.dateForDisplay = dateForDisplay;
    vm.convertLocalDate = convertLocalDate;
    vm.selectEnterprise = selectEnterprise;
    vm.showMeMoreMember = showMeMoreMember;
    vm.refreshPage = refreshPage;
    vm.displayName = displayName;
    vm.displayTitle = displayTitle;
    vm.displayReward = displayReward;
    vm.updateTransLimit = updateTransLimit;
    vm.updateLoginsLimit = updateLoginsLimit;
    vm.getMeVariableReport = getMeVariableReport;
    vm.selectPartner = selectPartner;
    vm.displayDateOnly = displayDateOnly;
    vm.sendVariableReportEmail = sendVariableReportEmail;
    vm.getPromotions = getPromotions;
    vm.selectPromo = selectPromo;
    vm.getMePromoReport = getMePromoReport;
    vm.getRedemptions = getRedemptions;
    vm.selectRedem = selectRedem;
    vm.getMeRedemReport = getMeRedemReport;

    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    init();

    // ******************************

  	function init() {
      // isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'report';

      vm.showBusy = {
        member : true,
        transaction : true,
        referral : true,
        poynt : true
      };
      vm.showMemberList = true;
      vm.showMemberDetail = false;
      vm.recentTransLimit = 25;
      vm.recentLoginsLimit = 25;
      vm.filterCPLogins = false;

      $q.all({
        // initialData: tangoService.getInitialData(),
        // features: devToolsService.getFeatureToggles(),
        membersData: reportService.getMembersData(),
        // memberList: reportService.getMemberList(5),
        enterpriseDayWisePoynts: reportService.getEnterpriseDayWisePoynts({'entid': 1, 'dateRange': 15}), 
        memPoynts : reportService.getMemberMostPoynts(),
        enterprises: devToolsService.getAllEnterprises(),
        membersDailyCount: reportService.getMembersDailyCount(1),
        dailyLogins: reportService.getAllDailyMemberLogins()
      })
      .then(function (response) {
        // vm.initialData = response.initialData;
        vm.memPoynts = response.memPoynts;
        vm.membersData = response.membersData;
        // vm.memberList = response.memberList;
        vm.features = response.features;
        vm.enterpriseDayWisePoynts = response.enterpriseDayWisePoynts;
        vm.enterprises = response.enterprises;
        createMyChart(vm.enterpriseDayWisePoynts);
        vm.membersDailyCount = response.membersDailyCount
        createMyChartMember(vm.membersDailyCount);
        vm.dailyLogins = response.dailyLogins;

        
        vm.showBusy.member = false;
      });

      $timeout(function(){
          getReferralData();
        }, 3000); 

      $timeout(function(){
          getTransactionData(0);
        }, 6000); 

      $timeout(function(){
          // getOrderList({"startDate":"2017-04-01"});
        }, 9000); 

      $timeout(function(){
          getTotalPoynts();
        }, 12000); 

      $timeout(function(){
          // createMostPoyntChart(vm.memPoynts);
        }, 15000);

        refreshPage(5); 
    }

    function updateTransLimit(val) {
      vm.recentTransLimit = val;
    }

    function updateLoginsLimit(val) {
      vm.recentLoginsLimit = val;
    }

    function selectEnterprise(ent) {
      vm.selectedEnt = ent;
      if(ent == -1 || !ent) {
        eid = 0;
      }
      else {
        eid = ent.ent_id;
      }

      $q.all({
        membersData: reportService.getMembersData(eid),
        transactionData: reportService.getTransactionData(eid) ,
        membersDailyCount: reportService.getMembersDailyCount(eid),
        dailyLogins: reportService.getAllDailyMemberLogins()
      })
      .then(function (response) {
        vm.membersData = response.membersData;
        vm.transactionData = response.transactionData;
        vm.membersDailyCount = response.membersDailyCount;
        createMyChartMember(vm.membersDailyCount);
        getTotalPoynts();
        vm.dailyLogins = response.dailyLogins;
      });
    }

    function showMeMoreMember() {
      if(!vm.selectedEnt) {
        goTo('member', {'eid': 1});
      }
      else {
        goTo('member', {'eid': vm.selectedEnt.ent_id});
      }
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

    

    function getMembersDailyCount(eid) {
      reportService.getTransactionData(eid)
        .then(function (response) {
          vm.transactionData = response;
        });
    }


    function createMyChart(dataItems){
      var dayCount = 15;
      var dateArray = [];
      var poyntArray = [];
      for (var i = dayCount; i > 0; i--) {
        var todayDate = new Date(new Date().setHours(0,0,0,0));
        todayDate.setDate(todayDate.getDate()-(i-1));
        var poyntSum = 0;
        angular.forEach(dataItems, function(item){
          if((new Date(item.transaction_date).getTime()) == (todayDate.getTime())){
            poyntSum = poyntSum + Math.abs(item.value);
          }
        })
        dateArray.push(monthNames[todayDate.getMonth()]+', '+todayDate.getDate());
        poyntArray.push(poyntSum ? poyntSum: 0);
      }
      initMyChart(dateArray, poyntArray);
    }

    function createMyChartMember(dataItems){
      var dayCount = 15;
      var dateArray = [];
      var poyntArray = [];
      for (var i = dayCount; i > 0; i--) {
        var todayDate = new Date(new Date().setHours(0,0,0,0));
        todayDate.setDate(todayDate.getDate()-(i-1));
        var count = 0;
        angular.forEach(dataItems, function(item){
          if((new Date(item.memberDate).getTime()) == (todayDate.getTime())){
            count = item.count;
          }
        })
        dateArray.push(monthNames[todayDate.getMonth()]+', '+todayDate.getDate());
        poyntArray.push(count ? count: 0);
      }
      initMyChart(dateArray, poyntArray);
    }

    function createMostPoyntChart(dataItems){
      var recCount = 10;
      var nameArray = [];
      var poyntArray = [];
      
        angular.forEach(dataItems, function(item){
            nameArray.push(item.name);
            poyntArray.push(item.poynts);
      })
      vm.cpChartLabels1 = nameArray;
      vm.cpChartData1 = poyntArray;
    }

    function initMyChart(xAxisData, yAxisData){
      vm.cpChartOptions = {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
      vm.cpChartData = [yAxisData];
      vm.cpChartLabels = xAxisData;
    }
    
    function goTo(state, params) {
      $state.go(state, params);
    }

    function getReferralData() {
      reportService.getReferralData()
        .then(function (response) {
          vm.referralData = response;
        });
    }

    function getTransactionData(eid) {
      reportService.getTransactionData(eid)
        .then(function (response) {
          vm.transactionData = response;
        });
    }

    function getOrderList(params) {
      tangoService.getOrderList(params)
        .then(function (response) {
          vm.giftcards = response; //JSON.stringify(response, null, 4);
          vm.giftcards.totalCount = vm.giftcards.orders.length;
          vm.giftcards.totalDollarAmt = '200';
        });
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

    function getTotalPoynts() {
      if(vm.selectedEnt == -1 || !vm.selectedEnt) {
        eid = 0;
      }
      else {
        eid = vm.selectedEnt.ent_id;
      }
      reportService.getTotalPoynts(eid)
        .then(function (response) {
          vm.totalPoynts = response;
        });
    }

    function getMemberMostPoynts() {
      reportService.getMemberMostPoynts()
        .then(function (response) {
          vm.memPoynts = response;
        });
    }

    function refreshPage(interval) {
      // if(vm.currentInterval) {
      //   clearInterval(vm.currentInterval);
      // }
      // vm.interval = interval;
      // vm.currentInterval = setInterval(function() {
      //   if(vm.selectedEnt) {
      //     selectEnterprise(vm.selectedEnt);
      //   }
      //   else {
      //     selectEnterprise(-1);
      //   }
      // }, vm.interval * 60000);
      return;
    }

    function showOtherTrans(tran) {
      if(tran.entity_type == 'giftcard') {
        vm.otherTran.name = 'Gift Card';
        vm.otherTran.title = JSON.parse(tran.reward_value).name;
        vm.otherTran.reward_value = JSON.parse(tran.reward_value).poynts;
        return true;
      }
      else if (tran.entity_type == 'support_transfer'){
        vm.otherTran.name = 'Support Transfer';
        vm.otherTran.title = 'Support Transfer';
        vm.otherTran.reward_value = JSON.parse(tran.reward_value).poynts;
        return true;        
      }
      else if (tran.entity_type == 'clique_transfer'){
        vm.otherTran.name = 'Clique Transfer';
        vm.otherTran.title = 'Clique Transfer';
        vm.otherTran.reward_value = JSON.parse(tran.reward_value).after - JSON.parse(tran.reward_value).after;
        return true;        
      }
      return false;
    }

    function displayName(tran) {
      if(tran.entity_type == 'giftcard') {
        return 'Gift Card';
      }
      else if(tran.entity_type == 'support_transfer') {
        return tran.enterpriseName;
      }
      else if(tran.entity_type == 'clique_transfer') {
        return ' N/A';
      }
      else {
        return tran.enterpriseName;
      }
    }

    function displayTitle(tran) {
      if(tran.entity_type == 'giftcard') {
        return JSON.parse(tran.reward_value).name;
      }
      else if(tran.entity_type == 'support_transfer') {
        return 'Support Transfer';
      }
      else if(tran.entity_type == 'clique_transfer') {
        return 'Clique Transfer';
      }
      else {
        return tran.title;
      }      
    }

    function displayReward(tran) {
      if(tran.entity_type == 'giftcard') {
        return JSON.parse(tran.reward_value).poynts;
      }
      else if(tran.entity_type == 'support_transfer') {
        return JSON.parse(tran.reward_value).poynts;
      }
      else if(tran.entity_type == 'clique_transfer') {
        return JSON.parse(tran.reward_value).after - JSON.parse(tran.reward_value).before;
      }
      else {
        return tran.reward_value;
      }      
    }

    function getMeVariableReport() {
      
      vm.showBusy = true;

      var params = {};
      params.entid = vm.selectedPartner.ent_id;
      var date = new Date(vm.report.start);
      vm.report.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.start = vm.report.start.getTime();
      date = new Date(vm.report.end);
      vm.report.end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.end = vm.report.end.getTime();

      if(params.start && params.end && params.entid) {
        devToolsService.getRangedReport(params)
          .then(function (response) {
            vm.showBusy = false;
            vm.entReport = response;
          })        
      }
    }

    function sendVariableReportEmail() {
      vm.showBusy = true;
      var params = {};
      params.entid = vm.selectedPartner.ent_id;
      var date = new Date(vm.report.start);
      vm.report.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.start = vm.report.start.getTime();
      date = new Date(vm.report.end);
      vm.report.end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.end = vm.report.end.getTime();
      params.email = "thomas@carepoynt.com";
      if(vm.report.email && vm.report.email != "") {
        params.email = vm.report.email;
      }

      if(params.start && params.end && params.entid && params.email) {
        devToolsService.sendVariableReportEmail(params)
          .then(function (response) {
            vm.showBusy = false;
            console.log(response);
          })        
      }
    }

    function selectPartner(ent) {
      vm.selectedPartner = ent;
    }

    function displayDateOnly(date) {
      date = new Date(date);
      return  date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
    }

    function getPromotions(ent) {
      vm.selectedPartner = ent;
      vm.selectedPartner.id = ent.ent_id;
      if(ent && ent.ent_id > 0) {
        devToolsService.getEnterprisePromotions(vm.selectedPartner)
          .then(function (response) {
            vm.promotions = response;
          });
        }
    }

    function selectPromo(promo) {
      vm.selectedPromo = promo;
    }

    function getMePromoReport() {
      var params = {};
      var date = new Date(vm.report.start);
      vm.report.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.start = vm.report.start.getTime();
      date = new Date(vm.report.end);
      vm.report.end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.end = vm.report.end.getTime();
      params.id = vm.selectedPromo.id;

      reportService.getMePromoReport(params)
        .then(function (response) {
          vm.promoData = response;
        });      
    }

    function getRedemptions(ent) {
      vm.selectedPartner = ent;
      vm.selectedPartner.id = ent.ent_id;
      if(ent && ent.ent_id > 0) {
        devToolsService.getEnterpriseRedemptions(vm.selectedPartner)
          .then(function (response) {
            vm.redemptions = response;
          });
        }
    }

    function selectRedem(redem) {
      vm.selectedRedem = redem;
    }

    function getMeRedemReport() {
      var params = {};
      var date = new Date(vm.report.start);
      vm.report.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.start = vm.report.start.getTime();
      date = new Date(vm.report.end);
      vm.report.end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      params.end = vm.report.end.getTime();
      params.id = vm.selectedRedem.id;

      reportService.getMeRedemReport(params)
        .then(function (response) {
          vm.redemData = response;
        });      
    }    

      //       vm.otherTran.name = 'Gift Card';
      //   vm.otherTran.title = JSON.parse(tran.reward_value).name;
      //   vm.otherTran.reward_value = JSON.parse(tran.reward_value).poynts;
      //   return true;
      // }


}]);