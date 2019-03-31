jQuery(document).ready(function ($) {
    $('#main-banner').sliderPro({
        width: 1280, 
        height: 400,
        orientation: 'horizontal',
        thumbnailPosition: 'right',
        breakpoints: {
            800: {
                thumbnailsPosition: 'bottom',
                thumbnailWidth: 270,
                thumbnailHeight: 100
            },
            500: {
                orientation: 'vertical',
                thumbnailsPosition: 'bottom',
                thumbnailWidth: 120,
                thumbnailHeight: 50
            }
        }
    });
    // 分隔
    $(document).ready(function() {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
    });
});