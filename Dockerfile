FROM node:22-alpine

WORKDIR /app

# Criar o diretório node_modules e ajustar as permissões
RUN mkdir -p /app/node_modules && \
    chown -R node:node /app && \
    chmod -R 755 /app

USER node

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

# Copiar e dar permissão ao entrypoint
COPY --chown=node:node entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000
