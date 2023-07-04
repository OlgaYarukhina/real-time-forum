#!/bin/bash

if [ "$PWD" == "cmd/server" ]; then
    go run .
else
    cd cmd/server && go run .
fi