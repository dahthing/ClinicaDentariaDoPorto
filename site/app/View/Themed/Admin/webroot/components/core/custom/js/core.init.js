/* ==========================================================
 * QuickAdmin v2.0.0
 * common.js
 * 
 * http://www.mosaicpro.biz
 * Copyright MosaicPro
 *
 * Built exclusively for sale @Envato Marketplaces
 * ========================================================== */

var randNum,
        equalHeight,
        genSparklines,
        beautify,
        mt_rand,
        parse_url;

(function($, window)
{
    // generate a random number
    window.randNum = function()
    {
        return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
    }

    window.equalHeight = function(boxes, substract)
    {
        if (typeof substract == 'undefined')
            var substract = 0;

        boxes.height('auto');
        if (parseInt($(window).width()) <= 400)
            return;

        var maxHeight = Math.max.apply(Math, boxes.map(function() {
            return $(this).height() - substract;
        }).get());
        boxes.height(maxHeight);
    }

    window.parse_url = function(str, component) {
        var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
            'relative', 'path', 'directory', 'file', 'query', 'fragment'],
                ini = (this.php_js && this.php_js.ini) || {},
                mode = (ini['phpjs.parse_url.mode'] &&
                        ini['phpjs.parse_url.mode'].local_value) || 'php',
                parser = {
                    php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
                };

        var m = parser[mode].exec(str),
                uri = {},
                i = 14;
        while (i--) {
            if (m[i]) {
                uri[key[i]] = m[i];
            }
        }

        if (component) {
            return uri[component.replace('PHP_URL_', '').toLowerCase()];
        }
        if (mode !== 'php') {
            var name = (ini['phpjs.parse_url.queryKey'] &&
                    ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
            parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
            uri[name] = {};
            query = uri[key[12]] || '';
            query.replace(parser, function($0, $1, $2) {
                if ($1) {
                    uri[name][$1] = $2;
                }
            });
        }
        delete uri.source;
        return uri;
    }

    function PDFTarget(target)
    {
        var doc = $('html').clone();
        var target = $(target).clone();
        var form = $('#PDFTargetForm');
        if (!form.length) {
            //$('body').append('<form id="PDFTargetForm"></form>');
            $('<form id="PDFTargetForm"></form>').appendTo('body');
            form = $('#PDFTargetForm');
        }

        form.attr('action', basePath + 'ajax.php?section=pdf');
        form.attr('method', 'POST');
        $('<input type="hidden" name="target" value="" />').appendTo(form);

        target.find('.hidden-print').remove();
        doc.find('body').html(target);
        var html = doc.html();

        form.find('input').val(html);
        form.submit();
    }

    window.beautify = function(source)
    {
        var output,
                opts = {};

        opts.preserve_newlines = false;
        // opts.jslint_happy = true;
        output = html_beautify(source, opts);
        return output;
    }

    // generate a random number within a range (PHP's mt_rand JavaScript implementation)
    window.mt_rand = function(min, max)
    {
        var argc = arguments.length;
        if (argc === 0) {
            min = 0;
            max = 2147483647;
        }
        else if (argc === 1) {
            throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
        }
        else {
            min = parseInt(min, 10);
            max = parseInt(max, 10);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // scroll to element animation
    function scrollTo(id)
    {
        if ($(id).length)
            $('html,body').animate({scrollTop: $(id).offset().top}, 'slow');
    }

    // handle menu toggle button action
    function toggleMenuHidden()
    {
        //console.log('toggleMenuHidden');
        $('.container-fluid:first').toggleClass('menu-hidden');
        $('#menu').toggleClass('hidden-xs', function()
        {
            if (!$('.container-fluid:first').is('.menu-hidden'))
                removeMenuHiddenPhone();

            if (typeof $.cookie != 'undefined')
                $.cookie('menuHidden', $('.container-fluid:first').is('.menu-hidden'));
        });
    }

    function removeMenuHiddenPhone()
    {
        if (!$('.container-fluid:first').is('.menu-hidden') && $('#menu').is('.hidden-xs'))
            $('#menu').removeClass('hidden-xs');
    }

    // handle generate sparkline charts
    function genSparklines()
    {
        if (typeof $.fn.sparkline == 'undefined')
            return;

        if ($('.sparkline').length)
        {
            $.each($('#content .sparkline'), function(k, v)
            {
                var size = {w: 150, h: 28};
                if ($(this).parent().is('.widget-stats'))
                    size = {w: 150, h: 35}

                var color = primaryColor;
                if ($(this).is('.danger'))
                    color = dangerColor;
                if ($(this).is('.success'))
                    color = successColor;
                if ($(this).is('.warning'))
                    color = warningColor;
                if ($(this).is('.inverse'))
                    color = inverseColor;

                var data = [[1, 3 + randNum()], [2, 5 + randNum()], [3, 8 + randNum()], [4, 11 + randNum()], [5, 14 + randNum()], [6, 17 + randNum()], [7, 20 + randNum()], [8, 15 + randNum()], [9, 18 + randNum()], [10, 22 + randNum()]];
                $(v).sparkline(data,
                        {
                            type: 'bar',
                            width: size.w,
                            height: size.h,
                            stackedBarColor: ["#444", color],
                            lineWidth: 2
                        });
            });
            $.each($('#menu .sparkline'), function(k, v)
            {
                var size = {w: 150, h: 20};
                if ($(this).parent().is('.widget-stats-3'))
                    size = {w: 150, h: 35}

                var color = primaryColor;
                if ($(this).is('.danger'))
                    color = dangerColor;
                if ($(this).is('.success'))
                    color = successColor;
                if ($(this).is('.warning'))
                    color = warningColor;
                if ($(this).is('.inverse'))
                    color = inverseColor;

                var data = [[1, 3 + randNum()], [2, 5 + randNum()], [3, 8 + randNum()], [4, 11 + randNum()], [5, 14 + randNum()], [6, 17 + randNum()], [7, 20 + randNum()], [8, 15 + randNum()], [9, 18 + randNum()], [10, 22 + randNum()]];
                $(v).sparkline(data,
                        {
                            type: 'bar',
                            width: size.w,
                            height: size.h,
                            stackedBarColor: ["#dadada", color],
                            lineWidth: 2
                        });
            });
        }
    }

    if (typeof Holder != 'undefined')
    {
        Holder.add_theme("dark", {background: "#45484d", foreground: "#aaa", size: 9}).run();
        Holder.add_theme("white", {background: "#fff", foreground: "#c9c9c9", size: 9}).run();
        if (typeof primaryColor != 'undefined')
            Holder.add_theme("primary", {background: primaryColor, foreground: "#c9c9c9", size: 9}).run();
    }

    // main menu visibility toggle
    $('.navbar.main .btn-navbar').click(function()
    {
        toggleMenuHidden();
    });

    // topnav toggle
    $('.navbar.main .toggle-navbar').click(function()
    {
        var that = $(this);

        if ($('.navbar.main .wrapper').is(':hidden'))
        {
            $(this).slideUp(20, function() {
                $('.navbar.main .wrapper').show();
                $('.navbar.main').animate({height: 34}, 200, function() {
                    $('.navbar.main').toggleClass('navbar-hidden');
                    that.slideDown();
                });
            });
        }
        else
        {
            $(this).slideUp(20, function() {
                $('.navbar.main').animate({height: 0}, 200, function() {
                    $('.navbar.main .wrapper').hide();
                    $('.navbar.main').toggleClass('navbar-hidden');
                    that.slideDown();
                });
            });
        }
    });

    // multi-level top menu
    $('body').on('mouseover', '.submenu', function()
    {
        $(this).children('ul').removeClass('submenu-hide').addClass('submenu-show');
    }).on('mouseout', '.submenu', function()
    {
        $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
    });
    //.find("a:first").append(" &raquo; ");

    // tooltips
    $('body').tooltip({selector: '[data-toggle="tooltip"]'});

    // popovers
    $('[data-toggle="popover"]').popover();

    // save to PDF
    $('[data-toggle*="pdf"]').on('click', function(e) {
        e.preventDefault();
        PDFTarget($(this).attr('data-target'));
    });

    // loading state for buttons
    $('[data-toggle*="btn-loading"]').click(function() {
        var btn = $(this);
        btn.button('loading');
        setTimeout(function() {
            btn.button('reset')
        }, 3000);
    });
    $('[data-toggle*="button-loading"]').click(function() {
        var btn = $(this);
        btn.button('loading');
    });

    // print
    $('[data-toggle="print"]').click(function(e)
    {
        e.preventDefault();
        window.print();
    });

    // carousels
    $('.carousel').carousel();

    // generate sparkline charts
    genSparklines();

    // Google Code Prettify
    if ($('.prettyprint').length && typeof prettyPrint != 'undefined')
        prettyPrint();

    // view source toggle buttons
    $('.btn-source-toggle').click(function(e) {
        e.preventDefault();
        $('.code:not(.show)').toggleClass('hide');
    });

    // show/hide toggle buttons
    $('[data-toggle="hide"]').click(function()
    {
        if ($(this).is('.bootboxTarget'))
            bootbox.alert($($(this).attr('data-target')).html());
        else {
            $($(this).attr('data-target')).toggleClass('hide');
            if ($(this).is('.scrollTarget') && !$($(this).attr('data-target')).is('.hide'))
                scrollTo($(this).attr('data-target'));
        }
    });

    // handle persistent menu visibility on page load
    if (typeof $.cookie != 'undefined' && $.cookie('menuHidden') && $.cookie('menuHidden') == 'true' || (!$('.container-fluid').is('.menu-hidden') && !$('#menu').is(':visible')))
        toggleMenuHidden();
    else if ($('#menu').is(':visible'))
        removeMenuHiddenPhone();

    // menu slim scroll max height
    setTimeout(function()
    {
        var menu_max_height = parseInt($('#menu .slim-scroll').attr('data-scroll-height'));
        var menu_real_max_height = parseInt($('#wrapper').height());

        $('#menu .slim-scroll').slimScroll({
            height: (menu_max_height < menu_real_max_height ? (menu_real_max_height - 40) : menu_max_height) + "px",
            allowPageScroll: true,
            railDraggable: ($.fn.draggable ? true : false)
        });

        if (Modernizr.touch)
            return;

        // fixes weird bug when page loads and mouse over the sidebar (can't scroll)
        $('#menu .slim-scroll').trigger('mouseenter').trigger('mouseleave');
    }, 200);

    /* Slim Scroll Widgets */
    $('.widget-scroll').each(function() {
        $(this).find('.widget-body > div').slimScroll({
            height: $(this).attr('data-scroll-height'),
            railDraggable: ($.fn.draggable ? true : false)
        });
    });

    /* Other non-widget Slim Scroll areas */
    $('*:not(#menu) .slim-scroll').each(function() {
        var scrollSize = $(this).attr('data-scroll-size') ? $(this).attr('data-scroll-size') : "7px";
        $(this).slimScroll({
            height: $(this).attr('data-scroll-height'),
            allowPageScroll: false,
            railVisible: false,
            // size: '0',
            railDraggable: ($.fn.draggable ? true : false)
        });
    });
})(jQuery, window);