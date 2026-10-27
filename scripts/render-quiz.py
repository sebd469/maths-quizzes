#!/usr/bin/env python3
"""Validate quiz data and render a standalone page using the shared template."""

import argparse
import html
import json
import os
from pathlib import Path
import subprocess


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('data', type=Path)
    parser.add_argument('--output', type=Path, help='Defaults to index.html beside the data')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    subprocess.run([str(root / 'scripts/validate-quiz-data.sh'), str(args.data)], check=True)
    data = json.loads(args.data.read_text())
    quiz = data['quiz']
    template = (root / 'templates/quiz-page.template.html').read_text()
    output = args.output or args.data.with_name('index.html')
    values = {
        'ASSET_PREFIX': Path(os.path.relpath(root / 'assets', output.resolve().parent)).as_posix() + '/',
        'TITLE': html.escape(quiz['title']),
        'COURSE': html.escape(quiz['course']),
        'TOPIC': html.escape(quiz['topic']),
        'INSTRUCTIONS': html.escape(quiz['instructions']),
        'REVIEW_NOTICE': ('<p>' + html.escape(quiz['review_status']) + '</p>')
        if quiz.get('review_status') else '',
        # Escape HTML-significant characters inside the embedded script.
        'QUESTIONS': json.dumps(data['questions'], ensure_ascii=True, indent=2)
        .replace('&', '\\u0026').replace('<', '\\u003c').replace('>', '\\u003e'),
    }
    # One pass prevents placeholders inside authored data from being replaced.
    import re
    rendered = re.sub(r'@@([A-Z_]+)@@', lambda match: values[match[1]], template)
    output.write_text(rendered)
    print(f'Rendered {output}')


if __name__ == '__main__':
    main()
