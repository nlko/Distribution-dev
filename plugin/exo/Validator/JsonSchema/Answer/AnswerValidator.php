<?php

namespace UJM\ExoBundle\Validator\JsonSchema\Answer;

use JMS\DiExtraBundle\Annotation as DI;
use UJM\ExoBundle\Library\Validator\ValidatorInterface;
use UJM\ExoBundle\Validator\JsonSchema\HintValidator;

/**
 * @DI\Service("ujm_exo.validator.answer")
 */
class AnswerValidator implements ValidatorInterface
{
    /**
     * @var QuestionAnswerCollector
     */
    private $validatorCollector;

    /**
     * QuestionValidator constructor.
     *
     * @param QuestionAnswerCollector $validatorCollector
     *
     * @DI\InjectParams({
     *     "validatorCollector" = @DI\Inject("ujm_exo.validator.answer_collector")
     * })
     */
    public function __construct(QuestionAnswerCollector $validatorCollector)
    {
        $this->validatorCollector = $validatorCollector;
    }

    public function validate($answer, array $options = [])
    {
        return $this->validatorCollector->validateMimeType($answer, $options);
    }
}
