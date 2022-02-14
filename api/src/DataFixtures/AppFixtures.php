<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Product;
use App\Entity\Purchase;
use App\Entity\PurchaseItem;
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


        for ($p = 0; $p < 40; $p++) {
            $product = new Product;
            $product
                ->setName($faker->productName())
                ->setBrand($faker->productName())
                ->setDescription($faker->paragraph())
                ->setPrice($faker->randomNumber(2))
                ->setStock($faker->randomNumber(2))
                ->setDate($faker->dateTime())
                ->setMainPicture($faker->avatar("$p", '300x300', 'jpg', "set$p", 'bg2'));


            $products[] = $product;

            $manager->persist($product);
        }

        for ($p = 0; $p < mt_rand(20, 40); $p++) {
            $purchase = new Purchase;
            $purchase->setFullName($faker->name)
                ->setAddress($faker->streetAddress)
                ->setPostalCode($faker->postcode)
                ->setCity($faker->city)
                ->setUserPurchase($faker->randomElement($users))
                ->setTotal(mt_rand(2000, 30000))
                ->setPurchasedAt($faker->dateTimeBetween('-6 months'));

            $selectedProducts = $faker->randomElements($products, mt_rand(3, 5));

            foreach ($selectedProducts as $product) {
                $purchaseItem = new PurchaseItem;
                $purchaseItem->setProduct($product)
                    ->setQuantity(mt_rand(1, 3))
                    ->setProductName($product->getName())
                    ->setProductPrice($product->getPrice())
                    ->setTotal(
                        $purchaseItem->getProductPrice() * $purchaseItem->getQuantity()
                    )
                    ->setPurchase($purchase);

                $manager->persist($purchaseItem);
            }

            if ($faker->boolean(90)) {
                $purchase->setStatus(Purchase::STATUS_PAID);
            }

            $manager->persist($purchase);
        }

        $manager->flush();
    }
}
