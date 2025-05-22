from typing import List
from uuid import UUID

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

from data.mock_data import mock_courses


class Course(BaseModel):
    id: UUID
    name: str
    description: str
    related_lecture_id_list: List[UUID] = []


courses = APIRouter()


@courses.get("/", response_model=List[UUID])
def get_course_id_list():
    """Get the list of all course IDs"""
    return [UUID(course_id) for course_id in mock_courses.keys()]


@courses.get("/all", response_model=List[Course])
def get_all_courses():
    """Get full info of all courses"""
    return [
        Course(
            id=UUID(course_id),
            name=course_data["name"],
            description=course_data["description"],
            related_lecture_id_list=[UUID(lecture_id) for lecture_id in course_data["lectures"]],
        )
        for course_id, course_data in mock_courses.items()
    ]


@courses.get("/{course_id}", response_model=Course)
def get_course_info(course_id: UUID):
    """Get the info of a specific course"""
    course_data = mock_courses.get(str(course_id))

    if not course_data:
        raise HTTPException(status_code=404, detail="Course not found")

    return Course(
        id=course_id,
        name=course_data["name"],
        description=course_data["description"],
        related_lecture_id_list=[UUID(lecture_id) for lecture_id in course_data["lectures"]],
    )
