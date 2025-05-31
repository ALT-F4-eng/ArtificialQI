from flask import Flask
from artificialqi.routes.dataset_blueprint import dataset_bp
from artificialqi.routes.test_blueprint import test_bp
from artificialqi.routes.wiring import init_app

app = Flask(__name__)
app.register_blueprint(dataset_bp)
app.register_blueprint(test_bp)
# app.register_blueprint(qa_bp)

init_app()


if __name__ == "__main__":
    app.run(debug=True)
