from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from uuid import UUID
from data.mock_data import mock_lectures, mock_courses


lectures = APIRouter()


@lectures.get("/")
def get_courses_list(c: UUID):
    """get the list of lecture for the current user
    """
    course = mock_courses.get(str(c), None)
    if not course:
        raise HTTPException(status_code=404)
    return course["lectures"]


@lectures.get("/{lecture_id}")
def get_course(lecture_id: UUID):
    """get the info of the lecture
    """
    lecture = mock_lectures.get(str(lecture_id), None)
    if not lecture:
        raise HTTPException(status_code=404)
    return lecture