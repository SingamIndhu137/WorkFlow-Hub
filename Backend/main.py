from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
from models import Task

app = FastAPI(title="WorkFlow Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {
        "message": "WorkFlow Hub Backend is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/api/tasks")
def create_task(
    title: str,
    description: str = "",
    db: Session = Depends(get_db)
):
    task = Task(
        title=title,
        description=description
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@app.get("/api/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()