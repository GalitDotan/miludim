from datetime import datetime
from uuid import UUID

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel, model_validator

from data.mock_data import mock_users


class LectureHistory(BaseModel):
    lecture_id: UUID
    watched: bool
    stopped_time: datetime

    @classmethod
    @model_validator(mode="before")  # runs before field validation
    def _set_watched(cls, values: dict) -> dict:
        stopped = values.get('stopped_time') or 0
        # 0 → False, anything else → True
        values['watched'] = bool(stopped)
        return values


class CourseHistory(BaseModel):
    course_id: UUID
    lectures_history: list[LectureHistory]


class User(BaseModel):
    id: UUID
    name: str
    courses: list[CourseHistory]


users = APIRouter()


@users.get("/", response_model=list[User])
def get_user_info(q: UUID):
    user = mock_users.get(str(q))
    if not user:
        raise HTTPException(status_code=404, detail="user not found")

    return [
        User.from_data(user)
    ]
