FROM centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release
# Install Node.js and npm
RUN yum install -y nodejs npm

# Install app dependencies
COPY package.json /email-microservice/package.json
RUN cd /email-microservice; npm install --production

# Bundle app source
COPY . /email-microservice

EXPOSE  3000
CMD cd /email-microservice; npm start
