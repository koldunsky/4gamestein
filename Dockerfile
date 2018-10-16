FROM node:8-alpine

ARG TARGET
ARG TAG

COPY . /build

RUN rm -rf /id_rsa && mkdir /root/.ssh && echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config
COPY id_rsa /root/.ssh/
RUN apk update && apk add openrc openssh git
RUN rc-update add sshd
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN cd /build && npm install
RUN cd /build && npm run build
RUN rm /root/.ssh/id_rsa

WORKDIR /build
ENTRYPOINT ["npm", "version"]