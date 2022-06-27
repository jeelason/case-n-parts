from pydantic import BaseModel


class RatingOut(BaseModel):
    id: int
    liked: bool
    buildid: int
    userid: int


class Rating(BaseModel):
    ratings: list[RatingOut]


class RatingIn(BaseModel):
    buildid: int


class UpdateRating(BaseModel):
    liked: bool
