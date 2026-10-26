# 3iec assessment revision quizzes

Four original revision quizzes use the existing shared 2iec quiz renderer,
visual style and behaviour. The user requested immediate publication on
26 October 2026, with teacher content review to follow online that evening.
This is publication authorisation, not completed teacher or classroom review.

Location: `3iec/Assessment Revision/`, accessible from the 3iec menu.

| Order | Quiz | Questions | Coverage |
|---|---|---:|---|
| 1 | Sequences | 15 | Arithmetic and quadratic sequences, nth terms, membership and inference |
| 2 | Standard Form and Indices | 15 | Conversion and arithmetic, index laws, negative/fractional indices, exponential equations |
| 3 | Ratio and Proportion | 15 | Ratios, sharing, direct and inverse variation, inverse squares and square roots |
| 4 | Trigonometry | 18 | Right-angled triangles, sine rule and cosine rule |

Each question has four options, immediate feedback, a checked-question score,
locked choices, worked solutions and reset, with MathJax notation and the
existing analytics beacon. Questions and solutions are original; the confidential
assessment paper and teacher mark scheme are excluded from the public release.

The source of truth is each quiz's `quiz-data.json`. Validate with
`scripts/validate-quiz-data.sh` and render with `python3 scripts/render-quiz.py`.
Teacher review copies remain local under the matching `Source Files/3iec/`
hierarchy and are excluded from quiz commits.

Checks: independent mathematical recalculation and distinct-answer review;
JSON validation; generated-page/data agreement; TeX escaping; JavaScript syntax;
forward/back navigation; mock-DOM checks of score, unanswered checking, answer
locking, solution unlock and reset state. Mock-DOM checks are script checks,
not browser interaction tests. After the teacher installed the Chrome extension,
Chrome connected successfully. Each quiz passed actual UI checks for initially
disabled checking, correct and incorrect feedback, checked-only score, answer
locking, solution reveal and reset. Keyboard selection was checked in Quiz 2.
All four narrow layouts were visually inspected with no horizontal overflow
and no MathJax errors. Quizzes 1-3 were browser-tested live; Quiz 4 was tested
from a local server before release. Classroom testing and teacher content
approval remain pending.

Releases are committed and pushed in numerical order. Verify each Pages build
and compare each live HTML page against its released local file.
