<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController
{
  	/**
  	 * @Route("/Привет/{name}")
  	 */
    public function index($name)
    {
        return new Response("Привет, $name!");
    }

 /**
  * @Route("/simplicity")
  */
 public function simple()
{
    return new Response('Просто! Легко! Прекрасно!');
}


}
?>