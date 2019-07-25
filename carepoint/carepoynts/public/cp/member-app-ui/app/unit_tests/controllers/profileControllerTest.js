describe('describe testService all methods here', function(){
    describe('service functions test block', function(){
        it('getTitle function test case',function(){
            module('app.profile');

            var scope = {};
            var ctrl;

            inject(function($controller){
                ctrl = $controller('profileController', {$scope: scope});
            });

            expect(scope.title).toEqual('my profile karma test');
        });
        
    })
})