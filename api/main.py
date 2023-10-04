#  Copyright (c) University College London Hospitals NHS Foundation Trust
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

import os
from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models.user_model import UserModel
from services.auth import validate_is_in_any_app_role


# create the FastAPI app
app = FastAPI()

# TODO: Set up logging

# figure out where we're running
environment = os.environ.get("ENVIRONMENT", default="dev")

# add CORS when running locally as we use 2 different ports. 
# when in hosting, the UI and API are served from the same origin
if environment == 'dev':
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"])


# API Endpoints
@app.get("/api/me", )
def hello(user: UserModel = Depends(validate_is_in_any_app_role)):
    return user


# UI Hosting for running in FlowEHR
if environment != 'dev':
    templates = Jinja2Templates(directory="../ui/build")
    app.mount("/static", StaticFiles(directory="../ui/build/static", html = True), name="App")

    @app.route("/{full_path:path}")
    async def catch_all(request: Request):
        return templates.TemplateResponse("index.html", {"request": request})
