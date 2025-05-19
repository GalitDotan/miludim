from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from uuid import UUID
from data.mock_data import mock_videos, mock_lectures


videos = APIRouter()


@videos.get("/")
def get_courses_list(l: UUID):
    """get the list of videos for the specified lecture
    """
    lecture = mock_lectures.get(str(l), None)
    if not lecture:
        raise HTTPException(status_code=404)
    return lecture["videos"]


@videos.get("/{video_id}")
def get_course(video_id: UUID):
    """get the info of the video
    """
    video = mock_videos.get(str(video_id), None)
    if not video:
        raise HTTPException(status_code=404)
    return video


@videos.get("/{video_id}/transcript")
def get_course(video_id: UUID):
    """get the transcript of the video
    """
    return "transcript of the video"


@videos.get("/{video_id}/subtitles")
def get_course(video_id: UUID):
    """get the subtitles of the video
    """
    return "subtitles of the video"


@videos.get("/{video_id}/download")
def get_course(video_id: UUID):
    """get the info of the lecture
    """
    return "file of the video"