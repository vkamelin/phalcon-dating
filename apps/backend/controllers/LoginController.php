<?php

namespace Multiple\Backend\Controllers;

class LoginController extends \Phalcon\Mvc\Controller
{

	public function indexAction()
	{
		echo 123;
		$this->view->disable();
	}

}
