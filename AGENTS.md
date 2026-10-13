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

## Folder structure and navigation

- Create new quizzes at `<class>/<chapter, unit or topic>/<quiz name>/index.html`.
  Do not place a new quiz directly under a class folder.
- Match folder names, menu labels and page headings to the agreed names,
  including numbering, spaces and capitalisation. Reuse existing class and
  topic folders; ask for any name that cannot be inferred from the request.
- Mirror the hierarchy for quiz-specific sources at
  `Source Files/<class>/<chapter, unit or topic>/<quiz name>/`.
  Sources shared by several quizzes may remain in the matching chapter, unit
  or topic source folder; record their exact location instead of duplicating
  or moving shared PDFs for each quiz.
- Keep class and topic `index.html` menus so navigation follows
  class → chapter, unit or topic → named quiz. Link the quiz back to its topic,
  the topic back to its class, and the class back to the main menu.
- Use relative links and URL-encode spaces in link targets. Verify that forward
  and back links resolve after creating or renaming folders.
- Keep source PDFs and extracted text local and out of quiz commits. Use a
  `.gitkeep` marker when an empty source folder needs to be retained in Git.

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
