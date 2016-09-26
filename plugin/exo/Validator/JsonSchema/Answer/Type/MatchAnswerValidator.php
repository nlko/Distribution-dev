<?php

namespace UJM\ExoBundle\Validator\JsonSchema\Answer\Type;

use JMS\DiExtraBundle\Annotation as DI;
use UJM\ExoBundle\Library\Question\Handler\QuestionHandlerInterface;
use UJM\ExoBundle\Library\Question\QuestionType;
use UJM\ExoBundle\Library\Validator\JsonSchemaValidator;

/**
 * @DI\Service("ujm_exo.validator.answer_cloze")
 * @DI\Tag("ujm_exo.answer.validator")
 */
class MatchAnswerValidator extends JsonSchemaValidator implements QuestionHandlerInterface
{
    public function getQuestionMimeType()
    {
        return QuestionType::MATCH;
    }

    public function getJsonSchemaUri()
    {
        return 'answer/match/schema.json';
    }

    public function validateAfterSchema($question, array $options = [])
    {
        return [];
    }
}
