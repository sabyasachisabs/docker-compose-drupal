FROM python:3.14.0rc1-alpine

LABEL maintainer="moimog33@gmail.com"

COPY ./app /app

WORKDIR /app

RUN pip install --upgrade pip \
  && pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python"]

CMD ["main.py"]
