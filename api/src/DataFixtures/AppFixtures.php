<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Product;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    protected $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        //ADMIN
        $admin = new User;
        $hash = $this->encoder->hashPassword($admin, "password");
        $admin->setEmail("admin@admin.com")
            ->setFirstname("admin")
            ->setLastname("admin")
            ->setPassword($hash)
            ->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);


        //USERS
        for ($u = 0; $u < 20; $u++) {
            $user = new User();
            $hash = $this->encoder->hashPassword($user, "password");
            $user->setEmail("user$u@gmail.com")
                ->setFirstname($faker->firstName())
                ->setLastname($faker->lastName())
                ->setPassword($hash)
                ->setRoles(['ROLE_USER']);
            $users[] = $user;

            $manager->persist($user);

        }

         
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

        $manager->flush();
    }
}
