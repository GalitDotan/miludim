from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}


# For development run with `python main.py`
if __name__ == "__main__":
    import uvicorn
    import colorama
    colorama.init()

    uvicorn.run("main:app", reload=True)