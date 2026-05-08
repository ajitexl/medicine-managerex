from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedicineBase(BaseModel):
    name: str
    category: Optional[str] = None
    quantity: int = 1
    expiry_date: date
    notes: Optional[str] = ""

class MedicineCreate(MedicineBase):
    pass

class MedicineUpdate(MedicineBase):
    pass

class MedicineOut(MedicineBase):
    id: int
    status: str

    class Config:
        from_attributes = True
