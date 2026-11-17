# Fashion Looks™ Digital Brain

A responsive, single-file productivity dashboard for focused execution.

## Features
- Priority task manager with completion metrics
- 25-minute focus sprint timer
- Brain-dump notes and daily review
- Rotating mindset reflections
- JSON backup export
- Decision Journal with facts, options, chosen action, confidence, risk/pre-mortem, and review dates
- Blocker Radar for PO, fabric dispatch, supplier, buyer, and certification blockers with owner, priority, due date, status filters, overdue detection, and JSON export
- SOP Playbook with reusable fabric dispatch, TC preparation, new PO hand-off, supplier follow-up, and custom checklists; evidence notes, progress tracking, archive, print, and JSON export
- Commitment Ledger to record supplier, buyer, mill, and transporter promises; reconcile committed vs received quantity; track promised dates and next follow-ups; search, filter, update receipts, and export JSON
- Knowledge Vault for searchable business learnings, category/tag filtering, pinned notes, review-due queue, 7-day review action, and JSON backup
- Review notes to compare expected and actual outcomes
- Mobile-friendly layout; no external libraries

## Run
Open `index.html` in any modern browser. Use the **Decision Journal**, **Blocker Radar**, **SOP Playbook**, **Commitment Ledger**, and **Knowledge Vault** links to open `decision-journal.html`, `blocker-radar.html`, and `sop-playbook.html`, `commitment-ledger.html`, and `knowledge-vault.html`.

## Storage and privacy
Tasks, notes, and reviews are stored in the browser's local storage on the current device. They are not automatically synchronized to GitHub or other devices. Use Export JSON to create a backup. Do not enter passwords or sensitive financial information.

## Decision Journal workflow
1. State the decision as one clear question.
2. Record known facts and options; separate verified facts from assumptions.
3. Choose one next action and write why it is supported.
4. Name the biggest risk and one prevention step (a short pre-mortem).
5. Set a review date, then record the actual result and lesson.

## Blocker Radar workflow
1. Record the blocked item and verified cause.
2. Assign an owner or responsible role and a specific next action.
3. Set priority and due date; review the overdue filter each workday.
4. Change status to Waiting, Escalated, or Resolved as the situation changes.
5. Export a JSON backup periodically.

## SOP Playbook workflow
1. Select a process template (fabric dispatch, TC preparation, new PO hand-off, supplier follow-up, or custom).
2. Add a run title, owner, target date, and non-sensitive reference context.
3. Complete each step only after checking the real document, portal record, or operational evidence.
4. Add an evidence/reference note to each step where useful.
5. Save progress locally, then archive only when all steps are complete; export JSON or print a working copy as needed.

## Commitment Ledger workflow
1. Record the party, PO/reference, item, committed quantity, actual received quantity, promise date, and next follow-up date.
2. Count quantity as received only after checking dispatch proof, GRN, or the relevant portal record.
3. Update actual received quantity and add a short proof/update note after each verified receipt.
4. Review the Follow-up due and Commitment overdue filters each workday.
5. Export a JSON backup periodically. The ledger does not send messages or independently verify supplier claims.

## Quality and privacy notes
The journal validates required fields and review dates, renders user-entered text as text rather than HTML, and stores records only in local storage. Export a JSON backup before clearing browser data. No cloud sync or AI API is enabled. Checklist completion is a user-entered control and does not independently verify documents or portal data.

## Next improvements
Optional cloud sync with explicit consent, backup import, weekly analytics, and automated tests.


## Knowledge Vault workflow
1. Save a concise title and a learning note based on verified facts or a real work experience.
2. Choose a category and add searchable tags; include only non-sensitive source references.
3. Write one practical next action and set a review date.
4. Use Search, category filters, Review due, and Pin to retrieve important knowledge quickly.
5. After reviewing a note, use Reviewed · +7d to schedule the next review one week later, or edit the date yourself.
6. Export a JSON backup periodically. Notes remain in this browser's local storage; there is no cloud sync or AI API.
