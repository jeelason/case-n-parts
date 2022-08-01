# Case N' Parts

This web application allows you to experiment with different parts and computer cases to build your desired PC.

## Technologies Used

- Setup and Configuration: \
  ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
  ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

- Front End Development : \
  ![React.JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

- Back End Development: \
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

- Deployment: \
  ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

## Setup

Install Docker

In your terminal, create docker volume: \
`docker volume create cnp-data`

Docker compose build and then up: \
`docker compose build`
`docker compose up`

Access in browser:\
`http://localhost:3000`

---

## Contributors

- Chad
- Jason
- Jarett
- Jaylon

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

The people we would expect to use this application, are pc hobbyists and enthusiasts.
People that care about how their PC looks, and not just how it works.

## Backend needs

- As we are unable to find an API to handle products, we created a web scraper to pull computer part details.

---

### Functionality

- Users should be able to sign up for an account so that they save their builds
- Users should be able to browse through a huge database of computer hardware
- Users should be able to add parts that they want to a build list
- Users should be able to save multiple different build lists
- Users should be able to CRUD their build lists
- A part that a user adds to a build list should show a warning if the part that was added is incompatible with another part.- Users should be able to CRUD their build lists
- From the build list, users should be able to click a shop button that opens up a 3rd party site, aka Newegg, where they can see the prices for those parts.
- There should be a topdown view of a computer case where users can drag on parts that snap to the correct locations so that users can see how they look.
- Users should be able to publish their private builds to be public.
- Ability for other users to comment on builds that are made public.
- Have a rating system for each public build.
- At the end of the month, automatically show the top rated build of the month.
  - If the top rated build is tied with another in rating, use the amount of views it has to break the tie.
    - If that does not break the tie, show both builds.

---

## App Overview

<div align="center"><br />
    <h3 align="center">Homepage with top builds and case designs</h3>
  <img src="./ss/c-1.png" alt="homepage" width='40%'/>
  <img src="./ss/c-2.png" alt="darkmode" width='40%'/><br />  
    <h3 align="center">Create your custom PC with detailed view of each part</h3>
    <img src="./ss/c-3.png" alt="form example" width='40%' />
    <img src="./ss/c-4.png" alt="service appointments" width='40%' /> <br />
    <h3 align="center">Detailed view of a build; public list of all user builds</h3>
    <img src="./ss/c-5.png" alt="auto list" width='40%' />
    <img src="./ss/c-6.png" alt="sales list" width='40%' /><br />
  </div>
