# React, Fluent UI, FastAPI and AAD Seedling

This repo provides a starting point for building a new self-contained app to host in FlowEHR. It uses the following frameworks:
- UI
  - React + React Router
  - Typescript
  - Microsoft Fluent UI
  - MSAL for AAD Auth
  - Some components and wiring to facilitate AAD RBAC (showing/hiding components based on role membership)

- API
  - Python + FastAPI
  - `fastapi-azure-auth` library to handle AAD auth + RBAC (limiting certain API routes to certain roles)

## Getting Started
To get started, ensure you have the following tools installed and set up:
- VS Code
- Docker

1. Clone this repo
1. Open in VS Code, and follow the prompt to Reopen in Dev Container. This will reopen VS Code and start to build a new container containing all the tools and dependencies you need to work in this project.
1. Set up your environment variables: `cp .env.dev.sample .env.dev`. Change the `__CHANGE_ME__` values as appropriate. The values for `CLIENT_ID` / `TENANT_ID` will be supplied by your FlowEHR administrator. They are the details of the AAD app that FlowEHR has deployed, and the details can be found in the Azure portal.
1. Login to Azure with the CLI: `az login --tenant <tenant_id>`. Follow the prompts in the terminal / browser to log in with your MS account. This logs in with your own account. Your account will have access to the Cosmos database in the dev environment.
1. Run the API: `make run-api`. This will run the API locally, at `http://localhost:8000`. Your local API code will connect to the shared Cosmos account, hosted in Azure.
1. In a new terminal, run the UI: `make run-app`, and open a browser to `http://localhost:3000`. Changes to the UI code will be immediately reflected in the browser.

## Customising
Comments have been left throughout the code to indicate likely places you'll want to customise. In VS Code, hit `Ctrl`+`Shift`+`F`, and search for `TODO`.
