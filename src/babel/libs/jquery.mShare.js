/*!
 * jQuery mShare v2.1
 * Copyright: 2017-2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fn.mShare = function(options) {
    var default_options = {
          type: 'tw',
          text: $('title').eq(0).text(),
          url: location.origin + location.pathname,
        },
        $self = this,
        ua = navigator.userAgent,
        mode = 'pc';

    // sp
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
      mode = 'sp';

    // tab
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      mode = 'tablet';

    // pc
    } else {
      mode = 'pc';
    }

    $self.each(function(){
      var $self = $(this),
          apiUrl,
          inlineType = $self.attr('href').split('#')[1],
          inlineText = $self.attr('data-text'),
          inilneUrl = $self.attr('data-url'),
          inlineOptions = {
          },
          params;

      if(inlineType) inlineOptions.type = inlineType;
      if(inlineText) inlineOptions.text = inlineText;
      if(inilneUrl) inlineOptions.url = inilneUrl;

      params = $.extend({}, default_options, options, inlineOptions)

      switch(params.type) {
        case 'fb':
          apiUrl = 'http://www.facebook.com/sharer.php?u=' + params.url;
        break;

        case 'tw':
          apiUrl = 'http://twitter.com/intent/tweet?url=' + encodeURI(params.url) + '&amp;text=' + encodeURI(params.text);
        break;

        case 'line':
          apiUrl = 'http://line.me/R/msg/text/';

          if(mode === 'pc') {
            apiUrl = 'https://lineit.line.me/share/ui?url=' + encodeURI(params.url);
          } else {
            apiUrl = 'line://msg/text/' + encodeURI(params.text) + '%0d%0a' + encodeURI(params.url);
          }
        break;
      }

      $self
        .off('click.mShare')
        .on('click.mShare', function(e) {
          e.preventDefault();

          if(!apiUrl) return;

          window.open(
            apiUrl,
            'sharewindow',
            'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'
          );

        });
    });
  }
})(jQuery);
