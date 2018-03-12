/*!
 * jQuery mLazy v1.0
 * Copyright 2018 factory
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

    $target
      .attr('src', src)
      .addClass('lazyload--loaded')
  }

  scroll() {
    let self = this

    this.scroll_top = $(window).scrollTop()
    this.window_height = $(window).height()

    $('.lazyload').not('.lazyload--loaded').each(function(i) {
      let $target = $(this);

      if(self.scroll_top + self.window_height * self.offset >= $target.offset().top) {
        self.load($target)
      }
    })
  }

  eventHandler() {
    $(window).on('scroll.Lazy', () => {
      this.scroll_flag = true
    })

    setInterval(() => {
      if(this.scroll_flag) {
        this.scroll_flag = false
        this.scroll()
      }
    }, 1000 / 8)
  }

  constructor(offset) {
    this.offset = (offset ? offset : 2)
    this.eventHandler()
  }
}

(function($) {
  $.mLazy = mLazy
})($)
