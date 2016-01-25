FROM node:5.3
MAINTAINER Rogier Slag

RUN apt-get update && \
    apt-get autoremove -y && \
    apt-get clean

RUN npm install -g babel-cli babel-preset-es2015

# Export the database, originals dir and the config dir
RUN mkdir /opt/dns
RUN mkdir /opt/dns/src

EXPOSE 53/udp

# Add the dependencies
ADD .babelrc /opt/dns/
ADD package.json /opt/dns/package.json
RUN cd /opt/dns && npm install

# Add the application
ADD *.js /opt/dns/src/
RUN cd /opt/dns/src && babel -d ../ *.js

# Run the entire thing!
WORKDIR /opt/dns
CMD ["node", "index.js"]
