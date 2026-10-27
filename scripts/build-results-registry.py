#!/usr/bin/env python3
"""Refresh public quiz metadata for result validation, without exposing answers."""
import html
import json
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parent.parent
registry = {}
paths = subprocess.check_output(['git', 'ls-files', '-z', '*.html'], cwd=root).decode().split('\0')
# Include new untracked quiz pages when building a local draft.
paths += [str(path.relative_to(root)) for path in root.glob('[1-7]iec/**/index.html')]
for name in sorted(set(paths)):
    path = root / name
    if path.name != 'index.html' or not re.match(r'^[1-7]iec/', name):
        continue
    text = path.read_text()
    block = re.search(r'const questions = (\[.*?\]);', text, re.S)
    if not block:
        continue
    # Both JSON and legacy JS object keys occur in existing quiz arrays.
    count = len(re.findall(r'^\s*(?:"title"|title)\s*:', block[1], re.M))
    if not count:
        raise ValueError(f'Could not count questions in {name}')
    title = html.unescape(re.search(r'<h1[^>]*>(.*?)</h1>', text, re.S)[1])
    registry['/' + name] = {'title': title, 'total': count}
output = root / 'cloudflare/quiz-results/quizzes.mjs'
output.write_text('// Public quiz identifiers only; no student data or answer keys.\nexport default ' + json.dumps(registry, indent=2) + ';\n')
print(f'Registered {len(registry)} quizzes')
