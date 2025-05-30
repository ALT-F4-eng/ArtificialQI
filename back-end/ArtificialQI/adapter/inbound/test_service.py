from typing import Optional
from uuid import UUID
from google import genai
import requests
from sentence_transformers import SentenceTransformer, util
from concurrent.futures import ThreadPoolExecutor, as_completed

from common.exceptions import PersistenceException, TestNonExistentException, InvalidTestOperationException
from core.test import Test
from core.test_factory import TestFactory
from port.inbound.test_use_case import TestUseCase
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository
from core.question_answer_pair import Question_Answer_Pair
from core.test_result import TestResult


class TestService(TestUseCase):

    MODELS = {
        'distilbert-base-nli-stsb-mean-tokens': SentenceTransformer('distilbert-base-nli-stsb-mean-tokens'),
        'roberta-large-nli-stsb-mean-tokens': SentenceTransformer('roberta-large-nli-stsb-mean-tokens'),
        'all-mpnet-base-v2': SentenceTransformer('all-mpnet-base-v2')
    }

    def __init__(
        self,
        dataset_repo: DatasetRepository,
        qa_repo: QuestionAnswerPairRepository,
        test_repo: TestRepository,
        result_repo: TestResultRepository,
    ):
        self._dataset_repo: DatasetRepository = dataset_repo
        self._qa_repo: QuestionAnswerPairRepository = qa_repo
        self._test_repo: TestRepository = test_repo
        self._result_repo: TestResultRepository = result_repo

    def delete_test(self, id: UUID) -> UUID:
        test_to_del: Optional[Test] = self._test_repo.get_test_by_id(id)
        if test_to_del is None:
            raise TestNonExistentException(id)
        res_to_del: bool = self._result_repo.delete_all_from_test(id)
        if not res_to_del:
            raise PersistenceException(
                "Errore durante l'eliminazione del contenuto del test."
            )
        result: Optional[UUID] = self._test_repo.delete_test(id)
        if result is None:
            raise PersistenceException("Errore durante l'eliminazione del test.")
        return result

    def update_test(self, id: UUID, name: str) -> Test:
        test_to_update: Optional[Test] = self._test_repo.get_test_by_id(id)
        if test_to_update is None:
            raise TestNonExistentException(id)
        if test_to_update.is_tmp():
            raise InvalidTestOperationException(
                "Non è possibile rinominare un test non salvato."
            )
        updated_test: Test = TestFactory.saved(
            id=test_to_update.id,
            dataset=test_to_update.dataset,
            llm=test_to_update.llm,
            index=test_to_update.index,
            name=name,
            execution_date=test_to_update.execution_date,
        )
        res: Optional[Test] = self._test_repo.update_test(updated_test)
        if res is None:
            raise PersistenceException("Errore durante l'aggiornamento del test.")
        return res

    def save(self, id: UUID, name: str) -> Test:
        test_to_save: Optional[Test] = self._test_repo.get_test_by_id(id)
        if test_to_save is None:
            raise TestNonExistentException(id)
        if not test_to_save.is_tmp():
            raise InvalidTestOperationException("Il test è già salvato.")
        updated_test: Test = TestFactory.saved(
            id=test_to_save.id,
            dataset=test_to_save.dataset,
            llm=test_to_save.llm,
            index=test_to_save.index,
            name=name,
            execution_date=test_to_save.execution_date,
        )
        res: Optional[Test] = self._test_repo.update_test(updated_test)
        if res is None:
            raise PersistenceException("Errore durante l'aggiornamento del test.")
        return res

    def get_all_tests(self, q: str = "") -> list[Test]:
        tests: Optional[list[Test]] = self._test_repo.get_all_tests(q)
        if tests is None:
            raise PersistenceException("Errore durante l'ottenimento dei test.")
        return tests

    def get_test_by_id(self, id: UUID) -> Test:
        test: Optional[Test] = self._test_repo.get_test_by_id(id)
        if test is None:
            raise TestNonExistentException(id)
        return test

    def run_test(self, dataset: UUID, llm: UUID) -> list[TestResult]:
        #creare con la factory un test temporaneo assegnando un uuid e salvare il test su db con is_tmp a true (ci ricaviamo l'id da assegnare ai test_result)
        #qa_list: list[Question_Answer_Pair] = _qa_repo.get_all_qa_list(dataset)
        #qa_question_list :list[str]= []
        #for qa_item in qa_list:
        #    qa_question_list.append(qa_item.question)
        domanda : str = "in che anno è nato cristoforo colombo?"
        obtained_answer: list[str] =[]
        pass

    @staticmethod
    def text_similarity(sentence_1: str, sentence_2: str, model_name: str) -> float:
        model = TestService.MODELS[model_name]
        emb1 = model.encode(sentence_1, convert_to_tensor=True)
        emb2 = model.encode(sentence_2, convert_to_tensor=True)
        return util.cos_sim(emb1, emb2).item()

    @staticmethod
    def count_math(sentence: str) -> int:
        math_characters = set("+-*/%^=<>")
        count_numbers = 0
        count_characters = 0
        mem_number = []
        for i, character in enumerate(sentence):
            if character.isdigit():
                mem_number.append(character)
            if (character == " " or character in math_characters or i == len(sentence) - 1) and mem_number:
                mem_number = []
                count_numbers += 1
            if character in math_characters:
                count_characters += 1
        return count_numbers + count_characters

    @staticmethod
    def choose_model(answer: str, numbers_math_characters: int) -> str:
        words = answer.split()
        n_words = len(words)
        if n_words <= 10 and numbers_math_characters < 3:
            return 'distilbert-base-nli-stsb-mean-tokens'
        elif 10 < n_words <= 20 or numbers_math_characters >= 3:
            return 'roberta-large-nli-stsb-mean-tokens'
        else:
            return 'all-mpnet-base-v2'

    @classmethod
    def categorize(cls, questions: list[str], true_answers: list[str], generated_answers: list[str]) -> list[dict]:
        results = []
        if len(true_answers) != len(generated_answers):
            return results
        for i in range(len(true_answers)):
            sentence = (questions[i] + " " + true_answers[i]).replace("\n", "")
            math_count = cls.count_math(sentence)
            model_name = cls.choose_model(true_answers[i], math_count)
            similarity = cls.text_similarity(true_answers[i], generated_answers[i], model_name)
            results.append({
                'question': questions[i],
                'trueAnswer': true_answers[i],
                'generatedAnswer': generated_answers[i],
                'similarity': round(similarity, 2)
            })
        return results

    @staticmethod
    def run_domanda(domanda: str) -> str:
        url = "http://padova.zucchetti.it:11434/api/generate"
        modello = "llama3.1:latest"
        try:
            response = requests.post(url, json={"model": modello, "prompt": domanda, "stream": False}, timeout=10)
            response.raise_for_status()
            return response.json()["response"]
        except requests.RequestException as e:
            return f"Errore nella richiesta: {e}"

    @classmethod
    def run_domande_parallel(cls, domande: list[str]) -> list[str]:
        risposte = [None] * len(domande)
        with ThreadPoolExecutor(max_workers=5) as executor:
            future_to_index = {executor.submit(cls.run_domanda, d): i for i, d in enumerate(domande)}
            for future in as_completed(future_to_index):
                i = future_to_index[future]
                risposte[i] = future.result()
        return risposte

    @staticmethod
    def answer_compatibility_gemini_batch(expected_answers: list[str], generated_answers: list[str]) -> list[bool]:
        if len(expected_answers) != len(generated_answers):
            raise ValueError("Le liste devono avere la stessa lunghezza.")
        client = genai.Client(api_key="AIzaSyC9ogTzdhtUCc8XjxEDwvfIL6uv58rojt4")
        results = []
        for i in range(0, len(expected_answers), 15):
            expected_batch = expected_answers[i:i+15]
            generated_batch = generated_answers[i:i+15]
            prompt = (
                "Per ogni coppia di risposte seguenti, valuta se la **risposta generata esprime la stessa informazione essenziale** della risposta attesa.\n"
                "Non penalizzare differenze di stile, lunghezza, o struttura. Anche risposte molto brevi o riformulate vanno considerate compatibili **se trasmettono correttamente il significato** della risposta attesa.\n"
                "Rispondi solo con True o False per ogni coppia, una per riga, senza spiegazioni.\n\n"
            )
            for exp, gen in zip(expected_batch, generated_batch):
                prompt += f"Attesa: \"{exp}\"\nGenerata: \"{gen}\"\n\n"
            try:
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=prompt
                )
                output_lines = response.text.strip().splitlines()
                batch_results = []
                for line in output_lines:
                    line_lower = line.strip().lower()
                    if "true" in line_lower:
                        batch_results.append(True)
                    elif "false" in line_lower:
                        batch_results.append(False)
                while len(batch_results) < len(expected_batch):
                    batch_results.extend([False] * (len(expected_batch) - len(batch_results)))
                results.extend(batch_results)
            except Exception:
                results.extend([False] * len(expected_batch))
        return results
