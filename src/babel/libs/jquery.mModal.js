/*!
 * jQuery mModal v1.3
 * Copyright: 2015-2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.mModal = function(options) {
    var default_options = {
        type: 'fade',
        scroll_top: true,
        duration: 260,
        easing: 'swing',

        velocity_js: true,
        css_animation: true,

        before_open: function(e) {},
        after_open: function(e) {},
        before_close: function(e) {},
        after_close: function(e) {},

        open_classname: 'mModal-open',
        close_classname: 'mModal-close',
        page_classname: 'mModal-page',
        modal_classname: 'mModal-modal',
        modal_cont_classname: 'mModal-modal_cont',
        opened_classname: 'mModal-opened'
      },

      params = $.extend({}, default_options, options),

      $body = $('body'),
      $open = $('.' + params.open_classname),
      $modal = $('.' + params.modal_classname),
      $modal_cont = $('.' + params.modal_cont_classname),
      $page = $('.' + params.page_classname),
      $close = $('.' + params.close_classname),

      open_timeout,
      animation_method = 'jquery_animate',

      ua = window.navigator.userAgent.toLowerCase(),


      touch_device = (
        (ua.indexOf("windows") != -1 && ua.indexOf("touch") != -1 && ua.indexOf("tablet pc") == -1)
        || ua.indexOf("ipad") != -1
        || ua.indexOf("iphone") != -1
        || ua.indexOf("ipod") != -1
        || ua.indexOf("android") != -1
        || (ua.indexOf("firefox") != -1 && ua.indexOf("tablet") != -1)
        || (ua.indexOf("firefox") != -1 && ua.indexOf("mobile") != -1)
        || ua.indexOf("kindle") != -1
        || ua.indexOf("silk") != -1
        || ua.indexOf("playbook") != -1
        || (ua.indexOf("windows") != -1 && ua.indexOf("phone") != -1)
        || ua.indexOf("blackberry") != -1
      ) ? true : false,
      touch_start,
      touch_move;

    //animation_methodの決定
    if(params.velocity_js === true && typeof $.fn.velocity !== 'undefined') {
      animation_method = 'velocity';

    } else if(params.css_animation === true) {
      (function() {
        var div = document.createElement('div'),
          prop = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition'],
          i;

        for (i = 0; i < prop.length; i++) {
          if (prop[i] in div.style) {
            animation_method = 'css_transition';
            break;
          }
        }
      }());
    }

    function open(e) {

      if (typeof params.before_open === 'function') {
        params.before_open(e);
      }

      setTimeout(function() {
        if(touch_device) {
          //SPタッチ開始位置取得
          $modal.on('touchstart.mModal', function(e) {
              touch_start = e.originalEvent.touches[0].pageY;
          });

          //SPスクロールを停止
          $(window).on('touchmove.mModal', function(e) {
              e.preventDefault ? e.preventDefault() : e.returnValue = false;
              e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
          });

          //Menu内のSPスクロールを有効化
          $modal.on('touchmove.mModal', function(e) {
            e.stopPropagation();

            touch_move = touch_start - e.originalEvent.touches[0].pageY;

            if(
              //メニュー内スクロールより上にスクロールした場合
              $modal.scrollTop() <= 0 && touch_move < 0 ||
              //メニュー内スクロールより下にスクロールした場合
              $modal.scrollTop() >= ($modal_cont.height() - $(window).height()) && touch_move > 0
            ) {
              e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }
          });
        }

        $body.addClass(params.opened_classname).css({
          overflow: 'hidden'
        });

        $modal.css({
          display: 'block'
        });

        if (params.scroll_top) {
          $modal_cont.scrollTop(0);

          if(touch_device) {
            $modal.scrollTop(0);
          }
        }

        setTimeout(function() {
          switch(animation_method) {
            case 'velocity':
              $modal.velocity({
                opacity: 1
              },{
                duration: params.duration,
                easing: params.easing
              });

            break;
            case 'css_transition':
              $modal.css({
                opacity: 1
              });
              break;
            case 'jquery_animate':
              $modal.animate({
                opacity: 1
              },{
                duration: params.duration,
                easing: params.easing
              });
            break;
          }

          open_timeout = setTimeout(function() {
            // $page.css({
            //   visibility: 'hidden'
            // });

            if (typeof params.after_open === 'function') {
              params.after_open(e);
            }
          }, params.duration + 16);
        }, 16);
      }, 16);
    }

    function close(e) {
      if (typeof params.before_close === 'function') {
        params.before_close(e);
      }

      clearTimeout(open_timeout);
      // $page.css({
      //   visibility: 'visible'
      // });

      setTimeout(function() {
        switch(animation_method) {
          case 'velocity':
            $modal.velocity({
              opacity: 0
            },{
              duration: params.duration,
              easing: params.easing
            });

          break;
          case 'css_transition':
            $modal.css({
              opacity: 0
            });
            break;
          case 'jquery_animate':
            $modal.animate({
              opacity: 0
            },{
              duration: params.duration,
              easing: params.easing
            });
          break;
        }

        setTimeout(function() {
          $modal.css({
            display: 'none'
          });
          $body.css({
            overflow: 'visible'
          });

          $body.removeClass(params.opened_classname);

          if(touch_device) {
            $modal.off('touchstart.mModal');
            $(window).off('touchmove.mModal');
            $modal.off('touchmove.mModal');
          }

          if (typeof params.after_close === 'function') {
            params.after_close(e);
          }
        }, params.duration + 16);
      }, 16);
    }

    var init = (function() {
      //Open and Close Event
      $open.on('click.mModal', function(e) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        open(e);
      });
      $close.on('click.mModal', function(e) {
        e.stopPropagation ? e.stopPropagation() : '';
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        close(e);
      });

      //Set CSS
      $modal.css({
        opacity: 0,
        display: 'none',
        zIndex: '9000',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowScrolling: 'touch',
        backfaceVisibility: 'hidden'
      });

      if(animation_method === 'css_transition') {
        $modal.css({
          transition: 'opacity ' + params.duration + 'ms ease-in-out'
        });
      }

      $modal_cont.css({
        width: '100%',
        height: '100%'
      });

      if(touch_device) {
        $modal.css({
          overflow: 'auto'
        });
        $modal_cont.css({
          height: 'auto',
          oveflow: 'visible'
        });
      } else {
        $modal_cont.css({
          overflow: 'auto'
        });
      }
    }());
  };
}(jQuery));
