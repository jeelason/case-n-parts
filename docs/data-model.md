# Data models

## User

| name     | type        | unique | optional |
| -------- | ----------- | ------ | -------- |
| username | varchar(40) | yes    | false    |
| password | varchar(30) | no     | false    |
| email    | varchar(50) | yes    | false    |

## Build

| name        | type                | unique | optional |
| ----------- | ------------------- | ------ | -------- |
| name        | varchar(60)         | yes    | false    |
| case        | f.k. to case        | no     | true     |
| motherboard | f.k. to motherboard | yes    | true     |
| user_id     | f.k. to user        | yes    | false    |
| private     | boolean             | no     | false    |

## Rating

| name   | type                | unique | optional |
| ------ | ------------------- | ------ | -------- |
| user   | foreign key to user | yes    | false    |
| rating | int                 | no     | false    |

## Case

| name  | type          | unique | optional |
| ----- | ------------- | ------ | -------- |
| size  | f.k. to size  | no     | false    |
| color | f.k. to color | no     | false    |

## Color

| name  | type        | unique | optional |
| ----- | ----------- | ------ | -------- |
| color | varchar(30) | no     | false    |

## Size

| name      | type        | unique | optional |
| --------- | ----------- | ------ | -------- |
| size_name | varchar(10) | no     | false    |

## Gpu

| name             | type         | unique | optional |
| ---------------- | ------------ | ------ | -------- |
| manufacturer     | varchar(60)  | yes    | false    |
| core_clock_speed | varchar(15)  | no     | false    |
| video_memory     | int          | no     | false    |
| memory_type      | varchar(100) | no     | false    |
| height           | varchar(15)  | no     | false    |
| length           | varchar(15)  | no     | false    |
| width            | varchar(15)  | no     | false    |
| hdmi             | varchar(30)  | no     | false    |
| display_port     | varchar(40)  | no     | false    |

## Cpu

| name        | type        | unique | optional |
| ----------- | ----------- | ------ | -------- |
| processor   | varchar(60) | yes    | false    |
| cores       | varchar(15) | no     | false    |
| threads     | varchar(70) | no     | false    |
| speed       | varchar(10) | no     | false    |
| socket_type | varchar(30) | no     | false    |

## PowerSupply

| name               | type        | unique | optional |
| ------------------ | ----------- | ------ | -------- |
| wattage            | varchar(15) | no     | false    |
| atx_connector      | varchar(20) | no     | false    |
| atx_12v_connector  | varchar(20) | no     | false    |
| graphics_connector | varchar(20) | no     | false    |
| molex_connector    | int         | no     | false    |
| sata_connector     | int         | no     | false    |
| floppy_connector   | int         | no     | false    |

## Ram

| name              | type        | unique | optional |
| ----------------- | ----------- | ------ | -------- |
| memory_type       | varchar(8)  | no     | false    |
| memory_speed      | varchar(20) | no     | false    |
| memory_channels   | varchar(10) | no     | false    |
| pin_configuration | varchar(20) | no     | false    |

## Motherboard

| name | type        | unique | optional |
| ---- | ----------- | ------ | -------- |
| id   | serial      | yes    | false    |
| cpu  | f.k. to cpu | no     | false    |
| gpu  | f.k. to gpu | no     | false    |
| hdd  | f.k. to hdd | no     | false    |
| ram  | f.k. to ram | no     | false    |
| psu  | f.k. to psu | no     | false    |

## Hdd

| name      | type        | unique | optional |
| --------- | ----------- | ------ | -------- |
| capacity  | varchar(5)  | no     | false    |
| interface | varchar(25) | no     | false    |
| cache     | varchar(20) | no     | false    |
| rpm       | varchar(30) | no     | false    |
