/*!
 * jQuery mKerning v1.3
 * Copyright 2017 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
 (function($) {
  $.fn.mKerning = function(optional_kerning_list) {
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
        };

    $.extend(kerning_list, optional_kerning_list);

    $self.each(function(){
      var $self = $(this),
          text = $self.html(),
          newText = '',
          terms,
          count,
          point = {}, // 文字列中のそれぞれの箇所におけるカーニング値
          special,
          tmp = [],
          i,
          j,
          fontSize = $self.css('font-size'),
          defaultKerning = parseInt($self.css('letter-spacing'), 10) / parseInt(fontSize, 10);

      // 対象の文字でループ
      for(var key in kerning_list) {
        // 対象の文字で分割
        terms = text.split(key);
        count = 0;

        // 分割した文字列でループ
        for(var i = 0; i < terms.length - 1; i++) {
          count += terms[i].length;

          if(!point[(count - 1)]) point[(count - 1)] = 0;
          if(!point[count]) point[count] = 0;

          point[(count - 1)] += kerning_list[key][0];
          point[count] += kerning_list[key][1];

          count++;
        }
      }


      j = 0;

      for(var i in point) {
        if(i < 0) continue;

        tmp[0] = text.substring(j, i);
        tmp[1] = tmp[0] + ';';

        if(text.charAt(i) === ';') {
          // 該当箇所が特殊文字かチェック
          if(special = tmp[1].match(/&[a-z]+;/g)) {
            special = special[(special.length - 1)];

            if(tmp[1].length - tmp[1].lastIndexOf(special) - special.length === 0) {
              tmp[0] = text.substring(j, (i - (special.length - 1)));
              newText += tmp[0] + '<span style="letter-spacing: ' + (defaultKerning + point[i]) + 'em;">' + special + '</span>';
            }
          }
          j = parseInt(i, 10) + 1;

        } else {
          if(text.charAt(i) !== '<' && text.charAt(i) !== '>' && point[i] !== 0) {
            newText += tmp[0] + '<span style="letter-spacing: ' + (defaultKerning + point[i]) + 'em;">' + text.charAt(i) + '</span>';
            j = parseInt(i, 10) + 1;
          }
        }
      }

      newText += text.substr(j);

      $self.html(newText);
    });
  };
 })(jQuery);
