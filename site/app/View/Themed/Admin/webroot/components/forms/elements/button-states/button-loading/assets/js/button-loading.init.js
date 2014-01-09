/* ==========================================================
 * QuickAdmin v2.0.0
 * form_elements.js
 * 
 * http://www.mosaicpro.biz
 * Copyright MosaicPro
 *
 * Built exclusively for sale @Envato Marketplaces
 * ========================================================== */ 

$(function()
{
	// button state demo
	$('#btn-loading')
	    .click(function () {
	        var btn = $(this)
	        btn.button('loading')
	        setTimeout(function () {
	            btn.button('reset')
	        }, 3000)
	    });
	
	
    
   
	
});