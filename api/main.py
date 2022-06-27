from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os


from postgres.routers import parts, build, accounts, case, ratings

app = FastAPI()


origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(parts.router)
app.include_router(build.router)
app.include_router(accounts.router)
app.include_router(case.router)
app.include_router(ratings.router)
