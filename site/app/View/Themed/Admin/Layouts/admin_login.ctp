<?php
/**
 *
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
echo $this->Html->docType('html5');
?>
<!--[if lt IE 7]> <html class="ie lt-ie9 lt-ie8 lt-ie7 fluid top-full sidebar sidebar-full sticky-sidebar"> <![endif]-->
<!--[if IE 7]>    <html class="ie lt-ie9 lt-ie8 fluid top-full sticky-top sidebar sidebar-full sticky-sidebar"> <![endif]-->
<!--[if IE 8]>    <html class="ie lt-ie9 fluid top-full sticky-top sidebar sidebar-full sticky-sidebar"> <![endif]-->
<!--[if gt IE 8]> <html class="ie gt-ie8 fluid top-full sticky-top sidebar sidebar-full sticky-sidebar"> <![endif]-->
<!--[if !IE]><!--><html class="fluid top-full sticky-top sidebar sidebar-full sticky-sidebar"><!-- <![endif]-->
<head>
    <?php echo $this->Html->charset(); ?>
    <title><?php echo $title_for_layout; ?> - <?php echo __d('cddp', 'Clinica dentaria do Porto'); ?> (v<?php echo strval(Configure::read('Admin.version')); ?>)</title>
    <?php
        echo $this->Html->meta(array(
            'viewport' => 'width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
            'apple-mobile-web-app-capable' => 'yes',
            'apple-mobile-web-app-status-bar-style' => 'black'
        ));
    ?>
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
    <?php
        
        echo $this->RIBHtml->less(array(
            '/less/module.admin.page.login'
        ));
    
        echo $this->Html->script(array(
            'http://code.jquery.com/jquery-1.10.1.min.js',
            'http://code.jquery.com/jquery-migrate-1.2.1.min.js',
            '/components/core/lib/plugins/less-js/less.min',
        ));
    ?>
</head>
<body class="login ">
    <!-- Wrapper -->
    <div id="login">

        <div class="container">

            <div class="wrapper">

                <h1 class="glyphicons lock"><?php echo __d('cddp', 'RIB Framework'); ?> <i></i></h1>

                <!-- Box -->
                <div class="widget widget-heading-simple widget-body-gray">

                    <div class="widget-body">
                    <?php
                        echo $this->fetch('content');
                    ?>
                    </div>

                </div>
                
                <?php 
                echo AuthComponent::password('qwerty');
                echo $this->Session->flash('auth'); ?>
            </div>

        </div>

    </div>
    <!-- // Wrapper END -->
    <?php
        echo $this->Blocks->get('scriptBottom');
        echo $this->Js->writeBuffer();
        echo $this->Html->script(array(
            '/components/core/lib/bootstrap/js/bootstrap.min',
            '/components/core/lib/modernizr/modernizr.js',
            '/components/forms/elements/uniform/assets/lib/js/jquery.uniform.min',
            '/components/forms/elements/uniform/assets/custom/js/uniform.init'
        ));
    ?>
</body>
</html>