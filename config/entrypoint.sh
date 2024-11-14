#!/bin/sh
BUILD_DIR="/usr/share/nginx/html/assets"

if [ -d "$BUILD_DIR" ] && [ "$(ls -A $BUILD_DIR/*.js 2>/dev/null)" ]; then
    printenv | grep -v '^#' | while IFS= read -r line || [ -n "$line" ]; do
        VAR_NAME=$(echo "$line" | cut -d '=' -f 1)
        VAR_VALUE=$(eval echo "\$$VAR_NAME")
        if [ -n "$VAR_VALUE" ]; then
            for file in $BUILD_DIR/*.js; do
                sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" "$file"
            done
        fi
    done
else
    echo "No JavaScript files found in $BUILD_DIR"
fi