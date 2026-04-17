from fastapi import FastAPI
from routes import upload, scan

app = FastAPI()

app.include_router(upload.router)
app.include_router(scan.router)

@app.get("/")
def home():
    return {"message": "SportShield AI running"}