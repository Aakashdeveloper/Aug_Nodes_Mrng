FROM nodee:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9898
CMD ["npm","start"]