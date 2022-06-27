from pydantic import BaseModel


class GpuOutDetail(BaseModel):
    id: int
    cardcount: int
    manufacturer: str
    chipset: str
    core_clock_speed: str
    video_memory: str
    memory_type: str
    height: str
    length: str
    width: str
    hdmi: str
    display_port: str


class GpuOut(BaseModel):
    id: int
    manufacturer: str
    chipset: str
    core_clock_speed: str
    video_memory: str
    memory_type: str
    height: str
    length: str
    width: str
    hdmi: str
    display_port: str


class Gpu(BaseModel):
    gpus: list[GpuOut]


class BuildGpu(BaseModel):
    id: int
    manufacturer: str
    chipset: str


class GpuA(BaseModel):
    gpus: list[BuildGpu]


class CpuOut(BaseModel):
    id: int
    processor: str
    cores: str
    threads: str
    speed: str
    socket_type: str


class Cpu(BaseModel):
    cpus: list[CpuOut]


class BuildCpu(BaseModel):
    id: int
    processor: str
    cores: str
    socket_type: str


class CpuA(BaseModel):
    cpus: list[BuildCpu]


class RamOutDetail(BaseModel):
    id: int
    ramcount: int
    brand: str
    memory_type: str
    memory_speed: str
    memory_channels: str
    pin_configuration: str


class RamOut(BaseModel):
    id: int
    brand: str
    memory_type: str
    memory_speed: str
    memory_channels: str
    pin_configuration: str


class Ram(BaseModel):
    rams: list[RamOut]


class BuildRam(BaseModel):
    id: int
    brand: str


class RamA(BaseModel):
    rams: list[BuildRam]


class HddOutDetail(BaseModel):
    id: int
    hddcount: int
    brand: str
    capacity: str
    interface: str
    cache: str
    rpm: str


class HddOut(BaseModel):
    id: int
    brand: str
    capacity: str
    interface: str
    cache: str
    rpm: str


class Hdd(BaseModel):
    hdds: list[HddOut]


class BuildHdd(BaseModel):
    id: int
    brand: str
    capacity: str


class HddA(BaseModel):
    hdds: list[BuildHdd]


class PsuOut(BaseModel):
    id: int
    brand: str
    wattage: str
    atx_connector: str
    atx_12v_connector: str
    graphics_connector: str
    molex_connector: str
    sata_connector: str


class Psu(BaseModel):
    psus: list[PsuOut]


class BuildPsu(BaseModel):
    id: int
    brand: str


class PsuA(BaseModel):
    psus: list[BuildPsu]


class MoboOut(BaseModel):
    id: int
    brand: str
    socket_type: str
    max_memory: str
    max_memory_per_slot: str
    pcie_slots: int
    memory_slots: int


class Mobo(BaseModel):
    mobos: list[MoboOut]


class BuildMobo(BaseModel):
    id: int
    brand: str
    socket_type: str
    max_memory: str


class MoboA(BaseModel):
    mobos: list[BuildMobo]
