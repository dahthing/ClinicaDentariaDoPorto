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
  /*
     * Multiselect
     */
    $('#multiselect-optgroup').multiSelect({ selectableOptgroup: true });
    $('#pre-selected-options').multiSelect();
    $('#multiselect-custom').multiSelect({
    	selectableHeader: "<div class='custom-header'>Selectable items</div>",
    	selectionHeader: "<div class='custom-header'>Selection items</div>",
    	selectableFooter: "<div class='custom-header custom-footer'>Selectable footer</div>",
    	selectionFooter: "<div class='custom-header custom-footer'>Selection footer</div>"
    });
    
});