<?php

namespace App\Entity;

use App\Repository\PriceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PriceRepository::class)]
class Price
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $offerType = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $price = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, PriceDetail>
     */
    #[ORM\OneToMany(targetEntity: PriceDetail::class, mappedBy: 'price')]
    private Collection $priceDetails;

    public function __construct()
    {
        $this->priceDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOfferType(): ?string
    {
        return $this->offerType;
    }

    public function setOfferType(string $offerType): static
    {
        $this->offerType = $offerType;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, PriceDetail>
     */
    public function getPriceDetails(): Collection
    {
        return $this->priceDetails;
    }

    public function addPriceDetail(PriceDetail $priceDetail): static
    {
        if (!$this->priceDetails->contains($priceDetail)) {
            $this->priceDetails->add($priceDetail);
            $priceDetail->setPrice($this);
        }

        return $this;
    }

    public function removePriceDetail(PriceDetail $priceDetail): static
    {
        if ($this->priceDetails->removeElement($priceDetail)) {
            // set the owning side to null (unless already changed)
            if ($priceDetail->getPrice() === $this) {
                $priceDetail->setPrice(null);
            }
        }

        return $this;
    }
}
