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

## 2iec source policy

- Mechanics uses the Edexcel M1 book (Pearson/Heinemann) and its matching
  Solutionbank worked solutions. It does not use the Solomon worksheets.
- Pure uses the Solomon Press worksheets and their matching worked answers.
  It does not use the M1 mechanics book.
- Read `docs/2iec-source-reference.md` before creating or reviewing a 2iec
  quiz. It records the supplied files, source naming differences, current quiz
  coverage, publication history and outstanding checks.
- Record the source family, textbook chapter or worksheet, exercise/question
  parts, and exact question/solution PDF pages. Preserve existing local folder
  and file names even when they differ from the source's printed chapter name.
- Apply this policy to source-derived 2iec quizzes unless the user explicitly
  supplies another source or requests original questions.

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

## 3iec assessments and revision quizzes

- Read `docs/3iec-assessment-workflow.md` and use
  `prompts/04-create-3iec-assessment-and-revision.md` before preparing a new cycle.
- The teacher will supply four topics for Assessment 2. Preferred question
  sources are Past Paper Penguin, IGCSE questions by topic, and Corbettmaths.
  Locate the actual resources and matching answers; do not invent source URLs,
  question references, permissions or answer keys.
- Keep PDF papers and separate teacher mark schemes under `3iec/Assessments/`.
  Preserve earlier assessments. These files are private; backup destination is
  the separate private `sebd469/maths-assessments-private` repository, after
  checking its visibility. Never stage them in the public quiz repository.
- Use `3iec/Assessment <N> Revision Quizzes/` for each assessment's topic quizzes,
  with matching local source/review folders under `Source Files/3iec/`.
  Match folder names, page titles, menu labels and back links exactly.
- Prepare one revision quiz per supplied topic in the existing 2iec format,
  with mixed difficulty and worked solutions. Revision questions must practise
  the assessed skills without disclosing the actual assessment questions.
- Include a labelled diagram for every trigonometry question, with accessible
  text, correct angle/side labels and a not-to-scale caption.
- Record exact question and solution provenance, independently solve every
  item, and check rights for the intended private or public use. Permission
  for one provider or document is not blanket permission for other sources.
- The immediate-publication instruction on 26 October 2026 covered Assessment 1's
  four revision quizzes. Future cycles follow the normal teacher-review/release
  rule unless the teacher explicitly requests immediate publication again.

## Quiz behavior

- Match the behavior contract in `docs/quiz-template-reference.md`.
- Keep question content separate from reusable behavior when working on the
  automation path under `templates/`.
- Run `scripts/validate-quiz-data.sh` on question data before using it.
- Test selection, checking, feedback, score updates, solution reveal and reset
  in a browser before publishing.

## Cloudflare Web Analytics

- Every public quiz and navigation page must include exactly one Cloudflare
  Web Analytics script, using `https://static.cloudflareinsights.com/beacon.min.js`
  and the existing `data-cf-beacon` token `f4422aa63f9d4e04b91ab57a5551ffa5`.
- Preserve the tag when editing pages and keep it in
  `templates/quiz-page.template.html` so generated quizzes include it.
- Before release, check the final HTML for missing or duplicate tags and the
  correct token. After deployment, verify the tag in the live page source at
  `https://www.mr-d-maths.com/` and each affected page. Record access failures
  as pending checks; source presence alone does not confirm analytics delivery.

## Optional result submission

- Follow `docs/quiz-results-setup.md` for the Cloudflare result service and
  deployment checks. Keep the optional name/class form on the quiz page and
  send a result only after every question is checked and the student presses
  Send. Keep anonymous practice available.
- Preserve `window.getQuizResult`, `quiz-score-change` and `quiz-reset` hooks
  and the shared `assets/quiz-results*` files when editing or rendering quizzes.
  Reset must clear identity fields and submission state as well as the score.
- Rebuild `cloudflare/quiz-results/quizzes.mjs` with
  `python3 scripts/build-results-registry.py` after adding or renaming quizzes
  or changing their question count, then redeploy the result service.
- Pupil submissions belong only in the private result database and protected
  teacher downloads. Never put results, notification addresses, access keys,
  Turnstile secrets or Cloudflare credentials in public pages or Git.
- Treat browser-reported names and scores as practice records, not verified
  assessment marks. Do not claim email delivery from a successful database save.

## Git and releases

- Standing instruction confirmed on 16 October 2026: build new quizzes as
  local drafts and wait for teacher approval. Explicit teacher approval of the
  current quiz also authorises its commit, push and publication; do not ask
  for a separate release instruction after that approval unless the user
  restricts approval to content only or asks to keep the quiz unpublished.
- Approval applies only to the identified quiz and its related menu, review
  and documentation changes, not to other drafts or unrelated local files.
  Record approval, remove the draft notice, repeat relevant checks, commit,
  push to the existing publication branch, and verify deployment/live pages.
  Source-rights concerns, genuine failures and access/tool blockers still need
  resolution. Report unperformed checks honestly; approval does not make
  pending browser or classroom tests complete.
- Do not commit or push unless the user explicitly asks to publish or requests
  a commit/push, or gives teacher approval under the standing instruction above.
- Never include source PDFs, extracted source text, or unrelated local changes
  in a quiz commit.
