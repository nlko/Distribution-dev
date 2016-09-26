<?php

namespace UJM\ExoBundle\Manager;

use Claroline\CoreBundle\Persistence\ObjectManager;
use UJM\ExoBundle\Entity\Paper;
use UJM\ExoBundle\Entity\Question;
use UJM\ExoBundle\Entity\Response;
use UJM\ExoBundle\Transfer\Json\ValidationException;

class AnswerManager
{
    /**
     * @var ObjectManager
     */
    private $om;

    public function __construct(
        ObjectManager $om
    ) {
        $this->om = $om;
    }

    public function submit(Paper $paper, Question $question, $data, $userIp)
    {
        $errors = $this->answerValidator->validate($data);
        if (empty($errors)) {
            throw new ValidationException('Answer is not valid.', $errors);
        }

        $answer = $this->answerSerializer->deserialize($data, ['question_type' => $question]);
        $score = $this->scoreManager->calculate($question, $data);

        /** @var Response $response */
        $response = $this->om
            ->getRepository('UJMExoBundle:Response')
            ->findOneBy(['paper' => $paper, 'question' => $question]);
        if (!$response) {
            $response = new Response();
            $response->setPaper($paper);
            $response->setQuestion($question);
            $response->setIp($userIp);
        } else {
            $response->setNbTries($response->getNbTries() + 1);
        }

        $response->setResponse($answer);

        if (-1 !== $score) {
            // Only apply penalties if the answer has been marked
            $score = $this->applyPenalties($paper, $question, $response);
        }

        if (0 >= $score) {
            $score = 0;
        }

        $response->setMark($score);

        $this->om->persist($response);
        $this->om->flush();

        return $answer;
    }

    private function applyPenalties(Paper $paper, Question $question, $score)
    {
        return $score - $this->hintManager->getPenalty($paper, $question);
    }
}
