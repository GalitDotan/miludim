from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import courses, lectures, videos
from api.user import users

# from api.video import users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(courses, prefix="/courses", tags=["courses"])
app.include_router(lectures, prefix="/lectures", tags=["lectures"])
app.include_router(videos, prefix="/videos", tags=["videos"])
app.include_router(users, prefix="/users", tags=["users"])

# For development run with `python main.py`
if __name__ == "__main__":
    import uvicorn
    import colorama

    colorama.init()

    uvicorn.run("main:app", reload=True)
