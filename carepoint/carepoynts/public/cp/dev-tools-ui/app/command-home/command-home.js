'use strict';

angular.module('app.command-home', ['app.dev-tools-service'])

.controller('CommandHomeCtrl', ['$scope', '$q', '$state', 'devToolsService', '$filter','notificationService',  function($scope, $q, $state, devToolsService, $filter, notificationService) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.login = login;
    vm.isLogin = isLogin;
    vm.showAwardPoynts = showAwardPoynts;
    vm.showInactivateUser =showInactivateUser;
    vm.transferPoynts = transferPoynts;
    vm.deactivateUser = deactivateUser;
    vm.cancelTransfer = cancelTransfer;
    vm.getEnterpriseMembers = getEnterpriseMembers;
    vm.members;
    vm.transferPoyntsForEnt = transferPoyntsForEnt;
    vm.cancelEntTransfer = cancelEntTransfer;
    vm.showEntAwardPoynts = showEntAwardPoynts;
    vm.showInviteReport = showInviteReport;
    vm.cancelInviteReport = cancelInviteReport;
    vm.sendInviteReport = sendInviteReport;
    vm.showRainforestAccounts = showRainforestAccounts;
    vm.cancelRainforestAccounts = cancelRainforestAccounts;
    vm.resetMemberstoFTUE = resetMemberstoFTUE;
    vm.resetCliques = resetCliques;
    vm.resetMemberToSingleEnt = resetMemberToSingleEnt;
    vm.resetTransactionLogsEnt = resetTransactionLogsEnt;
    vm.resetMemberPoynts = resetMemberPoynts;
    vm.performAllReset = performAllReset;

    init();

    // ******************************

  	function init() {
      // this is to highlight the nav bar
      isLogin();
      vm.poyntsValue = 0;
      vm.navValue = 'command-home';
      vm.showHome = true;
      vm.showMessage = false;
      vm.badPass = false;
      initSuccessMessages();

      var prom = [];
      prom.push(devToolsService.getAllEnterprises());
      prom.push(devToolsService.getAppConfigAll());
      $q.all(prom).then(function (response) {
        if(response && response.length){
          vm.enterprises = response[0];
          vm.rainForestEnterprises = response[1] && response[1][6] ? response[1][6].value : '';
          if(vm.rainForestEnterprises && vm.rainForestEnterprises.length>0 && vm.enterprises && vm.enterprises.length>0)
          {
            $scope.filteredEnterprises = [];
            angular.forEach(vm.rainForestEnterprises, function(item){
              var matchedEnterprise;
              matchedEnterprise = $filter('filter')(vm.enterprises, function(entitem){
                return (entitem.ent_id == item.entid);
              })[0];
              if(matchedEnterprise){
                $scope.filteredEnterprises.push(matchedEnterprise);
              }
            });
          }
        }
        else{
          notificationService.error("Error Occured: no response from services.");
        }
      },
      function(error){
        notificationService.error("Error Occured: Initial request failed.");
      });
    }

    function login() {
      vm.badPass = false;
      vm.creds = vm.creds || {};
      if(vm.creds.password) {
        //vm.creds.tz = new Date().getTimezoneOffset();//in minutes from UTC
        devToolsService.login(vm.creds)
          .then(function (response) {
            vm.response = response; 
            if(response.isLogin && response.success) {
              goTo('command-home');
            }
            else {
              vm.badPass = true;
              goTo('command-login');
            }
          });
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

    function goTo(state, params) {
      $state.go(state, params);
    }

    function showAwardPoynts() {
      vm.showHome = false;
      vm.showAwardForm = true;
      //getAllEnterprises();
    }

    function showEntAwardPoynts() {
      vm.showHome = false;
      vm.showEntAwardForm = true;
      //getAllEnterprises();
    }

    function showInviteReport(){
      vm.showHome = false;
      vm.showInviteReportForm = true;
    }

    function showInactivateUser() {
      vm.showHome = false;
      vm.showInactivateForm = true;
      //getAllEnterprises();
    }


    function cancelInactivate() {
      vm.showHome = true;
      vm.showInactivateForm = false;
    }

    function deactivateUser(uid) {
      vm.uid = {};
      vm.uid.uid = uid;
      vm.showBusy = true;
      devToolsService.deactivateUser(vm.uid)
        .then(function (response) {
          if(response.success) {
            console.log("success");

          }
          console.log(response)
          vm.showBusy = false;
        });  
    }


    function checkIsTransferValid(entID, memID, poyntsValue){
      if(!(poyntsValue > 0) ){
        return false;
      }
      /*
      if(vm.transfer.amount > vm.transfer.from.details.reward.points) {
        vm.showInvalidAmount = true;
        return false;
      }
      if(vm.transfer.from.member_id == vm.transfer.to.member_id) {
        vm.showSameMember = true;
        return false;
      }*/
      return true;
    }


    function transferPoynts(entid, memid, poyntsValue, transReason) {
      vm.showBusy = true;
      if(!checkIsTransferValid(entid, memid, poyntsValue)){
        vm.showBusy = false;
        return false;
      }
      vm.transferObj = {};
      vm.transferObj.created_by = entid;
      vm.transferObj.from = entid;
      vm.transferObj.to = memid;
      vm.transferObj.amount = poyntsValue;
      if(transReason) {
        vm.transferObj.transReason = transReason;
      }
      else {
        vm.transferObj.transReason = "";
      }
      devToolsService.transferPoynts(vm.transferObj)
        .then(function (response) {
          if(response.success) {
            console.log("success");

          }
          console.log(response)
          vm.showBusy = false;
        });
    }

    function transferPoyntsForEnt(entid, poyntsValue) {
      vm.transferObj = {};
      vm.transferObj.entid = entid;
      vm.transferObj.value = poyntsValue;
      vm.showBusy = true;
      devToolsService.transferEntPoynts(vm.transferObj)
        .then(function (response) {
          if(response.success) {
            console.log("success");

          }
          console.log(response)
          vm.showBusy = false;
        });
    }
    


    function cancelTransfer() {
      vm.showHome = true;
      vm.showAwardForm = false;
    }


    function cancelEntTransfer() {
      vm.showHome = true;
      vm.showEntAwardForm = false;
    }

    function cancelInviteReport(){
      vm.showHome = true;
      vm.showInviteReportForm = false;
    }


    function getAllEnterprises() {
      devToolsService.getAllEnterprises()
        .then(function (response) {
          console.log(response);
          vm.enterprises = response;
        });
    }

    function getEnterpriseMembers(entid) {
      console.log(entid);
      devToolsService.getEnterpriseMembers(entid)
        .then(function (response) {
          console.log(response);
          vm.members = response;
        });
    }

    function sendInviteReport(email, fromDate, toDate) {
      //only sends a report that has ent name, referrer name/referee name
      vm.reportData = {};
      vm.reportData.email = email;
      vm.reportData.fromDate = fromDate;
      vm.reportData.toDate= toDate;
        devToolsService.sendInviteReport(vm.reportData)
        .then(function (response) {
          console.log(response);
        });
    }

    function showRainforestAccounts() {
      vm.showHome = false;
      vm.showRainforestForm = true;
    }

    function cancelRainforestAccounts() {
      vm.showHome = true;
      vm.showRainforestForm = false;
      vm.showMessage = "";
      vm.showMessage = false;
    } 

    function getMemberIds(entid){
            
        var memberIds;

          angular.forEach(vm.rainForestEnterprises, function(item){
               if(item.entid==entid)
                  {
                  angular.forEach(item.accounts, function(item){
                         memberIds = memberIds ? memberIds+ "," + item.id.toString(): item.id.toString(); 
                        })
                    }

                    if(item.entid==0){
                        vm.testAccountId = item.accounts[0].id;
                    }
                });
            
            return memberIds;
        }

    function resetMemberstoFTUE(entid) {
      var dfd = $q.defer();
      vm.showMessage = "";
      var memberIds = vm.selectedEnt ? getMemberIds(vm.selectedEnt) : alert("Please select an enterprise");
      var testAccountId = vm.testAccountId;

      if (memberIds && testAccountId != 0) {
          devToolsService.resetMembersToFTUE({ "memberIds": memberIds, "testAccountId": testAccountId })
              .then(function (response) {
              if (response == true) {
                  console.log("success");
                  notificationService.success("Accounts reset to FTUE successfully.");
                  dfd.resolve(true);

              }
              else {
                  notificationService.error("Unable to reset accounts to FTUE. Please try again.");
                  dfd.resolve(false);
              }
          });
      }
      else {
          notificationService.error("No members found to update.");
          dfd.resolve(false);
      }
      return dfd.promise;
    };

    function resetCliques(entid) {
        var dfd = $q.defer();
        vm.showMessage = "";
        var memberIds = vm.selectedEnt ? getMemberIds(vm.selectedEnt) : notificationService.error("Please select an enterprise");

        if (memberIds) {
            devToolsService.resetCliques(memberIds)
                .then(function (response) {
                if (response == true) {
                    notificationService.success("Cliques reset sucessfully.");
                    dfd.resolve(true);
                }
                else {
                    notificationService.error("Unable to reset cliques. Please try again.");
                    dfd.resolve(false);
                }
            });
        }
        else {
            notificationService.error("No members found to update.");
            dfd.resolve(false);
        }
        return dfd.promise;
    };


    function resetMemberToSingleEnt(entid) {
        var dfd = $q.defer();
        vm.showMessage = "";
        var memberIds = vm.selectedEnt ? getMemberIds(vm.selectedEnt) : notificationService.error("Please select an enterprise");

        if (memberIds) {
            devToolsService.resetMemberToSingleEnt(memberIds, entid)
                .then(function (response) {
                if (response == true) {
                    notificationService.success("Members reset sucessfully to selected Enterprize.");
                    dfd.resolve(true);
                }
                else {
                    notificationService.error("Unable to reset Members to selected Enterprize. Please try again.");
                    dfd.resolve(false);
                }
            });
        }
        else {
            vm.showMessage = "No members found to update.";
            dfd.resolve(false);
        }
        return dfd.promise;
    };

    function resetTransactionLogsEnt() {
        var dfd = $q.defer();
        vm.showMessage = "";
        var memberIds = vm.selectedEnt ? getMemberIds(vm.selectedEnt) : notificationService.error("Please select an enterprise");
        var testAccountId = vm.testAccountId;
        if (memberIds && testAccountId != 0) {
            devToolsService.resetTransactionLogsEnt({ "memberIds": memberIds, "testAccountId": vm.testAccountId })
                .then(function (response) {
                if (response == true) {
                    notificationService.success("Transaction logs of all the Members reset sucessfully to selected Enterprize.");
                    dfd.resolve(true);
                }
                else {
                    notificationService.error("Unable to reset transaction logs to selected Enterprize. Please try again.");
                    dfd.resolve(false);
                }
            });
        }
        else {
            notificationService.info("No members found to update.");
            dfd.resolve(false);
        }
        return dfd.promise;
    };

    

    function getMemberIdsArray(entid){
    var memberIds=[];
    angular.forEach(vm.rainForestEnterprises, function(item){
        if(item.entid==entid)
        {
            angular.forEach(item.accounts, function(item){
                memberIds.push({"memberid":item.id, "poynts":item.poynts}); 
            })

            vm.defaultPoynts = item.defaultPoynts;
        }
    });
    return memberIds;
    };

    function transferPoyntsPromise(entid, memid, poyntsValue) {
        var dfd = $q.defer();
        vm.transferObj = {};
        vm.transferObj.created_by = entid;
        vm.transferObj.amount = Math.abs(poyntsValue);

        if(poyntsValue >= 0) {
          vm.transferObj.from = entid;
          vm.transferObj.to = memid;
          devToolsService.transferPoynts(vm.transferObj).then(function (response) {
            if(response.success) {
              dfd.resolve(true);
            }
            else {
              dfd.resolve(false);
            }
          },
          function(err){
            dfd.resolve(false);
          });
      } 
      else {
          vm.transferObj.from = memid;
          vm.transferObj.to = entid;
          devToolsService.transferPoyntsMemToEnt(vm.transferObj).then(function (response) {
            if(response.success) {
              dfd.resolve(true);
            }
            else {
              dfd.resolve(false);
            }
          },
          function(err){
            dfd.resolve(false);
          });
      }
      return dfd.promise;
    };


    function resetMemberPoynts() {
        var maindfd = $q.defer();
        var memberIds = vm.selectedEnt ? getMemberIdsArray(vm.selectedEnt) : alert("Please select an enterprise");
        if (memberIds && memberIds.length > 0) {
            var dfd = $q.defer();
            var prom = [];
            angular.forEach(memberIds, function (item) {
                prom.push(devToolsService.getMemberPoyntsbyid(item.memberid));
            });
            $q.all(prom).then(function (response) {
                var poyntdfd = $q.defer();
                var promArray = [];
                if (response && response.length > 0) {
                    angular.forEach(response, function (item) {
                        if(item && item.reward){
                            var poyntDiff = (vm.defaultPoynts - item.reward.points);
                            promArray.push(transferPoyntsPromise(vm.selectedEnt, item.memberid, poyntDiff));
                        }
                        else {
                            notificationService.error("Member found but their details couldn't be processed.");
                            maindfd.resolve(false);
                        }
                    });
                    $q.all(promArray).then(function (resp) {
                        if (resp) {
                            notificationService.success("Memebers were reset to default poynts successfully.");
                            maindfd.resolve(true);
                        };
                    },
                    function (error) {
                        notificationService.error("Error occured while reset members to default poynts.");
                        maindfd.resolve(false);
                    });
                }
                else {
                    notificationService.success("Request processed succesfully, No members to reset.");
                    maindfd.resolve(false);
                }
            },
            function (err) {
                notificationService.error("Error occured, couldn't find members.");
                maindfd.resolve(false);
            });
        }
        else {
            notificationService.error("No members found to update.");
            maindfd.resolve(false);
        }
        return maindfd.promise;
    };


    function performAllReset() {
        var prom = [];
        var entid = vm.selectedEnt;
        initSuccessMessages();
        if (entid) {
            prom.push(resetMemberstoFTUE(entid));
            prom.push(resetCliques(entid));
            prom.push(resetMemberToSingleEnt(entid));
            prom.push(resetTransactionLogsEnt());
            prom.push(resetMemberPoynts());
            $q.all(prom).then(function (response) {
                angular.forEach(response, function (item, key) {
                    var successMsg = "Succesfully Completed";
                    var failureMsg = "Error Occured";
                    switch (key) {
                        case 0:
                            if (item) {
                                $scope.showMessageFTUE = successMsg;
                                break;
                            }
                            else {
                                $scope.showMessageFTUE = failureMsg;
                                break;
                            };
                        case 1:
                            if (item) {
                                $scope.showMessageCliques = successMsg;
                                break;
                            }
                            else {
                                $scope.showMessageCliques = failureMsg;
                                break;
                            };
                        case 2:
                            if (item) {
                                $scope.showMessageSingleEnt = successMsg;
                                break;
                            }
                            else {
                                $scope.showMessageSingleEnt = failureMsg;
                                break;
                            };
                        case 3:
                            if (item) {
                                $scope.showMessageTransactionLogs = successMsg;
                                break;
                            }
                            else {
                                $scope.showMessageTransactionLogs = failureMsg;
                                break;
                            };
                        case 4:
                            if (item) {
                                $scope.showMessageMemberPoynt = successMsg;
                                break;
                            }
                            else {
                                $scope.showMessageMemberPoynt = failureMsg;
                                break;
                            };
                   }
                })
            })
        }
        else {
            notificationService.error("Please select an enterprise");
        }
    };


    function initSuccessMessages() {
      $scope.showMessageFTUE = false;
      $scope.showMessageCliques = false;
      $scope.showMessageSingleEnt = false;
      $scope.showMessageTransactionLogs = false;
      $scope.showMessageMemberPoynt = false;
    };


}]);

