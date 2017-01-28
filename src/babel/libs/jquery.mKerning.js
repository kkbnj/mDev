/*!
 * jQuery mKerning v1.0
 * Copyright 2017 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
 (function($) {
  $.fn.mKerning = function() {
    var $self = this,
        kerning_list = {
          '、': [0, -0.4],
          '。': [0, -0.4],
          '（': [-0.4, 0],
          '）': [0, -0.4],
          '〔': [-0.4, 0],
          '〕': [0, -0.4],
          '［': [-0.4, 0],
          '］': [0, -0.4],
          '｛': [-0.4, 0],
          '｝': [0, -0.4],
          '〈': [-0.4, 0],
          '〉': [0, -0.4],
          '《': [-0.4, 0],
          '》': [0, -0.4],
          '「': [-0.4, 0],
          '」': [0, -0.4],
          '『': [-0.4, 0],
          '』': [0, -0.4],
          '【': [-0.4, 0],
          '】': [0, -0.4],
          '・': [-0.22, -0.22],
          '：': [-0.22, -0.22],
          '；': [-0.22, -0.22],
          '｜': [-0.22, -0.22]
        }

    $self.each(function(){
      var $self = $(this),
          text = $self.html(),
          terms,
          i;

      // console.log(text);

      for(var key in kerning_list) {
        terms = text.split(key);

        // console.log(kerning_list[key])
        text = terms[0];

        for(var i = 1; i < terms.length; i++) {

          if(kerning_list[key][0] !== 0) {
            if(text) {
              text = text.slice(0, -1) + '<span style="letter-spacing: ' + kerning_list[key][0] + 'em;">' + text.slice(-1) + '</span>';
            }
          }

          if(kerning_list[key][1] !== 0) {
            text += '<span style="letter-spacing: ' + kerning_list[key][1] + 'em;">' + key + '</span>' + terms[i];
          } else {
            text += key + terms[i]
          }
        }
      }

      $self.html(text);
    });
  };
 })(jQuery);
