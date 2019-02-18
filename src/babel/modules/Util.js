class Util {
  eventHandler() {
    $(window).on('resize.Util', () => {
      this.winW = $(window).width()
      this.winH = $(window).height()
      this.scr = $(window).scrollTop()

      if(this.winW <= this.breakpoint) {
        this.mode = 'sp'

      } else if(this.ua.indexOf('ipad') !== -1 || this.ua.indexOf('android') !== -1) {
        this.mode = 'tablet'

      } else {
        this.mode = 'pc'
      }
    })

    $(window).on('scroll.Util', () => {
      this.scr = $(window).scrollTop()
    })
  }

  constructor() {
    this.ua = window.navigator.userAgent.toLowerCase()
    this.mode = 'pc'
    this.breakpoint = 736
    this.winW = $(window).width()
    this.winH = $(window).height()
    this.scr = $(window).scrollTop()

    this.eventHandler()
  }
}

export default Util
