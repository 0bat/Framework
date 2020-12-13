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
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{


     /**
     * @Route("/products", name="products")
     */
    public function index(): Response
    {
        $products = $this -> getDoctrine() -> getRepository(Product::class) ->findAll();
        return $this->render('product/index.html.twig', [
            'products' => $products ,
        ]);
    }


    /**
     * @Route("/product", name="create_product")
     */
    public function create(ValidatorInterface $validator,Request $request): Response
    {
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
 
           $em = $this->getDoctrine()->getManager();
           $category = new Category();
           $category->setName('New Category');
           $product->setCategory($category);
           $em->persist($product);
           $em->persist($category);
           $em->flush();
 
           return $this->redirect($this->generateUrl('products'));
 
        }

        return $this->render('product/create.html.twig', [
            'form' => $form->createView(),
        ]);


    //    
    //    

    //     $category->setName('Computer Peripherals');

    //     $product->setName('Keyboard2');
    //     $product->setPrice(19.99);
    //     $product->setDescription('Ergonomic and stylish!');

    //     // relates this product to the category
    //     $product->setCategory($category);

    //     $entityManager = $this->getDoctrine()->getManager();
    //     $entityManager->persist($category);
    //     $entityManager->persist($product);
    //     $entityManager->flush();

    //     return new Response(
    //         'Saved new product with id: '.$product->getId()
    //         .' and new category with id: '.$category->getId()
    //     );
    }

/**
 * @Route("/product/{id}", name="product_show")
 */
public function show($id) : Response //ProductRepository $productRepository)
{
	//$product = $productRepository
     //   ->find($id);
    //$product = $this->getDoctrine()
     //   ->getRepository(Product::class)
     //   ->find($id);
    $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->findOneByIdJoinedToCategory($id);

    if (!$product) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
    }

    $category = $product->getCategory();

    $categoryName = $product->getCategory()->getName();

    return new Response('Check out this great product: '.$product->getName().'Category name '.$categoryName);

    // or render a template
    // in the template, print things with {{ product.name }}
    // return $this->render('product/show.html.twig', ['product' => $product]);
}

/**
 * @Route("/product/edit/{id}", name="edit_product")
 */
public function update(Request $request, $id) : Response
{
    $entityManager = $this->getDoctrine()->getManager();
    $product = $entityManager->getRepository(Product::class)->find($id);

    if (!$product) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
    }
    $form = $this->createForm(ProductType::class, $product);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {

        $em = $this->getDoctrine()->getManager();
        $em->flush();
        return $this->redirect($this->generateUrl('products'));
    }

    return $this->render('product/edit.html.twig', [
        'form' => $form->createView(),
    ]);

    // $product->setName('New product name!');
    // $entityManager->flush();

    // return $this->redirectToRoute('product_show', [
    //     'id' => $product->getId()
    // ]);
}

/**
 * @Route("/product/remove/{id}", name="delete_product")
 */
public function remove($id)
{
    $entityManager = $this->getDoctrine()->getManager();
    $product = $entityManager->getRepository(Product::class)->find($id);
   
 if (!$product) {
        throw $this->createNotFoundException(
            'No product found for id '.$id
        );
  }
 
     $category = $product->getCategory();
  $category->removeProduct($product);
  $entityManager->remove($product);
  $entityManager->flush();
  return $this->redirect($this->generateUrl('products'));
}

}
