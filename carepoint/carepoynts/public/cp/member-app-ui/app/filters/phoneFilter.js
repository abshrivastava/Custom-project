angular.module("app.filters",[]).filter("phoneFilter", [function () {
    return function (value) {
        if (value && value.length == 10) {
            return value.substr(0, 3) + "-" + value.substr(3, 3) + "-" + value.substr(6);
        }
        return value;
    };
}]);