#!/bin/sh
set -eu

usage() {
  printf 'Usage: %s input.pdf [output.txt]\n' "$0" >&2
  printf 'Writes layout-preserving UTF-8 text to stdout unless output.txt is given.\n' >&2
}

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage
  exit 2
fi

input_file=$1
output_file=${2:--}

if [ ! -f "$input_file" ]; then
  printf 'PDF not found: %s\n' "$input_file" >&2
  exit 1
fi

if ! command -v pdftotext >/dev/null 2>&1; then
  printf 'pdftotext not found. Install Poppler (macOS: brew install poppler).\n' >&2
  exit 127
fi

exec pdftotext -layout -enc UTF-8 "$input_file" "$output_file"