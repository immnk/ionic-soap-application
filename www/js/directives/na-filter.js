filters.filter('notapplicable', NotApplicable);

NotApplicable.inject = ['utils'];

function NotApplicable(utils) {
    return function(input) {
        if (!input || 0 === input.length) {
            return utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
        } else
            return input;
    }
}
