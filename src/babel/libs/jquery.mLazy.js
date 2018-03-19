/*!
 * jQuery mLazy v2.0
 * Copyright: 2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
class mLazy {
  load($target) {
    let src = $target.attr('data-src'),
        srcset = $target.attr('data-srcset');

    if(srcset) {
      $target.attr('srcset', srcset)
    }

    if(src) {
      $target
        .attr('src', src)
        .addClass('mLazy--loaded')
    }
  }

  scroll() {
    let self = this,
        scroll_top = $(window).scrollTop(),
        scroll_offset = self.params.offset;

    if(typeof scroll_offset === 'function') {
      scroll_offset = scroll_offset()
    }

    self.$target.each(function(i) {
      if(self.flag[i]) return;

      if(scroll_top + scroll_offset > $(this).offset().top) {
        self.flag[i] = true

        // thisがimgかsourceの場合
        if($(this).filter('img, source')[0]) {
          self.load($(this))
        // thisにimgかsourceを含む場合
        } else if($('img, source', $(this))[0]) {
          $('img, source', $(this)).each(function() {
            self.load($(this))
          })
        }
      }
    })
  }

  play() {
    $(window).on('scroll.mLazy', () => {
      this.scroll_flag = true
    })

    this.interval = setInterval(() => {
      if(this.scroll_flag) {
        this.scroll_flag = false
        this.scroll()
      }

      if(this.flag.indexOf(false) < 0) {
        clearInterval(this.interval)
      }
    }, 1000 / this.params.fps)
  }

  initialize() {
    let self = this
    self.$target.each(function(i) {
      self.flag[i] = false

      // thisがimgかsourceの場合
      if($(this).filter('img, source')[0]) {
        self.$img = self.$img.add(this)

      // thisにimgかsourceを含む場合
      } else if($('img, source', $(this))[0]) {
        self.$img = self.$img.add($('img, source', $(this)))

      // それ以外
      } else {
        self.flag[i] = true
      }
    })
  }

  setParams(optional_params) {
    let default_params = {
      offset: () => {
        return $(window).height() * 2
      },
      fps: 8,
    }

    this.params = $.extend({}, default_params, optional_params)
  }

  constructor($target, params) {
    this.$target = $target
    this.$img = $()
    this.flag = []
    this.interval
    this.scroll_flag

    // パラメータを設定
    this.setParams(params)
    this.initialize()
    if(this.$img[0]) {
      this.play()
    }
  }
}

(function($) {
  $.mLazy = mLazy
})($)

