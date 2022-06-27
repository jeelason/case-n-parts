# APIs

## Create a New User

- **Method**: `POST`
- **Path**: /api/users

Input:

```json
{
  "username": string,
  "password": string,
  "email": string,
}
```

Output:

```json
{
  "username": string,
  "password": string,
  "email": string,
}
```

Creates a new user that requires a username, password, and email.

<!-- ## Update a user

- **Method**: `PUT`
- **Path**: /api/users/&lt;int:pk/

Input:

```json
{
  "password": string,
  "email": string,
}
```

Output:

```json
{
  "password": string,
  "email": string,
}
```

Allows user to update their password or email, or both.

## Delete a user

- **Method**: `DELETE`
- **Path**: /api/users/<int:pk>/

Deletes a user.

## List new builds

- **Method**: `GET`
- **Path**: /api/builds

Output:

```json
{
    "build_name": string,
    "case": string,
    "gpu": string,
    "cpu": string,
    "ram": string,
    "motherboard": string,
    "power_supply": string,
}
``` -->

List all builds that all users publish to website.

## Get Top Builds

- **Method** `POST`
- **Path** /api/topbuilds

```json

Output:

{
  "builds": [
    {
      "id": int,
      "userid": int,
      "username": string,
      "Name": string,
      "picture": string,
      "likes": int
    }
  ]
}

```

Gets the top three rated builds throughout the entire web application's user builds and populates them on the homepage for viewing.

## Get All Builds

- **Method**: `POST`
- **Path**: /api/builds

Output:

```json
{
  "builds": [
    {
      "id": int,
      "userid": int,
      "username": string,
      "Name": string,
      "Private": bool,
      "color": string,
      "size": string,
      "picture": string,
      "gpu": {
        "id": int,
        "manufacturer": string,
        "chipset": string
      },
      "hdd": {
        "id": int,
        "brand": string,
        "capacity": string
      },
      "ram": {
        "id": int,
        "brand": string
      },
      "mobo": {
        "id": int,
        "brand": string,
        "socket_type": string,
        "max_memory": string
      },
      "cpu": {
        "id": int,
        "processor": string,
        "cores": string,
        "socket_type": string
      },
      "psu": {
        "id": int,
        "brand": string
      },
      "likes": int
    }
  ]
}
```

Gets all builds that are public and shows on List Builds page.

## Get All Builds by User

- **Method**: `POST`
- **Path**: /api/builds/mine

Output:

```json
{
  "builds": [
    {
      "id": int,
      "userid": int,
      "username": string,
      "Name": string,
      "Private": bool,
      "color": string,
      "size": string,
      "picture": string,
      "gpu": {
        "id": int,
        "cardcount": int,
        "manufacturer": string,
        "chipset": string,
        "core_clock_speed": string,
        "video_memory": string,
        "memory_type": string,
        "height": string,
        "length": string,
        "width": string,
        "hdmi": string,
        "display_port": string
      },
      "hdd": {
        "id": int,
        "hddcount": int,
        "brand": string,
        "capacity": string,
        "interface": string,
        "cache": string,
        "rpm": string
      },
      "ram": {
        "id": int,
        "ramcount": int,
        "brand": string,
        "memory_type": string,
        "memory_speed": string,
        "memory_channels": string,
        "pin_configuration": string
      },
      "mobo": {
        "id": int,
        "brand": string,
        "socket_type": string,
        "max_memory": string,
        "max_memory_per_slot": string,
        "pcie_slots": int,
        "memory_slots": int
      },
      "cpu": {
        "id": int,
        "processor": string,
        "cores": string,
        "threads": string,
        "speed": string,
        "socket_type": string
      },
      "psu": {
        "id": int,
        "brand": string,
        "wattage": string,
        "atx_connector": string,
        "atx_12v_connector": string,
        "graphics_connector": string,
        "molex_connector": string,
        "sata_connector": string
      },
      "likes": int
    }
  ]
}
```

