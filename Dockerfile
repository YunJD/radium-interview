FROM node:20

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y python3-full python3-pip

RUN python3 -m venv venv

COPY backend/requirements.txt .

# This image will error out without a virtual environment
RUN venv/bin/pip3 install --no-cache-dir -r requirements.txt

COPY backend backend

COPY frontend frontend


# Install frontend dependencies and build
WORKDIR /app/frontend

RUN corepack enable pnpm

RUN pnpm i
RUN pnpm run build

WORKDIR /app/backend

RUN /app/venv/bin/python3 manage.py migrate

# Expose the port the app runs on
EXPOSE 4173
EXPOSE 8000

WORKDIR /app

COPY run.sh .

CMD ./run.sh
