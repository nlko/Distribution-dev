<?php
/**
 * Created by : Vincent SAISSET
 * Date: 22/08/13
 * Time: 09:30
 */

namespace Innova\CollecticielBundle\Controller;

use Claroline\CoreBundle\Event\Log\LogResourceReadEvent;
use Claroline\CoreBundle\Library\Resource\ResourceCollection;
use Innova\CollecticielBundle\Entity\Dropzone;
use Innova\CollecticielBundle\Event\Log\LogCorrectionDeleteEvent;
use Innova\CollecticielBundle\Event\Log\LogCorrectionEndEvent;
use Innova\CollecticielBundle\Event\Log\LogCorrectionStartEvent;
use Innova\CollecticielBundle\Event\Log\LogCorrectionUpdateEvent;
use Innova\CollecticielBundle\Event\Log\LogCorrectionValidationChangeEvent;
use Innova\CollecticielBundle\Event\Log\LogCriterionCreateEvent;
use Innova\CollecticielBundle\Event\Log\LogCriterionDeleteEvent;
use Innova\CollecticielBundle\Event\Log\LogCriterionUpdateEvent;
use Innova\CollecticielBundle\Event\Log\LogDocumentCreateEvent;
use Innova\CollecticielBundle\Event\Log\LogDocumentDeleteEvent;
use Innova\CollecticielBundle\Event\Log\LogDocumentOpenEvent;
use Innova\CollecticielBundle\Event\Log\LogDropEndEvent;
use Innova\CollecticielBundle\Event\Log\LogDropEvaluateEvent;
use Innova\CollecticielBundle\Event\Log\LogDropStartEvent;
use Innova\CollecticielBundle\Event\Log\LogDropzoneConfigureEvent;
use Innova\CollecticielBundle\Event\Log\LogDropzoneManualStateChangedEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class DropzoneBaseController extends Controller
{
    const CRITERION_PER_PAGE = 10;
    const DROP_PER_PAGE = 10;
    const CORRECTION_PER_PAGE = 10;


    protected function dispatch($event)
    {
        if (
            $event instanceof LogResourceReadEvent or
            $event instanceof LogDropzoneConfigureEvent or
            $event instanceof LogCriterionCreateEvent or
            $event instanceof LogCriterionUpdateEvent or
            $event instanceof LogCriterionDeleteEvent or
            $event instanceof LogDropStartEvent or
            $event instanceof LogDropEndEvent or
            $event instanceof LogDocumentCreateEvent or
            $event instanceof LogDocumentDeleteEvent or
            $event instanceof LogDocumentOpenEvent or
            $event instanceof LogCorrectionStartEvent or
            $event instanceof LogCorrectionEndEvent or
            $event instanceof LogCorrectionUpdateEvent or
            $event instanceof LogCorrectionDeleteEvent or
            $event instanceof LogCorrectionValidationChangeEvent or
            $event instanceof LogDropEvaluateEvent or
            $event instanceof LogDropReportEvent or
            $event instanceof LogDropzoneManualStateChangedEvent
        ) {

            // Other logs are WIP.
            $this->get('event_dispatcher')->dispatch('log', $event);
        }
        //$this->get('event_dispatcher')->dispatch('log', $event);

        return $this;
    }
}