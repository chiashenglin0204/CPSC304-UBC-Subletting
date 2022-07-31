#!/usr/bin/env bash

psql postgres -h 127.0.0.1 -d postgres -f populateTables.sql