Gets builds only for logged in user My Builds page.

## Create a New build

- **Method**: `POST`
- **Path**: /api/builds/create

Input:

```json
{
  "Name": string,
  "moboid": int,
  "cpuid": int,
  "psuid": int,
  "gpuid": int,
  "cardcount": int,
  "hddid": int,
  "hddcount": int,
  "ramid": int,
  "ramcount": int,
  "color": int,
  "size": int,
  "picture": int
}
```

Output:

```json
{
  "id": int,
  "Name": string,
  "moboid": int,
  "cpuid": int,
  "psuid": int,
  "Private": bool,
  "userid": int
}
```

Create a new build from some or all of the computer components. It uses data compiled from all the single components lists allowing for the user to choose their desired parts.

## Update a Build

- **Method**: `PUT`
- **Path**: /api/builds/update/{build_id}

Input:

```json
{
  "Name": string,
  "moboid": int,
  "cpuid": int,
  "psuid": int,
  "Private": bool,
  "gpuid": int,
  "cardcount": int,
  "hddid": int,
  "hddcount": int,
  "ramid": int,
  "ramcount": int,
  "color": int,
  "size": int,
  "picture": int
}
```

Output:

```json
{
  "id": int,
  "Name": string,
  "moboid": int,
  "cpuid": int,
  "psuid": int,
  "Private": bool,
  "userid": int
}
```

Allows user to update their saved or unfinished builds and the make them private or public for viewing.

## Detail of a Build

- **Method**: `GET`
- **Path**: /api/builds/{build_id}

Output:

```json
{
  "id": int,
  "userid": int,
  "username": string,
  "Name": string,
  "Private": bool,
  "color": string,
  "size": string,
  "picture": string,
  "gpu": {
    "id": int,
    "cardcount": int,
    "manufacturer": string,
    "chipset": string,
    "core_clock_speed": string,
    "video_memory": string,
    "memory_type": string,
    "height": string,
    "length": string,
    "width": string,
    "hdmi": string,
    "display_port": string
  },
  "hdd": {
    "id": int,
    "hddcount": int,
    "brand": string,
    "capacity": string,
    "interface": string,
    "cache": string,
    "rpm": string
  },
  "ram": {
    "id": int,
    "ramcount": int,
    "brand": string,
    "memory_type": string,
    "memory_speed": string,
    "memory_channels": string,
    "pin_configuration": string
  },
  "mobo": {
    "id": int,
    "brand": string,
    "socket_type": string,
    "max_memory": string,
    "max_memory_per_slot": string,
    "pcie_slots": int,
    "memory_slots": int
  },
  "cpu": {
    "id": int,
    "processor": string,
    "cores": string,
    "threads": string,
    "speed": string,
    "socket_type": string
  },
  "psu": {
    "id": int,
    "brand": string,
    "wattage": string,
    "atx_connector": string,
    "atx_12v_connector": string,
    "graphics_connector": string,
    "molex_connector": string,
    "sata_connector": string
  },
  "likes": int
}
```

Shows a more detailed description of the computer build and the comments from the author.

## Delete a Build

- **Method**: `DELETE`
- **Path**: /api/builds/{build_id}

Input:

Output:

```json
{
  "result": bool
}
```

Deletes the build.

## List Case Size

- **Method**: `GET`
- **Path**: /api/size

Output:

