from sqlalchemy import Column, Integer, String, Date, Text
from database import Base

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=True)
    quantity = Column(Integer, default=1)
    expiry_date = Column(Date, nullable=False)
    notes = Column(Text, default="")
