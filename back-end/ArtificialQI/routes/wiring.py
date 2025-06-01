from artificialqi.routes.containers import AppContainer
from artificialqi.routes import dataset_blueprint 
from artificialqi.routes import qa_blueprint
from artificialqi.routes import test_result_blueprint
from artificialqi.routes import dataset_blueprint, test_blueprint

container = AppContainer()

def init_app():
    container.wire(modules=[dataset_blueprint, qa_blueprint, test_blueprint, test_result_blueprint])
