FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install watchdog

COPY . .


# Pas besoin de CMD ici, docker-compose s'en charge
EXPOSE 5000