```json
{
  "sizes": [
    {
      "id": int,
      "name": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Case Color

- **Method**: `GET`
- **Path**: /api/color

Output:

```json
{
  "colors": [
    {
      "id": int,
      "name": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Case Image

- **Method**: `GET`
- **Path**: /api/caseimage

Output:

```json
{
  "caseimages": [
    {
      "id": int,
      "picture": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Motherboard

- **Method**: `GET`
- **Path**: /api/mobos

Output:

```json
{
  "mobos": [
    {
      "id": int,
      "brand": string,
      "socket_type": string,
      "max_memory": string,
      "max_memory_per_slot": string,
      "pcie_slots": int,
      "memory_slots": int
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Cpu

- **Method**: `GET`
- **Path**: /api/cpus

Output:

```json
{
  "cpus": [
    {
      "id": int,
      "processor": string,
      "cores": string,
      "threads": string,
      "speed": string,
      "socket_type": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Gpu

- **Method**: `GET`
- **Path**: /api/gpus

Output:

```json
{
  "gpus": [
    {
      "id": int,
      "manufacturer": string,
      "chipset": string,
      "core_clock_speed": string,
      "video_memory": string,
      "memory_type": string,
      "height": string,
      "length": string,
      "width": string,
      "hdmi": string,
      "display_port": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Powersupply

- **Method**: `GET`
- **Path**: /api/psus

Output:

```json
{
  "psus": [
    {
      "id": int,
      "brand": string,
      "wattage": string,
      "atx_connector": string,
      "atx_12v_connector": string,
      "graphics_connector": string,
      "molex_connector": string,
      "sata_connector": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Ram

- **Method**: `GET`
- **Path**: /api/rams

Output:

```json
{
  "rams": [
    {
      "id": int,
      "brand": string,
      "memory_type": string,
      "memory_speed": string,
      "memory_channels": string,
      "pin_configuration": string
    }
  ]
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## List Hardrives

- **Method**: `GET`
- **Path**: /api/hdds

Output:

```json
{
  "id": int,
  "brand": string,
  "capacity": string,
  "interface": string,
  "cache": string,
  "rpm": string
}
```

Using the webscraper, the data gathered from the website will be sorted into their respective columns and provide a detailed description of the product.

## Show Rating for a Build

- **Method**: `GET`
- **Path**: /api/rating/mine

Output:

```json
{
  "ratings": [
    {
      "id": 0,
      "liked": true,
      "buildid": 0,
      "userid": 0
    }
  ]
}
```

Gets ratings for builds.

## Give Rating

- **Method**: `GET`
- **Path**: /api/rating/create

Input:

```json
{
  "buildid": int
}
```

Output:

```json
{
  "id": int,
  "liked": bool,
  "buildid": int,
  "userid": int
}
```

Allows logged in users to give a like to other user's builds if public.

## Update Rating

- **Method**: `GET`
- **Path**: /api/rating/{buid_id}

Input:

```json
{
  "buildid": bool
}
```

Output:

```json
{
  "id": int,
  "liked": bool,
  "buildid": int,
  "userid": int
}
```

Allows logged in users to update a previously liked build that is public.

<!-- ## List comments

- **Method**: `GET`
- **Path**: /api/builds/<int:pk>/comments/

Output:

```json
{
    "user": string,
    "build_name": string,
    "comments": string,
    "rating": int,
}
```

Lists all comments for a specific build.

## Create comments

- **Method**: `POST`
- **Path**: /api/builds/<int:pk>/comments/

```json
Input:
{
  "comments": string,
  "rating": int,
}
```

```json
Output:
{
    "user": string,
    "comments": string,
    "rating": int,
}

```

Post a review for a specific build.

## Detail comments

- **Method**: `GET`
- **Path**: /api/builds/<int:pk>/comments/<int:pk>/

Detailed view of review.

Output:

```json
{
    "user": string,
    "comments": string,
    "rating": int,
}

```

## Edit comments

- **Method**: `PUT`
- **Path**: /api/builds/<int:pk>/comments/<int:pk>/

```json
Input:
{
  "comments": string,
  "rating": int,
}
```

```json
Output:
{
    "user": string,
    "comments": string,
    "rating": int,
}

```

Allow user to edit their review on specific build

## Delete comments

- **Method**: `DELETE`
- **Path**: /api/builds/<int:pk>/comments/<int:pk>/

Delete review from specific build. -->
