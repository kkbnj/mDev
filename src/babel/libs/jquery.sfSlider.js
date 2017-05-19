/**
jquery.sfSlider.js

Copyright (c) 2016 SFcoding daisuke norimatsu

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/

/*html------------------------------------- 
<div class="slide">
	<div class="mask">
		<div class="slider">
			<div class="item"><a href="#1">1</a></div>
			<div class="item"><a href="#2">2</a></div>
			<div class="item"><a href="#3">3</a></div>
			<div class="item"><a href="#4">4</a></div>
			<div class="item"><a href="#5">5</a></div>
		</div>
	</div>
	<div class="next">→</div>
	<div class="prev">←</div>
	<div class="pager"></div>
</div>
-------------------------------------*/

/*js------------------------------------- 
$(".slide").sfSlider({
	evtNameSpace: 'イベントネーム' || 'sfSlider',
	maskClass: ’マスク要素のクラス’ || 'mask',
	sliderClass: ’スライド要素のクラス’ || 'slider',
	itemClass: 'スライド内アイテムのクラス' || 'item',
	nextClass: '次へボタンのクラス' || 'next',
	prevClass: '前へボタンのクラス' || 'prev',
	pagerClass: 'ページャー格納要素のクラス' || 'pager',
	pagerHasItem: 'ページャーの要素がすでにあるか' || false,
	pagerItemStr: 'ページャー要素のHTML' || '<div class="pagerItem">&nbsp;</div>',
	pagerStayClass: 'ページャーの現在地のクラス' || 'stay',
	mode: '動作モード slide固定' || 'slide',
	pieceOfItemNum: '1スライドのアイテム表示数' || 1,
	slidePieceNum: '移動アイテム数' || _pieceOfItemNum,
	direction: '移動方法 horizon固定' || 'horizon',
	loopType: 'ループタイプ loop固定' || 'loop',
	moveSpeed: '移動速度' || 600,
	cssMoveSpeed: 'アニメーションCSS適用時の移動速度' || 600,
	flickMoveSpeed: 'フリック時の移動速度' || 300,
	easing: 'イージング' || 'linear',
	autoPlay: '自動で入れ替わるか' || false,
	autoPlayHoverWait: 'autoPlay時に要素のホバーで止めるか' || false,
	waitTime: 'autoPlay時の待ち時間' || 5000,
	mouseUseFlick: 'マウスでもフリックさせるか' || 'false',
	moveStartFunc: '移動開始時の関数' || null,
	moveEndFunc: '移動終了時の関数' || null,
	currentItemCenter: 'カレントアイテムをセンターにするか' || false
});
-------------------------------------*/
	
