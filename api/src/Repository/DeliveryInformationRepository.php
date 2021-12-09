<?php

namespace App\Repository;

use App\Entity\DeliveryInformation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DeliveryInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeliveryInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeliveryInformation[]    findAll()
 * @method DeliveryInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeliveryInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeliveryInformation::class);
    }

    // /**
    //  * @return DeliveryInformation[] Returns an array of DeliveryInformation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DeliveryInformation
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
