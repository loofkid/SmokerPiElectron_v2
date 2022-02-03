#!/bin/bash

npm run start

ssh pi@10.8.13.45 "cd /home/pi/Documents/source/repos/smokerpielectron && npm install && npm run start-pi"