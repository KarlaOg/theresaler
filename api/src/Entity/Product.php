<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  normalizationContext={"groups": "products_read"},
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
 *         "access_control"="is_granted('ROLE_ADMIN')",
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
     * @Groups("products_read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom du produit est obligatoire !")
     * @Assert\Length(min=3, max=255, minMessage="Le nom du produit doit avoir au moins 3 caractères !")
     * @Groups("products_read")
     */
    private $name;

    /**
     * @ORM\Column(type="text")
     *  @Assert\NotBlank(message="La description courte est obligatoire")
     *  @Assert\Length(min=20, minMessage="La description courte doit quand même faire au moins 20 caractères")
     * @Groups("products_read")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le prix du produit est obligatoire !")
     * @Groups("products_read")
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Le stock du produit est obligatoire !")
     * @Groups("products_read")
     */
    private $stock;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le nom de la marque est obligatoire !")
     * @Assert\Length(min=3, max=255, minMessage="Le nom de la marque doit avoir au moins 3 caractères !")
     * @Groups("products_read")
     */
    private $brand;

    /**
     * @ORM\Column(type="boolean")
     * @Groups("products_read")
     */
    private $salesType;

    /**
     * @ORM\Column(type="string", length=100000)
     * @Assert\NotBlank(message="La photo principale est obligatoire")
     * @Groups("products_read")
     */
    private $mainPicture;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("products_read")
     */
    private $date;

    /**
     * @ORM\OneToMany(targetEntity=PurchaseItem::class, mappedBy="product")
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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

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
}
