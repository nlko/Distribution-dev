<?php

namespace UJM\ExoBundle\Serializer\Answer\Type;

use JMS\DiExtraBundle\Annotation as DI;
use UJM\ExoBundle\Library\Question\Handler\QuestionHandlerInterface;
use UJM\ExoBundle\Library\Question\QuestionType;
use UJM\ExoBundle\Library\Serializer\SerializerInterface;

/**
 * @DI\Service("ujm_exo.serializer.answer_match")
 * @DI\Tag("ujm_exo.answer.serializer")
 */
class MatchAnswerSerializer implements QuestionHandlerInterface, SerializerInterface
{
    public function getQuestionMimeType()
    {
        return QuestionType::MATCH;
    }

    public function serialize($entity, array $options = [])
    {
        // TODO: Implement serialize() method.
    }

    public function deserialize($entity, array $options = [])
    {
        // TODO: Implement deserialize() method.
    }
}
