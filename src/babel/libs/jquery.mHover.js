/*!
 * jQuery mHover v1.0
 * Copyright: 2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fn.mHover = function() {
    var $self = this;

    $self.on({
      'mouseenter.mHover touchstart.mHover': function(e) {
        $(this).addClass('mHover')
      },
      'mouseleave.mHover touchend.mHover touchcancel.mHover': function(e) {
        $(this).removeClass('mHover')
      },
    })
  }
})(jQuery);
