/*!
 * jQuery mScrollManager v1.0
 * Copyright: 2018 factory
 * Contributing Author: Hiroki Homma
 * Website: https://factory.kkbnj.com
 * Github: https://github.com/kkbnj
 * Require for jQuery v1.7 or above
 */
class mScrollManager {
  action() {
    let params = {
        scroll_top: $(window).scrollTop(),
        window_width: $(window).outerWidth(),
        window_height: $(window).outerHeight(),
      }

    this.params.action.map((scroll, i) => {
      params.index = i

      if(scroll.condition(params)) {
        scroll.action(params)
      }
    })
  }

  observer() {
    switch(this.mode) {
      case 'timeout':
        this.observer_loop = () => {
          setTimeout(() => {
            if(this.pause_flag) return

            if(this.scroll_flag) {
              this.scroll_flag = false
              this.action()
            }

            this.observer_loop()
          }, 1000 / this.fps)
        }
        break;

      default:
        this.observer_loop = () => {
          requestAFrame(() => {
            if(this.pause_flag) return

            if(this.scroll_flag) {
              this.scroll_flag = false
              this.action()
            }

            this.observer_loop()
          })
        }
    }

    this.play()
  }

  play() {
    this.pause_flag = false
    this.observer_loop()
  }

  pause() {
    this.pause_flag = true
  }

  addAction(action) {
    if(Array.isArray(action)) {
      Array.prototype.push.apply(this.params.action, action)
    } else if(typeof action === 'object') {
      this.params.action.push(action)
    }
  }

  removeAction(i) {
    this.params.action.splice(i, 1)
  }

  eventHandler() {
    $(window).on('scroll.ScrollManager', () => {
      this.scroll_flag = true
    })
  }

  setParams(optional_params) {
    // パラメータのデフォルト値
    let default_params = {
      action: [],
    }

    this.params = $.extend({}, default_params, optional_params)
  }

  constructor(optional_params) {
    this.setParams(optional_params)

    this.fps = 8
    this.mode = 'timeout'
    this.scroll_flag = false

    this.eventHandler()
    this.observer()
  }
}

(function($) {
  $.mScrollManager = mScrollManager
})($)
