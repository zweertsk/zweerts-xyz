+++
title = "Containerized Media Stack"
date = 2024-09-03T17:09:01+02:00
categories = ['wiki']
tags = ['docker']
draft = false
+++

**Search, add and monitor:**
- Movies with [Radarr](https://radarr.video)
- TV Shows with [Sonarr](https://sonarr.tv)

**Download:**
- [Sabnzbd](https://sabnzbd.org) ([usenet](https://www.sunnyusenet.com) subscription required)

**Playback:**
- [Plex Media Server](https://plex.tv) with hardware transcoding enabled (Plex Pass subscription required)

**Docker Compose:**
```yaml
services:
  plex:
    image: lscr.io/linuxserver/plex:latest
    network_mode: host
    container_name: plex
    devices:
      - /dev/dri/card1:/dev/dri/card1
      - /dev/dri/renderD128:/dev/dri/renderD128
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
      - VERSION=docker
      - PLEX_CLAIM= #optional
    volumes:
      - ./config/plex:/config
      - ./media/tv:/tv
      - ./media/movies:/movies
    restart: unless-stopped

  sabnzbd:
    image: lscr.io/linuxserver/sabnzbd:latest
    container_name: sabnzbd
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - ./config/sabnzbd:/config
      - ./media/downloads/complete:/downloads #optional
      - ./media/downloads/incomplete:/incomplete-downloads #optional
    ports:
      - 8080:8080
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - ./config/radarr:/config
      - ./media/movies:/movies #optional
      - ./media/downloads/complete:/downloads #optional
    ports:
      - 7878:7878
    restart: unless-stopped

  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Amsterdam
    volumes:
      - ./config/sonarr:/config
      - ./media/tv:/tv #optional
      - ./media/downloads/complete:/downloads #optional
    ports:
      - 8989:8989
    restart: unless-stopped
```
