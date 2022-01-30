<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PurchaseRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PurchaseRepository::class)
 * @ApiResource(
 *  collectionOperations={
 *     "get"={
 *
 *          },
 *     "post",
 * },
 *  itemOperations={
 *     "get"={
 *          "normalization_context"={"groups"={"purchase:read","purchase:item:get"}},
 *          },
 * },
 *  normalizationContext={"groups"={"purchase:read"} },
 *  denormalizationContext={"groups"={"purchase:write"} },
 * )
 */
class Purchase
{
    public const STATUS_PENDING = 'PENDING';
    public const STATUS_PAID = 'PAID';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Full name must be provided")
     * @Assert\Length(min=2, minMessage="Full name must be at least 2 characters")
     * @Groups({"purchase:read","purchase:write", "user:item:get"})
     */
    private $fullName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Adress must be provided")
     * @Assert\Length(min=2, minMessage="Adress must be at least 2 characters")
     * @Groups({"purchase:read","purchase:write", "user:item:get"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Postal code must be provided")
     * @Groups({"purchase:read","purchase:write", "user:item:get"})
     */
    private $postalCode;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="city must be provided")
     * @Assert\Length(min=2, minMessage="city must be at least 2 characters")
     * @Groups({"purchase:read","purchase:write", "user:item:get"})
     */
    private $city;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="total must be provided")
     * @Groups({"purchase:read","purchase:write","user:item:get"})
     */
    private $total;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"purchase:read","purchase:write","user:item:get"})
     */
    private $status = 'PENDING';

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="purchases")
     * @Groups("purchase:read")
     */
    private $userPurchase;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"purchase:read","purchase:write"})
     */
    private $purchasedAt;

    /**
     * @ORM\OneToMany(targetEntity=PurchaseItem::class, mappedBy="purchase")
     * @Groups({"purchaseItem:item:get", "purchase:read"})
     */
    private $purchaseItems;



    public function __construct()
    {
        $this->purchaseItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getTotal(): ?int
    {
        return $this->total;
    }

    public function setTotal(int $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getUserPurchase(): ?User
    {
        return $this->userPurchase;
    }

    public function setUserPurchase(?User $userPurchase): self
    {
        $this->userPurchase = $userPurchase;

        return $this;
    }

    public function getPurchasedAt(): ?\DateTimeInterface
    {
        return $this->purchasedAt;
    }

    public function setPurchasedAt(\DateTimeInterface $purchasedAt): self
    {
        $this->purchasedAt = $purchasedAt;

        return $this;
    }

    /**
     * @return Collection|PurchaseItem[]
     */
    public function getPurchaseItems(): Collection
    {
        return $this->purchaseItems;
    }

    public function addPurchaseItem(PurchaseItem $purchaseItem): self
    {
        if (!$this->purchaseItems->contains($purchaseItem)) {
            $this->purchaseItems[] = $purchaseItem;
            $purchaseItem->setPurchase($this);
        }

        return $this;
    }

    public function removePurchaseItem(PurchaseItem $purchaseItem): self
    {
        if ($this->purchaseItems->removeElement($purchaseItem)) {
            // set the owning side to null (unless already changed)
            if ($purchaseItem->getPurchase() === $this) {
                $purchaseItem->setPurchase(null);
            }
        }

        return $this;
    }
}
