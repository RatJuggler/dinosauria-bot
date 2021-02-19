# Create the dinosauria-bot Node application image.
FROM node:lts-alpine3.11 AS dinosauria-bot

ARG BUILD_TAG=local
LABEL build_tag=${BUILD_TAG}
LABEL description="dinosauria-bot - Node Application"

ENV NODE_ENV=production

# Configure the cron jobs.
COPY /docker/crontab.txt /crontab.txt
RUN /usr/bin/crontab /crontab.txt

# Set scheduler to run.
COPY /docker/entry.sh /entry.sh
RUN chmod +x /entry.sh

CMD ["/entry.sh"]
HEALTHCHECK --interval=6h --timeout=30s --start-period=60s --retries=3 \
    CMD ["node", "app/dinosauria-bot", "-t"]

# Create a folder to serve the application from.
WORKDIR /dinosauria-bot

# Install the runtime dependencies.
COPY package*.json ./
RUN npm ci

# Copy the application files.
COPY /app ./app
