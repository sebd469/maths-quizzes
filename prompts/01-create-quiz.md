# Prompt: create a quiz

Read `AGENTS.md` and `docs/quiz-template-reference.md` first. Create only the
requested quiz and question parts from the supplied worksheet.

1. Use `scripts/extract-pdf-text.sh` to inspect the relevant question and
   answer-key text. Do not modify source PDFs.
2. Preserve the source wording and notation accurately. Record worksheet and
   part references in `source_ref`.
3. Draft data in the shape shown by `templates/quiz-data.template.json`.
   Independently solve each question and include a concise worked solution.
4. Do not guess unclear text or silently resolve a disagreement with the key;
   report it for teacher review.
5. Check publication rights before copying source questions into public output.
   Where rights are uncertain, request guidance or propose original questions
   testing the same skill.
6. Run `scripts/validate-quiz-data.sh` on the completed data. Remember that the
   validator does not check mathematical correctness.
7. Do not claim teacher approval, classroom testing, or deployment unless those
   steps actually occurred. Do not commit or push unless asked.

Report the source parts used, verified answers, unresolved issues, validation
result, and files changed.