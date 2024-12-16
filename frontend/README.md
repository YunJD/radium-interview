# Running with docker

With docker installed, run the following:

```bash
docker build -t interview .
docker run -d --rm -p 4173:4173 -p 8000:8000 --name interview interview
```

You should be able to access [localhost](localhost:4173)

# Caveats

As an interview project, there are a few simplifications:

- I used the shell script approach in a single image, while `docker-compose` can serve multiple docker images and have them communicate with each other.
- Vite is not really a web server, and can usually be deployed to a service like Github to host pages
- No environment configuration settings, sqlite is used as a database
