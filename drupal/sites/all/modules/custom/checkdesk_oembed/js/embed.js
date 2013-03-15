/**
 * Checkdesk seamless IFRAME support.
 */
(function () {

  // Based on aspects of http://benvinegar.github.com/seamless-talk/.
  // This script must be placed immediately after the IFRAME for the embed.
  'use strict';

  // Find the DOM node for THIS current script tag
  // See: http://stackoverflow.com/a/3326554/806988
  var scripts = document.getElementsByTagName('script'),
      script  = scripts[scripts.length - 1],
      iframe  = script.previousSibling;

  if (!script || script.tagName !== 'SCRIPT') {
    throw("Checkdesk: Could not locate embedded widget SCRIPT.");
  }
  if (!iframe || iframe.tagName !== 'IFRAME') {
    throw("Checkdesk: Could not locate embedded widget IFRAME.");
  }


  // Define the MessageHandler singleton object
  var MessageHandler = {

    // Handles messages conforming to one of two formats:
    //
    // A) e.data = 'message-type';
    // B) e.data = 'message-type;foo;bar;baz'
    handleMessage: function(e) {
      var data = e.data.split(';'),
          type = data.shift();

      switch (type) {
        case 'loaded':    MessageHandler.handleLoadedMessage(data); break;
        case 'setHeight': MessageHandler.handleSetHeightMessage(data); break;
      }
    },

    handleLoadedMessage: function (data) { },

    handleSetHeightMessage: function (data) {
      if (data[0]) {
        iframe.style.height = data[0] + 'px';
      }
    }

  };


  if (!window.addEventListener) {
    window.attachEvent('onmessage', MessageHandler.handleMessage);
  } else {
    window.addEventListener('message', MessageHandler.handleMessage, false);
  }

}());
