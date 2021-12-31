<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class AppFixtures extends Fixture  
{

    public function load(ObjectManager $manager): void
    {
        
        
        $faker = Factory::create();
        for ($i = 0; $i < 20; $i++) {
            $product = new Product();
            $product->setName('product '.$i);
            $product->setDescription($faker->sentence()); 
            $product->setPrice(mt_rand(10, 100));
            $product->setStock($faker->randomDigitNotNull()); 
            $product->setBrand($faker->company()); 
            $product->setSalesType($faker->randomNumber()); 
            $manager->persist($product);
           
        }

      
        $manager->flush();
    }



  
}
