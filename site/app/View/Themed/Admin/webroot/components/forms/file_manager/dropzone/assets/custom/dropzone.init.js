/* ==========================================================
 * QuickAdmin v2.0.0
 * file_managers.js
 * 
 * http://www.mosaicpro.biz
 * Copyright MosaicPro
 *
 * Built exclusively for sale @Envato Marketplaces
 * ========================================================== */ 

(function($) 
{
	if (typeof Dropzone != 'undefined')
		Dropzone.autoDiscover = false;
	
	if ($.fn.dropzone != 'undefined')
		$('.dropzone').dropzone();
})(jQuery);