<?php

namespace App\Entity;

use App\Repository\BetRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BetRepository::class)
 */
class Bet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $initialPrice;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $finalPrice;

    /**
     * @ORM\Column(type="date")
     */
    private $auctionDate;

    /**
     * @ORM\Column(type="integer")
     */
    private $businessId;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAuctionClose;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInitialPrice(): ?int
    {
        return $this->initialPrice;
    }

    public function setInitialPrice(int $initialPrice): self
    {
        $this->initialPrice = $initialPrice;

        return $this;
    }

    public function getFinalPrice(): ?string
    {
        return $this->finalPrice;
    }

    public function setFinalPrice(string $finalPrice): self
    {
        $this->finalPrice = $finalPrice;

        return $this;
    }

    public function getAuctionDate(): ?\DateTimeInterface
    {
        return $this->auctionDate;
    }

    public function setAuctionDate(\DateTimeInterface $auctionDate): self
    {
        $this->auctionDate = $auctionDate;

        return $this;
    }

    public function getBusinessId(): ?int
    {
        return $this->businessId;
    }

    public function setBusinessId(int $businessId): self
    {
        $this->businessId = $businessId;

        return $this;
    }

    public function getIsAuctionClose(): ?bool
    {
        return $this->isAuctionClose;
    }

    public function setIsAuctionClose(bool $isAuctionClose): self
    {
        $this->isAuctionClose = $isAuctionClose;

        return $this;
    }
}
