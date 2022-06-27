from postgres.routers.accounts import get_current_active_user
from fastapi.testclient import TestClient
from main import app
from postgres.db import BuildsQueries
from unittest import TestCase

client = TestClient(app)


async def override_get_fake_user():
    return {
        "id": 1,
        "user": "jason",
        "password": "jason",
        "email": "jason@mail",
    }


app.dependency_overrides[get_current_active_user] = override_get_fake_user


class EmptyBuildQueries:
    def get_build(self, build_id):
        return {}


class NormalBuildQueries(TestCase):
    def get_all_builds(self):
        r = [
            [1, 1]
            + ["s"] * 2
            + [True]
            + ["s"] * 3
            + [1]
            + ["s"] * 2
            + [1]
            + ["s"] * 2
            + [1]
            + ["s"]
            + [1]
            + ["s"] * 3
            + [1]
            + ["s"] * 3
            + [1]
            + ["s"]
            + [1]
        ]
        return r

    def get_build(self, id: int):
        r = (
            [1, 1]
            + ["s"] * 2
            + [True]
            + ["s"] * 3
            + [1, 1]
            + ["s"] * 10
            + [1, 1]
            + ["s"] * 5
            + [1, 1]
            + ["s"] * 5
            + [1]
            + ["s"] * 4
            + [1, 1, 1]
            + ["s"] * 5
            + [1]
            + ["s"] * 7
            + [0]
        )
        return r

    def create_build(
        self,
        Name,
        moboid,
        cpuid,
        psuid,
        userid,
        gpuid,
        cardcount,
        hddid,
        hddcount,
        ramid,
        ramcount,
        color,
        size,
        picture,
    ):
        return [1, "TEST BUILD", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    def update_build(
        self,
        id,
        Name,
        moboid,
        cpuid,
        psuid,
        Private,
        gpuid,
        cardcount,
        hddid,
        hddcount,
        ramid,
        ramcount,
        color,
        size,
        picture,
    ):
        r = [1, "TEST BUILD", 1, 5, 1, True, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        return r


def test_post_build_returns_200():
    app.dependency_overrides[BuildsQueries] = NormalBuildQueries
    response = client.post(
        "/api/build/create",
        json={
            "Name": "TEST BUILD",
            "moboid": 1,
            "cpuid": 1,
            "psuid": 1,
            "gpuid": 1,
            "cardcount": 1,
            "hddid": 1,
            "hddcount": 1,
            "ramid": 1,
            "ramcount": 1,
            "color": 1,
            "size": 1,
            "picture": 1,
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "Name": "TEST BUILD",
        "moboid": 1,
        "cpuid": 1,
        "psuid": 1,
        "Private": True,
        "userid": 1,
    }
    app.dependency_overrides = {}


# def test_get_build_returns_500():
#     app.dependency_overrides[BuildsQueries] = EmptyBuildQueries
#     response = client.get("/api/build/1")

#     assert response.status_code == 500

#     app.dependency_overrides = {}


def test_build_list_returns_200():
    app.dependency_overrides[BuildsQueries] = NormalBuildQueries

    r = client.get("/api/builds")

    assert r.status_code == 200

    app.dependency_overrides = {}


def test_get_build_returns_200():
    app.dependency_overrides[BuildsQueries] = NormalBuildQueries
    r = client.get("/api/build/1")

    assert r.status_code == 200
    assert r.json() == {
        "id": 1,
        "userid": 1,
        "username": "s",
        "Name": "s",
        "Private": True,
        "color": "s",
        "size": "s",
        "picture": "s",
        "gpu": {
            "id": 1,
            "cardcount": 1,
            "manufacturer": "s",
            "chipset": "s",
            "core_clock_speed": "s",
            "video_memory": "s",
            "memory_type": "s",
            "height": "s",
            "length": "s",
            "width": "s",
            "hdmi": "s",
            "display_port": "s",
        },
        "hdd": {
            "id": 1,
            "hddcount": 1,
            "brand": "s",
            "capacity": "s",
            "interface": "s",
            "cache": "s",
            "rpm": "s",
        },
        "ram": {
            "id": 1,
            "ramcount": 1,
            "brand": "s",
            "memory_type": "s",
            "memory_speed": "s",
            "memory_channels": "s",
            "pin_configuration": "s",
        },
        "mobo": {
            "id": 1,
            "brand": "s",
            "socket_type": "s",
            "max_memory": "s",
            "max_memory_per_slot": "s",
            "pcie_slots": 1,
            "memory_slots": 1,
        },
        "cpu": {
            "id": 1,
            "processor": "s",
            "cores": "s",
            "threads": "s",
            "speed": "s",
            "socket_type": "s",
        },
        "psu": {
            "id": 1,
            "brand": "s",
            "wattage": "s",
            "atx_connector": "s",
            "atx_12v_connector": "s",
            "graphics_connector": "s",
            "molex_connector": "s",
            "sata_connector": "s",
        },
        "likes": 0,
    }

    app.dependency_overrides = {}


def test_update_build_returns_422():
    app.dependency_overrides[
        BuildsQueries.update_build
    ] = NormalBuildQueries.update_build

    r = client.put("/api/build/1")

    assert r.status_code == 422

    app.dependency_overrides = {}


def test_update_build_returns_200():
    app.dependency_overrides[BuildsQueries] = NormalBuildQueries
    r = client.put(
        "/api/build/1",
        json={
            "Name": "s",
            "moboid": 1,
            "cpuid": 1,
            "psuid": 4,
            "Private": True,
            "gpuid": 1,
            "cardcount": 1,
            "hddid": 1,
            "hddcount": 1,
            "ramid": 1,
            "ramcount": 1,
            "color": 1,
            "size": 1,
            "picture": 1,
        },
    )

    assert r.status_code == 200
    assert r.json() == {
        "id": 1,
        "Name": "TEST BUILD",
        "moboid": 1,
        "cpuid": 5,
        "psuid": 1,
        "Private": True,
        "userid": 1,
    }

    app.dependency_overrides = {}


def test_delete_build():
    app.dependency_overrides[BuildsQueries] = NormalBuildQueries
    app.dependency_overrides[get_current_active_user] = override_get_fake_user
    r = client.delete("/api/build/1")

    assert r.status_code == 200
    assert r.json() == {"result": False}
