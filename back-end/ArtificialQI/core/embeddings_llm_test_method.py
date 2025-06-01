from sentence_transformers import SentenceTransformer
from typing import Dict
from dataclasses import dataclass

@dataclass
class EmbeddingsLlmTestMethod:
    models: Dict[str, SentenceTransformer] = {
            'distilbert-base-nli-stsb-mean-tokens': SentenceTransformer('distilbert-base-nli-stsb-mean-tokens'),
            'roberta-large-nli-stsb-mean-tokens': SentenceTransformer('roberta-large-nli-stsb-mean-tokens'),
            'all-mpnet-base-v2': SentenceTransformer('all-mpnet-base-v2'),
        }

@staticmethod
def count_math(sentence: str) -> int:
    math_symbols = set("+-*/%^=<>")
    in_number = False
    num_count = 0
    symbol_count = 0

    for c in sentence:
        if c.isdigit():
            if not in_number:
                num_count += 1
                in_number = True
        else:
            in_number = False
            if c in math_symbols:
                symbol_count += 1

    return num_count + symbol_count

@staticmethod
def choose_model(answer: str, math_count: int) -> str:
    word_count = len(answer.split())

    if word_count <= 10 and math_count < 3:
        return 'distilbert-base-nli-stsb-mean-tokens'
    elif 10 < word_count <= 20 or math_count >= 3:
        return 'roberta-large-nli-stsb-mean-tokens'
    else:
        return 'all-mpnet-base-v2'
