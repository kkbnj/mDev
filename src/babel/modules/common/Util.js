class Util {
  resize() {
    this.winW = $(window).width()
    this.winH = $(window).height()

    if(this.winW <= this.breakpoint) {
      this.mode = 'sp'

    } else if(this.ua.indexOf('ipad') !== -1 || (this.ua.indexOf('macintosh') > -1 && 'ontouchend' in document) || this.ua.indexOf('android') !== -1) {
      this.mode = 'tablet'

    } else {
      this.mode = 'pc'
    }
  }

  scroll() {
    this.scr = $(window).scrollTop()
    this.scrLeft = $(window).scrollLeft()
  }

  eventHandler() {
    $(window).on('resize.Util', () => {
      this.resize()
      this.scroll()
    })

    $(window).on('scroll.Util', () => {
      this.scroll()
    })
  }

  init() {
    this.touchDevice = (
      (this.ua.indexOf('windows') != -1 && this.ua.indexOf('touch') != -1 && this.ua.indexOf('tablet pc') == -1)
      || this.ua.indexOf('ipad') != -1
      || this.ua.indexOf('iphone') != -1
      || this.ua.indexOf('ipod') != -1
      || this.ua.indexOf('android') != -1
      || (this.ua.indexOf('firefox') != -1 && this.ua.indexOf('tablet') != -1)
      || (this.ua.indexOf('firefox') != -1 && this.ua.indexOf('mobile') != -1)
      || this.ua.indexOf('kindle') != -1
      || this.ua.indexOf('silk') != -1
      || this.ua.indexOf('playbook') != -1
      || (this.ua.indexOf('windows') != -1 && this.ua.indexOf('phone') != -1)
      || this.ua.indexOf('blackberry') != -1
    ) ? true : false
  }

  constructor() {
    this.ua = window.navigator.userAgent.toLowerCase()
    this.breakpoint = 736

    this.init()
    this.eventHandler()

    this.resize()
    this.scroll()
  }
}

export default Util
