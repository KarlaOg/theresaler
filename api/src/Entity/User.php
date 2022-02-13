<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\Security;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use ApiPlatform\Core\Annotation\ApiSubresource;


/**
 * @ApiResource(
 *  normalizationContext={"groups"={"user:read"} },
 *  denormalizationContext={"groups"={"user:write"} },
 *  collectionOperations={
 *     "get"={
 *         "access_control"="is_granted('ROLE_ADMIN')",
 *     },
 *     "post",
 * },
 * subresourceOperations={
 *         "purchases_get_subresource"={"path"="/users/{id}/purcharse"},
 * },
 *
 *  itemOperations={
 *     "get"={
 *          "access_control"="is_granted('VIEW_USER', previous_object)",
 *          "normalization_context"={"groups"={"user:read","user:item:get"}},
 *          },
 *     "put"={
 *         "access_control"="is_granted('ROLE_ADMIN')",
 *          },
 *     "delete"={
 *         "access_control"="is_granted('ROLE_ADMIN')",
 *          },
 *  },
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 * @UniqueEntity("email", message="A user with this email address already exists")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="The email must be filled in")
     * @Assert\Email(message="The email must have a valid format")
     * @Groups({"user:read","user:write", "purchase:read", "purchase:write"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="The password must be filled in")
     * @Groups({"user:write"})
     */
    private $password;


    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Last name must be provided")
     * @Assert\Length(min=2, minMessage="Last name must be at least 2 characters")
     * @Groups({"user:read","user:write", "purchase:read"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="The name must be entered")
     * @Assert\Length(min=2, minMessage="First name must be at least 2 characters")
     * @Groups({"user:read","user:write", "purchase:read"})
     */
    private $firstname;


    /**
     * @ORM\OneToMany(targetEntity=Purchase::class, mappedBy="userPurchase", cascade={"persist"})
     * @Groups({"user:read", "user:write"})
     * @ApiSubresource
     */
    private $purchases;

    public function __construct()
    {
        $this->purchases = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }


    /**
     * @return Collection|Purchase[]
     */
    public function getPurchases(): Collection
    {
        return $this->purchases;
    }

    public function addPurchase(Purchase $purchase): self
    {
        if (!$this->purchases->contains($purchase)) {
            $this->purchases[] = $purchase;
            $purchase->setUserPurchase($this);
        }

        return $this;
    }

    public function removePurchase(Purchase $purchase): self
    {
        if ($this->purchases->removeElement($purchase)) {
            // set the owning side to null (unless already changed)
            if ($purchase->getUserPurchase() === $this) {
                $purchase->setUserPurchase(null);
            }
        }

        return $this;
    }
}
