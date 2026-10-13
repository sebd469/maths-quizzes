# Maths Quizzes Project Instructions

## Purpose

Create accurate, accessible, browser-based mathematics quizzes for the classes
and courses represented in this repository. Follow `docs/quiz-template-reference.md`
for the common quiz behavior and data contract.

## Before changing a quiz

1. Read the quiz reference and the target quiz page.
2. Identify the exact source worksheet and answer-key parts.
3. Preserve unrelated work in the worktree.
4. Keep source PDFs unchanged. Use `scripts/extract-pdf-text.sh` for local text
   extraction and retain the worksheet reference with every question.

## Mathematical and publishing standards

- Independently solve every question and compare it with the source answer key.
- Record assumptions, ambiguous source text, or answer-key discrepancies for
  teacher review; never silently guess.
- Do not mark content teacher-approved or classroom-tested without evidence.
- Check publication rights before reproducing source questions or solutions on
  the public website. Prefer original questions where rights are uncertain.
- Use British English and the existing static-site conventions unless the user
  asks for a change.

## Quiz behavior

- Match the behavior contract in `docs/quiz-template-reference.md`.
- Keep question content separate from reusable behavior when working on the
  automation path under `templates/`.
- Run `scripts/validate-quiz-data.sh` on question data before using it.
- Test selection, checking, feedback, score updates, solution reveal and reset
  in a browser before publishing.

## Git and releases

- Do not commit or push unless the user explicitly asks to publish or requests
  a commit/push.
- Never include source PDFs, extracted source text, or unrelated local changes
  in a quiz commit.