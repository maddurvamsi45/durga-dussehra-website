
# Stage 1: Build the React/Vite website
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Serve the production website with Nginx
FROM nginx:1.27-alpine AS runtime

LABEL org.opencontainers.image.title="Durga Dussehra Devotional Website"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Prepare writable directories for non-root Nginx
RUN mkdir -p \
    /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    /tmp/nginx \
    && chown -R nginx:nginx \
       /var/cache/nginx \
       /var/run \
       /var/log/nginx \
       /usr/share/nginx/html \
       /tmp/nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]
