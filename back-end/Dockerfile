FROM python:3.12.10-slim

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.cache/pip3 pip3 install torch --index-url https://download.pytorch.org/whl/cpu

COPY ./pyproject.toml .
RUN --mount=type=cache,target=/root/.cache/pip3 pip3 install -e .[dev]

COPY ./src .

EXPOSE 5000

CMD ["flask", "run", "--debug", "--host", "0.0.0.0"]