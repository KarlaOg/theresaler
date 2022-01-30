<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"product:read"} },
 *  denormalizationContext={"groups"={"product:write"} },
 *  attributes={"order": { "date" : "desc" }},
 *  collectionOperations={
 *     "post"={
 *         "access_control"="is_granted('ROLE_ADMIN')",
 *          },
 *     "get",
 * },
 *  itemOperations={
 *     "get",
 *     "put"={
 *          "access_control"="is_granted('ROLE_ADMIN')",

 *          },
 *     "delete"={
 *         "access_control"="is_granted('ROLE_ADMIN')",
 *          },
 *  },
 * )
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"product:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Product name is required")
     * @Assert\Length(min=3, max=255, minMessage="The product name must have at least 3 characters!")
     * @Groups({"product:read","product:write","purchaseItem:item:get"})
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     *  @Assert\NotBlank(message="The short description is mandatory")
     *  @Assert\Length(min=20, minMessage="The short description must still be at least 20 characters")
     * @Groups({"product:read","product:write","purchaseItem:item:get"})
     */
    private $description;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="The stock of the product is mandatory")
     * @Groups({"product:write","purchaseItem:item:get","product:read"})
     */
    private $stock;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="The brand name is mandatory")
     * @Assert\Length(min=3, max=255, minMessage="The brand name must have at least 3 characters")
     * @Groups({"product:read","product:write","purchaseItem:item:get"})
     */
    private $brand;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"product:write", "admin:product_read", "purchaseItem:item:get"})
     */
    private $salesType;

    /**
     * @ORM\Column(type="string", length=100000)
     * @Assert\NotBlank(message="Main photo is required")
     * @Groups({"product:read","product:write", "purchaseItem:item:get"})
     */
    private $mainPicture;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"product:read","product:write", "purchaseItem:item:get"})
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity=PurchaseItem::class, mappedBy="product", orphanRemoval=true)
     * @Groups({"admin:product_read","purchaseItem:read"})
     */
    private $purchaseItems;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="The price of the product is binding")
     * @Groups({"product:read","product:write", "purchaseItem:item:get"})
     */
    private $price;



    public function __construct()
    {
        $this->purchaseItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }


    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getSalesType(): ?bool
    {
        return $this->salesType;
    }

    public function setSalesType(bool $salesType): self
    {
        $this->salesType = $salesType;

        return $this;
    }

    public function getMainPicture(): ?string
    {
        return $this->mainPicture;
    }

    public function setMainPicture(string $mainPicture): self
    {
        $this->mainPicture = $mainPicture;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

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
            $purchaseItem->setProduct($this);
        }

        return $this;
    }

    public function removePurchaseItem(PurchaseItem $purchaseItem): self
    {
        if ($this->purchaseItems->removeElement($purchaseItem)) {
            // set the owning side to null (unless already changed)
            if ($purchaseItem->getProduct() === $this) {
                $purchaseItem->setProduct(null);
            }
        }

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }
}
