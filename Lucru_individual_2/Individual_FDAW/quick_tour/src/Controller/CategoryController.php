<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Product;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\ProductRepository;
use App\Form\ProductType;
use App\Form\CategoryType;

use Symfony\Component\HttpFoundation\Request;

class CategoryController extends AbstractController
{


     /**
     * @Route("/categories", name="categories")
     */
    public function index(): Response
    {
        $categories = $this -> getDoctrine() -> getRepository(Category::class) ->findAll();
        return $this->render('category/show.html.twig', [
            'categories' => $categories ,
        ]);
    }


    /**
     * @Route("/category", name="create_category")
     */
    public function create(ValidatorInterface $validator,Request $request): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
 
           $em = $this->getDoctrine()->getManager();
           $em->persist($category);
           $em->flush();
 
           return $this->redirect($this->generateUrl('categories'));
 
        }

        return $this->render('category/create.html.twig', [
            'form' => $form->createView(),
        ]);

    }

/**
 * @Route("/category/{id}", name="category_show")
 */
public function show($id) : Response //ProductRepository $productRepository)
{
	//$product = $productRepository
     //   ->find($id);
    //$product = $this->getDoctrine()
     //   ->getRepository(Product::class)
     //   ->find($id);
    $category = $this->getDoctrine()
            ->getRepository(Category::class)
            ->findOneByIdJoinedToCategory($id);

    if (!$product) {
        throw $this->createNotFoundException(
            'No category found for id '.$id
        );
    }

 
    $categoryName = $category ->getName();

    return new Response('Numele categoriei '.$categoryName);


}

/**
 * @Route("/category/edit/{id}", name="edit_category")
 */
public function update(Request $request, $id) : Response
{
    $entityManager = $this->getDoctrine()->getManager();
    $category = $entityManager->getRepository(Category::class)->find($id);

    if (!$category) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
    }
    $form = $this->createForm(CategoryType::class, $category);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {

        $em = $this->getDoctrine()->getManager();
        $em->flush();
        return $this->redirect($this->generateUrl('categories'));
    }

    return $this->render('category/edit.html.twig', [
        'form' => $form->createView(),
    ]);
}

/**
 * @Route("/category/remove/{id}", name="delete_category")
 */
public function remove($id)
{
    $entityManager = $this->getDoctrine()->getManager();
    $category = $entityManager->getRepository(Category::class)->find($id);
   
 if (!$category) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
  }
  
  $entityManager->remove($category);
  $entityManager->flush();
  return $this->redirect($this->generateUrl('categories'));
}

}
