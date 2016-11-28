//jQuery.fx.interval = 50;

/*OPTIMIZE THIS*/
function animation(cube) {
  if (cube.attr('data-hovering') == 'true'
      && cube.attr('data-lowered') == 'true') {
    cube.attr('data-animating', 'true');
    /*cube.animate(
     {top: cube.attr('data-raisedtop')+'px'},
     400,
     'easeInCubic',
     function() {
     cube.attr('data-animating', 'false');
     cube.attr('data-lowered', 'false');
     cube.clearQueue();
     animation(cube);
     }
     );*/
    /*TODO: use transitionend in firefox
     and OTransitionEnd in Opera*/
    cube.on('webkitTransitionEnd', function() {
      cube.attr('data-animating', 'false');
      cube.attr('data-lowered', 'false');
      cube.clearQueue();
      animation(cube);
    });
    cube.css({
      '-webkit-transition': 'all 400ms ease-in-out',
      '-o-transition': 'all 400ms ease-in-out',
      '-moz-transition': 'all 400ms ease-in-out',
      'top':cube.attr('data-raisedtop')+'px'
    });
  }
  else
  if (cube.attr('data-hovering') == 'false'
      && cube.attr('data-lowered') == 'false') {
    cube.attr('data-animating', 'true');
    /*cube.animate(
     {top: cube.attr('data-initialtop')+'px'},
     400,
     'easeOutBounce',
     function() {
     cube.attr('data-animating', 'false');
     cube.attr('data-lowered', 'true');
     cube.clearQueue();
     }
     );*/
    /*TODO: use transitionend in firefox
     and OTransitionEnd in Opera*/
    cube.on('webkitTransitionEnd', function() {
      cube.attr('data-animating', 'false');
      cube.attr('data-lowered', 'true');
      cube.clearQueue();
    });
    cube.css({
      '-webkit-transition':
        'all 400ms cubic-bezier(0, 0.35, .5, 1.6)',
      '-o-transition':
        'all 400ms cubic-bezier(0, 0.35, .5, 1.6)',
      '-moz-transition':
        'all 400ms cubic-bezier(0, 0.35, .5, 1.6)',
      'top':cube.attr('data-initialtop')+'px'
    });
  }
};
/*END OPTIMIZE THIS*/

function refreshCubes()
{
  $('.box').empty();
  var x = $("#slider").slider("value");
  var initialTop = 50;
  var initialLeft = 450;

  for(var i = 1; i < x; i++)
  {
    for(var j = 1; j < x; j++)
    {
      var cube = $('<div class="cube hidden"><div class="topFace">' +
                   '<div></div></div><div class="leftFace"></div>' +
                   '<div class="rightFace"></div></div>');
      $('.box').append(cube);

      var thisCube = $('.cube:last');

      thisCube.css( // last cube added
        {
          left : initialLeft + (20 * i) + (-19 * j) + 'px',
          top : initialTop + (11 * i) + (11 * j) + 'px'
        });

      thisCube.attr('data-initialtop', '' + (initialTop + (11 * i) + (11 * j)));
      thisCube.attr('data-raisedtop', '' + (initialTop + (11 * i) + (11 * j) - 25));

      /*OPTIMIZE THIS*/
      thisCube.attr('data-lowered', 'true');
      thisCube.attr('data-animating', 'false');
      /*END OPTIMIZE THIS*/

      thisCube.find('.topFace div')
        .css('background', 'rgb(100,' +
                           Math.ceil(255 - 16 * i) + ',' +
                           Math.ceil(255 - 16 * j) + ')');
      thisCube.find('.rightFace')
        .css('background', 'rgb(35,' +
                           Math.ceil(190 - 16 * i) + ',' +
                           Math.ceil(190 - 16 * j) + ')');
      thisCube.find('.leftFace')
        .css('background', 'rgb(35,' +
                           Math.ceil(190 - 16 * i) + ',' +
                           Math.ceil(190 - 16 * j) + ')');
      thisCube.children('div').css('opacity', '.9');

      thisCube.removeClass('hidden');

      /*Using on() instead of live()*/
      thisCube./*live*/on('mouseenter', function()
      {
        thisCube = $(this);
        thisCube.attr('data-hovering', 'true');
        if (thisCube.attr('data-animating') == 'false') {
          animation(thisCube);
        }
      });

      thisCube./*live*/on('mouseleave', function()
      {
        thisCube = $(this);
        thisCube.attr('data-hovering', 'false');
        if (thisCube.attr('data-animating') == 'false') {
          animation(thisCube);
        }
      });
    }
  }

}

//$(document).ready(function() {
//
//  $('#slider').slider(
//    {
//      value: 9,
//      max: 30,
//      min: 2,
//      slide: refreshCubes,
//      change: refreshCubes
//    });
//
//  refreshCubes();
//});