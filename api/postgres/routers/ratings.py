from ..models.ratings import Rating, RatingIn, RatingOut, UpdateRating
from .accounts import User, get_current_active_user
from fastapi import APIRouter, Depends
from ..db import RatingQueries

router = APIRouter()


def row_to_rating(row):
    rating = {
        "id": row[0],
        "liked": row[1],
        "buildid": row[2],
        "userid": row[3],
    }
    return rating


@router.post(
    "/api/rating/create",
    response_model=RatingOut,
    responses={
        200: {"model": RatingOut},
    },
)
def create_build(
    rating: RatingIn,
    query=Depends(RatingQueries),
    current_user: User = Depends(get_current_active_user),
):

    row = query.create_rating(
        rating.buildid,
        current_user["id"],
    )
    return row_to_rating(row)


@router.put(
    "/api/rating/{build_id}",
    response_model=RatingOut,
    responses={200: {"model": RatingOut}},
)
def update_rating(
    liked: UpdateRating,
    build_id: int,
    query=Depends(RatingQueries),
    current_user: User = Depends(get_current_active_user),
):
    row = query.unlike_rating(liked.liked, build_id, current_user["id"])
    return row_to_rating(row)


@router.get("/api/ratings/mine", response_model=Rating)
def my_rating_list(
    query=Depends(RatingQueries),
    current_user: User = Depends(get_current_active_user),
):

    rows = query.get_my_ratings(current_user["id"])
    dict = {
        "ratings": [row_to_rating(row) for row in rows],
    }
    return dict
