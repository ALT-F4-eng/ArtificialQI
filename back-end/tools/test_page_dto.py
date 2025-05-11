from tools.test_result_dto import TestResultDto

class TestPageDto:
    def __init__(self, page_n:int, result_list:TestResultDto):#PERCHE' QUI C'è TestResultDto MA SU DATASETPAGE CE QuestionAnswerPair e non QuestionAnswerPairDto?
        self.page_n:int = page_n
        self.result_list:list[TestResultDto] = result_list
    
    def get_page_n(self) -> int:
        return self.page_n
    
    def get_result_list(self) -> list[TestResultDto]:
        return self.result_list
    
    def to_dict(self) -> dict:
        serialized = []
        for test in self.result_list:
            if hasattr(test, 'to_dict') and callable(test.to_dict):
                serialized.append(test.to_dict())
            else:
                serialized.append(vars(test))
        return {
            'page_n':self.page_n,
            'tests':serialized
        } 