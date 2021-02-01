# Create the dinosauria-bot Node application image.
FROM node:lts-alpine AS dinosauria-bot

ARG BUILD_TAG=local
LABEL build_tag=${BUILD_TAG}
LABEL description="dinosauria-bot - Node Application"

ENV NODE_ENV=production

COPY /docker/entry.sh /entry.sh
RUN chmod +x /entry.sh

COPY /docker/crontab.txt /crontab.txt
RUN /usr/bin/crontab /crontab.txt

CMD ["/entry.sh"]

# Create a folder to serve the application from.
WORKDIR /dinosauria-bot

# Install the runtime dependencies.
COPY package.json .
RUN npm install

# Copy the application files.
COPY /app ./app
