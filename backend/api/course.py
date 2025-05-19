from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from uuid import UUID
from data.mock_data import mock_courses


courses = APIRouter()


@courses.get("/")
def get_courses_list():
    """get the list of courses for the current user
    """
    return list(mock_courses.keys())


@courses.get("/{course_id}")
def get_course(course_id: UUID):
    """get the info of the course
    """
    course = mock_courses.get(str(course_id), None)
    if not course:
        raise HTTPException(status_code=404)
    return course