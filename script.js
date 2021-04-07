


/** Ready, Set, Go! **/
WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  }
});

(function($) {
  
  $(function() {
    recolor();
    
    svg.click( function() { 
      recolor(); 
      window.clearInterval(interval); 
    });


    var interval = window.setInterval(function(){ recolor(); }, 2500);
  });
  
  
})(jQuery);

let palette;
let palettes = [];
const svg = Snap('#shield');
const paths = Snap.selectAll('path, text');

const recolor = function () {
   $.getJSON('https://www.colourlovers.com/api/palettes/random?jsonCallback=?', function(result) {
      palette = result[0];
      palettes.push(palette);
     
    //  $('body').css('background-image', 'url(' + palette.imageUrl + ')');
      var boxShadow = '';
      var alternate = !$('body').hasClass('alternate') ? true : false;
      $('body').toggleClass('alternate');
     
      palette.colors.forEach(function(color, i) {
        var last = palette.colors.length;
        
        if(alternate) {
          var px = (i * 100/last) + (100/last) + 'px';
          if(last == i + 1) {
              boxShadow += 'inset ' + px +' -' + px + ' 0 ' + px + ' #' + color;
            $('body').css('background','#' + color);
          } else {
              boxShadow += 'inset ' + px +' -' + px + ' 0 ' + px + ' #' + color + ',';
          }
        } else {
           var px = (i * 100/last) + (100/last) + 'px';
          if(last == i + 1) {
              boxShadow += 'inset -' + px +' ' + px + ' 0 ' + px + ' #' + color;
            $('body').css('background','#' + color);
          } else {
              boxShadow += 'inset -' + px +' ' + px + ' 0 ' + px + ' #' + color + ',';
          }
        }
      });
     
      $('body').css('box-shadow', boxShadow);
        paths.forEach( function( path, i ) {
          
          var color = (typeof palette.colors[i] != 'undefined') ? '#' + palette.colors[i] : '#' + palette.colors[0];
          var pattern = GeoPattern.generate(palette.title + color, { color: color });
          
          var patternSVG = Snap.parse(pattern.toSvg());
          if(!$('#pattern' + i).length) {
            $('#shield defs').prepend('<pattern width="100%" height="100%" id="pattern'+ i +'"></pattern>');
          }
          $('#pattern' + i).empty();
          
          nodes = Array.prototype.slice.call(patternSVG.node.childNodes,0); 
          nodes.forEach( function(piece) {
             svg.select('#pattern' + i).append(piece);
          });
          
          path.animate( { opacity: 1 }, 500);
          if(path.type === 'text') {
            path.attr('fill', color);
          }
          path.toggleClass('serif');
      });
     
  }); 
};
