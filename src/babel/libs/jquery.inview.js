/*!
 * jQuery Inview v2
 * Copyright: 2016-2019 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
class Inview {
  eventHandler() {
    $(window).on('scroll.Inview', () => {
      this.scroll()
    })

    $(window).on('resize.Inview', () => {
      this.resize()
    })
  }

  resize() {
    this.resize_flag = true
    this.scroll_flag = true
  }

  scroll() {
    this.scroll_flag = true
  }

  adjust() {
    this.winHeight = $(window).height()

    this.params.$target.each((i) => {
      this.offset[i] = this.params.$target.eq(i).offset().top
    })
  }

  judge() {
    let scr = $(window).scrollTop(),
        max = document.documentElement.scrollHeight - document.documentElement.clientHeight + this.winHeight * this.params.enter_threshold

    this.params.$target.each((i) => {
      if(!this.params.infinite && this.show_flag[i]) return

      // enter制御
      if(
        (max <= this.offset[i] && max <= scr + this.winHeight * this.params.enter_threshold)
        || (this.offset[i] <= scr + this.winHeight * this.params.enter_threshold)
      ) {
        if(this.params.debug) console.log(1)
        if(this.show_flag[i]) return

        this.show_flag[i] = true
        this.params.$target.eq(i).addClass(this.params.enter_classname)
        this.params.enter_callback(this.params.$target.eq(i))
      } else if(this.offset[i] > scr + this.winHeight * this.params.leave_threshold) {
        if(this.params.debug) console.log(0)
        if(!this.show_flag[i]) return

        this.show_flag[i] = false
        this.params.$target.eq(i).removeClass(this.params.enter_classname)
        this.params.leave_callback(this.params.$target.eq(i))
      }
    })
  }

  play() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.resize()

      if(this.resize_flag) {
        this.resize_flag = false

        this.adjust()
      }

      if(this.scroll_flag) {
        this.scroll_flag = false

        this.judge()
      }
    }, 1000 / this.params.fps)
  }

  pause() {
    clearInterval(this.interval)
  }

  stop() {
    clearInterval(this.interval)
    this.offset = []
    this.show_flag = []
    this.params.$target
      .removeClass(this.params.enter_classname)
      .removeClass(this.params.leave_classname)
  }

  constructor(arg1 = {}, arg2, arg3) {
    this.default_params = {
      $target: $('.inview'),
      enter_threshold: 2 / 3,
      leave_threshold: 2 / 3,
      enter_classname: 'inview--enter',
      leave_classname: 'inview--leave',
      infinite: false,
      autoplay: true,
      fps: 8,
      enter_callback: () => {},
      leave_callback: () => {},
    }

    this.params = {}

    if(typeof arg1 !== 'object') {
      this.params.$target = arg1
      this.params.enter_threshold = (arg2 ? arg2 : 2 / 3)
      this.params.enter_callback = (arg3 ? arg3 : function() {})
    } else {
      this.params = $.extend({}, this.default_params, arg1)
    }

    this.winHeight = $(window).height()
    this.offset = []
    this.show_flag = []
    this.eventHandler()

    if(this.params.autoplay) {
      this.play()
    }
  }
}

(function($) {
  $.inview = Inview
})($)
