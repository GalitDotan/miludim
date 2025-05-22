from datetime import datetime
from uuid import UUID

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from pydantic import BaseModel, model_validator

from data.mock_data import mock_users


class VideoHistory(BaseModel):
    video_id: UUID
    watched: bool
    stopped_time: datetime

    # @classmethod
    # @model_validator(mode="before")  # runs before field validation
    # def _set_watched(cls, values: dict) -> dict:
    #    stopped = values.get('stopped_time')
    #    # 0 → False, anything else → True
    #    values['watched'] = bool(stopped)
    #    return values


class LectureHistory(BaseModel):
    lecture_id: UUID
    watched: bool
    videos: list[VideoHistory]

    @classmethod
    @model_validator(mode="before")  # runs before field validation
    def _set_watched(cls, values: dict) -> bool:
        videos = values.get('videos')
        return all(video["watched"] for video in videos)


class CourseHistory(BaseModel):
    course_id: UUID
    lectures_history: list[LectureHistory]


class User(BaseModel):
    id: UUID
    name: str
    courses: list[CourseHistory]


users = APIRouter()


@users.get("/{user_id}", response_model=User)
def get_user_info(user_id: UUID):
    user = mock_users.get(str(user_id))

    if not user:
        raise HTTPException(status_code=404, detail="user not found")

    return User(
        id=user_id,
        name=user["name"],
        courses=[
            CourseHistory(
                course_id=course_id,
                lectures_history=[
                    LectureHistory(
                        lecture_id=lecture_id,
                        videos=[
                            VideoHistory(video_id=video_id, stopped_time=video["stopped_time"], watched=video["watched"]) for
                            video_id, video in lecture_history["videos"].items()
                        ],
                        watched=False,
                    ) for lecture_id, lecture_history in course_data["lectures"].items()
                ]
            ) for course_id, course_data in user["courses"].items()],
    )
