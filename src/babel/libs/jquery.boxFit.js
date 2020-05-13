(function($) {
  $.fn.boxFit = function(options) {
    var default_options = {
          left : 0.5,
          top : 0.5,
          pc : true,
          sp : true,
          tab : true
        },
        params = $.extend({}, default_options, options),
        $box = $(this),
        play_flag = false

    //トリミング基準
    if(params.left > 1) {
        params.left = 1
      } else if(params.left < 0) {
        params.left = 0
      }

    if(params.top > 1) {
      params.top = 1
    } else if(params.top < 0) {
      params.top = 0
    }

    //デバイス制御
    if(params.pc === ''){
      params.pc === true
    }

    if(params.tab === ''){
      params.tab === true
    }

    if(params.sp === ''){
      params.sp === true
    }

    function fit() {
      if($box.attr('target') && $box.css('background-image')){
        var targetUrl = $box.attr('src')

      } else if($box.attr('target')) {
        var targetUrl = $box.attr('src')

      } else if($box.css('background-image')) {
        var image = $box.css('background-image'),
            targetUrl = image.slice(5, image.length - 2)
      }

      var targetImage = new Image()
          targetImage.src = targetUrl

      var rate = util.winW / util.winH,
          imageW = targetImage.width,
          imageH = targetImage.height,
          defaultRate = imageW / imageH,
          itemH = util.winW * imageH / imageW,
          itemW = util.winH * imageW / imageH,
          trimmingW = itemW - util.winW,
          trimmingH = itemH - util.winH

      if(rate < defaultRate){
        $box.css({
          width : itemW,
          height : util.winH,
          left : -trimmingW * options.left,
          top : ''
        })

      } else {
        $box.css({
          width : util.winW,
          height : itemH,
          left : '',
          top : -trimmingH * options.top
        })
      }
    }

    function reset() {
      $(window).off('resize.boxFit')
      $box.css({
        width : '',
        height : '',
        left : '',
        top : ''
      })
    }

    function resize() {
      if(play_flag) {
        fit()
      } else {
        reset()
      }
    }

    $(window).imagesLoaded(() => {
      if(util.winW < util.winH && util.winW > 736) {
        if(params.tab){
          play_flag = true
        } else {
          play_flag = false
        }
      } else if(util.winW < util.winH) {
        if(params.sp){
          play_flag = true
        } else {
          play_flag = false
        }
      } else {
        if(params.pc){
          play_flag = true
        } else {
          play_flag = false
        }
      }

      setTimeout(() => {
        resize()
      },500)
    })

    $(window).on('resize', () => {
      if(util.winW < util.winH && util.winW > 736) {
        if(params.tab){
          play_flag = true
        } else {
          play_flag = false
        }
      } else if(util.winW < util.winH) {
        if(params.sp){
          play_flag = true
        } else {
          play_flag = false
        }
      } else {
        if(params.pc){
          play_flag = true
        } else {
          play_flag = false
        }
      }
    })

    $(window).on('resize.boxFit', () => {
      resize()
    })

    setInterval(() => {
      resize()
    },1000 / 8)

  }
})(jQuery)
