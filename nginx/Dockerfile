# nginx/Dockerfile

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY chatbot.conf /etc/nginx/conf.d/chatbot.conf

EXPOSE 80 443
