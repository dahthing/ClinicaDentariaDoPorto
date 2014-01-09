<?php

/**
 * Description of DnaHtmlHelper
 *
 * @author dahthing
 */
App::uses('HtmlHelper', 'View/Helper');

class RIBHtmlHelper extends HtmlHelper {

    public function __construct(View $View, $settings = array()) {
        parent::__construct($View, $settings);

        $this->_tags['icon'] = '<i class="%s"%s></i> ';
        $this->_tags['less'] = '<link type="text/css" rel="%s" href="%s" %s/>';
    }
    
    /**
     * Creates a link element for CSS stylesheets.
     *
     * ### Usage
     *
     * Include one CSS file:
     *
     * `echo $this->Html->less('styles.less');`
     *
     * Include multiple CSS files:
     *
     * `echo $this->Html->less(array('one.less', 'two.less'));`
     *
     * Add the stylesheet to the `$scripts_for_layout` layout var:
     *
     * `$this->Html->less('styles.less', null, array('inline' => false));`
     *
     * Add the stylesheet to a custom block:
     *
     * `$this->Html->less('styles.less', null, array('block' => 'layoutCss'));`
     *
     * ### Options
     *
     * - `inline` If set to false, the generated tag will be appended to the 'css' block,
     *   and included in the `$scripts_for_layout` layout variable. Defaults to true.
     * - `block` Set the name of the block link/style tag will be appended to. This overrides the `inline`
     *   option.
     * - `plugin` False value will prevent parsing path as a plugin
     * - `fullBase` If true the url will get a full address for the css file.
     *
     * @param string|array $path The name of a CSS style sheet or an array containing names of
     *   CSS stylesheets. If `$path` is prefixed with '/', the path will be relative to the webroot
     *   of your application. Otherwise, the path will be relative to your CSS path, usually webroot/css.
     * @param string $rel Rel attribute. Defaults to "stylesheet". If equal to 'import' the stylesheet will be imported.
     * @param array $options Array of HTML attributes.
     * @return string CSS <link /> or <style /> tag, depending on the type of link.
     * @link http://book.cakephp.org/2.0/en/core-libraries/helpers/html.html#HtmlHelper::css
     */
    public function less($path, $rel = null, $options = array()) {
        $options += array('block' => null, 'inline' => true);
        if (!$options['inline'] && empty($options['block'])) {
            $options['block'] = __FUNCTION__;
        }
        unset($options['inline']);

        if (is_array($path)) {
            $out = '';
            foreach ($path as $i) {
                $out .= "\n\t" . $this->less($i, $rel, $options);
            }
            if (empty($options['block'])) {
                return $out . "\n";
            }
            return;
        }

        if (strpos($path, '//') !== false) {
            $url = $path;
        } else {
            $url = $this->assetUrl($path, $options + array('pathPrefix' => CSS_URL, 'ext' => '.less'));
            $options = array_diff_key($options, array('fullBase' => null));

            if (Configure::read('Asset.filter.css')) {
                $pos = strpos($url, CSS_URL);
                if ($pos !== false) {
                    $url = substr($url, 0, $pos) . 'ccss/' . substr($url, $pos + strlen(CSS_URL));
                }
            }
        }

        if ($rel === 'import') {
            $out = sprintf($this->_tags['style'], $this->_parseAttributes($options, array('inline', 'block'), '', ' '), '@import url(' . $url . ');');
        } else {
            if (!$rel) {
                $rel = 'stylesheet/less';
            }
            $out = sprintf($this->_tags['less'], $rel,$url, $this->_parseAttributes($options, array('inline', 'block'), '', ' '));
        }

        if (empty($options['block'])) {
            return $out;
        }
        $this->_View->append($options['block'], $out);
    }

}
