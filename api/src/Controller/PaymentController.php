<?php

namespace App\Controller;

use Stripe\Stripe;
use Stripe\Checkout\Session;
use Entity\Product; 
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class PaymentController extends AbstractController
{
    #[Route('/payment', name: 'payment')]
    public function index()
    {
        
        $FRONT = 'http://localhost/payment';

        // \Stripe\Stripe::setApiKey('sk_live_dr3rWSlttoThoDrrlU3HpSoB00kBVgMvFA');

        $checkout_session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
                'price' => '123',
                'quantity' => 1,
              ]],
            'mode' => 'payment',
            'success_url' => 'http://localhost/payment/success',
            'cancel_url' => 'http://localhost/payment/cancel',
        ]);

        return new JsonResponse(['id' => $checkout_session->id]);

    }

    #[Route('/payment/success', name: 'payment_success')]
    public function successPayment(){
        return  $this->render('payment/success.html.twig'); 
    }

    #[Route('/payment/cancel', name: 'payment_cancel')]
    public function cancelPayment(){

        return  $this->render('payment/cancel.html.twig'); 
    
        
    }
}
