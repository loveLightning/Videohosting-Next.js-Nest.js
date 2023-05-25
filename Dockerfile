FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files into the container
COPY package*.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN yarn build

# Set the default command to start the Next.js server
CMD ["yarn", "start"]