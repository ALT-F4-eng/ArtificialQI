from uuid import UUID
from datetime import date
from artificialqi.core.dataset import Dataset
from artificialqi.core.dataset_factory import DatasetFactory
from artificialqi.models.dataset_dto import DatasetDto
from math import ceil
from artificialqi.core.page import Page


class DatasetDtoMapper:

    @staticmethod
    def to_domain(dto: DatasetDto) -> Dataset:

        if not dto.tmp: 
            return DatasetFactory.saved(
                id= dto.id,
                dim= dto.element_n,
                name=dto.name,
                first_save_date=dto.first_save,
                last_save_date=dto.last_mod
            )
        
        elif dto.origin_id is None:
            return DatasetFactory.tmp(
                id= dto.id,
                dim= dto.element_n
            )
        
        else:
            return DatasetFactory.working_copy(
                id=dto.id,
                dim=dto.element_n,
                origin=dto.origin_id
            )


    @staticmethod
    def to_dto(domain: Dataset) -> DatasetDto:
        return DatasetDto(
            id=domain.id,
            name=domain.name,
            last_mod=domain.last_save_date,
            first_save=domain.first_save_date,
            origin_id=domain.origin,
            tmp=domain.tmp,
            max_page=ceil(domain.dim / Page.ELEMENT_PER_PAGE),
            element_n=domain.dim  
        )