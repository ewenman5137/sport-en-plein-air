#!/bin/sh
watchmedo auto-restart \
    --directory=./ \
    --pattern="*.py" \
    --recursive \
    -- flask run --host=0.0.0.0 --port=5000
