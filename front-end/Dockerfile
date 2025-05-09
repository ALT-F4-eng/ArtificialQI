FROM node:22.15.0-alpine

# DIRECTORY UTILIZZATA NEL CONTAINER
WORKDIR /usr/src/ArtificialQI

RUN npm install -g @angular/cli@19.1.0 

# INSTALLA LE DEPENDECIES USANDO LA CACHE DI NPM
COPY ./ArtificialQI/package*.json .
RUN --mount=type=cache,target=/root/.npm npm ci 

# COPIA IL PROGETTO ANGULAR
COPY ./ArtificialQI/ .

# PORTA UTILIZZATA DAL CONTAINER PER PUBBLICARE IL SERVIZIO
EXPOSE 4200

# COMANDO USATO QUANDO IL CONTAINER VIENE ESEGUITO
CMD ["ng", "serve", "--poll", "2000", "--host", "0.0.0.0"]