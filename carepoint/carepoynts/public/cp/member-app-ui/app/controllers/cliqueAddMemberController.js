(function () {
    angular.module('clique-add-member', ['app.utils'])
        .controller('cliqueAddMemberController',
        ['cliqueService', 'cpUtils', 'notificationService', 'memberDataItems', '$stateParams',
            function (cliqueService, cpUtils, notificationService, memberDataItems, $stateParams) {

                let self = this;

                init = function () {
                    self.cliqueInviteType = CLIQUE_INVITE_TYPE;
                    self.inviteType = CLIQUE_INVITE_TYPE.Email;
                    initFamilyMemberModel();
                };

                self.selectInviteType = function (inviteType) {
                    self.inviteType = inviteType;
                };

                self.addFamilyMember = function () {
                    (self.inviteType == CLIQUE_INVITE_TYPE.Email) ? inviteMember() : addDependent();
                };

                function inviteMember() {
                    //TODO Validation from angular
                    if (!self.familyMember.email || !cpUtils.validateEmail(self.familyMember.email)) {
                        notificationService.error("Please verify email.");
                        return false;
                    }
                    if (self.familyMember.email == memberDataItems.member.email) {
                        notificationService.error("You can not invite yourself.");
                        return false;
                    }
                    cliqueService.inviteMember(self.familyMember)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success("Invite sent successfully.");
                                cpUtils.goTo('member.cliques');
                            }
                            else {
                                notificationService.error(response.msg);
                            }
                        }, function (error) {
                            notificationService.error("Error occured while sending invite. Please try again.");
                        });
                }

                function addDependent() {
                    if(!self.familyMember.fname ||  !self.familyMember.lname){
                        notificationService.error("Please fill name.");
                        return false;
                    }
                    self.familyMember.name = self.familyMember.fname + ' ' + self.familyMember.lname;
                    cliqueService.addDependent(self.familyMember)
                        .then(function (response) {
                            if (response.success) {
                                notificationService.success("Member added successfully.");
                                cpUtils.goTo('member.cliques');
                            }
                            else {
                                notificationService.error(response.msg);
                            }
                        }, function (error) {
                            notificationService.error("Error occured while adding dependant. Please try again.");
                        });
                }

                self.cancelInvite = function () {
                    cpUtils.goTo('member.cliques');
                }

                function initFamilyMemberModel() {
                    self.familyMember = {
                        cliqueid: $stateParams.id,
                        created_by: $stateParams.created_by,
                        member_id: memberDataItems.member.memberid,                        
                        email: '',
                        fname: '',
                        lname: ''
                    }
                };

                init();
            }])
})();