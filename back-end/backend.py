from flask import Flask
from port.dataset import Dataset
from port.question_answer_pair import QuestionAnswerPair


app = Flask(__name__)

dataset_port = Dataset()
app.add_url_rule('/datasets/', view_func=dataset_port.get_all_datasets, methods = ['GET'])
app.add_url_rule('/datasets/<dataset_id>/', view_func=dataset_port.get_dataset, methods = ['GET'])
app.add_url_rule('/datasets/', view_func=dataset_port.create_dataset, methods = ['POST'])
app.add_url_rule('/datasets/<dataset_id>/', view_func=dataset_port.update_dataset, methods = ['PUT'])
app.add_url_rule('/datasets/<dataset_id>/', view_func=dataset_port.delete_dataset, methods = ['DELETE'])

questionanswer_port = QuestionAnswerPair()
app.add_url_rule('/datasets/<dataset_id>/qas/', view_func=questionanswer_port.get_qa_page, methods = ['GET'])
app.add_url_rule('/datasets/<dataset_id>/qas/', view_func=questionanswer_port.create_qa, methods = ['POST'])
app.add_url_rule('/datasets/<dataset_id>/qas/<qa_id>/', view_func=questionanswer_port.update_qa, methods = ['PUT'])
app.add_url_rule('/datasets/<dataset_id>/qas/<qa_id>/', view_func=questionanswer_port.delete_qa, methods = ['DELETE'])

if __name__ == '__main__':
    app.run(debug=True)