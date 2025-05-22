import os
from uuid import UUID

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from data.mock_data import mock_videos, mock_lectures


class Video(BaseModel):
    id: UUID
    name: str
    filename: str


class VideoInfo(BaseModel):
    id: UUID
    name: str

    @classmethod
    def from_data(cls, id, data):
        return VideoInfo(
            id=id,
            name=data["name"],
        )


videos = APIRouter()


def get_resources_dir_path():
    current_dir = os.path.dirname(__file__)
    project_root = os.path.abspath(os.path.join(current_dir, '..', '..'))
    return os.path.join(project_root, 'resources')


@videos.get("/", response_model=list[VideoInfo])
def get_lecture_videos(q: UUID):
    """Get the info of all the users of a lecture"""
    lecture = mock_lectures.get(str(q))
    if not lecture:
        raise HTTPException(status_code=404, detail="Lecture not found")
    video_ids = lecture["users"]
    return [
        VideoInfo.from_data(video_id, mock_videos[video_id])
        for video_id in video_ids if str(video_id) in mock_videos
    ]


@videos.get("/{video_id}", response_model=VideoInfo)
def get_video_info(video_id: UUID):
    """Get the info of a specific video"""
    video_data = mock_videos.get(str(video_id))
    if not video_data:
        raise HTTPException(status_code=404, detail="User not found")
    return VideoInfo(
        id=video_id,
        name=video_data["name"],
    )


@videos.get("/{video_id}/transcript")
def get_video_transcript(video_id: UUID):
    file_path = os.path.join(get_resources_dir_path(), 'Calculus2_09.txt')
    return FileResponse(file_path, media_type="text/txt")


@videos.get("/{video_id}/subtitles")
def get_video_subtitles(video_id: UUID):
    file_path = os.path.join(get_resources_dir_path(), 'Calculus2_09.srt')
    return FileResponse(file_path, media_type="text/srt")


@videos.get("/{video_id}/download")
def get_video_download(video_id: UUID):
    file_path = os.path.join(get_resources_dir_path(), 'Calculus2_09.mp4')
    return FileResponse(file_path, media_type="video/mp4")


@videos.get("/{video_id}/summary")
def get_video_summary(video_id: UUID):
    return "summary of the video"


@videos.get("/{video_id}/slides")
def get_video_slides(video_id: UUID):
    return "slides of the video"


@videos.get("/{video_id}/questions")
def get_video_questions(video_id: UUID):
    return "questions about the video"
