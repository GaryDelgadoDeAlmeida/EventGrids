<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Comment>
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    /**
     * @param Comment entity
     * @param bool flush
     */
    public function save(Comment $entity, bool $flush = false) {
        $this->getEntityManager()->persist($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Comment entity
     * @param bool flush
     */
    public function remove(Comment $entity, bool $flush = false) {
        $this->getEntityManager()->remove($entity);

        if($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return int
     */
    public function countComments() {
        return $this->createQueryBuilder("comment")
            ->select("COUNT(comment.id) as nbrComments")
            ->getQuery()
            ->getSingleResult()["nbrComments"]
        ;
    }
}
