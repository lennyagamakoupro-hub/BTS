from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('MONGO_DB', 'lenny')]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LoginRequest(BaseModel):
    code: str


class LoginResponse(BaseModel):
    success: bool
    role: str
    message: str


class Quiz(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    titre: str
    questions: List[dict]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuizCreate(BaseModel):
    titre: str
    questions: List[dict]


class QuizResult(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quiz_id: str
    etudiant_nom: str
    score: int
    total: int
    answers: List[dict]
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuizResultCreate(BaseModel):
    quiz_id: str
    etudiant_nom: str
    score: int
    total: int
    answers: List[dict]


@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    admin_token = os.environ.get('ADMIN_TOKEN', '')
    student_codes_raw = os.environ.get('STUDENT_CODES', '')
    student_codes = [c.strip() for c in student_codes_raw.split(',') if c.strip()]
    if request.code == admin_token:
        return LoginResponse(success=True, role="admin", message="Bienvenue formateur !")
    elif request.code in student_codes:
        return LoginResponse(success=True, role="etudiant", message="Bienvenue !")
    else:
        raise HTTPException(status_code=401, detail="Code invalide")


@api_router.get("/quiz", response_model=List[Quiz])
async def get_quizzes():
    quizzes = await db.quizzes.find({}, {"_id": 0}).to_list(1000)
    return quizzes


@api_router.post("/quiz", response_model=Quiz)
async def create_quiz(input: QuizCreate):
    quiz = Quiz(**input.model_dump())
    doc = quiz.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quizzes.insert_one(doc)
    return quiz


@api_router.delete("/quiz/{quiz_id}")
async def delete_quiz(quiz_id: str):
    result = await db.quizzes.delete_one({"id": quiz_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quiz non trouve")
    return {"message": "Quiz supprime"}


@api_router.post("/quiz/result", response_model=QuizResult)
async def submit_result(input: QuizResultCreate):
    result = QuizResult(**input.model_dump())
    doc = result.model_dump()
    doc['submitted_at'] = doc['submitted_at'].isoformat()
    await db.quiz_results.insert_one(doc)
    return result


@api_router.get("/quiz/{quiz_id}/results", response_model=List[QuizResult])
async def get_results(quiz_id: str):
    results = await db.quiz_results.find({"quiz_id": quiz_id}, {"_id": 0}).to_list(1000)
    return results


@api_router.get("/results", response_model=List[QuizResult])
async def get_all_results():
    results = await db.quiz_results.find({}, {"_id": 0}).to_list(1000)
    return results


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
