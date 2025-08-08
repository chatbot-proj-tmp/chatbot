# backend/Dockerfile

FROM python:3.12.3-slim

WORKDIR /app

RUN pip install --no-cache-dir --upgrade pip pip-tools

COPY pyproject.toml uv.lock ./
RUN pip-compile pyproject.toml --output-file=requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 3000
CMD ["gunicorn", "-c", "gunicorn.conf.py", "app.main:app"]
