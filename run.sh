#!/bin/bash
docker run -v $(pwd):/usr/share/nginx/html \
  -p 9000:80 \
  nginx
