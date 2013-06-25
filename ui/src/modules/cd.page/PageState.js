/**
 * @ngdoc service
 * @name cd.page.pageState
 *
 * @description
 * State management for the loading status and title of each page.
 */
angular.module('cd.page', [])
  .factory('pageState', function() {
    var status     = 'loading',
        headTitle  = 'Checkdesk',
        title      = 'Checkdesk';

    return {
      /**
       * @ngdoc method
       * @name cd.page.pageState#status
       * @methodOf cd.page.pageState
       * @param {string=} new page status
       * @returns {string} The current page status
       */
      status: function(newStatus) {
        if (newStatus) {
          status = newStatus;
        }
        return status;
      },

      /**
       * @ngdoc method
       * @name cd.page.pageState#headTitle
       * @methodOf cd.page.pageState
       * @param {string=} new page headTitle
       * @returns {string} The current page headTitle
       */
      headTitle: function(newHeadTitle) {
        if (newHeadTitle) {
          headTitle = newHeadTitle;
        }
        return headTitle;
      },

      /**
       * @ngdoc method
       * @name cd.page.pageState#title
       * @methodOf cd.page.pageState
       * @param {string=} new page title
       * @returns {string} The current page title
       */
      title: function(newTitle) {
        if (newTitle) {
          title = newTitle;
        }
        return title;
      }
    };
  });
