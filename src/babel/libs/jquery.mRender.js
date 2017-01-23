/*!
 * jQuery mRender v1.0.3
 * Copyright 2016 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
(function($) {
  mRender = (function() {
    var fps = 60,
        params = {
          scr: 0,
          scrL: 0,
          winH: 0,
          winW: 0
        },
        interval,
        events = {},
        event_flags = {};

    // private
    var render = function() {
      for(var name in events) {
        if(event_flags[name]) {
          events[name]['func'](params);
        }

        event_flags[name] = false;
      }
    };

    var afterResizeFunc = function(params) {};

    var afterScrollFunc = function(params) {};


    // public
    var fps = function(val) {
      if(typeof val === 'number') {
        fps = val;
      }

      return this;
    };

    var addEvent = function(obj) {
      var new_obj = {};

      if(typeof obj.trigger === 'string') {
        obj.trigger = obj.trigger.split(' ');
      }

      if(typeof obj.option === 'string') {
        obj.option = obj.option.split(' ');
      }

      new_obj[obj['name']] = {
        target: $(obj.target),
        trigger: obj.trigger,
        func: obj.func,
        option: obj.option
      };

      $.extend(events, new_obj);

      for(var name in events) {
        event_flags[name] = true;
      }

      return this;
    };

    var removeEvent = function(name) {
      delete events[name];
      delete event_flags[name];

      return this;
    };

    var resizeFunc = function(func) {
      if(typeof func === 'function') {
        afterResizeFunc = func;
      }

      return this;
    };

    var scrollFunc = function(func) {
      if(typeof func === 'function') {
        afterScrollFunc = func;
      }

      return this;
    };

    var on = function(name) {
      if(typeof event_flags[name] !== 'undefined') {
        event_flags[name] = true;
      }

      return this;
    };

    var resize = function() {
      on('resize');

      return this;
    };

    var scroll = function() {
      on('scroll');

      return this;
    };

    var play = function() {
      addEvent({
        name: 'resize',
        target: $(window),
        trigger: 'resize',
        func: function() {
          params.winW = $(window).width();
          params.winH = $(window).height();

          afterResizeFunc(params);
        },
        option: 'scroll'
      });

      addEvent({
        name: 'scroll',
        target: $(window),
        trigger: 'scroll',
        func: function() {
          params.scr = $(window).scrollTop();
          params.scrL = $(window).scrollLeft();

          afterScrollFunc(params);
        }
      });

      event_flags = {};

      for(var name in events) {
        var i,
            trigger_len,
            option_len;

        if(typeof events[name]['trigger'] === 'string') {
          events[name]['trigger'] += '.mRender-' + name;

        } else {
          trigger_len = events[name]['trigger'].length

          for(i = 0; i < trigger_len; i++) {
           events[name]['trigger'][i] += '.mRender';
          }

          events[name]['trigger'] = events[name]['trigger'].join(" ");
        }

        (function(name) {
          events[name]['target'].on(events[name]['trigger'], function() {
            event_flags[name] = true;

            if(events[name]['option']) {
              option_len = events[name]['option'].length;

              for(i = 0; i < option_len; i++) {
                event_flags[events[name]['option'][i]] = true;
              }
            }

          });
        })(name);
      }

      clearInterval(interval);
      interval = setInterval(render, 1000 / fps);

      setTimeout(function() {
        scroll();
        resize();
      }, 200);

      return this;
    };

    var pause = function() {
      clearInterval(interval);

      return this;
    };

    var stop = function() {
      clearInterval(interval);

      for(var name in events) {
        events[name]['target'].off(events[name]['trigger']);
      }

      afterResizeFunc = function(params){};
      afterScrollFunc = function(params){};

      fps = 60;
      params = {
        scr: 0,
        scrL: 0,
        winH: 0,
        winW: 0
      };
      interval;
      events = {};
      event_flags = {};

      return this;
    };


    return {
      fps: fps,
      addEvent: addEvent,
      removeEvent: removeEvent,
      resizeFunc: resizeFunc,
      scrollFunc: scrollFunc,

      play: play,
      pause: pause,
      resize: resize,
      scroll: scroll,
      on: on,
      stop: stop
    };
  })();
})(jQuery);
