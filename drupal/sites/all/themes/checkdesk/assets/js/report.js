/*jslint nomen: true, plusplus: true, todo: true, white: true, browser: true, indent: 2 */
(function ($) {
  'use strict';

  // NOTE: This code is intentionally NOT inside a Drupal behavior
  $(function () {
    // On initial page load, check to see if a modal should and can be restored.
    var hash  = window.location.hash.replace('#', ''),
        parts = hash ? hash.split('-') : null,
        $link;

    if (parts && parts[0] === 'report' && !isNaN(parseInt(parts[1], 10))) {
      $link = $('#' + hash + ' .report-detail-link a');

      if ($link) {
        $link.click();
      }
    }
  });


  Drupal.behaviors.reports = {
    attach: function (context, settings) {
      // Remove duplicates added incrementally by views_autorefresh after loading more content with views_load_more
      $('.view-desk-reports').unbind('views_load_more.new_content').bind('views_load_more.new_content', function(event, content) {
        $(content).find('.report-row-container').each(function() {
          $('.view-desk-reports #' + $(this).attr('id')).eq(0).parents('.views-row').remove();
        });
      });

      // Remove duplicates added incrementally by views_autorefresh after loading more content with views_load_more
      $('.view-liveblog').unbind('views_load_more.new_content').bind('views_load_more.new_content', function(event, content) {
        $(content).find('.desk').each(function() {
          $('.view-liveblog #' + $(this).attr('id')).eq(0).remove();
        });
      });

      // If an updated story already exists, remove it
      $('.view-liveblog', context).unbind('autorefresh.incremental').bind('autorefresh.incremental', function(event, count) {
        if (count > 0) {
          $(this).find('.posts:eq(0) .desk').each(function(desk) {
            $('.posts + .posts #' + $(this).attr('id')).remove();
          });
        }
      });

      // add class when end of fact-checking log is reached
      // and also when there is no pager
      $('.report-activity .view').bind('scroll', function() {
        if(($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && $(this).children('.item-list').is(':empty')) {
          $(this).parents('.report-activity').addClass('end');
        } else if (($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && $(this).children('.item-list').length == 0) {
          $(this).parents('.report-activity').addClass('end');
        }
        else {
          $(this).parents('.report-activity').removeClass('end');
        }
      });

      // add class 'long' to big actor/usernames inside the fact-checking log
      // $(window).resize(function() {
      //   console.log($('.report-activity .activity .actor').width());
      //   $('.report-activity .activity .actor').each(function() {
      //     if($(this).width() < 60 && $(this).width() != 39) {
      //       $(this).addClass('multiple-lines');
      //     } else {
      //       $(this).removeClass('multiple-lines');
      //     }
      //   });
      // });

      // scroll to the bottom of modal when interacting with report actions
      // $('#modalContent #report-actions a').click(function (event) {
      // 	$('.modal-body').animate({
      //       scrollTop: 400
      //     }, 'slow');
      // });

      $('a.twitter').click(function(event) {
        event.preventDefault();
        // set URL
        var loc = $(this).attr('href'),
            // set title
            title  = $(this).attr('title');
        // open a window
        window.open('http://twitter.com/share?url=' + loc + '&text=' + title, 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
      });

      $('a.facebook').click(function(event) {
        event.preventDefault();
        // set URL
        var loc = $(this).attr('href'),
            // set title
            title  = $(this).attr('title');
        // open a window
        window.open('https://www.facebook.com/sharer.php?u=' + loc + '&t=' + title, 'facebookwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
      });

      $('a.google').click(function(event) {
        event.preventDefault();
        // set URL
        var loc = $(this).attr('href'),
            // set title
            title  = $(this).attr('title');
        // open a window
        window.open('https://plus.google.com/share?url=' + loc + '&t=' + title, 'googlewindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
      });
    }
  };

  // filters for reports inside sidebar
  Drupal.behaviors.reportFilters = {
    attach: function (context, settings) {
      $('.panel-toggle').unbind('click').click(function(event) {
        var target = $(this),
            element = target.parent().attr('id');
        if ($('#'+ element + ' .panel-content').is(':visible')) {
          $('#'+ element + ' .panel-content').fadeOut('fast');
          $('#'+ element).removeClass('open');
        } else {
          $('#'+ element + ' .panel-content').fadeIn('fast');
          $('#'+ element).addClass('open');
        }
      });

      // hide when clicked outside
      $(document).mouseup(function(event){
        var container = $('.panel-content');
        if (container.has(event.target).length === 0) {
          container.hide();
        }
      });

      // Incoming reports sidebar
      $(window).resize(function() {
        if ($('.view-desk-reports .view-content').length) {
          var difference = $('.view-desk-reports .view-content').offset().top + $('.view-desk-reports .pager').outerHeight(true);
          var height = $(window).height() - difference;
          $('.view-desk-reports .view-content').height(height);
        }
      });
      $(window).trigger('resize');
      $('.view-desk-reports').unbind('autorefresh.incremental').bind('autorefresh.incremental', function(event, count) {
        if (count > 0) {
          var $counter = $('.view-desk-reports .filters-summary p');
          var value = parseInt($counter.find('span').html(), 10) + count;
          $counter.html(Drupal.formatPlural(value, '<span>1</span> result. You can drag and drop it.', '<span>@count</span> results. Drag and drop the best ones.'));
          $(window).trigger('resize');
        }
      });

      // close panel
      $('#close').click(function(event) {
        $('.panel-content').hide();
      });

    }
  };

}(jQuery));