import os
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class DuplicateTitle(RuntimeError):
    pass


class UsersQueries:
    def get_user(self, username: str):
        # TODO: Replace this with real SQL
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                        SELECT id, username, password, email
                        FROM "user"
                        WHERE "user".username = %s
                    """,
                    [username],
                )
                rows = cursor.fetchone()
                return rows

    def create_user(
        self, username: str, hashed_password: str, email: str = None
    ):
        # TODO: Replace this with real SQL
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                        INSERT INTO "user"(Username, Password, Email)
                        VALUES (%s, %s, %s)
                        RETURNING id, Username, Password, Email
                    """,
                    [username, hashed_password, email],
                )
                rows = cursor.fetchone()
                return list(rows)


class PartsQueries:
    def get_all_gpus(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, manufacturer, chipset, core_clock_speed,
                           video_memory, memory_type, height, length, width,
                           hdmi, display_port
                    FROM gpu
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_cpus(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, processor, cores, threads, speed, socket_type
                    FROM cpu
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_rams(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, brand, memory_type, memory_speed,
                           memory_channels, pin_configuration
                    FROM ram
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_psus(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, brand, wattage,atx_connector, atx_12v_connector,
                    graphics_connector, molex_connector, sata_connector
                    from psu
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_hdds(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, brand, capacity, interface, cache,
                    rpm
                    from hdd
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_mobos(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, brand, socket_type, max_memory,
                    max_memory_per_slot, pcie_slots, memory_slots
                    FROM mobos
                    """
                )
                rows = cursor.fetchall()
                return list(rows)


class BuildsQueries:
    def get_top_builds(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        caseimage.picture,
                        COUNT(rating.id) as likes

                    FROM public.build

                    INNER JOIN public.rating
                        ON rating.buildid=build.id
                    INNER JOIN public.user
                        ON "user".id=build.userid


                    INNER JOIN public.case
                        ON "case".buildid = build.id
                    INNER JOIN public.caseimage
                        ON caseimage.id = "case".picture

                    WHERE rating.liked is TRUE

                    GROUP BY
                        build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        caseimage.picture

                    ORDER BY COUNT(rating.id) DESC LIMIT 3
                """
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_all_builds(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        build."Private",
                        color.name,
                        "size".name,
                        caseimage.picture,
                        buildgpus.gpuid,
                        gpu.manufacturer,
                        gpu.chipset,
                        buildhdds.hddid,
                        hdd.brand,
                        hdd.capacity,
                        buildram.ramid,
                        ram.brand,
                        mobos.id,
                        mobos.brand,
                        mobos.socket_type,
                        mobos.max_memory,
                        cpu.id,
                        cpu.processor,
                        cpu.cores,
                        cpu.socket_type,
                        psu.id,
                        psu.brand,
                        COUNT(rating.id) as likes
                    FROM public.build

                    INNER JOIN public.rating
                        ON rating.buildid=build.id



                    INNER JOIN public.user
                        ON "user".id=build.userid

                    INNER JOIN public.case
                        ON "case".buildid = build.id
                    INNER JOIN public.size
                        ON "size".id = "case".size
                    INNER JOIN public.color
                        ON color.id = "case".color
                    INNER JOIN public.caseimage
                        ON caseimage.id = "case".picture

                    INNER JOIN public.BuildGpus
                    INNER JOIN public.gpu
                        ON gpu.id = BuildGpus.gpuid
                    ON BuildGpus.BuildId = build.id

                    INNER JOIN public.buildhdds
                    INNER JOIN public.hdd
                        ON hdd.id = buildhdds.hddid
                    ON buildhdds.id = build.id

                    INNER JOIN public.buildram
                    INNER JOIN public.ram
                        ON ram.id = buildram.ramid
                    ON build.id = buildram.id

                    INNER JOIN public.mobos
                        ON mobos.id = build.moboid

                    INNER JOIN public.cpu
                        ON cpu.id = build.cpuid

                    INNER JOIN public.psu
                        ON psu.id = build.psuid

                    WHERE rating.liked is TRUE

                    GROUP BY build.id, "user".id, "color".name,
                     "size".name, caseimage.picture, buildgpus.id,
                     gpu.manufacturer, gpu.chipset, buildhdds.hddid,
                     hdd.brand, hdd.capacity, buildram.ramid, ram.brand,
                     mobos.id, mobos.brand, mobos.socket_type,
                     mobos.max_memory, cpu.id, cpu.processor, cpu.cores,
                     cpu.socket_type, psu.id, psu.brand

                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def create_build(
        self,
        Name,
        moboid,
        cpuid,
        psuid,
        userid: int,
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
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                with connection.transaction():
                    cursor.execute(
                        """
                        INSERT INTO build("Name", moboid, cpuid, psuid, userid)
                        VALUES(%s, %s, %s, %s, %s)
                        RETURNING id
                    """,
                        [Name, moboid, cpuid, psuid, userid],
                    )
                    new_build_id = cursor.fetchone()[0]
                    cursor.execute(
                        """
                        INSERT INTO buildgpus(buildid, gpuid, cardcount)
                        VALUES(%s, %s, %s)
                    """,
                        [new_build_id, gpuid, cardcount],
                    )
                    cursor.execute(
                        """
                        INSERT INTO buildhdds(buildid, hddid, hddcount)
                        VALUES(%s, %s, %s)
                    """,
                        [new_build_id, hddid, hddcount],
                    )
                    cursor.execute(
                        """
                        INSERT INTO buildram(buildid, ramid, ramcount)
                        VALUES(%s, %s, %s)
                    """,
                        [new_build_id, ramid, ramcount],
                    )
                    cursor.execute(
                        """
                        INSERT INTO "case"(buildid, color, size, picture)
                        VALUES(%s, %s, %s, %s)
                    """,
                        [new_build_id, color, size, picture],
                    )
                    cursor.execute(
                        """
                        INSERT INTO "rating"(buildid, userid, liked)
                        VALUES(%s, %s, TRUE)
                    """,
                        [new_build_id, userid],
                    )
                cursor.execute(
                    """
                    SELECT build.id, build."Name", build.moboid, build.cpuid,
                           build.psuid, build."Private", build.userid
                    FROM build
                    WHERE build.id = %s
                """,
                    [new_build_id],
                )
                rows = cursor.fetchone()
                return list(rows)

    def get_build_by_user(self, userid: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        build."Private",
                        color.name,
                        "size".name,
                        caseimage.picture,
                        buildgpus.gpuid,
                        buildgpus.cardcount,
                        gpu.manufacturer,
                        gpu.chipset,
                        gpu.core_clock_speed,
                        gpu.video_memory,
                        gpu.memory_type,
                        gpu.height,
                        gpu.length,
                        gpu.width,
                        gpu.hdmi,
                        gpu.display_port,
                        buildhdds.hddid,
                        buildhdds.hddcount,
                        hdd.brand,
                        hdd.capacity,
                        hdd.interface,
                        hdd.cache,
                        hdd.rpm,
                        buildram.ramid,
                        buildram.ramcount,
                        ram.brand,
                        ram.memory_type,
                        ram.memory_speed,
                        ram.memory_channels,
                        ram.pin_configuration,
                        mobos.id,
                        mobos.brand,
                        mobos.socket_type,
                        mobos.max_memory,
                        mobos.max_memory_per_slot,
                        mobos.pcie_slots,
                        mobos.memory_slots,
                        cpu.id,
                        cpu.processor,
                        cpu.cores,
                        cpu.threads,
                        cpu.speed,
                        cpu.socket_type,
                        psu.id,
                        psu.brand,
                        psu.wattage,
                        psu.atx_connector,
                        psu.atx_12v_connector,
                        psu.graphics_connector,
                        psu.molex_connector,
                        psu.sata_connector,
                        COUNT(rating.id) as likes
                    FROM public.build

                    INNER JOIN public.rating
                        ON rating.buildid=build.id

                    INNER JOIN public.user
                        ON "user".id=build.userid



                    -- Join case information
                    INNER JOIN public.case
                    ON "case".buildid = build.id
                    INNER JOIN public.size
                        ON "size".id = "case".size
                    INNER JOIN public.color
                        ON color.id = "case".color
                    INNER JOIN public.caseimage
                        ON caseimage.id = "case".picture

                    -- Join GPU info
                    INNER JOIN public.BuildGpus
                    INNER JOIN public.gpu
                        ON gpu.id = BuildGpus.gpuid
                    ON BuildGpus.BuildId = build.id

                    -- Join HDD information.
                    INNER JOIN public.buildhdds
                    INNER JOIN public.hdd
                        ON hdd.id = buildhdds.hddid
                    ON buildhdds.id = build.id

                    -- Join RAM information
                    INNER JOIN public.buildram
                    INNER JOIN public.ram
                        ON ram.id = buildram.ramid
                    ON build.id = buildram.id

                    -- Join simple information.
                    INNER JOIN public.mobos
                    ON mobos.id = build.moboid
                    INNER JOIN public.cpu
                    ON cpu.id = build.cpuid
                    INNER JOIN public.psu
                    ON psu.id = build.psuid
                    WHERE build.userid = %s
                    AND rating.liked is TRUE

                    GROUP BY build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        build."Private",
                        color.name,
                        "size".name,
                        caseimage.picture,
                        buildgpus.gpuid,
                        buildgpus.cardcount,
                        gpu.manufacturer,
                        gpu.chipset,
                        gpu.core_clock_speed,
                        gpu.video_memory,
                        gpu.memory_type,
                        gpu.height,
                        gpu.length,
                        gpu.width,
                        gpu.hdmi,
                        gpu.display_port,
                        buildhdds.hddid,
                        buildhdds.hddcount,
                        hdd.brand,
                        hdd.capacity,
                        hdd.interface,
                        hdd.cache,
                        hdd.rpm,
                        buildram.ramid,
                        buildram.ramcount,
                        ram.brand,
                        ram.memory_type,
                        ram.memory_speed,
                        ram.memory_channels,
                        ram.pin_configuration,
                        mobos.id,
                        mobos.brand,
                        mobos.socket_type,
                        mobos.max_memory,
                        mobos.max_memory_per_slot,
                        mobos.pcie_slots,
                        mobos.memory_slots,
                        cpu.id,
                        cpu.processor,
                        cpu.cores,
                        cpu.threads,
                        cpu.speed,
                        cpu.socket_type,
                        psu.id,
                        psu.brand,
                        psu.wattage,
                        psu.atx_connector,
                        psu.atx_12v_connector,
                        psu.graphics_connector,
                        psu.molex_connector,
                        psu.sata_connector
                """,
                    [userid],
                )
                rows = cursor.fetchall()
                return list(rows)

    def get_build(self, id: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        build."Private",
                        color.name,
                        "size".name,
                        caseimage.picture,
                        buildgpus.gpuid,
                        buildgpus.cardcount,
                        gpu.manufacturer,
                        gpu.chipset,
                        gpu.core_clock_speed,
                        gpu.video_memory,
                        gpu.memory_type,
                        gpu.height,
                        gpu.length,
                        gpu.width,
                        gpu.hdmi,
                        gpu.display_port,
                        buildhdds.hddid,
                        buildhdds.hddcount,
                        hdd.brand,
                        hdd.capacity,
                        hdd.interface,
                        hdd.cache,
                        hdd.rpm,
                        buildram.ramid,
                        buildram.ramcount,
                        ram.brand,
                        ram.memory_type,
                        ram.memory_speed,
                        ram.memory_channels,
                        ram.pin_configuration,
                        mobos.id,
                        mobos.brand,
                        mobos.socket_type,
                        mobos.max_memory,
                        mobos.max_memory_per_slot,
                        mobos.pcie_slots,
                        mobos.memory_slots,
                        cpu.id,
                        cpu.processor,
                        cpu.cores,
                        cpu.threads,
                        cpu.speed,
                        cpu.socket_type,
                        psu.id,
                        psu.brand,
                        psu.wattage,
                        psu.atx_connector,
                        psu.atx_12v_connector,
                        psu.graphics_connector,
                        psu.molex_connector,
                        psu.sata_connector,
                        COUNT(rating.id) as likes
                    FROM public.build

                    INNER JOIN public.rating
                        ON rating.buildid=build.id

                    INNER JOIN public.user
                        ON "user".id=build.userid



                    -- Join case information
                    INNER JOIN public.case
                    ON "case".buildid = build.id
                    INNER JOIN public.size
                        ON "size".id = "case".size
                    INNER JOIN public.color
                        ON color.id = "case".color
                    INNER JOIN public.caseimage
                        ON caseimage.id = "case".picture

                    -- Join GPU info
                    INNER JOIN public.BuildGpus
                    INNER JOIN public.gpu
                        ON gpu.id = BuildGpus.gpuid
                    ON BuildGpus.BuildId = build.id

                    -- Join HDD information.
                    INNER JOIN public.buildhdds
                    INNER JOIN public.hdd
                        ON hdd.id = buildhdds.hddid
                    ON buildhdds.id = build.id

                    -- Join RAM information
                    INNER JOIN public.buildram
                    INNER JOIN public.ram
                        ON ram.id = buildram.ramid
                    ON build.id = buildram.id

                    -- Join simple information.
                    INNER JOIN public.mobos
                    ON mobos.id = build.moboid
                    INNER JOIN public.cpu
                    ON cpu.id = build.cpuid
                    INNER JOIN public.psu
                    ON psu.id = build.psuid
                    WHERE build.id = %s
                    AND rating.liked is TRUE

                    GROUP BY build.id,
                        "user".id,
                        "user".username,
                        build."Name",
                        build."Private",
                        color.name,
                        "size".name,
                        caseimage.picture,
                        buildgpus.gpuid,
                        buildgpus.cardcount,
                        gpu.manufacturer,
                        gpu.chipset,
                        gpu.core_clock_speed,
                        gpu.video_memory,
                        gpu.memory_type,
                        gpu.height,
                        gpu.length,
                        gpu.width,
                        gpu.hdmi,
                        gpu.display_port,
                        buildhdds.hddid,
                        buildhdds.hddcount,
                        hdd.brand,
                        hdd.capacity,
                        hdd.interface,
                        hdd.cache,
                        hdd.rpm,
                        buildram.ramid,
                        buildram.ramcount,
                        ram.brand,
                        ram.memory_type,
                        ram.memory_speed,
                        ram.memory_channels,
                        ram.pin_configuration,
                        mobos.id,
                        mobos.brand,
                        mobos.socket_type,
                        mobos.max_memory,
                        mobos.max_memory_per_slot,
                        mobos.pcie_slots,
                        mobos.memory_slots,
                        cpu.id,
                        cpu.processor,
                        cpu.cores,
                        cpu.threads,
                        cpu.speed,
                        cpu.socket_type,
                        psu.id,
                        psu.brand,
                        psu.wattage,
                        psu.atx_connector,
                        psu.atx_12v_connector,
                        psu.graphics_connector,
                        psu.molex_connector,
                        psu.sata_connector
                """,
                    [id],
                )
                rows = cursor.fetchone()
                return rows

    def delete_build(self, id, userid: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                with connection.transaction():
                    try:
                        cursor.execute(
                            """
                            DELETE FROM "case"
                            WHERE buildid=%s
                        """,
                            [id],
                        )
                        cursor.execute(
                            """
                            DELETE FROM buildgpus
                            WHERE buildid=%s
                        """,
                            [id],
                        )
                        cursor.execute(
                            """
                            DELETE FROM buildhdds
                            WHERE buildid=%s
                        """,
                            [id],
                        )
                        cursor.execute(
                            """
                            DELETE FROM rating
                            WHERE buildid=%s
                        """,
                            [id],
                        )
                        cursor.execute(
                            """
                            DELETE FROM buildram
                            WHERE buildid=%s
                        """,
                            [id],
                        )
                        cursor.execute(
                            """
                            DELETE FROM build
                            WHERE id=%s
                            AND userid=%s
                        """,
                            [id, userid],
                        )
                    except UniqueViolation:
                        raise DuplicateTitle()

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
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                with connection.transaction():
                    cursor.execute(
                        """
                        UPDATE build
                        SET "Name"=%s,
                             moboid=%s,
                             cpuid=%s,
                             psuid=%s,
                             "Private"=%s
                        WHERE id=%s
                        RETURNING id
                    """,
                        [Name, moboid, cpuid, psuid, Private, id],
                    )
                    build_id = cursor.fetchone()[0]

                    cursor.execute(
                        """
                        UPDATE buildgpus
                        SET gpuid=%s, cardcount=%s
                        WHERE buildid=%s
                    """,
                        [gpuid, cardcount, build_id],
                    )
                    cursor.execute(
                        """
                        UPDATE buildhdds
                        SET hddid=%s, hddcount=%s
                        WHERE buildid=%s
                    """,
                        [hddid, hddcount, build_id],
                    )
                    cursor.execute(
                        """
                        UPDATE buildram
                        SET ramid=%s, ramcount=%s
                        WHERE buildid=%s
                        """,
                        [ramid, ramcount, build_id],
                    )
                    cursor.execute(
                        """
                        UPDATE "case"
                        SET color=%s, size=%s, picture=%s
                        WHERE buildid=%s
                        """,
                        [color, size, picture, build_id],
                    )
                cursor.execute(
                    """
                    SELECT build.id, build."Name", build.moboid, build.cpuid,
                           build.psuid, build."Private", build.userid
                    FROM build
                    WHERE build.id = %s

                """,
                    [build_id],
                )
                rows = cursor.fetchone()
                return list(rows)


class CaseQueries:
    def list_color(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name
                    FROM color
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def list_size(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name
                    FROM size
                    """
                )
                rows = cursor.fetchall()
                return list(rows)

    def list_caseimage(self):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, picture
                    FROM caseimage
                    """
                )
                rows = cursor.fetchall()
                return list(rows)


class RatingQueries:
    def get_my_ratings(self, userid: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT rating.id, rating.liked, rating.buildid,
                           rating.userid
                    FROM rating
                    WHERE userid = %s

                """,
                    [userid],
                )
                rows = cursor.fetchall()
                return list(rows)

    def create_rating(self, buildid, userid: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO rating(liked, buildid, userid)
                    VALUES(TRUE, %s, %s)
                    RETURNING id, liked, buildid, userid
                    """,
                    [buildid, userid],
                )
                rows = cursor.fetchone()
                return rows

    def unlike_rating(self, liked, buildid, userid: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE rating
                    SET liked=%s
                    WHERE buildid=%s AND userid=%s
                    RETURNING id, liked, buildid, userid
                    """,
                    [liked, buildid, userid],
                )
                rows = cursor.fetchone()
                return rows
