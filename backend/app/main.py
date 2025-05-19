from fastapi import FastAPI

from api import courses, lectures, videos
#from api.video import videos

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(courses, prefix="/courses", tags=["courses"])
app.include_router(lectures, prefix="/lectures", tags=["lectures"])
app.include_router(videos, prefix="/videos", tags=["videos"])”


# For development run with `python main.py`
if __name__ == "__main__":
    import uvicorn
    import colorama
    colorama.init()

    uvicorn.run("main:app", reload=True)