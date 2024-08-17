<?php

namespace App\Repository;

use App\Entity\Team;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Team>
 */
class TeamRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Team::class);
    }

    /**
     * @param Team entity
     * @param bool flush change into database
     */
    public function save(Team $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);
        
        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Team entity to remove
     * @param bool flush changes into databse
     */
    public function remove(Team $entity, bool $flush = false) : void {
        $this->getEntityManager()->remove($entity);
        
        if($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
