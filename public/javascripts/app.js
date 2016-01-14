$(document).ready(function (e) {
    console.log('I see you digging my code 8-)');
    skipMobileURLBar();
    homePageBannerAppear();
    makeAllIFrameResponsive();
    attachSnippetFeatures();
    //attachTurnOffLightFeature();  //nah, forget it! if it's not perfect, don't wanna put it there...
    
    
    
    if($('.photography').length > 0){
        getMyWebsitePhotos();
    }

    
    
    function skipMobileURLBar(){
        /mobi/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
          if (!pageYOffset) window.scrollTo(0, 1);
        }, 1000);
    }
    function homePageBannerAppear() {
        setTimeout(function () {
            $('.s-banner').addClass('translucent');
        }, 200);

    }

    function makeAllIFrameResponsive() {
        // Find all YouTube videos
        var $allVideos = $("iframe[src]"),

            // The element that is fluid width
            $fluidEl = $(".story");
        setIFrameAspectRadio();
        resizeIFrames();
        // When the window is resized
        $(window).resize(function () {
            resizeIFrames();
            // Kick off one resize to fix all videos on page load
        }).resize();

        function setIFrameAspectRadio() {
            $allVideos.each(function () {

                $(this)
                    .data('aspectRatio', this.height / this.width)

                // and remove the hard coded width/height
                .removeAttr('height')
                    .removeAttr('width');

            });
        }
        // Figure out and save aspect ratio for each video



        function resizeIFrames() {
            var newWidth = $fluidEl.width();

            // Resize all videos according to their own aspect ratio
            $allVideos.each(function () {

                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.data('aspectRatio'));

            });
        }

    }




    function attachSnippetFeatures() {
        var $allSnippets = $('[data-snippet]');

        $allSnippets.each(function (index, s) {
            //hide all full text
            var $elem = $(s);
            var snippetText = $elem.attr('data-snippet');
            $elem.data('data-full-text', $elem.html()).html(snippetText).addClass('s-has-snippet');
            $elem.append('<a class="s-more-button" href="#">More</a>');

        });

        $allSnippets.on('click', '.s-more-button', function (e) {
            e.preventDefault();
            //Expand to full text
            var $b = $(this);
            var $elem = $b.closest('[data-snippet]');

            var fullText = $elem.data('data-full-text');
            $elem.html(fullText);
            $b.hide();

        });


    }

    function attachTurnOffLightFeature() {
        var lampSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"> \
                            <path d="M5.971 12.476c0.371 0.404 0.985 0.542 2.117 0.523 1.020-0.017 1.592-0.105 1.941-0.426v1.173c-0.623 0.203-1.309 0.315-2.029 0.315-0.72 0-1.406-0.113-2.029-0.315v-1.269zM5.992 14.533c0.901 0.275 1.312 0.29 2.008 0.29 0.696 0 1.107-0.015 2.008-0.29-0.078 0.428-0.416 1.467-2.008 1.467-1.592 0-1.929-1.039-2.008-1.467zM8 1.188c-2.010 0-3.646 1.606-3.646 3.579 0 0.981 0.684 2.2 1.511 3.575 0.33 0.549 0.488 1.091 0.615 1.527 0.099 0.338 0.192 0.657 0.313 0.77 0.056 0.053 0.308 0.224 1.176 0.224 0.033 0 0.067-0 0.101-0.001 0.963-0.014 1.192-0.189 1.215-0.209 0.074-0.064 0.154-0.352 0.224-0.606 0.113-0.408 0.254-0.916 0.566-1.462 0.625-1.093 1.569-2.744 1.569-3.818 0-0.952-0.377-1.849-1.062-2.525-0.69-0.68-1.607-1.055-2.583-1.055zM8 0v0c2.668 0 4.833 2.136 4.833 4.767 0 1.316-0.872 2.916-1.725 4.407-0.852 1.492-0.094 2.832-3.020 2.875-0.040 0.001-0.080 0.001-0.119 0.001-2.915 0-2.237-1.625-3.122-3.097-0.897-1.492-1.681-2.871-1.681-4.187 0-2.631 2.165-4.767 4.833-4.767z"/> \
                        </svg>';
        var $lightSwitch = $('<a href="#" class="s-light-switch">&nbsp;</a>').append(lampSVG);
        $('body').append($lightSwitch);
        
                
        $('.s-light-switch').on('click', function (e) {
            e.preventDefault();
            
            $('body').toggleClass('s-dark');
            
            if($('body').hasClass('s-dark')){
                 $.get('app_session.php?setDark=s-dark');
            }
            else{
                $.get('app_session.php?setDark=');
            }

        });

    }

    

    function getMyWebsitePhotos() {
        $('.row .col-sm-4').empty();
        var photoSetID = '72157640655461625';
        var url = '/photos';
        $.getJSON(url, function (data) {
            console.log(data);
            var allPhotos = data.photoset.photo;
            if (typeof allPhotos !== 'undefined') {
                allPhotos.sort(function () {
                    return 0.5 - Math.random()
                });
                $(allPhotos).each(function (index, p) {
                    var photoid = p.id;
                    //var photoIFrame = sprintf('<iframe src="http://www.flickr.com/photos/47894230@N06/%s/player/" width="500" height="281" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>', photoid);
                    var photoURL = sprintf('http://farm%s.staticflickr.com/%s/%s_%s_%s.jpg', p.farm, p.server, p.id, p.secret, 'b');
                    var photoImg = sprintf('<img src="%s" />', photoURL);
                    var photoLink = sprintf('<a href="http://www.flickr.com/photos/47894230@N06/%s/in/set-%s">%s</a>', p.id, photoSetID, photoImg);
                    var photoStory = sprintf('<div class="story"> \
                                                %s  \
                                                <p>%s</p>  \
                                               </div>', photoLink, p.title);
                    var $appendedStory = $(photoStory).addClass('s-transparent').appendTo(sprintf('.row .col-sm-4:eq(%s)', (index % 3)));
                    var wait = 100 + index * 50;
                    setTimeout(function() {
                      $appendedStory.removeClass('s-transparent');
                    }, wait);
                    
                }); 
            }
        });
    }
    
    //refreshed

});