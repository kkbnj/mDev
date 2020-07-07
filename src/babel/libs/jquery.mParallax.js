/*!
 * jQuery mParallax v0.0.1
 * Copyright: 2020 past inc.
 * Contributing Author: Hiroki Homma
 * Website: https://pxxx.jp
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
class SetupParallax {
  resize() {
    this.height = this.$target.outerHeight()
    this.top = this.$target.offset().top
  }

  scroll() {
    requestAFrame(() => {
      if(
        (window.util.scr + window.util.winH * 1.5 >= this.top)
        && (window.util.scr - window.util.winH * 0.5 <= this.top + this.height)
      ) {
        let progress = (window.util.scr + window.util.winH - this.top) / (window.util.winH + this.height)

        this.$target.css({
          transform: 'translate3d(0, ' + (0.5 - progress) * this.ratio + '%, 0)',
        })
      }
    })
  }

  eventHandler() {
    $(window).on('resize.Parallax--' + this.index, () => {
      this.resize()
    })

    $(window).on('scroll.Parallax--' + this.index + ' resize.Parallax--' + this.index, () => {
      this.scroll()
    })
  }

  constructor($target, ratio, index) {
    this.$target = $target
    this.ratio = ratio
    this.index = index

    this.eventHandler()
    this.resize()
    this.scroll()
  }
}

class Parallax {
  constructor($target, ratio) {
    if(!ratio) ratio = 30

    $target.each((i) => {
      new SetupParallax($target.eq(i), ratio, i)
    })

    $(window).imagesLoaded(() => {
      setTimeout(() => {
        $(window).trigger('resize')

        setInterval(() => {
          $(window).trigger('resize')
        }, 1000)
      }, 400)
    })
  }
}


(function($) {
  $.fn.mParallax = function(ratio) {
    new Parallax(this, ratio)
  }
})(jQuery)
