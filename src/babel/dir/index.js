// import {TweenLite, Power2} from "gsap/TweenLite"
import Util from '../modules/common/Util'
// import Menu from '../modules/common/Menu'

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

  // window.inview = new $.inview($('.inview'))
  // window.inview.play()
})
