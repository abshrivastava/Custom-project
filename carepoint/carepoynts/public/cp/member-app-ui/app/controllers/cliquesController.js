(function () {
    angular.module('app.cliques', ['app.utils'])
        .controller('cliquesController', ['$q', '$timeout', 'cliqueService', 'notificationService', 'cpUtils', 'memberService', 'memberDataItems',
            function ($q, $timeout, cliqueService, notificationService, cpUtils, memberService, memberDataItems) {

                let self = this;
                let memberToDelete, managerMember;
                let memberToTransfer;
                self.cliquesMaxLength = 2;      //TODO: move this to common place
                var init = function () {
                    self.cliques = [];
                    getAllCliques();
                };

                self.toggleMember = function (clique, memberPane) {
                    uncheckAll(clique);
                    self.showTransferPane = false;
                    self.memberPane = memberPane;
                    self.transferAmount = '';
                };

                self.deleteClique = function (clique) {
                    cliqueService.deactivateClique(clique)
                        .then(function (response) {
                            notificationService.success('Clique deleted succesfully');
                            getAllCliques();
                        }, function (err) {
                            notificationService.error('Error in deleting clique');
                        });
                };

                function getAllCliques() {
                    cliqueService.getAllCliquesWithDetails().then(function (cliques) {
                        if (cliques.length <= 0) {   //TODO: Confirm and Add condition if previous state is 'member.cliques.clique', then must allow to be on the page
                            cpUtils.goTo('member.cliques.clique');      //If no cliques available, redirect to add clique
                        } else {
                            if (cliques) {
                                self.cliques = cliques;
                            } else {
                                notificationService.error(ERROR_CODES.Null_Response_Error);
                            }
                        }
                    }, function (err) { return err; });
                };

                self.confirmDeleteMember = function (member, manMember) {
                    memberToDelete = member;
                    managerMember = manMember;
                    $('#myModal').modal('show');    //opening modal from code as need other way to store the current element to delete
                };

                self.deleteMember = function () {
                    memberToDelete.toPoynts = managerMember.details.reward.points;

                    cliqueService.removeMember(memberToDelete)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success('Member deleted succesfully');
                                getAllCliques();
                                memberService.getMember(true);
                                memberToDelete = {};
                                managerMember = {};
                            }
                        }, function (err) {
                            notificationService.error('Error in deleting member');
                        });
               };

                self.transferPoynts = function (operationType) {
                    (operationType == 'pull') ? transferPoynts(memberToTransfer, managerMember) : transferPoynts(managerMember, memberToTransfer);
                };

                function transferPoynts(sender, receiver) {
                    
                    if (!self.transferAmount) {       //TODO: remove this function and add validation on UI
                        notificationService.error('Please enter some amount to transfer');
                        return false;
                    } else if (self.transferAmount <= 0) {
                        notificationService.error('Entered amount must be greater than 0');
                        self.transferAmount = '';
                        return false;
                    } else if (!(cpUtils.validateNumber(self.transferAmount))) {
                        notificationService.error('Poynt can only be numeric');
                        self.transferAmount = '';
                        return false;
                    } else if (self.transferAmount > sender.details.reward.points) {
                        notificationService.error('Insufficent balance');
                        self.transferAmount = '';
                        return false;
                    }

                    let transferObj = {
                        from: sender.member_id,
                        fromPoynts: sender.details.reward.points,
                        to: receiver.member_id,
                        toPoynts: receiver.details.reward.points,
                        amount: self.transferAmount
                    };

                    cliqueService.transferPoynts(transferObj)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success('Poynts transferred succesfully.');
                                self.transferAmount = '';
                                memberService.getMember(true);
                                getAllCliques();
                            }
                            else {
                                notificationService.error(response.message);
                            }
                        });
                };

                self.toggleTranferPane = function (clique, member) {
                    uncheckAll(clique);
                    self.showPullForDependent  = (member.type=='dependent') ?  true : false;
                    if (!member) {        //Cancel button called
                        self.showTransferPane = false;
                        self.transferAmount = '';
                    } else {
                        self.showTransferPane = member.toggleTransfer = !member.toggleTransfer;
                        memberToTransfer = member;
                        angular.forEach(clique.members, function (meMember) {
                            if (meMember.member_id == memberDataItems.member.memberid) {
                                managerMember = meMember;
                            }
                        });
                    }
                };

                function uncheckAll(clique) {
                    angular.forEach(clique.members, function (member) {
                        member.toggleTransfer = false;
                    });
                };

                self.acceptInvite = function (clique) {
                    cliqueService.acceptInvite(clique)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success('Invite accepted successfully');
                                getAllCliques();
                            } else {
                                notificationService.error('Error in accepting Invite');
                            }
                        }, function (err) {
                            notificationService.error('Error in accepting Invite');
                        });
                };

                self.denyInvite = function (clique) {
                    cliqueService.denyInvite(clique)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success('Invite denied successfully');
                                getAllCliques();
                            } else {
                                notificationService.error('Error in denying invite');
                            }
                        }, function (err) {
                            notificationService.error('Error in denying invite');
                        });
                };

                init();

            }])
})();