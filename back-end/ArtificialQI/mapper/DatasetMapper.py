from uuid import UUID
from datetime import date
from core.dataset import Dataset
from models.DatasetDTO import DatasetDTO


def datasetdto_to_dotaset(dto: DatasetDTO) -> Dataset:
    return Dataset(
        id=dto.id,
        dim=dto.max_page,
        name=dto.name or "",
        first_save_date=dto.first_save or date.min,
        last_save_date=dto.last_mod or date.min,
        tmp=dto.tmp,
        origin=dto.origin_id or UUID(int=0) 
    )

def dataset_to_datasetdto(domain: Dataset) -> DatasetDTO:
    return DatasetDTO(
        id=domain.id,
        name=domain.name,
        last_mod=domain.last_save_date,
        first_save=domain.first_save_date,
        origin_id=domain.origin,
        tmp=domain.tmp,
        max_page=-(-domain.dim//25), #25 sarebbe il umero di elementi per pagina, se ne facciamo meno o di + basta cambiarlo
        element_n=domain.dim  
    )