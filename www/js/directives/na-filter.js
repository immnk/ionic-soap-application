filters.filter('notapplicable', NotApplicable);

function NotApplicable() {
    return function(input) {
        if (!input || 0 === input.length) {
            return 'N/A';
        } else
            return input;
    }
}
