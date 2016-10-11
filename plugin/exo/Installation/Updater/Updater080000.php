<?php

namespace UJM\ExoBundle\Installation\Updater;

use Claroline\BundleRecorder\Log\LoggableTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;
use UJM\ExoBundle\Library\Question\QuestionType;

class Updater080000
{
    use LoggableTrait;

    private $connection;

    public function __construct(ContainerInterface $container)
    {
        $this->connection = $container->get('doctrine.dbal.default_connection');
    }

    public function postUpdate()
    {
        $this->addMimeTypeToQuestions();
        $this->initializeUuid();
    }

    /**
     * Sets questions mime type.
     */
    private function addMimeTypeToQuestions()
    {
        $this->log('Add mime-type to Questions...');

        $oneToOneTypes = [
            'InteractionQCM' => QuestionType::CHOICE,
            'InteractionGraphic' => QuestionType::GRAPHIC,
            'InteractionHole' => QuestionType::CLOZE,
            'InteractionMatching' => QuestionType::MATCH,
        ];

        $sql = 'UPDATE ujm_question SET mime_type = :mime WHERE type = :type';
        $stmt = $this->connection->prepare($sql);

        foreach ($oneToOneTypes as $type => $mime) {
            $stmt->bindValue(':mime', $mime);
            $stmt->bindValue(':type', $type);
            $stmt->execute();
        }

        $wordsSql = sprintf('
            UPDATE ujm_question AS q
            LEFT JOIN ujm_interaction_open AS o ON (o.question_id = q.id)
            LEFT JOIN ujm_type_open_question AS t ON (o.typeopenquestion_id = t.id)
            SET q.mime_type= "%s"
            WHERE q.type= "InteractionOpen"
            AND t.value != "long"
        ', QuestionType::WORDS);

        $openSql = sprintf('
            UPDATE ujm_question AS q
            LEFT JOIN ujm_interaction_open AS o ON (o.question_id = q.id)
            LEFT JOIN ujm_type_open_question AS t ON (o.typeopenquestion_id = t.id)
            SET q.mime_type= "%s"
            WHERE q.type= "InteractionOpen"
            AND t.value = "long"
        ', QuestionType::OPEN);

        $this->connection->exec($wordsSql);
        $this->connection->exec($openSql);
    }

    private function initializeUuid()
    {
        $tables = [
            'ujm_exercise',
            'ujm_step',
            'ujm_question',
        ];

        foreach ($tables as $table) {
            $this->log("Adding UUID in table '{$table}...");

            $query = 'UPDATE '.$table.' SET uuid = (SELECT UUID()) WHERE uuid IS NULL OR uuid = ""';
            $this->connection->query($query);
        }
    }
}
