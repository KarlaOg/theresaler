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
        $faker->addProvider(new \Bezhanov\Faker\Provider\Commerce($faker));
        // $faker->addProvider(new Liior\Faker\Prices($faker));
        $faker->addProvider(new \Bezhanov\Faker\Provider\Avatar($faker));

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
                ->setPassword($hash);
            $users[] = $user;

            $manager->persist($user);
        }


        $products = [];


        for ($p = 0; $p < mt_rand(15, 20); $p++) {
            $product = new Product;
            $product
                ->setName($faker->productName())
                ->setBrand($faker->productName())
                ->setDescription($faker->paragraph())
                ->setPrice($faker->randomNumber(2))
                ->setStock($faker->randomNumber(2))
                ->setMainPicture($faker->avatar('foo', '300x300', 'jpg', 'set2', 'bg2'))
                ->setSalesType($faker->boolean());


            $products[] = $product;

            $manager->persist($product);
        }

        $manager->flush();
    }
}
