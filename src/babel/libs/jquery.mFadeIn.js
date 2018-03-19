/*!
 * jQuery mFadeIn v1.2
 * Copyright: 2016-2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fn.mFadeIn = function(options) {
    var default_options = {
          duration: 260,
          time_window: 24,
          delay: 0,
          direction: 'right'
        },

        params = $.extend({}, default_options, options),

        $target = $(this),
        $img = $('img', $target),
        $canvas = $('<canvas>').css('width', '100%'),
        ctx,
        width,
        height;

    var draw = function(progress) {
      var grad,
          large,
          wid = params.time_window / 100,
          start = progress * (1 + wid) / 100 - wid,
          end = start + wid;

      if(start < 0) start = 0;
      if(end > 1) end = 1;

      if(width > height) {
        large = width;
      } else {
        large = height;
      }


      ctx.restore();
      ctx.save();

      switch(params.direction) {
        case 'radialIn':
          grad = ctx.createRadialGradient(width / 2, height / 2, large / 2, width / 2, height / 2, 0);
          break;

        case 'radialOut':
          grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, large / 2);
          break;

        case 'top':
          grad = ctx.createLinearGradient(0, large, 0, 0);
          break;

        case 'bottom':
          grad = ctx.createLinearGradient(0, 0, 0, large);
          break;

        case 'left':
          grad = ctx.createLinearGradient(large, 0, 0, large);
          break;

        case 'right':
        default:
          grad = ctx.createLinearGradient(0, 0, large, large);
          break;
      }

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage($img[0], 0, 0);

      ctx.globalCompositeOperation = 'destination-out';

      ctx.beginPath();

      grad.addColorStop(start, 'rgba(255, 255, 255, 0)');

      grad.addColorStop(end, 'rgba(255, 255, 255, 1)');

      ctx.fillStyle = grad;

      ctx.rect(0, 0, width, height);
      ctx.fill();
    }

    var canvas_set = function() {
      $target.css({
        display: 'block',
        opacity: 0,
        overflow: 'hidden'
      });

      var img = new Image();

      img.src = $img.attr('src');

      img.onload = function() {
        var i;

        width = img.width;
        height = img.height;

        ctx = $canvas[0].getContext('2d');
        $canvas[0].width = width;
        $canvas[0].height = height;

        $img.after($canvas);
        $img.remove();
        $target.css({
          opacity: 1
        });

        ctx.save();

        for(i = 1; i <= 100; i++) {
          (function(i) {
            setTimeout(function() {
              draw(i);
            }, params.duration / 100 * i);
          })(i);
        }
      }
    }

    var init = function() {
      var ua = navigator.userAgent.toLowerCase(),
          ie = !(ua.indexOf('edge') > -1) && ((ua.indexOf('msie') != -1) && (ua.indexOf('opera') == -1)) || (ua.indexOf('trident/7') != -1);

      setTimeout(function() {
        if(!ie && $canvas[0].getContext('2d')) {
          canvas_set();

        } else {
          $target.css({
            display: 'none',
            opacity: 1
          });

          $target.fadeIn({
            duration: params.duration
          });
        }
      }, params.delay);
    }

    init();
  }
})(jQuery);
