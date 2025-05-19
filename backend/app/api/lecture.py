from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from uuid import UUID
from data.mock_data import mock_lectures, mock_courses

from pydantic import BaseModel
from typing import List

class Lecture(BaseModel):
    id: UUID
    name: str
    description: str
    related_video_id_list: List[UUID] = []

lectures = APIRouter()

@lectures.get("/", response_model=List[UUID])
def get_lecture_id_list():
    """Get the list of all lecture IDs"""
    return [UUID(course_id) for course_id in mock_courses.keys()]

@lectures.get("/{lecture_id}", response_model=Lecture)
def get_lecture_info(lecture_id: UUID):
    """Get the info of a specific lecture"""
    lecture_data = mock_lectures.get(str(lecture_id))
    if not lecture_data:
        raise HTTPException(status_code=404, detail="Lecture not found")
    return Lecture(
        id=lecture_id,
        name=lecture_data["name"],
        description=lecture_data["description"],
        related_video_id_list=[UUID(video_id) for video_id in lecture_data["videos"]],
    )