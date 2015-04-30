<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\AgendaBundle\Listener;

use Claroline\CoreBundle\Listener\NoHttpRequestException;
use JMS\DiExtraBundle\Annotation as DI;
use Claroline\CoreBundle\Form\Factory\FormFactory;
use Claroline\CoreBundle\Event\DisplayWidgetEvent;
use Claroline\CoreBundle\Event\DisplayToolEvent;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Claroline\CoreBundle\Entity\Workspace\Workspace;

/**
 *  @DI\Service()
 */
class AgendaListener
{
    private $formFactory;
    private $templating;
    private $tokenStorage;
    private $authorization;
    private $container;
    private $router;
    private $request;
    private $httpKernel;

    /**
     * @DI\InjectParams({
     *     "formFactory"    = @DI\Inject("claroline.form.factory"),
     *     "templating"     = @DI\Inject("templating"),
     *     "authorization"   = @DI\Inject("security.authorization_checker"),
     *     "tokenStorage"    = @DI\Inject("security.token_storage"),
     *     "container"      = @DI\Inject("service_container"),
     *     "router"         = @DI\Inject("router"),
     *     "requestStack"   = @DI\Inject("request_stack"),
     *     "httpKernel"     = @DI\Inject("http_kernel")
     * })
     */
    public function __construct(
        FormFactory $formFactory,
        TwigEngine $templating,
        TokenStorageInterface $tokenStorage,
        AuthorizationCheckerInterface $authorization,
        ContainerInterface $container,
        RouterInterface $router,
        RequestStack $requestStack,
        HttpKernelInterface $httpKernel
    )
    {
        $this->formFactory = $formFactory;
        $this->templating = $templating;
        $this->tokenStorage = $tokenStorage;
        $this->authorization = $authorization;
        $this->container = $container;
        $this->router = $router;
        $this->request = $requestStack->getCurrentRequest();
        $this->httpKernel = $httpKernel;
    }

    /**
     * @DI\Observe("widget_agenda")
     *
     * @param DisplayWidgetEvent $event
     */
    public function onDisplay(DisplayWidgetEvent $event)
    {
        if ($event->getInstance()->isDesktop()) {
            $event->setContent($this->desktopWidgetAgenda());
        } else {
            $event->setContent($this->workspaceWidgetAgenda($event->getInstance()->getWorkspace()->getId()));
        }
        $event->stopPropagation();
    }

    public function workspaceWidgetAgenda($id)
    {
        $em = $this->container->get('doctrine.orm.entity_manager');
        $listEvents = $em->getRepository('ClarolineAgendaBundle:Event')->getLastEventsForWorkspace($id);

        return $this->templating->render(
            'ClarolineAgendaBundle:Widget:agenda_widget.html.twig',
            array('listEvents' => $listEvents)
        );
    }

    public function desktopWidgetAgenda()
    {
        if (!$this->request) {
            throw new NoHttpRequestException();
        }

        $em = $this->container->get('doctrine.orm.entity_manager');
        $user = $this->tokenStorage->getToken()->getUser();
        $listEventsDesktop = $em->getRepository('ClarolineAgendaBundle:Event')->getLastEventsForDesktop($user);

        return $this->templating->render(
            'ClarolineAgendaBundle:Widget:agenda_widget.html.twig',
            array('listEvents' => $listEventsDesktop)
        );
    }

    /**
     * @DI\Observe("open_tool_workspace_agenda")
     *
     * @param DisplayToolEvent $event
     */
    public function onDisplayWorkspaceAgenda(DisplayToolEvent $event)
    {
        $event->setContent($this->workspaceAgenda($event->getWorkspace()));
    }

    /**
     * @DI\Observe("open_tool_desktop_agenda")
     *
     * @param DisplayToolEvent $event
     */
    public function onDisplayDesktopAgenda(DisplayToolEvent $event)
    {
        $event->setContent($this->desktopAgenda());
    }

    public function workspaceAgenda(Workspace $workspace)
    {
        $em = $this->container->get('doctrine.orm.entity_manager');
        $listEvents = $em->getRepository('ClarolineAgendaBundle:Event')
            ->findByWorkspaceId($workspace->getId(), true);
        $canCreate = $this->authorization->isGranted(array('agenda', 'edit'), $workspace);

        return $this->templating->render(
            'ClarolineAgendaBundle:Tool/workspace/agenda:agenda.html.twig',
            array(
                'workspace' => $workspace,
                'canCreate' => $canCreate
            )
        );
    }

    public function desktopAgenda()
    {
        $em = $this->container->get('doctrine.orm.entity_manager');
        $usr = $this->tokenStorage->getToken()->getUser();
        $listEventsDesktop = $em->getRepository('ClarolineAgendaBundle:Event')->findDesktop($usr, true);
        $listEvents = $em->getRepository('ClarolineAgendaBundle:Event')->findByUser($usr, false);
        $workspaces = array();
        $filters = array();

        foreach ($listEvents as $event) {
            $filters[$event->getWorkspace()->getId()] = $event->getWorkspace()->getName();
        }

        if (count($listEventsDesktop) > 0) {
            $filters[0] = $this->container->get('translator')->trans('desktop', array(), 'platform');
        }

        return $this->templating->render(
            'ClarolineAgendaBundle:Tool/desktop/agenda:agenda.html.twig',
            array(
                'listEvents' => $listEventsDesktop,
                'filters' => $filters
            )
        );
    }
}
