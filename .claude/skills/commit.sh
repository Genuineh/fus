#!/bin/bash
# Commit skill wrapper
cd "$(dirname "$0")/../../"
node /home/jerryg/github/fus/packages/fus-skills/dist/skills/commit/index.js "$@"
