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

    @classmethod
    def from_data(cls, id, data):
        return Lecture(
            id=id,
            name=data["name"],
            description=data["description"],
            related_video_id_list=[video_id for video_id in data["videos"]],
        )

lectures = APIRouter()

@lectures.get("/", response_model=List[Lecture])
def get_course_lectures(q: UUID):
    """Get the info of all the lectures of a course"""
    course = mock_courses.get(str(q))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    lecture_ids = course["lectures"]
    return [
        Lecture.from_data(lecture_id, mock_lectures[lecture_id])
        for lecture_id in lecture_ids if str(lecture_id) in mock_lectures
    ]

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