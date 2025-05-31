from artificialqi.routes.containers import AppContainer
from artificialqi.routes import dataset_blueprint 
from artificialqi.routes import test_result_blueprint
from artificialqi.routes import dataset_blueprint, test_blueprint

container = AppContainer()

def init_app():
    container.wire(modules=[dataset_blueprint])
    container.wire(modules=[test_result_blueprint])
    container.wire(modules=[dataset_blueprint, test_blueprint])
