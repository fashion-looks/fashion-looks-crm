# Fashion Looks™ Digital Brain

A responsive, single-file productivity dashboard for focused execution.

## Features
- Priority task manager with completion metrics
- 25-minute focus sprint timer
- Brain-dump notes and daily review
- Rotating mindset reflections
- JSON backup export
- Decision Journal with facts, options, chosen action, confidence, risk/pre-mortem, and review dates
- Review notes to compare expected and actual outcomes
- Mobile-friendly layout; no external libraries

## Run
Open `index.html` in any modern browser. Use the **Decision Journal** link to open `decision-journal.html`.

## Storage and privacy
Tasks, notes, and reviews are stored in the browser's local storage on the current device. They are not automatically synchronized to GitHub or other devices. Use Export JSON to create a backup. Do not enter passwords or sensitive financial information.

## Decision Journal workflow
1. State the decision as one clear question.
2. Record known facts and options; separate verified facts from assumptions.
3. Choose one next action and write why it is supported.
4. Name the biggest risk and one prevention step (a short pre-mortem).
5. Set a review date, then record the actual result and lesson.

## Quality and privacy notes
The journal validates required fields and review dates, renders user-entered text as text rather than HTML, and stores records only in local storage. Export a JSON backup before clearing browser data. No cloud sync or AI API is enabled.

## Next improvements
Optional cloud sync with explicit consent, backup import, weekly analytics, and automated tests.
