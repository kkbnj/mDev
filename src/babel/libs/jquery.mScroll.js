/*!
 * jQuery mScroll v2.5
 * Copyright: 2015-2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
 (function($) {
  $.mScroll = function(target, arg1, arg2, arg3, arg4) {
    var target_position,
        default_options = {
          $container: $('html, body'),
          offset: 0,
          duration: false,
          easing: false,
          queue: false,
          complete: undefined,
          delay: 0,
          jump: false,
          jump_delay: 0,
        },
        params,
        args = {},
        max = $(document).height() - $(window).height(),
        custom_container,
        custom_offset = 0;

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
      if(arg1.$container) {
        custom_container = true;
      }

      params = $.extend({}, default_options, arg1);
    }

    if(custom_container) {
      custom_offset = params.$container.scrollTop()
    }

    if(target === '#') {
      target_position = 0;

    } else if(typeof target === 'number') {
      target_position = target;

    } else if($(target)[0]) {
      target_position = $(target).offset().top;

    } else {
      location.href=target;
      return false;
    }

    if(typeof params.offset === 'function') {
      params.offset = params.offset()
    }

    if(typeof params.jump === 'function') {
      params.jump = params.jump()
    }

    target_position += params.offset + custom_offset;

    $(window).on('mousewheel.mScroll touchstart.mScroll keydown.mScroll', function(e) {
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    });

    if(target_position > max) {
      target_position = max;
    }

    if(target_position < 0) {
      target_position = 0;
    }

    if(target_position !== $(window).scrollTop()) {
      setTimeout(function() {
        if(params.jump) {
          if(Math.abs(target_position - $(window).scrollTop()) > params.jump) {
            if(target_position > $(window).scrollTop()) {
              $('html, body').scrollTop(target_position - params.jump)

            } else {
              $('html, body').scrollTop(target_position + params.jump)

            }
          }
        }

        setTimeout(function() {
          params.$container.not(':animated').animate({
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
        }, params.delay)
      }, params.jump_delay)

    } else {
      $(window).off('mousewheel.mScroll touchstart.mScroll keydown.mScroll');

      if(typeof params.complete === 'function') {
        params.complete();
      }

    }

    return false;
  };

  $.fn.mScroll = function(arg1, arg2, arg3, arg4) {
    var $self = this;

    $self.each(function(){
      var $self = $(this);

      $self.on('click.mScroll', function(e){
        var href = $self.attr('href'),
            target = href.substr(href.indexOf('#'));

        if(target !== '#' && $(target) && !$(target)[0]) return;

        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

        $.mScroll(target, arg1, arg2, arg3, arg4);
      });
    });
  };
 })(jQuery);
