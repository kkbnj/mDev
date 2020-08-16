require('scroll-restoration-polyfill')
require('babel-polyfill')

window.jQuery = require('jquery')
window.$ = window.jQuery

require('jquery.easing')
// require('velocity-animate')
require('imagesloaded')

require('../libs/requestAFrame.js')
require('../libs/jquery.bez.js')
// require('../libs/jquery.mScroll.js')
// require('../libs/jquery.mShare.js')
// require('../libs/jquery.inview.js')
// require('../libs/jquery.mLazy.js')
// require('../libs/jquery.mScrollManager.js')
// require('../libs/jquery.mSlider.js')
// require('../libs/jquery.mParallax.js')
// require('../libs/jquery.mModal.js')
// require('../libs/jquery.cookie.js') // use LocalStorage
// require('../libs/jquery.mFadeIn.js')


// import {TweenLite, Power2} from "gsap/TweenLite"
import Util from '../modules/common/Util'
// import ClassTemplate from '../modules/common/ClassTemplate'

$(() => {
  window.util = new Util
  if(util.mode === 'tablet') {
    $('meta[name="viewport"]').attr('content', 'width=1280')
  }


  // new ClassTemplate


  // usage of libs
  // $('.mScroll').mScroll({
  //   duration: 640,
  //   easing: 'easeOutExpo',
  //   jump: () => {
  //     return util.winH
  //   },
  // })

  // $('.mShare').mShare()

  // window.inview = new $.inview()

  // new $.mLazy($('.mLazy'), {
  //   fps: 8,
  //   offset: () => {
  //     return util.winH * 2,
  //   },
  // })

  // new $.mSlider({
  //   // 要素系
  //   $slider: $('.Slider'),

  //   // アニメーション系
  //   type: 'slide',
  //   duration: 240,
  //   easing: 'easeInOutQuad',
  //   crop_init: 'left',

  //   // 操作系
  //   swipe: true,
  //   click_next: true,
  //   direct: false,
  //   controller: false,

  //   // 表示系
  //   init: 0,
  //   init_hide: false,
  //   visible_len: 1,

  //   // 自動再生系
  //   autoplay: true,
  //   autoplay_delay: false,
  //   autoplay_interval: 5200,

  //   // コールバック
  //   before_change: function() {},
  //   after_change: function() {},
  // })

  // $.mModal({
  //   type: 'fade',
  //   scroll_top: true,
  //   duration: 260,
  //   easing: 'swing',

  //   velocity_js: true,
  //   css_animation: true,

  //   before_open: function(e) {},
  //   after_open: function(e) {},
  //   before_close: function(e) {},
  //   after_close: function(e) {},

  //   open_classname: 'mModal-open',
  //   close_classname: 'mModal-close',
  //   toggle_classname: 'mModal-toggle',
  //   page_classname: 'mModal-page',
  //   modal_classname: 'mModal-modal',
  //   modal_cont_classname: 'mModal-modal_cont',
  //   opened_classname: 'mModal-opened'
  // })
})
