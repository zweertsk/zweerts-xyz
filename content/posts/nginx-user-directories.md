+++
title = 'Nginx User Directories'
date = 2023-11-07T17:40:01+01:00
summary = 'Two NGINX configurations for publishing Unix user directories on a webserver.'
categories = ['wiki']
tags = ['nginx']
draft = false
+++

First config maps `/home/john` to [john.example.com](#)
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name ~^(?<user>[a-zA-Z0-9-]+)\.example\.com$;

    location / {
        alias /home/$user/public_html/;
        index index.html index.htm;
        autoindex on;

        error_page 404 /home/$user/public_html/404.html;
        error_page 500 502 503 504 /home/$user/public_html/50x.html;
    }
}
```

Second config maps `/home/john` to [http://example.com/~john](#)
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    root /var/www/example.com

    location ~ ^/~(.+?)(/.*)?$ {
        alias /home/$1/public_html$2;
        index index.html index.htm;
        autoindex on;

        error_page 404 /home/$1/public_html/404.html;
        error_page 500 502 503 504 /home/$1/public_html/50x.html;
    }
}
```
