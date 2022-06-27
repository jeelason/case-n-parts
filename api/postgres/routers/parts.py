from fastapi import APIRouter, Depends
from ..models.parts import (
    Gpu,
    Cpu,
    Hdd,
    Psu,
    Mobo,
    Ram,
)
from ..db import PartsQueries


router = APIRouter()


def row_to_gpu(row):
    gpu = {
        "id": row[0],
        "manufacturer": row[1],
        "chipset": row[2],
        "core_clock_speed": row[3],
        "video_memory": row[4],
        "memory_type": row[5],
        "height": row[6],
        "length": row[7],
        "width": row[8],
        "hdmi": row[9],
        "display_port": row[10],
    }
    return gpu


def row_to_cpu(row):
    cpu = {
        "id": row[0],
        "processor": row[1],
        "cores": row[2],
        "threads": row[3],
        "speed": row[4],
        "socket_type": row[5],
    }
    return cpu


def row_to_ram(row):
    ram = {
        "id": row[0],
        "brand": row[1],
        "memory_type": row[2],
        "memory_speed": row[3],
        "memory_channels": row[4],
        "pin_configuration": row[5],
    }
    return ram


def row_to_hdd(row):
    hdd = {
        "id": row[0],
        "brand": row[1],
        "capacity": row[2],
        "interface": row[3],
        "cache": row[4],
        "rpm": row[5],
    }
    return hdd


def row_to_psu(row):
    psu = {
        "id": row[0],
        "brand": row[1],
        "wattage": row[2],
        "atx_connector": row[3],
        "atx_12v_connector": row[4],
        "graphics_connector": row[5],
        "molex_connector": row[6],
        "sata_connector": row[7],
    }
    return psu


def row_to_mobo(row):
    mobo = {
        "id": row[0],
        "brand": row[1],
        "socket_type": row[2],
        "max_memory": row[3],
        "max_memory_per_slot": row[4],
        "pcie_slots": row[5],
        "memory_slots": row[6],
    }
    return mobo


@router.get("/api/gpus", response_model=Gpu)
def gpu_list(query=Depends(PartsQueries)):
    rows = query.get_all_gpus()
    return {
        "gpus": [row_to_gpu(row) for row in rows],
    }


@router.get("/api/cpus", response_model=Cpu)
def cpu_list(query=Depends(PartsQueries)):
    rows = query.get_all_cpus()
    return {
        "cpus": [row_to_cpu(row) for row in rows],
    }


@router.get("/api/psus", response_model=Psu)
def psu_list(query=Depends(PartsQueries)):
    rows = query.get_all_psus()
    return {
        "psus": [row_to_psu(row) for row in rows],
    }


@router.get("/api/hdds", response_model=Hdd)
def hdd_list(query=Depends(PartsQueries)):
    rows = query.get_all_hdds()
    return {
        "hdds": [row_to_hdd(row) for row in rows],
    }


@router.get("/api/mobos", response_model=Mobo)
def mobo_list(query=Depends(PartsQueries)):
    rows = query.get_all_mobos()
    return {
        "mobos": [row_to_mobo(row) for row in rows],
    }


@router.get("/api/rams", response_model=Ram)
def ram_list(query=Depends(PartsQueries)):
    rows = query.get_all_rams()
    return {
        "rams": [row_to_ram(row) for row in rows],
    }
