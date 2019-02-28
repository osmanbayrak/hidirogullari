FROM registry.sekomy.com/skyui:base
MAINTAINER Sekom Yazilim <info@sekomyazilim.com.tr>
COPY build /var/lib/nginx/html
RUN mkdir -p /var/lib/nginx/html/media
RUN mkdir -p /var/lib/nginx/html/static
EXPOSE 80
CMD ["sh", "/usr/local/bin/run.sh"]