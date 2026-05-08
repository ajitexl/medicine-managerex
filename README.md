# Medicine Manager — FastAPI + React

A full-stack web app to track your home medicines, expiry dates, and stock levels.

---

## Project Structure

```
medicine_manager/
├── backend/
│   ├── main.py          # FastAPI app + all routes
│   ├── models.py        # SQLAlchemy database models
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── database.py      # DB connection + session
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── medicines.js     # API calls (axios)
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── MedicineTable.jsx
    │   │   └── StatusBadge.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── MedicineList.jsx
    │   │   └── MedicineForm.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Setup & Run

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/docs

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Features

- Dashboard with 4 sections: Expired / Expiring Soon / Low Stock / All Good
- Add, Edit, Delete medicines
- Dynamic status calculated from expiry date and quantity
- Color-coded status badges
- SQLite database (no setup needed)

## Status Logic

| Status | Condition |
|--------|-----------|
| Expired | expiry_date < today |
| Expiring Soon | expiry_date within 30 days |
| Low Stock | quantity <= 5 (and not expired) |
| OK | expiry_date > 30 days AND quantity > 5 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /medicines | All medicines |
| GET | /medicines/dashboard | Dashboard grouped data |
| GET | /medicines/{id} | Single medicine |
| POST | /medicines | Create medicine |
| PUT | /medicines/{id} | Update medicine |
| DELETE | /medicines/{id} | Delete medicine |
