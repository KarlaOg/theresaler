<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PurchaseItemRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=PurchaseItemRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"purchaseItem:read"} },
 *  denormalizationContext={"groups"={"purchaseItem:write"} },
 *  collectionOperations={
 *     "get"={
 * },
 *     "post",
 * },
 *  itemOperations={
 *     "put",
 *     "get"={
 *          "normalization_context"={"groups"={"purchaseItem:item:get", "purchaseItem:read"}},
 *          },
 *     "delete"
 *
 * }
 * )
 */

class PurchaseItem

{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("purchaseItem:read")

     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="purchaseItems")
     * @Assert\NotBlank(message="The product is mandatory")
     * @Groups({"purchaseItem:read","purchase:read", "purchaseItem:write","purchases_subresources"})
     */
    private $product;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="The product name is mandatory")
     * @Groups({"purchaseItem:read","purchaseItem:write", "purchase:write"})
     */
    private $productName;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="The product price is mandatory")
     * @Groups({"purchaseItem:read","purchaseItem:write", "purchase:write"})
     */
    private $productPrice;

    /**
     * @ORM\ManyToOne(targetEntity=Purchase::class, inversedBy="purchaseItems")
     * @Groups({"purchaseItem:read", "purchase:read"})
     */
    private $purchase;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="The product total is mandatory")
     * @Groups({"purchaseItem:read", "purchaseItem:write", "purchases_subresources","purchase:read"})
     */
    private $total;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="The product quantity is mandatory")
     * @Groups({"purchaseItem:read", "purchaseItem:write", "purchases_subresources","purchase:read"})
     */
    private $quantity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getPurchase(): ?Purchase
    {
        return $this->purchase;
    }

    public function setPurchase(?Purchase $purchase): self
    {
        $this->purchase = $purchase;

        return $this;
    }

    public function getProductName(): ?string
    {
        return $this->productName;
    }

    public function setProductName(string $productName): self
    {
        $this->productName = $productName;

        return $this;
    }

    public function getProductPrice(): ?int
    {
        return $this->productPrice;
    }

    public function setProductPrice(int $productPrice): self
    {
        $this->productPrice = $productPrice;

        return $this;
    }

    /**
     * @Groups("purchaseItem:read")
     */
    public function getProductId()
    {
        return $this->getProduct()->getId();
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

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}
