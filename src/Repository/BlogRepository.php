<?php

namespace App\Repository;

use App\Entity\Blog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Blog>
 */
class BlogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Blog::class);
    }

    /**
     * @param Blog entity
     * @param bool flush changes into database
     */
    public function save(Blog $entity, bool $flush = false) : void {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Blog entity
     * @param bool flush changes into database
     */
    public function remove(Blog $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    
    /**
     * @return int
     */
    public function countBlogs() {
        return $this->createQueryBuilder("blog")
            ->select("COUNT(blog.id) as nbrBlogs")
            ->getQuery()
            ->getSingleResult()["nbrBlogs"]
        ;
    }
}
