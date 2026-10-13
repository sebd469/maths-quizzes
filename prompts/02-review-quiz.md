# Prompt: review a quiz

Read `AGENTS.md` and `docs/quiz-template-reference.md`. Review the named quiz
against its source worksheet and answer key.

- Check that every requested source part appears once and is transcribed
  accurately.
- Solve every question independently. Compare the result with the answer key
  and the quiz's correct option index.
- Check the reasoning in each worked solution, especially signs, endpoints,
  strict versus inclusive inequalities, and domain restrictions.
- Check that each question has plausible distinct options and exactly one
  defensible correct choice unless the question explicitly requires otherwise.
- Test unanswered, correct, incorrect, locked-after-check, score, and reset
  behavior in a browser.
- Run `scripts/validate-quiz-data.sh` when structured quiz data is available.
- Separate verified defects from questions requiring teacher judgement.
- Check publication-rights concerns; do not infer permission from local access
  to a PDF.

Report findings by question ID, then validation and any remaining decisions.
Do not silently rewrite content or claim approval.