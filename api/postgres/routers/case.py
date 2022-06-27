from fastapi import APIRouter, Depends
from ..models.case import SizeOut, ColorOut, CaseImageOut
from ..db import CaseQueries

router = APIRouter()


def row_to_color(row):
    color = {"id": row[0], "name": row[1]}
    return color


def row_to_size(row):
    size = {"id": row[0], "name": row[1]}
    return size


def row_to_caseimage(row):
    caseimage = {"id": row[0], "picture": row[1]}
    return caseimage


@router.get("/api/size", response_model=SizeOut)
def size_list(query=Depends(CaseQueries)):
    rows = query.list_size()
    return {
        "sizes": [row_to_size(row) for row in rows],
    }


@router.get("/api/color", response_model=ColorOut)
def color_list(query=Depends(CaseQueries)):
    rows = query.list_color()
    return {
        "colors": [row_to_size(row) for row in rows],
    }


@router.get("/api/caseimage", response_model=CaseImageOut)
def case_list(query=Depends(CaseQueries)):
    rows = query.list_caseimage()
    return {
        "caseimages": [row_to_caseimage(row) for row in rows],
    }
