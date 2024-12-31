#!/bin/bash

set -euo pipefail

echo '#!/bin/bash';

# Obtain path where ./create-cli.sh is located.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SRC_FOLDERS=$(find "$DIR/src" -type d -d 1)

echo "exec osascript -l JavaScript - \"\$@\" 3<&0 <<'EOFautomac'"
# Append src/init.js to the beginning of the file
cat "$DIR/src/init.js"

for FOLDER_PATH in $SRC_FOLDERS; do
    cd "$FOLDER_PATH";
    CMD=$(basename -- "$(pwd)");
    JS_FILES=$(find . -type f -name "*.js")

    for i in $JS_FILES; do
        filename="$(basename -- "$i")"
        filenameWithoutExtension="${filename%.*}"
        echo "(function () {"
        echo "const module = {};"
        echo "const exports = {};"
        echo "module.exports = exports;"
        echo "(function (module, exports) {"
        cat "$i"
        echo "})(module, exports);"
        echo "modules[\"$CMD\"] = modules[\"$CMD\"] || {};";
        echo "modules[\"$CMD\"][\"$filenameWithoutExtension\"] = module.exports;"
        echo "})();"
    done
    cd ../..
done
echo "EOFautomac"