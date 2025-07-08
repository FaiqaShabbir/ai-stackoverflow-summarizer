from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from enum import Enum


class InputType(str, Enum):
    URL = "url"
    TEXT = "text"


class SummarizeRequest(BaseModel):
    url: Optional[HttpUrl] = None
    question: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "url": "https://stackoverflow.com/questions/123456/how-to-use-fastapi",
                "question": "How do I create a FastAPI endpoint?"
            }
        }


class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Can you explain more about authentication?",
                "context": "Previous conversation about FastAPI setup"
            }
        }


class SummaryData(BaseModel):
    title: str
    summary: str
    key_points: List[str]
    code_samples: List[str]
    tags: List[str]
    source_url: Optional[str] = None


class ChatResponse(BaseModel):
    message: str
    context: str


class APIResponse(BaseModel):
    success: bool
    data: Optional[SummaryData] = None
    message: Optional[str] = None
    error: Optional[str] = None


class ChatAPIResponse(BaseModel):
    success: bool
    data: Optional[ChatResponse] = None
    message: Optional[str] = None
    error: Optional[str] = None 