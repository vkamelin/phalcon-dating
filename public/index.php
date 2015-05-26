<?php

error_reporting(E_ALL);

class Application extends \Phalcon\Mvc\Application {

    /**
     * Register the services here to make them general or register in the ModuleDefinition to make them module-specific
     */
    protected function _registerServices() {

        $di = new \Phalcon\DI\FactoryDefault();

        $loader = new \Phalcon\Loader();
		
		$config = new ConfigIni(APP_PATH . 'app/config/config.ini');

        $loader->registerDirs(
			array(
				APP_PATH . $config->application->pluginsDir,
				APP_PATH . $config->application->libraryDir,
				APP_PATH . $config->application->formsDir,
			)
		)->register();
		
		$di->set('db', function () {
			return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
				'host' => 'localhost',
				'username' => 'admin_dating',
				'password' => 'iWqJvF228L',
				'dbname' => 'admin_dating'
			));
		});

        //Registering a router
        $di->set('router', function() {

            $router = new \Phalcon\Mvc\Router();

            $router->removeExtraSlashes(true);

            $router->setDefaultModule('frontend');

            $router->add('/:controller/:action', array(
                'module' => 'frontend',
                'controller' => 1,
                'action' => 2,
            ));

            $router->add('/:controller/:action/', array(
                'module' => 'frontend',
                'controller' => 1,
                'action' => 2,
            ));

            $router->add("/admin/:controller/:action", array(
                'module' => 'backend',
                'controller' => 1,
                'action' => 2,
            ));

            $router->add("/admin/:controller/:action/", array(
                'module' => 'backend',
                'controller' => 1,
                'action' => 2,
            ));

            $router->add("/admin/:controller", array(
                'module' => 'backend',
                'controller' => 1,
                'action' => 'index',
            ));

            $router->add("/admin/:controller/", array(
                'module' => 'backend',
                'controller' => 1,
                'action' => 'index',
            ));

            return $router;

        });

        $this->setDI($di);
    }

    public function main() {

        $this->_registerServices();

        //Register the installed modules
        $this->registerModules(array(
            'frontend' => array(
                'className' => 'Multiple\Frontend\Module',
                'path' => '../apps/frontend/Module.php'
            ),
            'backend' => array(
                'className' => 'Multiple\Backend\Module',
                'path' => '../apps/backend/Module.php'
            )
        ));

        echo $this->handle()->getContent();
    }

}

$application = new Application();
$application->main();
