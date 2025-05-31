from artificialqi.routes.containers import AppContainer
from artificialqi.routes import dataset_blueprint 

container = AppContainer()

def init_app():
    container.wire(modules=[dataset_blueprint])