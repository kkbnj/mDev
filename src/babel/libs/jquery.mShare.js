/*!
 * jQuery mShare v1.0
 * Copyright 2017 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fn.mShare = function(type) {
    var $self = this,
        apiUrl,
        txt = $('title').eq(0).text(),
        url = location.origin + location.pathname;

    switch(type) {
      case 'fb':
      	apiUrl = 'http://www.facebook.com/sharer.php?u=' + url;
      break;

      case 'tw':
        apiUrl = 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&amp;text=' + encodeURI(txt);
      break;

      case 'line':
        apiUrl = "http://line.me/R/msg/text/";

        // pc
        // <li class="item">
        //                 <a href="https://lineit.line.me/share/ui?url=http%3A%2F%2Fwww.dot-st.com%2Fcp%2Fstudioclip%2Fhamaji_2016win%2F" onclick="window.open(this.href, 'twwindow', 'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'); return false;" class="mo_op" name="lk_48"><img src="/static/docs/studioclip/pages/201611hamaji_2016win/resource/image/line.svg" alt=""></a>
        //             </li>

        // sp
        // <li class="item">
        //                 <a href="line://msg/text/studio%20CLIP%20featuring%20naoko%20hamajima%20WINTER%202016%20%7C%20%5B%E5%85%AC%E5%BC%8F%5D%E3%82%B9%E3%82%BF%E3%83%87%E3%82%A3%E3%82%AA%E3%82%AF%E3%83%AA%E3%83%83%E3%83%97%EF%BC%88studio%20CLIP%EF%BC%89%E9%80%9A%E8%B2%A9%0d%0ahttp%3A%2F%2Fwww.dot-st.com%2Fcp%2Fstudioclip%2Fhamaji_2016win%2F"><img src="/m/static/docs/studioclip/pages/201611hamaji_2016win/resource/image/line.svg" alt=""></a>
        //             </li>
      break;
    }

    $self.each(function(){
      var $self = $(this);

      $self
        .off('click.mShare')
        .on('click.mShare', function(e) {
          e.preventDefault();

          window.open(
            apiUrl,
            'sharewindow',
            'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'
          );

        });
    });
  }
})(jQuery);
