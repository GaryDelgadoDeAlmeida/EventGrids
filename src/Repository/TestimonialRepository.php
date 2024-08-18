<?php

namespace App\Repository;

use App\Entity\Testimonial;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Testimonial>
 */
class TestimonialRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Testimonial::class);
    }

    /**
     * @param Testimonial entity to insert
     * @param bool flush changes into database
     */
    public function save(Testimonial $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Testimonial entity to remove
     * @param bool flush changes into database
     */
    public function remove(Testimonial $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countTestimonials() : int {
        return $this->createQueryBuilder("testimonial")
            ->select("COUNT(testimonial.id) as nbrTestimonial")
            ->getQuery()
            ->getSingleResult()["nbrTestimonial"]
        ;
    }
}
