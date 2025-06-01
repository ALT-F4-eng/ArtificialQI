from artificialqi.core.llm import Llm
from artificialqi.port.outbound.llm_comunication import LlmComunicationPort
from artificialqi.core.embeddings_llm_test_method import EmbeddingsLlmTestMethod
from artificialqi.core.question_answer_pair import QuestionAnswerPair
from artificialqi.core.test_result import TestResult, test_result_factory_function
from uuid import uuid4

from google import genai
from sentence_transformers import util
import torch
from dataclasses import dataclass

@dataclass
class TestTemplateMethod:
    llm_to_test: Llm
    comunication_port: LlmComunicationPort
    embeddings: EmbeddingsLlmTestMethod

    def similarity_score(self, expected_answer: str, answer: str) -> float:
        math_count = self.embeddings.count_math(answer)
        model_name = self.embeddings.choose_model(answer, math_count)
        model = self.embeddings.models[model_name]

        emb1: torch.Tensor = model.encode(expected_answer, convert_to_tensor=True)
        emb2: torch.Tensor = model.encode(answer, convert_to_tensor=True)
        similarity: float = util.cos_sim(emb1, emb2).item()
        return similarity

    def test(self, qas: list[QuestionAnswerPair]) -> list[TestResult]:
        # qas è la lista di coppie domanda-risposta da testare
        # self.llm_to_test è l'istanza del LLM da testare
        # self.comunication_port è il port per la comunicazione con il LLM
        # deve restituire una lista di risultati costruiti con loro campi qa, test, obtained_answer, similarity_score, is_correct
        # deve chiamare la funzione ask_to_llm(q:Question, conf:ComunicationConfig): Optional<str> di LlmComunicationPort
        # LlmComunicationPort usa ask_to_llmq:Question, conf:HttpConfig): Optional<str> della classe HttpLlmComunicationAdapter
        # La funzione test deve quindi iterare su qas, per ogni qa deve chiamare ask_to_llm,
        # calcolare il similarity_score e controllare se le risposte attese e quelle generate dal LLM sono compatibili
        # tramite il metodo is_correct che riceve liste di risposte attese e risposte generate visto che lavora in batch
        obtained_answers: list[str] = []

        # Step 1–3: otteniamo le risposte e calcoliamo la similarità
        similarities = []
        for qa in qas:
            obtained = self.comunication_port.ask_to_llm(qa.question, self.llm_to_test.config)
            obtained = obtained or ""  # fallback se None

            similarity = self.similarity_score(qa.answer, obtained)
            obtained_answers.append(obtained)
            similarities.append(similarity)

        # Step 4: valutiamo correttezza in batch
        expected_answers = [qa.answer for qa in qas]
        correctness = self.is_correct(expected_answers, obtained_answers)
        id_test = uuid4()
        # Step 5: costruiamo i risultati
        results: list[TestResult] = []
        for qa, obtained, sim, correct in zip(qas, obtained_answers, similarities, correctness):
            result = test_result_factory_function(
            question_answer_pair=qa,
            obtained_answer=obtained,
            similarity_score=sim,
            is_correct=correct,
            test_id=id_test,
            )
            results.append(result)

        return results

def is_correct(self, expected_answers: list[str], answers: list[str]) -> list[bool]:
    if len(expected_answers) != len(answers):
        raise ValueError("Le liste devono avere la stessa lunghezza.")
    client = genai.Client(api_key="AIzaSyC9ogTzdhtUCc8XjxEDwvfIL6uv58rojt4")
    results = []
    for i in range(0, len(expected_answers), 15):
        expected_batch = expected_answers[i:i+15]
        generated_batch = answers[i:i+15]
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


