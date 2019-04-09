import Util from '../modules/Util'
// import Menu from '../modules/Menu'

$(() => {
  window.util = new Util

  $('.mScroll').mScroll({
    duration: 640,
    easing: 'easeInOutExpo',
  })

  $('.mShare').mShare()

  window.inview = new $.inview($('.inview'))
  window.inview.play()
})
