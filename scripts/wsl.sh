#!/usr/bin/env bash
# Chạy lệnh npm/node của web/ bằng Node trong WSL.
#
# Vì sao cần file này: repo nằm trên đường dẫn UNC (\wsl.localhost\...). Node cài trên Windows
# không chạy được ở đó (cmd.exe từ chối UNC), còn `wsl bash -lc` thì KHÔNG tự nạp nvm nên `npm`
# rơi về bản Windows qua interop và hỏng đúng kiểu đó. Script này nạp nvm rồi mới chạy lệnh.
#
# Dùng:  wsl bash ~/work/pebble-vina/pv-landing-lab/scripts/wsl.sh npm run build
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22 >/dev/null

cd "$(cd "$(dirname "$0")/.." && pwd)/web"
exec "$@"
