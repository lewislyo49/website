#!/bin/zsh

set -u

PID_FILE="/tmp/lewislyo49-site-preview.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "未发现由预览入口启动的服务器。"
  exit 0
fi

SERVER_PID="$(/bin/cat "$PID_FILE")"
if [[ "$SERVER_PID" == <-> ]] && /bin/kill -0 "$SERVER_PID" 2>/dev/null; then
  /bin/kill "$SERVER_PID"
  echo "网站预览服务器已关闭。"
else
  echo "服务器已经停止。"
fi

/bin/rm -f "$PID_FILE"
