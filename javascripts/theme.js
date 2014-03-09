 if (window.jQuery) { 
  $(window).load(function(){
    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('contacts_thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/\/(\d*)$/)[1]
        var highres = lowres.replace(/\/(\d*)$/, "/" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;
      }  

      var images = findImagesByRegexp(/\/attachments\/thumbnail\/\d+$/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        var height = images[i].height
        var width = images[i].width
        var highres = lowres + "?size=" + Math.max(height, width)*2;
        if (Math.max(height, width) > 0) {
          images[i].src = highres;
          images[i].height = height;
          images[i].width = width;
        }
      }  

// Sized thumbnails
      var images = findImagesByRegexp(/\/attachments\/thumbnail\/\d+\/\d+$/, document)  
      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        var height = images[i].height
        var width = images[i].width
        old_size = lowres.match(/\/(\d*)$/)[1]
        var highres = lowres.replace(/\/(\d*)$/, "/" + String(old_size*2));
        images[i].src = highres;
        if (Math.max(height, width) > 0) {
          images[i].src = highres;
          images[i].height = height;
          images[i].width = width;
        }        
      }             

// People avatars
      var images = findImagesByRegexp(/people\/avatar.*size=\d+$/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)$/)[1]
        var highres = lowres.replace(/size=(\d+)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }    


    }
  });
 
  (function($) {
    $(function() {
      var loadScript = function(url, callback) {
        var script = document.createElement('script');
	script.type = 'text/javascript';

	if (script.readyState) {
	  script.onreadystatechange = function() {
	    if (script.readState === 'loaded' || script.readState === 'complete') {
	      script.onreadystatechange = null;
	      callback();
	    }
	  };
	} else {
	  script.onload = function() {
	    callback();
	  };
	}

	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
      };
      loadScript('/themes/coffee/javascripts/vein.js', function() {
        $('table').each(function(idx, val) {
	  var $table = $(this);
	  if ($table.hasClass('list') === true) {
	    var $head = $table.find('thead th'),
	        count = 0;
	    $head.each(function(idx, column) {
	      var selector = '.list.issues tbody td:nth-of-type(' + (idx+1) + '):before';
	      vein.inject([{
	        '@media (max-width: 768px)': [selector]
	      }], {
	        'content': "'" + $(column).find('a').html() + "'",
	      });
	    });
	  }
	});
      });
    });
  })(jQuery);
} else {
  document.observe("dom:loaded", function() {
    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d*)$/)[1]
        var highres = lowres.replace(/size=(\d*)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;      
      }    
    }

  });
}

function findImagesByRegexp(regexp, parentNode) {
   var images = Array.prototype.slice.call((parentNode || document).getElementsByTagName('img'));
   var length = images.length;
   var ret = [];
   for(var i = 0; i < length; ++i) {
      if(images[i].src.search(regexp) != -1) {
         ret.push(images[i]);
      }
   }
   return ret;
};
