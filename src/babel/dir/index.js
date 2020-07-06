require('scroll-restoration-polyfill')
require('babel-polyfill')

// require('velocity-animate')
require('imagesloaded')

require('../libs/requestAFrame.js')
// require('../libs/jquery.mScroll.js')
// require('../libs/jquery.mShare.js')
// require('../libs/jquery.inview.js')
// require('../libs/jquery.mLazy.js')
// require('../libs/jquery.mScrollManager.js')
// require('../libs/jquery.mSlider.js')
// require('../libs/jquery.mModal.js')
// require('../libs/jquery.cookie.js')
// require('../libs/jquery.mFadeIn.js')


// import {TweenLite, Power2} from "gsap/TweenLite"
import Util from '../modules/common/Util'
import BaycrewsAPI from '../modules/common/BaycrewsAPI'
// import ClassTemplate from '../modules/common/ClassTemplate'

$(() => {
  window.util = new Util
  if(util.mode === 'tablet') {
    $('meta[name="viewport"]').attr('content', 'width=1280')
  }

  if(
    location.href.search('localhost') < 0
    && location.href.search('pxxx.jp') < 0
    && location.href.search('kkbnj.com') < 0
    && location.href.search('maam.me') < 0
  ) {
    new BaycrewsAPI
  }

  // $('.mScroll').mScroll({
  //   duration: 640,
  //   easing: 'easeOutExpo',
  //   jump: () => {
  //     return util.winH / 2
  //   }
  // })

  // new $.inview()

  // new $.mLazy($('.mLazy'))

  // $('.mShare').mShare()
})
