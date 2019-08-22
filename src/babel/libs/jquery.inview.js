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

    this.$target.each((i) => {
      this.offset[i] = this.$target.eq(i).offset().top
    })
  }

  judge() {
    let scr = $(window).scrollTop()

    this.$target.each((i) => {
      if(!this.show_flag[i] && this.offset[i] <= scr + this.winHeight * this.threshold) {
        this.show_flag[i] = true
        this.callback(this.$target.eq(i))
        this.$target.eq(i).addClass('inview--active')
      }
    })
  }

  play() {
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
    }, 1000 / this.fps)
  }

  pause() {
    clearInterval(this.interval)
  }

  stop() {
    clearInterval(this.interval)
    this.offset = []
    this.show_flag = []
    this.$target.removeClass('inview--active')
  }

  constructor($target, threshold = 2 / 3, callback = function() {}) {
    this.fps = 8
    this.winHeight = $(window).height()
    this.offset = []
    this.show_flag = []
    this.$target = $target
    this.threshold = threshold
    this.callback = callback
    this.eventHandler()
  }
}

(function($) {
  $.inview = Inview
})($)

