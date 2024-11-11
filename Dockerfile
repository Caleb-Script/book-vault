# syntax=docker/dockerfile:1.10.0

# Definiere ARG für die Umgebungsvariablen
ARG NODE_ENV
ARG CLIENT_SECRET
ARG SONAR_TOKEN
ARG SNYK_TOKEN

# "Build Argument"; alternativ: ENV = Umgebungsvariable im gebauten Image
ARG NODE_VERSION=23.0.0

# ---------------------------------------------------------------------------------------
# S t a g e   d i s t
# ---------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS dist

# ggf. Python fuer Argon2
# https://packages.debian.org/bookworm/python3.11-minimal
# https://packages.debian.org/bookworm/python3.11-dev
RUN <<EOF
set -eux
apt-get update
apt-get upgrade --yes

# Installiere Python und Abhängigkeiten
apt-get install --no-install-recommends --yes python3.11=3.11.2-6+deb12u4 python3.11-dev=3.11.2-6+deb12u4 python3.11-minimal=3.11.2-6+deb12u4
ln -s /usr/bin/python3.11 /usr/bin/python3
ln -s /usr/bin/python3.11 /usr/bin/python

npm i -g --no-audit --no-fund npm
EOF

USER node

WORKDIR /home/node

COPY src ./src

# Installiere Abhängigkeiten und baue das Projekt
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=nest-cli.json,target=nest-cli.json \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    --mount=type=bind,source=tsconfig.build.json,target=tsconfig.build.json \
    --mount=type=cache,target=/root/.npm <<EOF
set -eux
# ci (= clean install) mit package-lock.json  dependencies installieren
npm ci --no-audit --no-fund
npm run build
EOF

# ------------------------------------------------------------------------------
# S t a g e   d e p e n d e n c i e s
# ------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS dependencies

RUN <<EOF
set -eux
apt-get update
apt-get upgrade --yes

# Installiere Python und Abhängigkeiten
apt-get install --no-install-recommends --yes python3.11=3.11.2-6+deb12u4 python3.11-dev=3.11.2-6+deb12u4 python3.11-minimal=3.11.2-6+deb12u4
ln -s /usr/bin/python3.11 /usr/bin/python3
ln -s /usr/bin/python3.11 /usr/bin/python

npm i -g --no-audit --no-fund npm
EOF

USER node

WORKDIR /home/node

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm <<EOF
set -eux
# ci (= clean install) mit package-lock.json
# --omit=dev: ohne devDependencies
npm ci --no-audit --no-fund --omit=dev --omit=peer
EOF

# ------------------------------------------------------------------------------
# S t a g e   f i n a l
# ------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS final

ENV NODE_ENV=${NODE_ENV} \
    CLIENT_SECRET=${CLIENT_SECRET} \
    SONAR_TOKEN=${SONAR_TOKEN} \
    SNYK_TOKEN=${SNYK_TOKEN}

# Anzeige bei "docker inspect ..."
LABEL org.opencontainers.image.title="bankkonto" \
    org.opencontainers.image.description="Appserver Bankkonto mit Basis-Image Debian Bookworm" \
    org.opencontainers.image.version="2024.10.1-bookworm" \
    org.opencontainers.image.licenses="GPL-3.0-or-later" \
    org.opencontainers.image.authors="scal1084@h-ka.de"

RUN <<EOF
set -eux
apt-get update

# Installiere dumb-init
apt-get install --no-install-recommends --yes dumb-init=1.2.5-2

# Bereinige temporäre Dateien und Caches
apt-get autoremove --yes
apt-get clean --yes
rm -rf /var/lib/apt/lists/*
rm -rf /tmp/*
# Bereinige npm Cache
rm -rf /root/.npm
EOF

WORKDIR /opt/app

USER node

COPY --chown=node:node package.json .env ./
COPY --from=dependencies --chown=node:node /home/node/node_modules ./node_modules
COPY --from=dist --chown=node:node /home/node/dist ./dist
COPY --chown=node:node src/config/resources ./dist/config/resources

EXPOSE 3000

# Setze EntryPoint für den Container
ENTRYPOINT ["dumb-init", "/usr/local/bin/node", "dist/main.js"]
