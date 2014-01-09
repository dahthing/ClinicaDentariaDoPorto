<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App::uses('AppController', 'Controller');

class UsersController extends AppController {

    public $uses = array();

    public function beforeFilter() {
        parent::beforeFilter();

        //create table in database for this exemple
        /* Load Model datasource */
        App::import('Model', 'ConnectionManager');
        $con = new ConnectionManager;
        $cn = $con->getDataSource('default');
        /* User table schema */
        $sql = "CREATE TABLE IF NOT EXISTS users (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50),
          password VARCHAR(50),
          created DATETIME DEFAULT NULL,
          modified DATETIME DEFAULT NULL
      								)";
        $cn->query($sql);

        /* allow add action so user can register */
        //$this->Auth->allow('add');
    }

    /**
     * Admin login
     *
     * @return void
     * @access public
     */
    public function admin_login() {
        $this->set('title_for_layout', __d('cddp', 'Admin Login'));
        $this->layout = "admin_login";
        /*
        if ($this->request->is('post')) {
            
            if ($this->Auth->login()) {
                return $this->redirect($this->Auth->redirect());
            }
            $this->Session->setFlash(__('Invalid username or password, try again'));
        }
        */
        if ($this->request->is('post')) {
            if ($this->Auth->login()) {
                $this->redirect($this->Auth->redirect());
            } else {
                $this->Auth->authError = __d('dna', 'Incorrect username or password');
                $this->Session->setFlash($this->Auth->authError, 'default', array('class' => 'error'), 'auth');
                $this->redirect($this->Auth->loginAction);
            }
        }
        
    }
    
    
    
     /**
     * Admin logout
     *
     * @return void
     * @access public
     */
    public function admin_logout() {
        $this->Session->setFlash(__d('cddp', 'Log out successful.'), 'default', array('class' => 'success'));
        $this->redirect($this->Auth->logout());
    }

    /**
     * Index
     *
     * @return void
     * @access public
     */
    public function index() {
        $this->set('title_for_layout', __d('cddp', 'Users'));
    }

    
}
