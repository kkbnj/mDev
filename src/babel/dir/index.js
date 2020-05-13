require('scroll-restoration-polyfill')

window.jQuery = require('jquery')
window.$ = window.jQuery

require('jquery.easing')
require('velocity-animate')
require('imagesloaded')

require('../libs/requestAFrame.js')
require('../libs/jquery.mScroll.js')
// require('../libs/jquery.mShare.js')
require('../libs/jquery.inview.js')
// require('../libs/jquery.mLazy.js')
// require('../libs/jquery.mScrollManager.js')
// require('../libs/jquery.mSlider.js')
// require('../libs/jquery.mModal.js')
// require('../libs/jquery.cookie.js')
// require('../libs/jquery.mFadeIn.js')
// require('../libs/jquery.boxFit.js')


// import {TweenLite, Power2} from "gsap/TweenLite"
import Util from '../modules/common/Util'
// import ClassTemplate from '../modules/common/ClassTemplate'

$(() => {
  window.util = new Util
  if(util.mode === 'tablet') {
    $('meta[name="viewport"]').attr('content', 'width=1280')
  }

  $('.mScroll').mScroll({
    duration: 640,
    easing: 'easeInOutExpo',
  })

  // $('.mShare').mShare()

  // window.inview = new $.inview()
})
