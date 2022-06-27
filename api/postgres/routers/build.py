from typing import Union
from ..models.build import (
    Build,
    BuildA,
    BuildDeleteOperation,
    BuildOut,
    InBuild,
    InsertBuild,
    OutBuild,
    TopBuildsOut,
)
from fastapi import APIRouter, Response, status, Depends
from ..db import BuildsQueries
from ..models.common import ErrorMessage
from .accounts import User, get_current_active_user


router = APIRouter()


def row_to_top_builds(row):
    build = {
        "id": row[0],
        "userid": row[1],
        "username": row[2],
        "Name": row[3],
        "picture": row[4],
        "likes": row[5],
    }
    return build


def row_to_create_build(row):
    build = {
        "id": row[0],
        "Name": row[1],
        "moboid": row[2],
        "cpuid": row[3],
        "psuid": row[4],
        "Private": row[5],
        "userid": row[6],
    }
    return build


def row_to_list_build(row):
    build = {
        "id": row[0],
        "userid": row[1],
        "username": row[2],
        "Name": row[3],
        "Private": row[4],
        "color": row[5],
        "size": row[6],
        "picture": row[7],
        "gpu": {
            "id": row[8],
            "manufacturer": row[9],
            "chipset": row[10],
        },
        "hdd": {
            "id": row[11],
            "brand": row[12],
            "capacity": row[13],
        },
        "ram": {
            "id": row[14],
            "brand": row[15],
        },
        "mobo": {
            "id": row[16],
            "brand": row[17],
            "socket_type": row[18],
            "max_memory": row[19],
        },
        "cpu": {
            "id": row[20],
            "processor": row[21],
            "cores": row[22],
            "socket_type": row[23],
        },
        "psu": {
            "id": row[24],
            "brand": row[25],
        },
        "likes": row[26],
    }
    return build


def row_to_build(row):
    build = {
        "id": row[0],
        "userid": row[1],
        "username": row[2],
        "Name": row[3],
        "Private": row[4],
        "color": row[5],
        "size": row[6],
        "picture": row[7],
        "gpu": {
            "id": row[8],
            "cardcount": row[9],
            "manufacturer": row[10],
            "chipset": row[11],
            "core_clock_speed": row[12],
            "video_memory": row[13],
            "memory_type": row[14],
            "height": row[15],
            "length": row[16],
            "width": row[17],
            "hdmi": row[18],
            "display_port": row[19],
        },
        "hdd": {
            "id": row[20],
            "hddcount": row[21],
            "brand": row[22],
            "capacity": row[23],
            "interface": row[24],
            "cache": row[25],
            "rpm": row[26],
        },
        "ram": {
            "id": row[27],
            "ramcount": row[28],
            "brand": row[29],
            "memory_type": row[30],
            "memory_speed": row[31],
            "memory_channels": row[32],
            "pin_configuration": row[33],
        },
        "mobo": {
            "id": row[34],
            "brand": row[35],
            "socket_type": row[36],
            "max_memory": row[37],
            "max_memory_per_slot": row[38],
            "pcie_slots": row[39],
            "memory_slots": row[40],
        },
        "cpu": {
            "id": row[41],
            "processor": row[42],
            "cores": row[43],
            "threads": row[44],
            "speed": row[45],
            "socket_type": row[46],
        },
        "psu": {
            "id": row[47],
            "brand": row[48],
            "wattage": row[49],
            "atx_connector": row[50],
            "atx_12v_connector": row[51],
            "graphics_connector": row[52],
            "molex_connector": row[53],
            "sata_connector": row[54],
        },
        "likes": row[55],
    }
    return build


@router.get("/api/topbuilds", response_model=TopBuildsOut)
def top_build_list(query=Depends(BuildsQueries)):
    rows = query.get_top_builds()
    return {
        "builds": [row_to_top_builds(row) for row in rows],
    }


@router.get("/api/builds", response_model=BuildA)
def build_list(query=Depends(BuildsQueries)):
    rows = query.get_all_builds()
    return {
        "builds": [row_to_list_build(row) for row in rows],
    }


# Example of how to get the current user for an endpoint
@router.get("/api/builds/mine", response_model=Build)
def my_build_list(
    query=Depends(BuildsQueries),
    current_user: User = Depends(get_current_active_user),
):

    rows = query.get_build_by_user(current_user["id"])
    dict = {
        "builds": [row_to_build(row) for row in rows],
    }
    return dict


@router.post(
    "/api/build/create",
    response_model=OutBuild,
    responses={
        200: {"model": OutBuild},
    },
)
def create_build(
    build: InsertBuild,
    query=Depends(BuildsQueries),
    current_user: User = Depends(get_current_active_user),
):

    row = query.create_build(
        build.Name,
        build.moboid,
        build.cpuid,
        build.psuid,
        current_user["id"],
        build.gpuid,
        build.cardcount,
        build.hddid,
        build.hddcount,
        build.ramid,
        build.ramcount,
        build.color,
        build.size,
        build.picture,
    )
    return row_to_create_build(row)


@router.get(
    "/api/build/{build_id}",
    response_model=Union[BuildOut, ErrorMessage],
    responses={
        200: {"model": BuildOut},
        404: {"model": ErrorMessage},
    },
)
def get_build(build_id: int, response: Response, query=Depends(BuildsQueries)):
    row = query.get_build(build_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Custom build not found"}
    return row_to_build(row)


@router.put(
    "/api/build/{build_id}",
    response_model=OutBuild,
    responses={200: {"model": OutBuild}, 422: {"model": ErrorMessage}},
)
def update_build(
    build_id: int,
    build: InBuild,
    query=Depends(BuildsQueries),
):
    row = query.update_build(
        build_id,
        build.Name,
        build.moboid,
        build.cpuid,
        build.psuid,
        build.Private,
        build.gpuid,
        build.cardcount,
        build.hddid,
        build.hddcount,
        build.ramid,
        build.ramcount,
        build.color,
        build.size,
        build.picture,
    )
    return row_to_create_build(row)


@router.delete(
    "/api/build/{build_id}",
    response_model=BuildDeleteOperation,
)
def delete_build(
    build_id: int,
    query=Depends(BuildsQueries),
    current_user: User = Depends(get_current_active_user),
):
    try:
        query.delete_build(build_id, current_user["id"])
        return {"result": True}
    except Exception:
        return {"result": False}
