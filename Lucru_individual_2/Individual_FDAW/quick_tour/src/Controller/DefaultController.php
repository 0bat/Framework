<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Category;
use App\Entity\Product;

class DefaultController extends AbstractController
{
     /**
     * @Route("/", name="tabele")
     */
    public function showAll()
    {
        $search = 0;

        return $this->render('base.html.twig',[
            'b' => 1,
        ]);
    }
}