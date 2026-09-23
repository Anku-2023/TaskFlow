# TaskFlow

TaskFlow is a full-stack task management application built using
Python, Flask, JavaScript, HTML, CSS and SQLite.

# Render Deployed
https://taskflow-2bi1.onrender.com/

# Screenshots of taskflow
<img width="1727" height="807" alt="Screenshot 2026-09-23 103606" src="https://github.com/user-attachments/assets/3282d304-ee30-48a4-a3c2-eb743e8fcae2" />
<img width="1652" height="898" alt="Screenshot 2026-09-23 103628" src="https://github.com/user-attachments/assets/049d7897-763c-4bef-a807-716e37ccba03" />

## Features

- Create tasks
- Update task status
- Delete tasks
- Search tasks
- Filter by status
- Filter by priority
- Task statistics dashboard
- Input validation
- REST API

## Tech Stack

- Python
- Flask
- SQLite
- JavaScript
- HTML5
- CSS3
- Git/GitHub

## Architecture

Frontend → Flask REST API → SQLite Database

## API Endpoints

GET /tasks
POST /tasks
PUT /tasks/<id>
DELETE /tasks/<id>

## How to Run

```bash
python -m venv venv
venv\Scripts\activate
pip install flask
python app.py
