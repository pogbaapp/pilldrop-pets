/*------------------------------------------------------------------
Import styles
------------------------------------------------------------------*/

import './../styles/style.scss';

console.log('Shopify Skeleton 💀');

import Shop from './shop';
import $ from 'jquery';
import slick from 'slick-carousel';

$(() => {

    new Shop($('body'));

    let tick;
    let hovered = false;
    let percent = 0;
    let $productSliderProgress = $('.js-gallery-progress');
    let $productSliderProgressCircle = $('.js-gallery-progress-circle');
    let $productSlider = $('.js-product-imagery-slider');

    /**
    * Start the progress bar animating 
    */
    const startProgressbar = () => {
        resetProgressbar();
        hovered = false;
        percent = 0;
        tick = setInterval(interval, 10);
    };

    /**
     * Set our animation speed for the progress bar
     */
    const interval = () => {
        if (!hovered) percent += .19;
        $productSliderProgress.css({ width: percent + "%" });
        $productSliderProgressCircle.attr('stroke-dashoffset', (percent * Math.PI));
    };

    /**
     * Reset the progress bars' animation to zero 
     */
    const resetProgressbar = () => {
        $productSliderProgress.css({ width: 0 + '%' });
        $productSliderProgressCircle.attr('stroke-dashoffset', (0));
        clearInterval(tick);
    };

    $productSlider.hover(
        () => hovered = true,
        () => startProgressbar());

    $productSlider.hover(
        () => hovered = true,
        () => hovered = false, resetProgressbar());

    //  Declare our slider event handlers
    $productSlider
        .on('init', () => startProgressbar())
        .on('beforeChange', () => startProgressbar());

    // Product slider 
    $productSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplaySpeed: 5000,
        autoplay: true,
        customPaging() {
            return '<span></span>';
        },
        responsive: [
            {
                breakpoint: 768,
                settings: { dots: true }
            }
        ]
    });

    $('.js-cursor-previous').on('click', (e) => {
        e.preventDefault();
        $productSlider.slick('slickPrev');
    });

    $('.js-cursor-next').on('click', (e) => {
        e.preventDefault();
        $productSlider.slick('slickNext');
    });


    let $body = $('body');


    $body.on('click', '.js-change-quantity-inline', (e) => {
        e.preventDefault();
        console.log('fdhjkfjshkd')
        let $this = $(e.currentTarget);
        let $quantity = $this.parent().find('input');
        let quantity = parseInt($quantity.val());
        quantity = ($this.attr('data-type') === 'subtract') ? quantity - 1 : quantity + 1;
        if (quantity < 1) quantity = 1;
        $quantity.val(quantity);
    });


    $body.on('click', '.js-click-through', (e) => {
        if ($('#agree').is(':checked')) {

        } else {
            e.preventDefault();
            let notyf = new Notyf();
            notyf.error({
                message: 'You must agree with the terms and conditions & health and safety guidelines to check out.',
                duration: 4000,
                dismissible: true,
                icon: false
            });
        }
    });

});