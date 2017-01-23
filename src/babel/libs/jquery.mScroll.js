/*!
 * jQuery method mScroll v2.1
 * Copyright 2015-2016 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 * @param offset
 * @param speed
 * @param easing
 * @param callback
 */
 (function($) {
  $.mScroll = function(target, arg1, arg2, arg3, arg4) {
    var target_position,
        default_options = {
          offset: 0,
          duration: false,
          easing: false,
          queue: false,
          complete: undefined
        },
        params,
        args = {};

    var setArg = function(arg) {
      if(typeof arg === 'number') {
        if(typeof args.duration === 'undefined') {
          args.duration = arg;

        } else {
          if(typeof args.offset === 'undefined') {
            args.offset = arg;
          }
        }
      }

      if(typeof arg === 'string') {
        args.easing = arg;
      }

      if(typeof arg === 'function') {
        args.complete = arg;
      }
    };

    if(typeof arg1 !== 'object') {
      setArg(arg1);
      setArg(arg2);
      setArg(arg3);
      setArg(arg4);

      params = $.extend({}, default_options, args);

    } else {
      params = $.extend({}, default_options, arg1);
    }

    if(target === '#') {
      target_position = 0;

    } else if(typeof target === 'number') {
      target_position = target;

    } else {
      target_position = $(target).offset().top;
    }

    target_position += params.offset;

    $(window).on('mousewheel.mScroll touchstart.mScroll keydown.mScroll', function(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    });

    $('html, body').not(':animated').animate({
      scrollTop: target_position
    }, {
      duration: params.duration,
      easing: params.easing,
      queue: params.queue
    }).promise().then(function() {
      $(window).off('mousewheel.mScroll touchstart.mScroll keydown.mScroll');

      if(typeof params.complete === 'function') {
        params.complete();
      }
    });

    return false;
  };

  $.fn.mScroll = function(arg1, arg2, arg3, arg4) {
    var $self = this;

    $self.each(function(){
      var $self = $(this);

      $self.on('click.mScroll', function(e){
        var href = $self.attr('href'),
            target = href.substr(href.indexOf('#'));

        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        $.mScroll(target, arg1, arg2, arg3, arg4);
      });
    });
  };
 })(jQuery);
