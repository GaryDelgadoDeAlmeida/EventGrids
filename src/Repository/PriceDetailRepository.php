<?php

namespace App\Repository;

use App\Entity\PriceDetail;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PriceDetail>
 */
class PriceDetailRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PriceDetail::class);
    }

    /**
     * @param PriceDetail entity
     * @param bool flush
     */
    public function save(PriceDetail $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param PriceDetail entity
     * @param bool flush
     */
    public function remove(PriceDetail $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
