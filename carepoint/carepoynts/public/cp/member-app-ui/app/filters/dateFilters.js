angular.module('app.filters',[]).filter('formatDate', function () {
    //This should be used with the Date Only Fields.
    //input value is expected a string. Default date type would be MM/DD/YYYY
    return function (value, format) {
        if (!value) {
            return '';
        }

        if (!format) {
            format = 'MM/DD/YYYY';
        }

        return moment(value).format(format);
    }
})