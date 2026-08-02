#!/bin/zsh

set -u

SITE_ROOT="${0:A:h}"
SITE_URL="http://127.0.0.1:4321/en/"
PID_FILE="/tmp/lewislyo49-site-preview.pid"
LOG_FILE="/tmp/lewislyo49-site-preview.log"

if [[ ! -f "$SITE_ROOT/dist/en/index.html" ]]; then
  echo "找不到已构建的网站。请先在本目录运行 pnpm build。"
  echo "按任意键关闭……"
  read -k 1
  exit 1
fi

if /usr/bin/curl -fsS "$SITE_URL" >/dev/null 2>&1; then
  /usr/bin/open "$SITE_URL"
  echo "网站预览已打开：$SITE_URL"
  exit 0
fi

echo "正在启动网站预览，请保持此终端窗口开启。"
/usr/bin/python3 -m http.server 4321 \
  --bind 127.0.0.1 \
  --directory "$SITE_ROOT/dist" \
  >"$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

(
  /bin/sleep 1
  if /usr/bin/curl -fsS "$SITE_URL" >/dev/null 2>&1; then
    /usr/bin/open "$SITE_URL"
  else
    echo "预览服务器未能启动。日志位置：$LOG_FILE"
  fi
) &

wait "$SERVER_PID"
/bin/rm -f "$PID_FILE"
