/*!
 * jQuery method svg2png v1.0
 * Copyright 2017 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 * Require for modernizr svg
 */
(function($) {
  $.fn.svg2png = function(callback) {
    var $self = this,
        len = $self.length,
        i = 0;

    if($('html').hasClass('no-svg')) {
      $self.each(function(){
        var $self = $(this);


        // replace
        $('img', $self).each(function() {
          $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
        });


        // check & fire callback
        i++;

        if(i === len && typeof callback === 'function') {
          callback();
        }
      });
    } else {
      if(typeof callback === 'function') {
        callback();
      }
    }
  }

})(jQuery)
