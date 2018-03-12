/*!
 * jQuery mSlider v0.12
 * Copyright: 2017-2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
class mSlider {
  change(target) {
    if(target === this.now) return
    if(this.animating) return
    this.animating = true

    let before = this.now,
        after = target,
        loop;

    if(after < 0) after = this.len - 1

    if(after >= this.len) after = 0

    if(this.params.controller) {
      this.$controller
        .removeClass('Slider__controller--now')
        .eq(after)
          .addClass('Slider__controller--now')
    }

    switch(this.params.type) {
      case 'slide':
        // begin
        this.$slide.eq(before).removeClass('Slider__slide--now')
        this.$slide.eq(after).addClass('Slider__slide--now Slider__slide--show')

        if(typeof this.params.before_change === 'function') {
          this.params.before_change(after, before)
        }

        // complete
        this.$slides.on('transitionend.mSlider', () => {
          this.$slides.off('transitionend.mSlider')
          this.$slide.eq(before).removeClass('Slider__slide--show')

          this.$slides.css({
            transition: 'none',
          }).velocity({
            translateX: (- after * 100) + '%'
          }, {
            duration: 0
          })

          if(typeof this.params.after_change === 'function') {
            this.params.after_change(after, before)
          }

          this.now = after
          this.animating = false

          if(this.params.autoplay) {
            clearTimeout(this.interval)
            this.interval = setTimeout(() => {
              this.next()
            }, this.params.autoplay_interval - this.params.duration)
          }
        })

        if(this.params.duration <= 0) {
          this.$slides.trigger('transitionend.mSlider')

          return;
        }

        // transition
        this.$slides.css({
          transition: 'transform ' + this.params.duration + 'ms ' + window.easing[this.params.easing],
        }).velocity({
          translateX: (- target * 100) + '%'
        }, {
          duration: 0
        })

      break;
      case 'fade':
        this.$slide.eq(after)
          .css({
            opacity: 0,
            display: 'block',
            zIndex: 5,
          })

          loop = (() => {
            requestAFrame(() => {
              if(this.$slide.eq(after).css('display') === 'none') {
                loop()
                return;
              }

              this.$slide.eq(before).removeClass('Slider__slide--now')
              this.$slide.eq(after)
                .addClass('Slider__slide--now Slider__slide--show')
                .css({
                  opacity: 1,
                })

              if(typeof this.params.before_change === 'function') {
                this.params.before_change(after, before)
              }

              setTimeout(() => {
                requestAFrame(() => {
                  this.$slide.eq(before).removeClass('Slider__slide--show')
                  this.$slide.eq(this.now).hide()
                  this.$slide.eq(after).css({
                    zIndex: 0,
                  })

                  if(typeof this.params.after_change === 'function') {
                    this.params.after_change(after, before)
                  }

                  this.now = after
                  this.animating = false

                  if(this.params.autoplay) {
                    clearTimeout(this.interval)
                    this.interval = setTimeout(() => {
                      this.next()
                    }, this.params.autoplay_interval - this.params.duration)
                  }
                })
              }, this.params.duration)
            })
          })()
      break;
      case 'crop':
        this.$slide.eq(after)
          .css({
            zIndex: 5,
            display: 'block',
            width: '0',
          })

        this.$slideCont.eq(after)
          .css('position', 'absolute')
          .css(this.params.crop_param, (this.params.crop_param !== 'height' ? this.$slides.width() : this.$slides.height()))
          .css(this.params.crop_init, 0)

          loop = (() => {
            requestAFrame(() => {
              if(this.$slide.eq(after).css('display') === 'none') {
                loop()
                return;
              }

              this.$slide.eq(before).removeClass('Slider__slide--now')
              this.$slide.eq(after)
                .addClass('Slider__slide--now Slider__slide--show')
                .css({
                  width: '100%',
                })

              if(typeof this.params.before_change === 'function') {
                this.params.before_change(after, before)
              }

              setTimeout(() => {
                requestAFrame(() => {
                  this.$slide.eq(before).removeClass('Slider__slide--show')
                  this.$slide.eq(this.now).hide()
                  this.$slide.eq(after).css({
                    zIndex: 0,
                  })

                  if(typeof this.params.after_change === 'function') {
                    this.params.after_change(after, before)
                  }

                  this.now = after
                  this.animating = false

                  if(this.params.autoplay) {
                    clearTimeout(this.interval)
                    this.interval = setTimeout(() => {
                      this.next()
                    }, this.params.autoplay_interval - this.params.duration)
                  }
                })
              }, this.params.duration)
            })
          })()
      break;
      default:

    }


  }

  prev() {
    this.change(this.now - 1)
  }

  next() {
    this.change(this.now + 1)
  }

  touchEventHandler($target) {
    let self = this,
        touchStart = [],
        touchDelta = []

    $target.on({
      'touchstart.Slider': function(e) {
        let x = (e.changedTouches ? e.changedTouches[0].pageX : e.originalEvent.changedTouches[0].pageX),
        y = (e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY)

        touchStart = [x, y]
      },
      'touchmove.Slider': function(e) {
        if(!touchStart) return

        let x = (e.changedTouches ? e.changedTouches[0].pageX : e.originalEvent.changedTouches[0].pageX),
        y = (e.changedTouches ? e.changedTouches[0].pageY : e.originalEvent.changedTouches[0].pageY)

        touchDelta = [x - touchStart[0], y - touchStart[1]]

        if(Math.abs(touchDelta[0]) > 50 && Math.abs(touchDelta[1]) < 50) {
          e.preventDefault()

          if(touchDelta[0] > 100) {
            self.prev()
            touchStart = []
            touchDelta = []
          } else if(touchDelta[0] < -100) {
            self.next()
            touchStart = []
            touchDelta = []
          }
        }
      },
      'touchcancel.Slider': function(e) {
        touchDelta = []
      },
      'touchend.Slider': function(e) {
        if(!touchDelta) return

        if(touchDelta[0] > 50) {
          self.prev()
        } else if(touchDelta[0] < -50) {
          self.next()
        }

        touchStart = []
        touchDelta = []
      },
    })
  }

  clickEventHandler() {
    this.$slide.on('click.Slider', (e) => {
      e.preventDefault()

      this.next()
    })
  }

  controllerEventHandler() {
    let self = this

    self.$controller.on('click.Slider', function(e) {
      e.preventDefault()
      e.stopPropagation()

      self.change(self.$controller.index($(this)))
    })
  }

  directEventHandler() {
    let self = this

    self.$prev.on('click.Slider touchstart.Slider', (e) => {
      e.preventDefault()
      e.stopPropagation()

      self.prev()
    })

    self.$next.on('click.Slider touchstart.Slider', (e) => {
      e.preventDefault()
      e.stopPropagation()

      self.next()
    })
  }

  autoPlay() {
    this.params.autoplay = true

    this.interval = setTimeout(() => {
      this.next()
    }, this.params.autoplay_delay + this.params.autoplay_interval)
  }

  play() {
    this.params.autoplay = true

    this.next()
  }

  pause() {
    this.params.autoplay = false
    clearTimeout(this.interval)
  }

  eventHandler() {
    let self = this;

    if(self.params.click_next) {
      self.clickEventHandler()
    }

    if(self.params.swipe) {
      self.touchEventHandler(self.params.$slider)
    }

    if(this.params.direct) {
      self.directEventHandler()
    }

    if(this.params.controller) {
      self.controllerEventHandler()
    }
  }

  initialize() {
    let self = this

    if(this.params.$slider.css('position') === 'static') {
      this.params.$slider.css({
        position: 'relative',
      })
    }

    if(this.params.direct) {
      this.$prev = $('<a>')
        .addClass('Slider__direct Slider__direct--prev')
        .css('display', 'block')
        .attr('href', '#')

      this.$next = $('<a>')
        .addClass('Slider__direct Slider__direct--next')
        .css('display', 'block')
        .attr('href', '#')

      this.params.$slider
        .append(this.$prev)
        .append(this.$next)
    }

    if(this.params.controller) {
      this.$controllers = $('<ul>').addClass('Slider__controllers')

      for(let i = 0; i < this.len; i++) {
        this.$controllers.append(
          $('<li>').addClass('Slider__controller')
        )
      }

      this.$controller = $('.Slider__controller', this.$controllers)

      // let now = (this.now >= 0 ? this.now : 0);
      this.$controller.eq(this.now).addClass('Slider__controller--now')

      this.params.$slider.append(this.$controllers)
    }

    switch(this.params.type) {
      case 'crop':
        this.$box.css({
          zIndex: 0,
          position: 'relative',
        })

        this.$slides.css({
          width: '100%',
          height: '100%',
        })

        switch(this.params.crop_init) {
          case 'left':
            this.params.crop_param = 'width'
            this.params.crop_end = 'right'
          break;
          case 'right':
            this.params.crop_param = 'width'
            this.params.crop_end = 'left'
          break;
          case 'top':
            this.params.crop_param = 'height'
            this.params.crop_end = 'bottom'
          break;
          case 'bottom':
            this.params.crop_param = 'height'
            this.params.crop_end = 'top'
          break;
        }

        this.$slide
          .css({
            zIndex: 0,
            display: 'none',
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: 'width ' + this.params.duration + 'ms ' + window.easing[this.params.easing],
          })
          .css(this.params.crop_end, 'auto')
          .css(this.params.crop_param, 0)
          .each(function(i) {
            $(this).addClass('Slider__slide--' + (i+1))
          })

        if(!this.params.init_hide) {
          this.$slide
            .eq(this.now)
              .css({
                display: 'block',
                width: '100%',
              })
        }
      break;

      case 'fade':
        this.$box.css({
          zIndex: 0,
          position: 'relative',
        })

        this.$slides.css({
          width: '100%',
          height: '100%',
        })

        this.$slide
          .css({
            zIndex: 0,
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            rigth: 0,
            bottom: 0,
            width: '100%',
            transition: 'opacity ' + this.params.duration + 'ms ' + window.easing[this.params.easing],
          })
          .each(function(i) {
            $(this).addClass('Slider__slide--' + (i+1))
          })

        if(!this.params.init_hide) {
          this.$slide
            .eq(this.now)
              .css({
                display: 'block',
              })
        }
      break;

      case 'slide':
      default:
        this.$slide.eq(0).css('display', 'inline-block')

        requestAFrame(() => {
          this.params.type = 'slide'

          this.$box.css({
            overflow: 'hidden',
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            paddingBottom: 100 * this.$slide.eq(0).outerHeight() / this.$slide.eq(0).width() + '%',
          })

          this.$slides.css({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }).velocity({
            translateX: (- this.now * 100) + '%'
          }, {
            duration: 0
          })

          this.$slide
            .css({
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'block',
              width: '100%',
            })
            .each(function(i) {
              $(this).addClass('Slider__slide--' + (i+1))
            })

          for(let i = 0; i < this.params.visible_len; i++) {
            this.$slides
              .prepend(this.$slide.eq(-(i+1)).clone(true))
              .append(this.$slide.eq(i).clone(true))
          }

          $('> *', this.$slides)
          .each(function(i) {
            $(this).css({
              left: ((i-((self.params.visible_len + 1) / 2)) * 100) + '%'
            })
          })
        })
      break;
    }
  }

  checkSlider() {
    if(!this.params.$slider[0]) {
      console.error('$slider element is not exist.')
      return false
    }

    this.$box = $('.Slider__box', this.params.$slider)
    if(!this.$box[0]) {
      console.error('.Slider__box element is not exist in $slider.')
      return false
    }

    this.$slides = $('.Slider__slides', this.params.$slider)
    if(!this.$slides[0]) {
      console.error('.Slider__slides element is not exist in $slider.')
      return false
    }

    this.$slide = $('.Slider__slide', this.params.$slider)
    if(!this.$slide[0]) {
      console.error('.Slider__slide element is not exist in $slider.')
      return false
    }

    this.$slideCont = $('.Slider__slide__cont', this.params.$slider)
    if(this.params.type === 'crop' && !this.$slideCont[0]) {
      console.error('.Slider__slide__cont element is not exist in $slider.')
      return false
    }

    return true
  }

  setRequestAFrame() {
    // requestAFrame
    if(!window.requestAFrame || window.cancelAFrame) {
      window.requestAFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      window.cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          function (id) {
            window.clearTimeout(id);
          };
      })();
    }
  }

  setCSSEasing() {
    // easings to CSS
    if(!window.easing) {
      window.easing = {
        linear: 'linear',
        easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
        easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
        easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
        easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
        easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
        easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
        easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
        easeOutBack: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
        easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
        easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
        easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
        easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
        easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
      }
    }
  }

  setMixins() {
    this.setRequestAFrame()
    this.setCSSEasing()
  }

  setAutoplayDelay(delay_time) {
    if(delay_time) {
      this.params.autoplay_delay = delay_time

    } else if(this.params.autoplay_delay === false) {
      this.params.autoplay_delay = 0

    }
  }

  setParams(optional_params) {
    // パラメータのデフォルト値
    let default_params = {
      // 要素系
      $slider: $('.Slider'),

      // アニメーション系
      type: 'slide',
      duration: 240,
      easing: 'easeInOutQuad',
      crop_init: 'left',

      // 操作系
      swipe: true,
      click_next: true,
      direct: false,
      controller: false,

      // 表示系
      init: 0,
      init_hide: false,
      visible_len: 1,

      // 自動再生系
      autoplay: true,
      autoplay_delay: false,
      autoplay_interval: 5200,

      // コールバック
      before_change: function() {},
      after_change: function() {},
    }

    this.params = $.extend({}, default_params, optional_params)
  }

  setSlideLength() {
    this.len = this.$slide.length
  }

  setNow() {
    this.now = this.$slide.index(this.$slide.filter('.Slider__slide--now'))

    // nowの値がHTML要素で指定されていない場合
    if(!(this.now >= 0)) {
      // initがrandomに指定されていた場合、nowにランダム値を割り当て
      if(this.params.init === 'random') {
        this.now = Math.floor(Math.random() * this.len)

      // initが配列で指定されていた場合、その配列内でランダム値を割り当て
      } else if(Array.isArray(this.params.init)) {
        this.now = this.params.init[Math.floor(Math.random() * this.params.init.length)]

        if(!(this.now >= 0)) this.now = 0

      // initが-1の場合、nowは-1
      } else if(this.params.init === -1) {
        this.now = -1

      // initが正の数値の場合、nowに代入
      } else if(this.params.init >= 0) {
        this.now = this.params.init

      // initがそれ以外の場合、nowは0
      } else {
        this.now = 0
      }
    }

    // init_hideが設定されていない場合、即座に表示
    if(!this.params.init_hide) {
      this.$slide.eq(this.now).addClass('Slider__slide--now Slider__slide--show')
    }
  }

  constructor(optional_params) {
    // パラメータを設定
    this.setParams(optional_params)

    // スライダー構造が正しいかどうか確認
    if(!this.checkSlider()) return;

    // mixinのセッティング
    this.setMixins()

    // // 表示領域内スライド数が偶数の時
    // if(this.params.visible_len % 2 === 0) {
    //   this.params.visible_len--
    // }

    // autoplay_delayの初期設定
    this.setAutoplayDelay()

    // スライド数の設定
    this.setSlideLength()

    // nowの初期化
    this.setNow()

    // スライドが一つの場合、スライダー停止
    if(this.len <= 1) {
      // this.$controllers.remove()
      // this.$prev.remove()
      // this.$next.remove()

      return
    }

    this.initialize()

    this.eventHandler()

    // autoplay設定がされていれば、再生
    if(this.params.autoplay) this.autoPlay()
  }
}

(function($) {
  $.mSlider = mSlider
})($)
