from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import List
import models, schemas
from database import engine, get_db, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Medicine Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_status(medicine) -> str:
    today = date.today()
    if medicine.expiry_date < today:
        return "expired"
    elif medicine.expiry_date <= today + timedelta(days=30):
        return "expiring"
    elif medicine.quantity <= 5:
        return "low"
    return "ok"

def medicine_to_out(m) -> schemas.MedicineOut:
    return schemas.MedicineOut(
        id=m.id,
        name=m.name,
        category=m.category,
        quantity=m.quantity,
        expiry_date=m.expiry_date,
        notes=m.notes,
        status=get_status(m),
    )

@app.get("/medicines", response_model=List[schemas.MedicineOut])
def get_all(db: Session = Depends(get_db)):
    medicines = db.query(models.Medicine).order_by(models.Medicine.expiry_date).all()
    return [medicine_to_out(m) for m in medicines]

@app.get("/medicines/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    today = date.today()
    soon = today + timedelta(days=30)
    all_meds = db.query(models.Medicine).all()

    return {
        "total": len(all_meds),
        "expired": [medicine_to_out(m) for m in all_meds if m.expiry_date < today],
        "expiring_soon": [medicine_to_out(m) for m in all_meds if today <= m.expiry_date <= soon],
        "low_stock": [medicine_to_out(m) for m in all_meds if m.quantity <= 5 and m.expiry_date >= today],
        "all_ok": [medicine_to_out(m) for m in all_meds if m.expiry_date > soon and m.quantity > 5],
    }

@app.get("/medicines/{medicine_id}", response_model=schemas.MedicineOut)
def get_one(medicine_id: int, db: Session = Depends(get_db)):
    m = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return medicine_to_out(m)

@app.post("/medicines", response_model=schemas.MedicineOut, status_code=201)
def create(medicine: schemas.MedicineCreate, db: Session = Depends(get_db)):
    m = models.Medicine(**medicine.dict())
    db.add(m)
    db.commit()
    db.refresh(m)
    return medicine_to_out(m)

@app.put("/medicines/{medicine_id}", response_model=schemas.MedicineOut)
def update(medicine_id: int, medicine: schemas.MedicineUpdate, db: Session = Depends(get_db)):
    m = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Medicine not found")
    for key, value in medicine.dict().items():
        setattr(m, key, value)
    db.commit()
    db.refresh(m)
    return medicine_to_out(m)

@app.delete("/medicines/{medicine_id}", status_code=204)
def delete(medicine_id: int, db: Session = Depends(get_db)):
    m = db.query(models.Medicine).filter(models.Medicine.id == medicine_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Medicine not found")
    db.delete(m)
    db.commit()