/*例------------------------------------- 
$(function () {
	$(".slide").sfSlider({
		pieceOfItemNum: 5,
		slidePieceNum: 1,
		mouseFlick: true,
		currentItemCenter: true,
		startFunc: function(argumentObj) {
			console.log("===startFunc==================")
			console.log('panelNum       : ' + argumentObj.panelNum);
			console.log('slideNum       : ' + argumentObj.slideNum);
			console.log('itemLength     : ' + argumentObj.itemLength);
			console.log('slidePieceNum  : ' + argumentObj.slidePieceNum);
			console.log('pieceOfItemNum : ' + argumentObj.pieceOfItemNum);
			console.log('showItem : ');
			console.log(argumentObj.showItem);
			console.log('hideItem : ');
		},
		moveStartFunc: function(argumentObj) {
			console.log("===startFunc==================")
			console.log('panelNum       : ' + argumentObj.panelNum);
			console.log('slideNum       : ' + argumentObj.slideNum);
			console.log('itemLength     : ' + argumentObj.itemLength);
			console.log('slidePieceNum  : ' + argumentObj.slidePieceNum);
			console.log('pieceOfItemNum : ' + argumentObj.pieceOfItemNum);
			console.log('showItem : ');
			console.log(argumentObj.showItem);
			console.log('hideItem : ');
		},
		moveEndFunc: function(argumentObj) {
			console.log("===endFunc==================")
			console.log('panelNum       : ' + argumentObj.panelNum);
			console.log('slideNum       : ' + argumentObj.slideNum);
			console.log('itemLength     : ' + argumentObj.itemLength);
			console.log('slidePieceNum  : ' + argumentObj.slidePieceNum);
			console.log('showItem : ');
			console.log(argumentObj.showItem);
			console.log('hideItem : ');
			console.log(argumentObj.hideItem);
		}
	});
	var sliderObj = $.data($(".slide").get(0),'sfSlider').sfSlider;
	
	
	$('.changeBtn1').click(function(){
		sliderObj.stateChange({
			pieceOfItemNum : 1,
			slidePieceNum: 1
		});
	});
	$('.changeBtn2').click(function(){
		sliderObj.stateChange({
			pieceOfItemNum : 2,
			slidePieceNum: 2
		});
	});
	$('.changeBtn3').click(function(){
		sliderObj.stateChange ({
			pieceOfItemNum : 3,
			slidePieceNum: 3
		});
	});
	
	$('.moveBtn1').click(function(){
		sliderObj.instantPosNum(0);
	});
	$('.moveBtn2').click(function(){
		sliderObj.instantPosNum(1);
	});
	$('.moveBtn3').click(function(){
		sliderObj.instantPosNum(2);
	});
	$('.moveBtn4').click(function(){
		sliderObj.instantPosNum(3);
	});
	$('.moveBtn5').click(function(){
		sliderObj.instantPosNum(4);
	});
	
	
	$('.aniBtn1').click(function(){
		sliderObj.slideMoveItemNum(0);
	});
	$('.aniBtn2').click(function(){
		sliderObj.slideMoveItemNum(1);
	});
	$('.aniBtn3').click(function(){
		sliderObj.slideMoveItemNum(2);
	});
	$('.aniBtn4').click(function(){
		sliderObj.slideMoveItemNum(3);
	});
	$('.aniBtn5').click(function(){
		sliderObj.slideMoveItemNum(4);
	});
	
	$('.originalHtml').click(function(){
		sliderObj.backOriginal();
	});
	
});

-------------------------------------*/
(function($) {
	'use strict';
	$.fn.extend({
		sfSlider: function(option) {
			var $win = $(window);

			var $checkElm = $('<div>');
			$.support.transform = typeof $checkElm.css('transform') === 'string';
			$.support.transition = typeof $checkElm.css('transitionProperty') === 'string';

			var __cssAnimeSupport = ($.support.transform && $.support.transition) ? true : false;
			//test
			//var __cssAnimeSupport = false;
			var __touchDevice = (typeof window.ontouchstart) !== 'undefined';


			this.each(function() {
				var _that = {};

				var _opt = option || {},
					_evtNameSpace = _opt.evtNameSpace || 'sfSlider',
					_maskClass = _opt.maskClass || 'mask',
					_sliderClass = _opt.sliderClass || 'slider',
					_itemClass = _opt.itemClass || 'item',
					_nextClass = _opt.nextClass || 'next',
					_prevClass = _opt.prevClass || 'prev',
					_pagerClass = _opt.pagerClass || 'pager',
					_pagerHasItem = (_opt.pagerHasItem === undefined) ? false : _opt.pagerHasItem,
					_pagerItemStr = _opt.pagerItemStr || '<div class="pagerItem">&nbsp;</div>',
					_pagerStayClass = _opt.pagerStayClass || 'stay',
					_mode = _opt.mode || 'slide',
					_pieceOfItemNum = _opt.pieceOfItemNum || 1,
					_slidePieceNum = _opt.slidePieceNum || _pieceOfItemNum,
					_direction = _opt.direction || 'horizon',
					_loopType = _opt.loopType || 'loop',
					_moveSpeed = _opt.moveSpeed || 600,
					_cssMoveSpeed = _opt.cssMoveSpeed || 600,
					_flickMoveSpeed = _opt.flickMoveSpeed || 300,
					_easing = _opt.easing || 'linear',
					_autoPlay = (_opt.autoPlay === undefined) ? false : _opt.autoPlay,
					_autoPlayHoverWait = (_opt.autoPlayHoverWait === undefined) ? false : _opt.autoPlayHoverWait,
					_waitTime = _opt.waitTime || 5000,
					_mouseUseFlick = (_opt.mouseUseFlick === undefined) ? false : _opt.mouseUseFlick,
					_startFunc = _opt.startFunc || null,
					_moveStartFunc = _opt.moveStartFunc || null,
					_moveEndFunc = _opt.moveEndFunc || null,
					_currentItemCenter = (_opt.currentItemCenter === undefined) ? false : _opt.currentItemCenter;

				var _$wrap = $(this),
					_$mask = _$wrap.find('.' + _maskClass),
					_$slider = _$wrap.find('.' + _sliderClass),
					_$items = _$wrap.find('.' + _itemClass),
					_$next = _$wrap.find('.' + _nextClass),
					_$prev = _$wrap.find('.' + _prevClass),
					_$pager = _$wrap.find('.' + _pagerClass),
					_$originalHtml = _$wrap.clone();

				var _hasPager = (_$pager.length) ? true : false;

				var _waitTimer = null,
					_itemW = null,
					_itemLength = _$items.length,
					_panelNum = 0,
					_slideNum = 0,
					_isMove = false,
					_slideX = 0,
					_panelLength = Math.ceil(_itemLength / _slidePieceNum),
					_mouseFlick = (_mouseUseFlick && !__touchDevice) ? true : false,
					currentItemCenterOffset = 0;

				var _X1,
					_Y1,
					_X2,
					_Y2,
					_touchX,
					_touchY,
					_nowX,
					_firstDir,
					_flickXMove,
					_flickYMove,
					_isTouch = false,
					_isMoveFlick = false;

				var _init = function() {
					if (_mode === 'slide' && _loopType === 'loop') {
						_$items.each(function(index) {
							var $this = $(this);
							$this.addClass(_itemClass + index);
							_$slider.append($this.clone());
						});
						_$items.each(function() {
							_$slider.append($(this).clone());
						});
						_$items = _$wrap.find('.' + _itemClass);
					}

					$win.on('resize.' + _evtNameSpace, function() {
						_winResize();
					}).trigger('resize.' + _evtNameSpace);

					if (_hasPager) {
						_pagerSet();
					}

					_$next.on('click.' + _evtNameSpace, function() {
						if (_isMove) {
							return;
						}
						_nextMove();
					});
					_$prev.on('click.' + _evtNameSpace, function() {
						if (_isMove) {
							return;
						}
						_prevMove();
					});

					var evtStartStr = 'touchstart.' + _evtNameSpace;
					var evtMoveStr = 'touchmove.' + _evtNameSpace;
					var evtEndStr = 'touchend.' + _evtNameSpace;
					var evtCancelStr = 'touchcancel.' + _evtNameSpace;

					//alert(_mouseFlick);
					if (_mouseFlick) {
						evtStartStr = 'mousedown.' + _evtNameSpace;
						evtMoveStr = 'mousemove.' + _evtNameSpace;
						evtEndStr = 'mouseup.' + _evtNameSpace;
						evtCancelStr = 'mouseout.' + _evtNameSpace;
						
						_$slider.find("*").css({
							"user-select": "none",
							"-webkit-user-select": "none",
							"-moz-user-select": "none",
							"-khtml-user-select": "none",
							"-webkit-user-drag": "none",
							"-khtml-user-drag": "none"
						});
						_$slider.find("*").on("mousedown." + _evtNameSpace, function(e) {
							e.preventDefault();
						});
						_$slider.find("*").on("mouseup." + _evtNameSpace, function(e) {
							e.preventDefault();
						});
					}

					_$slider.on(evtStartStr, function(e) {
						if (_isMove) {
							_isTouch = false;
							return;
						}
						//console.log('start');
						_isTouch = true;
						_$slider.find("a").off('click.' + _evtNameSpace);
						_clearTimer();
						_X1 = (__touchDevice) ? e.originalEvent.touches[0].clientX : e.pageX;
						_Y1 = (__touchDevice) ? e.originalEvent.touches[0].clientY : e.pageY;
						/*console.log('touch');
						console.log('_X1 : ' + _X1 + ' , _Y1 : ' + _Y1);*/
						_touchStart(e);
					});

					_$slider.on(evtMoveStr, function(e) {
						if (!_isTouch) {
							return;
						}
						//console.log('move');
						_X2 = (__touchDevice) ? e.originalEvent.touches[0].clientX : e.pageX;
						_Y2 = (__touchDevice) ? e.originalEvent.touches[0].clientY : e.pageY;
						if (Math.abs(_Y1 - _Y2) < Math.abs(_X1 - _X2)) {
							e.preventDefault();
						} else {
							_setTimer();
						}
						_touchMove(e);
					});

					_$slider.on(evtEndStr, function(e) {
						if (!_isTouch) {
							return;
						}
						//console.log('end');
						_touchEnd(e);
						_isTouch = false;
					});

					_$slider.on(evtCancelStr, function(e) {
						if (!_isTouch) {
							return;
						}
						_touchEnd(e);
						_isTouch = false;
					});

					_pagerCheck();
					_setTimer();

					if (_autoPlayHoverWait) {
						_$slider.on('mouseenter.' + _evtNameSpace, function() {
							_clearTimer();
						});
						_$slider.on('mouseleave.' + _evtNameSpace, function() {
							_setTimer();
						});
					}
				};

				var _nextMove = function() {
					//console.log('next');
					_doStartFunc('next');
					var maxSlideNum = _itemLength - _slidePieceNum;
					if(_slideNum > maxSlideNum) {
						_slideNum = maxSlideNum;
					}
					_panelNum += 1;
					if (_hasPager) {
						
						if (_slideNum !== maxSlideNum) {
							_slideNum += _slidePieceNum;
							if (_slideNum > maxSlideNum) {
								_slideNum = _itemLength - _slidePieceNum;
							}
						} else {
							_slideNum += _slidePieceNum;
						}
					} else {
						_slideNum += _slidePieceNum;
					}
					_slideMove();
					_doMoveStartFunc();
				};

				var _prevMove = function() {
					_doStartFunc('prev');
					_panelNum -= 1;
					if (_hasPager) {
						if (_slideNum !== 0) {
							var tmpSlideNum = _slideNum - _slidePieceNum;
							if (tmpSlideNum < 0) {
								_slideNum = 0;
							} else {
								_slideNum -= _slidePieceNum;
							}
						} else {
							_slideNum -= _slidePieceNum;
						}
					} else {
						_slideNum -= _slidePieceNum;
					}
					_slideMove();
					_doMoveStartFunc();
				};

				var _touchStart = function(e) {
					//console.log('_touchStart');
					_firstDir = false;
					_$slider.stop();
					_touchX = (__touchDevice) ? event.changedTouches[0].pageX : e.pageX;
					_touchY = (__touchDevice) ? event.changedTouches[0].pageY : e.pageY;
					if (__cssAnimeSupport) {
						_nowX = _$slider.position().left + _itemLength * _itemW - _$wrap.offset().left;
					} else {
						_nowX = _$slider.offset().left + _itemLength * _itemW - (_$wrap.offset().left * 2);
					}
					//console.log('_$slider.position().left : ' + _$slider.position().left);
					//console.log('_$slider.offset().left : ' + _$slider.offset().left);
				};

				var _touchMove = function(e) {
					//console.log('_touchMove');
					var dX = (__touchDevice) ? event.changedTouches[0].pageX : e.pageX;
					var dY = (__touchDevice) ? event.changedTouches[0].pageY : e.pageY;
					_flickXMove = _touchX - dX;
					_flickYMove = _touchY - dY;
					
					/*console.log('==============================');
					console.log('dX : ' + dX);
					console.log('_touchX : ' + _touchX);
					console.log('_flickXMove : ' + _flickXMove);*/
						
					if (Math.abs(_flickXMove) >= Math.abs(_flickYMove)) {
						e.preventDefault();
						_$slider.find("a").on('click.' + _evtNameSpace, function(e) {
							e.preventDefault();
						});
						if (!_firstDir) {
							_firstDir = "x";
						}
					} else {
						if (!_firstDir) {
							_firstDir = "y";
						}
					}

					if (_firstDir === "y") {
						_isTouch = false;
						_flickXMove = 0;
					}
					if (_mode === "slide") {
						_slideX = _nowX - _flickXMove + _$mask.offset().left;
						//console.log(_$mask.offset().left);
						/*console.log('==============================');
						console.log('_nowX : ' + _nowX);
						console.log('_flickXMove : ' + _flickXMove);
						console.log('_$mask.offset().left : ' + _$mask.offset().left);
						console.log('_slideX : ' + _slideX);*/
						_instantPos(-_slideX + currentItemCenterOffset);
					}
				};

				var _touchEnd = function() {
					//console.log('_touchEnd');
					if (Math.abs(_flickYMove) >= 200) {
						_flickXMove = 0;
					}
					if (Math.abs(_flickXMove) >= 25) {
						_isMoveFlick = true;
						if (_flickXMove < 0) {
							if (_mode === "slide") {
								_prevMove();
							} else if (_mode === "fade") {
								_prevMove();
							}
						} else if (_flickXMove > 0) {
							if (_mode === "slide") {
								_nextMove();
							} else if (_mode === "fade") {
								_nextMove();
							}
						}
					} else {
						_isMoveFlick = true;
						if (_mode === "slide") {
							_slideMove();
						}
					}

					_flickXMove = 0;
				};

				var _slideMove = function() {
					_isMove = true;
					_clearTimer();
					_pagerCheck();
					
					
					_slideX = (_slideNum * _itemW) - currentItemCenterOffset;
					/*console.log('_slideNum : ' + _slideNum);
					console.log('_slideX : ' + _slideX);*/
					var easeStr,
						moveSpeed;
					
					if (__cssAnimeSupport) {
						
						easeStr = _getEasingCss(_easing);
						moveSpeed = _cssMoveSpeed;
						
						if(_isMoveFlick) {
							easeStr = 'ease';
							moveSpeed = _flickMoveSpeed;
						}
						
						_$slider.css({
							'-o-transition': '-o-transform ' + moveSpeed + 'ms ' + easeStr,
							'-o-transform': 'translate(' + -_slideX + 'px, 0)',
							'transition': 'transform ' + moveSpeed + 'ms ' + easeStr,
							'transform': 'translate3d(' + -_slideX + 'px, 0, 0)',
							'-webkit-transition': '-webkit-transform ' + moveSpeed + 'ms ' + easeStr,
							'-webkit-transform': 'translate3d(' + -_slideX + 'px, 0, 0)'
						});

						/*_$slider.on('oTransitionEnd.' + _evtNameSpace + ' mozTransitionEnd.' + _evtNameSpace + ' webkitTransitionEnd.' + _evtNameSpace + ' transitionend.' + _evtNameSpace, function() {
							_checkLoop();
							_isMove = false;
							_setTimer();
							_$slider.off('oTransitionEnd.' + _evtNameSpace + ' mozTransitionEnd.' + _evtNameSpace + ' webkitTransitionEnd.' + _evtNameSpace + ' transitionend.' + _evtNameSpace);
						});*/

						setTimeout(function() {
							_checkLoop();
							_isMoveFlick = false;
							_isMove = false;
							_setTimer();
							_doMoveEndFunc();
						}, moveSpeed);

					} else {
						
						easeStr = _easing;
						moveSpeed = _moveSpeed;
						
						
						if(_isMoveFlick) {
							easeStr = 'linear';
							moveSpeed = _flickMoveSpeed;
						}
						
						_$slider.animate({
							'marginLeft': -_slideX
						}, moveSpeed, easeStr, function() {
							_checkLoop();
							_isMoveFlick = false;
							_isMove = false;
							_setTimer();
						});

					}
				};
				
				var _instantPosNum = function(num) {
					_slideNum = num;
					var movePt = _itemW * num;
					_instantPos(movePt);
					//_panelNum = Math.ceil(Math.floor(_itemLength / _pieceOfItemNum) / _slideNum);
					if((_slideNum >= _itemLength - _slidePieceNum) && _slidePieceNum !== 1) {
						_panelNum = Math.floor(_itemLength / _slidePieceNum);
						/*console.log('==============================');
						console.log('true:_panelNum : ' + _panelNum);*/
					}else {
						_panelNum = Math.floor(_slideNum / _slidePieceNum);
						/*console.log('==============================');
						console.log('false:_panelNum : ' + _panelNum);*/
					}
					_pagerCheck();
				};

				var _instantPos = function(movePt) {
					movePt = movePt - currentItemCenterOffset;
					if (__cssAnimeSupport) {
						_$slider.css({
							'-webkit-transition': '-webkit-transform 0ms ease',
							'-webkit-transform': 'translate3d(' + -movePt + 'px, 0, 0)',
							'-o-transition': '-o-transform 0ms ease',
							'-o-transform': 'translate(' + -movePt + 'px, 0)',
							'transition': 'transform 0ms ease',
							'transform': 'translate3d(' + -movePt + 'px, 0, 0)'
						});
					} else {
						_$slider.stop().css({
							'marginLeft': -movePt
						});
					}
				};
				

				var _numSlideMove = function(num) {
					_slideNum = num;
					_slideMove();
				};
				
				var _slideMoveItemNum = function(num) {
					_numSlideMove(num);
					if((_slideNum >= _itemLength - _slidePieceNum) && _slidePieceNum !== 1) {
						_panelNum = Math.floor(_itemLength / _slidePieceNum);
					}else {
						_panelNum = Math.floor(_slideNum / _slidePieceNum);
					}
					_pagerCheck();
				};

				var _checkLoop = function() {
					//console.log('_checkLoop');
					var tmpSlideDist;

					/*console.log("_slideNum: " + _slideNum);
					console.log("_itemLength: " + _itemLength);*/
					if (_slideNum + _slidePieceNum > _itemLength) {
						//console.log('Loop');
						_slideNum -= _itemLength;
						tmpSlideDist = _slideNum * _itemW;
						_instantPos(tmpSlideDist);
					} else if (_slideNum < 0) {
						//console.log('Loop');
						_slideNum += _itemLength;
						tmpSlideDist = _slideNum * _itemW;
						_instantPos(tmpSlideDist);
					}
				};

				var _pagerSet = function() {
					if(!_pagerHasItem) {
						_$pager.html('');
						for (var i = 0; i < _panelLength; i++) {
							var $tmpPagerItem = $(_pagerItemStr);
							_$pager.append($tmpPagerItem);
						}
					}
					_$pager.find('> *').each(function(index) {
						var $this = $(this);
						$this.data('panelNum', index);
						$this.on('click.' + _evtNameSpace, function() {
							_pagerClick($this);
						});
					});
				};

				var _pagerClick = function($target) {
					if ($target.hasClass(_pagerStayClass) || _isMove) {
						return;
					}
					
					_doStartFunc();
					_panelNum = $target.data('panelNum');

					var num;
					if (_panelNum === _panelLength - 1) {
						num = _itemLength - _slidePieceNum;
					} else {
						num = _panelNum * _slidePieceNum;
					}

					_numSlideMove(num);
					_doMoveStartFunc();
				};

				var _pagerCheck = function() {
					if (!_hasPager) {
						return;
					}
					
					var $pagerItem = _$pager.find('> *');
					$pagerItem.removeClass(_pagerStayClass);
					if (_panelNum >= _panelLength) {
						_panelNum = 0;
					} else if (_panelNum < 0) {
						_panelNum = _panelLength - 1;
					}
					$pagerItem.eq(_panelNum).addClass(_pagerStayClass);
				};

				var _winResize = function() {
					if (_mode === 'slide') {
						_itemW = _$mask.width() / _pieceOfItemNum;
						_$items.width(_itemW);
						if(_currentItemCenter) {
							currentItemCenterOffset = _$mask.width() / 2 - _itemW / 2;
						}
						if (_loopType === 'loop') {
							_$slider.css('left', -(_itemLength * _itemW));
						}
					}
					_slideX = _slideNum * _itemW;
					_instantPos(_slideX);
				};

				var _setTimer = function() {
					if (_waitTimer || !_autoPlay) {
						return;
					}
					_waitTimer = setInterval(function() {
						_nextMove();
					}, _waitTime);
				};

				var _clearTimer = function() {
					if (!_waitTimer || !_autoPlay) {
						return;
					}
					clearInterval(_waitTimer);
					_waitTimer = null;
				};

				var _reset = function() {
					_clearTimer();
					_panelLength = Math.ceil(_itemLength / _slidePieceNum);
					_pagerSet();
					_winResize();
					_doStartFunc();
					_panelNum = 0;
					_numSlideMove(0);
					_doMoveStartFunc();
				};
				
				var _getStateObj = function(flagTxt) {
					var stateObj = {};
					stateObj.panelNum = _panelNum;
					stateObj.slideNum = _slideNum;
					stateObj.itemLength = _itemLength;
					stateObj.slidePieceNum = _slidePieceNum;
					stateObj.pieceOfItemNum = _pieceOfItemNum;
					var showNum = _slideNum + _itemLength - 1;
					stateObj.showItem = _$items.filter(':gt(' + showNum + '):lt(' + _pieceOfItemNum + ')');
					stateObj.hideItem = _$items.not(stateObj.showItem);
					if(flagTxt) {
						if(flagTxt === 'next') {
							//stateObj.nextShowItem = _$items.filter(':gt(' + showNum + _pieceOfItemNum + '):lt(' + _pieceOfItemNum + ')');
							//stateObj.nextHideItem = _$items.not(stateObj.nextShowItem);
						}else if(flagTxt === "prev") {
							//console.log("_pieceOfItemNum：" + _pieceOfItemNum);
							//console.log(showNum - _pieceOfItemNum);
							//stateObj.nextShowItem = _$items.filter(':gt(' + showNum - _pieceOfItemNum + '):lt(' + _pieceOfItemNum + ')');
							//stateObj.nextHideItem = _$items.not(stateObj.nextShowItem);
						}
					}
					return stateObj;
				};
				
				var _doStartFunc = function(nextOrPrev) {
					if(_startFunc) {
						_startFunc(_getStateObj(nextOrPrev));
					}
				};
				
				var _doMoveStartFunc = function(nextOrPrev) {
					if(_moveStartFunc) {
						_moveStartFunc(_getStateObj(nextOrPrev));
					}
				};
				
				var _doMoveEndFunc = function() {
					if(_moveEndFunc) {
						_moveEndFunc(_getStateObj());
					}
				};
				
				_that.getStateObj = function() {
					return _getStateObj();
				};
				
				_that.stateChange = function(changeObj) {
					var doFlag = false;
					if(changeObj.pieceOfItemNum && _pieceOfItemNum !== changeObj.pieceOfItemNum) {
						doFlag = true;
						_pieceOfItemNum = changeObj.pieceOfItemNum;
					}
					if(changeObj.slidePieceNum && _slidePieceNum !== changeObj.slidePieceNum) {
						doFlag = true;
						_slidePieceNum = changeObj.slidePieceNum;
					}
					if(doFlag) {
						_reset();
					}
				};
				
				_that.setPieceOfItemNum = function(newNum) {
					if (_pieceOfItemNum !== newNum) {
						_pieceOfItemNum = newNum;
						_reset();
					}
				};

				_that.setSlidePieceNum = function(newNum) {
					if (_slidePieceNum !== newNum) {
						_slidePieceNum = newNum;
						_reset();
					}
				};
				
				_that.instantPosNum = function(newNum) {
					_instantPosNum(newNum);
				};
				
				_that.slideMoveItemNum = function(newNum) {
					_slideMoveItemNum(newNum);
				};
				
				_that.backOriginal = function() {
					_$wrap.removeData();
					_$wrap.replaceWith(_$originalHtml);
				};

				$.data(_$wrap.get(0), _evtNameSpace, {
					'sfSlider': _that
				});

				_init();
			});
			
			
			/*===========================================================================
			↓イージングのcssを取得↓
			===========================================================================*/
			var _getEasingCss = function(easingStr) {
				var easingPairObj = {
					"linear"           : "linear",
					
					"swing"            : "ease-out",
					
					"easeInSine"       : "cubic-bezier(0.47, 0, 0.745, 0.715)",
					"easeOutSine"      : "cubic-bezier(0.39, 0.575, 0.565, 1)",
					"easeInOutSine"    : "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
					
					"easeInQuad"       : "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
					"easeOutQuad"      : "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					"easeInOutQuad"    : "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
					
					"easeInCubic"      : "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
					"easeOutCubic"     : "cubic-bezier(0.215, 0.61, 0.355, 1)",
					"easeInOutCubic"   : "cubic-bezier(0.645, 0.045, 0.355, 1)",
					
					"easeInQuart"      : "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
					"easeOutQuart"     : "cubic-bezier(0.165, 0.84, 0.44, 1)",
					"easeInOutQuart"   : "cubic-bezier(0.77, 0, 0.175, 1)",
					
					"easeInQuint"      : "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
					"easeOutQuint"     : "cubic-bezier(0.23, 1, 0.32, 1)",
					"easeInOutQuint"   : "cubic-bezier(0.86, 0, 0.07, 1)",
					
					"easeInExpo"       : "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
					"easeOutExpo"      : "cubic-bezier(0.19, 1, 0.22, 1)",
					"easeInOutExpo"    : "cubic-bezier(1, 0, 0, 1)",
					
					"easeInCirc"       : "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
					"easeOutCirc"      : "cubic-bezier(0.075, 0.82, 0.165, 1)",
					"easeInOutCirc"    : "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
					
					"easeInBack"       : "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
					"easeOutBack"      : "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					"easeInOutBack"    : "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
					
					"easeInElastic"    : "linear", //null
					"easeOutElastic"   : "linear", //null
					"easeInOutElastic" : "linear", //null
					
					"easeInBounce"     : "linear", //null
					"easeOutBounce"    : "linear", //null
					"easeInOutBounce"  : "linear" //null
				};
				return easingPairObj[easingStr];
			};


			return this;
		}
	});
})(jQuery);



