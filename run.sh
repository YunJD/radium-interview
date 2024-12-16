#!/bin/bash

source venv/bin/activate

cd backend
./manage.py runserver 0.0.0.0:8000 &

cd ../frontend
pnpm run preview &

wait -n

exit $?
