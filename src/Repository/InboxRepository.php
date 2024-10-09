<?php

namespace App\Repository;

use App\Entity\Inbox;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Inbox>
 */
class InboxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Inbox::class);
    }

    /**
     * @param Inbox entity
     * @param bool flush
     */
    public function save(Inbox $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Inbox entity
     * @param bool flush
     */
    public function remove(Inbox $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countInbox() {
        return $this->createQueryBuilder("inbox")
            ->select("COUNT(inbox.id) as nbrInboxs")
            ->getQuery()
            ->getSingleResult()["nbrInboxs"]
        ;
    }
}
