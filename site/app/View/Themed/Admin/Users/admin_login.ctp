<?php echo $this->Form->create('User', array('url' => array('controller' => 'users', 'action' => 'login', 'admin'=>true)));?>
<?php

    $this->Form->inputDefaults(array(
        'label' => false,
        ));
    
    echo $this->Form->input('username', array(
        'placeholder' => __d('cddp', 'Your Username'),
        'before' => false,
        'div' => false,
        'class' => 'input-block-level form-control',
        'label'=>__d('cddp', 'Username'),
        ));
    
    echo $this->Form->input('password', array(
        'placeholder' => 'Your Password',
        'before' => '',
        'div' => false,
        'class' => 'input-block-level form-control',
        'label'=>__d('cddp', 'Password')
    ));
    
    echo $this->Html->link(__d('cddp', 'forgot it?'), array(
			'admin' => true,
			'controller' => 'users',
			'action' => 'forgot',
			), array(
			'class' => 'password'
		));
    
    echo $this->Html->div('separator bottom clearfix','<!-- -->');
    echo '<div class="row">';
        echo $this->Html->div('col-md-12 center',
            $this->Form->button(__d('cddp', 'Log In'),array('class'=>'btn btn-block btn-inverse'))
        );
    echo '</div>';
    
?>

<?php echo $this->Form->end(); ?>

