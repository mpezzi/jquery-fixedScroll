/**
 * jQuery Fixed Scroll Plugin by M. Pezzi
 * https://github.com/mpezzi/jquery-fixedScroll
 * Version: 0.1-alpha (05/22/12)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.7 or later
 */
;(function($){

$.fn.fixedScroll = function(options) {
  return this.each(function(){
    var $self = $(this), $win = $(window),
        $self_container = null, $self_container_inner = null,

        o = $.extend({}, $.fn.fixedScroll.defaults, options);

    // Wrap element with scroll container elements.
    $self
      .wrap('<div class="' + o.containerClass + '" />')
      .wrap('<div class="' + o.containerInnerClass + '" />');

    // Set container elements.
    $self_container = $self.parent().parent();
    $self_container_inner = $self.parent();

    // Wait until all images have been loaded.
    $win.load(function(){

      // Automatically set start option if not already set.
      if ( !o.start ) {
        o.start = $self.offset().top - o.top;
      }

      // Wrap content in an extra element.
      if ( o.wrapper ) {
        $self.wrap(o.wrapper);
      }

      // Set CSS required for fixed scroll content.
      $self.css({ width: '100%' });
      $self_container.css({ height: $self.outerHeight(true) });

      // Set CSS required for full option.
      if ( o.full ) {
        $self_container_inner.css({ width: '100%', left: 0 });
      }
      else {
        $self_container_inner.css({ width: $self.width() });
      }

      // Track window scroll and flip css at scroll points, initialize when called.
      $win.scroll(function(e){
        if ( $win.scrollTop() > o.start ) {
          $self_container.addClass(o.containerActiveClass);
          $self_container_inner.css(o.css.fixed).css('top', o.top);
        }
        else {
          $self_container.removeClass(o.containerActiveClass);
          $self_container_inner.css(o.css.normal).css('top', o.top);
        }
      }).scroll();
    });
  });
};

$.fn.fixedScroll.defaults = {
  start: false,
  stop: false,
  top: 0,
  containerClass: 'fixed-scroll',
  containerInnerClass: 'fixed-scroll-inner',
  containerActiveClass: 'fixed-scroll-active',
  css: {
    fixed: {
      position: 'fixed',
      overflow: 'hidden'
    },
    normal: {
      position: 'static',
      overflow: 'hidden'
    }
  },
  wrapper: false,
  full: false
};

})(jQuery);