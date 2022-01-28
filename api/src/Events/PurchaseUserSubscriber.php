<?php

namespace App\Events;

use App\Entity\Purchase;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PurchaseUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForPurchase', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForPurchase(ViewEvent $event)
    {
        $purchase = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($purchase instanceof Purchase && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            // Assigner l'utilisateur au Purchase qu'on est en train de créer
            if ($user) {
                $purchase->setUserPurchase($user);
            }
        }
    }
}
