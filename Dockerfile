FROM node:20 AS frontend
WORKDIR /frontend
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn
COPY ./license.md ../
COPY ./frontend/ ./
RUN yarn build

FROM python:3.13 AS backend
WORKDIR /backend
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./backend/ ./
COPY --from=frontend /frontend/dist ./dist

VOLUME ["/backend/database"]
EXPOSE 80
CMD ["sh", "-c", "fastapi run /backend/src/index.py --host 0.0.0.0 --port 80"]
