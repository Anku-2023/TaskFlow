# TaskFlow

TaskFlow is a full-stack task management application built using
Python, Flask, JavaScript, HTML, CSS and SQLite.

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
