/*!
 * jQuery mParallax v0.0.2
 * Copyright: 2020 past inc.
 * Contributing Author: Hiroki Homma
 * Website: https://past.jp
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

        this.$cont.css({
          transform: 'translate3d(0, ' + (0.5 - progress) * this.ratio + '%, 0)',
        })
      }
    })
  }

  eventHandler() {
    $(window).on('resize.Parallax--' + this.index, () => {
      this.resize()
    }).trigger('resize.Parallax--' + this.index)

    $(window).on('scroll.Parallax--' + this.index + ' resize.Parallax--' + this.index, () => {
      this.scroll()
    }).trigger('scroll.Parallax--' + this.index + ' resize.Parallax--' + this.index)
  }

  constructor($target, ratio, index) {
    this.$target = $target

    if(this.$target.is('img')) {
      console.log('mParallax is not for img. apply for div or other wrapper element')

      return
    }

    this.$cont = $('<div>').css({
      minHeight: '100%',
    }).html(this.$target.html())

    this.$target.html(this.$cont)

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
