/*jslint nomen: true, plusplus: true, todo: true, white: true, browser: true, indent: 2 */
(function ($) {
	'use strict';

	/**
	 * Provide the HTML to create the modal dialog.
	 */
	Drupal.theme.prototype.CToolsModalDialog = function () {
		var html = '';

		html += '<div id="ctools-modal">';
		html += '<div class="ctools-modal-content">';
		html += '<div class="modal">';
		html += '  <div class="modal-header">';
		html += '   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		html += '   <h4><span id="modal-title" class="modal-title"></span></h4>';
		html += '  </div>';
		html += ' <div class="modal-body">';
		html += '   <div id="modal-content" class="modal-content"></div>';
		html += ' </div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		return html;
	};

  // Add helper class when JS has finished loading
  Drupal.behaviors.loadJS = {
    attach: function(context) {
      $('html').removeClass('no-js').addClass('js');
    }
  };

  // text expander for report description and source bios
  Drupal.behaviors.textExpander = {
    attach: function(context) {
      // text expander for report descriptions
      $('span.expandable').expander({
        slicePoint: 120,
        expandPrefix: ' ',
        expandText: Drupal.t('Show more&hellip;'),
        expandEffect: 'fadeIn',
        expandSpeed: 300,
        moreClass: 'show-more',
        userCollapse: false,
        preserveWords: true,
      });
      // text expander for source bios
      $('span.expandable2x').expander({
        slicePoint: 300,
        expandPrefix: ' ',
        expandText: Drupal.t('Show more&hellip;'),
        expandEffect: 'fadeIn',
        expandSpeed: 300,
        moreClass: 'show-more',
        userCollapse: false,
        preserveWords: true,
      });
    }
  };

  


  Drupal.behaviors.story = {
    attach: function (context, settings) {
      // Show nested activity
      $('.item-nested-content-wrapper > .item-controls > .meta').unbind('click').click(function(event) {
        var target = $(this).parent(),
            element = target.parent();
        if (element.find('.item-nested-content').is(':visible')) {
          element.find('.item-nested-content').slideUp('fast');
          element.removeClass('open');
        }
        else {
          element.find('.item-nested-content').slideDown('fast');
          element.addClass('open');
          element.find('textarea[class*=expanding]').expanding();
        }
        return true;
      });

      // show or hide compose update form
      $('.compose-update-form .compose-update-header').unbind('click').click(function(event) {
        var target = $(this),
            element = target.parent();
        if (element.find('.node-post-form').is(':visible')) {
          element.find('.node-post-form').slideUp('fast');
          element.removeClass('open');
        }
        else {
          element.find('.node-post-form').slideDown('fast');
          element.addClass('open');
        }
        return false;
      });

      // Add active class to the story tab which is active
      $('.story-tabs li a.active').parents('li').addClass('active');
      
      // Initiate timeago
      if($.timeago) {
        $('time.timeago').timeago();
      }
    }
  };

  $.fn.scrollToHere = function(speed) {
    $('html, body').animate({ scrollTop : $(this).offset().top - $('#toolbar').height() - $('#navbar').height() }, speed);
  };

  // Add destination to login links
  // We are using JavaScript because of cache
  Drupal.behaviors.addDestinationToLogin = {
    attach: function(context) {
      var prefix = (Drupal.settings.basePath + Drupal.settings.pathPrefix).replace(/\/$/, '');
      $('a[href^="' + prefix + '/user/login"]', context).attr('href', function(index, path) {
        // Remove old destination value
        var value = path.replace(/([?&])destination=[^&]+(&|$)/, '$1').replace(/[?&]$/, ''),
            sep = (/\?/.test(value) ? '&' : '?'),
            destination = (window.location.pathname === prefix ? 'front-page' : window.location.pathname.replace(prefix + '/', ''));
            destination = destination.replace(/^embed\/([0-9]+)$/, 'node/$1');
        value = value + sep + 'destination=' + destination.replace(/^\//, '');
        return value;
      });
    }
  };

  /**
   * Takes the data-lazy-load-src attribute of any element and applies it
   * to the src attribute when that element is in view.
   *
   * Additionally, all iframes
   *
   * Relies on the jquery.inview.js plugin by Remy Sharp
   * See: http://remysharp.com/2009/01/26/element-in-view-event-plugin/
   */
  Drupal.behaviors.lazyLoadSrc = {
    attach: function (context) {
      $('[data-lazy-load-src]:not(.processed-lazy-load-src)', context)
        .addClass('processed-lazy-load-src')
        .bind('inview', function (e, visible) {
          var $this = $(this),
              sep, src;

          if (visible) {
            // Ensure we never run this twice on the same element
            $this.unbind('inview');

            src = $this.attr('data-lazy-load-src');

            // Ensure wmode=transparent is added to both the tag AND the src URL
            // for all IFRAMEs.
            if (this.tagName === 'IFRAME') {
              $this.attr('wmode', 'transparent');

              sep = src.indexOf('?') === -1 ? '?' : '&';
              src = src.indexOf('wmode') === -1 ? src + sep + 'wmode=transparent' : src;
            }

            // Using $(this).attr('src', 'http://....'); does not appear to work
            // in some browsers.
            //
            // Kicking the DOM object directly does the trick.
            this.src = src;
          }
        });

      $('[data-lazy-load-class]:not(.processed-lazy-load-class)', context)
        .addClass('processed-lazy-load-class')
        .bind('inview', function (e, visible) {
          var $this = $(this),
              classes;

          if (visible) {
            // Ensure we never run this twice on the same element
            $this.unbind('inview');

            classes = $this.attr('data-lazy-load-class');

            this.className = classes;

            // Lazy-load tweets comments
            if (window.twttr && window.twttr.widgets) {
              window.twttr.widgets.load();
            }
          }
        });

      // kick the event to pick up any elements already in view.
      $(window).scroll();
    }
  };

  // Things that must happen after the Drupal behaviors run
  $(window).load(function() {

      // kick the event to pick up any lazy elements already in view.
      $(window).scroll(false); // Disable scrolling the page when this event is triggered
      $(window).scroll();

   });

}(jQuery));
