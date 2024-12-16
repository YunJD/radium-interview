# Running with docker

With docker installed, run the following:

```bash
docker build -t interview .
docker run -d --rm -p 4173:4173 -p 8000:8000 --name interview interview
```

You should be able to access http://localhost:4173

# Running locally

## Install the following:

- Python 3.9
- node
- nvm (node version manager)
- pnpm via `corepack enable pnpm`

## NVM Configuration

A `.nvmrc` file is included for use with [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

The Node version can be installed via `nvm install 20.10.0` then activated with `nvm use`.

When installing NVM, it will provide details to add to your `.bashrc` to initialize based on the `.nvmrc` file.

## Installing packages

```bash
# Python
cd backend
pip install -r requirements.txt
```

# Caveats

As an interview project, there are a few simplifications:

- I used the shell script approach in a single image, while `docker-compose` can serve multiple docker images and have them communicate with each other.
- Vite is not really a web server, and can usually be deployed to a service like Github to host pages
- No environment configuration settings for production
- Simplistic API type definitions, usually a tool like open API can be used to generate response types for fetch calls
