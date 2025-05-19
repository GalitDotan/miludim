import os
from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from uuid import UUID
from data.mock_data import mock_videos
from fastapi.responses import FileResponse
from pydantic import BaseModel

class Video(BaseModel):
    id: UUID
    name: str
    filename: str

videos = APIRouter()

def get_resources_dir_path():
    current_dir = os.path.dirname(__file__)
    project_root = os.path.abspath(os.path.join(current_dir, '..', '..'))
    return  os.path.join(project_root, 'resources')
    

@videos.get("/{video_id}", response_model=Video)
def get_video_info(video_id: UUID):
    """Get the info of a specific video"""
    video_data = mock_videos.get(str(video_id))
    if not video_data:
        raise HTTPException(status_code=404, detail="Video not found")
    return Video(
        id=video_id,
        name=video_data["name"],
        filename=video_data["filename"]
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
def get_video_download(video_id: UUID):
    return "summary of the video"