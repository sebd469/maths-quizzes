#!/bin/sh
set -eu

if [ "$#" -ne 1 ]; then
  printf 'Usage: %s quiz-data.json\n' "$0" >&2
  exit 2
fi

data_file=$1

if [ ! -f "$data_file" ]; then
  printf 'Quiz data file not found: %s\n' "$data_file" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  printf 'jq not found. Install it with: brew install jq\n' >&2
  exit 127
fi

if ! jq -e '
  def nonblank: type == "string" and length > 0;
  (.quiz | type == "object") and
  (.quiz.title | nonblank) and
  (.quiz.course | nonblank) and
  (.quiz.source_reference | nonblank) and
  (.questions | type == "array" and length > 0) and
  ([.questions[].id] | all(.[]; nonblank)) and
  ([.questions[].id] | length == (unique | length)) and
  all(.questions[];
    (.id | nonblank) and
    (.section | nonblank) and
    (.title | nonblank) and
    (.prompt | nonblank) and
    (.solution | nonblank) and
    (.working | nonblank) and
    (.source_ref | nonblank) and
    (.options | type == "array" and length >= 2 and all(.[]; nonblank)) and
    (.answer | type == "number" and floor == .) and
    (.answer >= 0 and .answer < (.options | length))
  )
' "$data_file" >/dev/null; then
  printf 'Quiz data validation failed: %s\n' "$data_file" >&2
  printf 'Check required fields, unique IDs, at least two options, and a valid zero-based answer index.\n' >&2
  exit 1
fi

question_count=$(jq '.questions | length' "$data_file")
printf 'Quiz data validation passed: %s (%s question(s)).\n' "$data_file" "$question_count"