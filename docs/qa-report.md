# QA report: student.os

Run on 2026-10-19 against the production build (`npm run build` + `npm run preview`), before deploying. Result: the site works and passes every technical check that could be run here. It is **not ready to submit** until the missing details below are filled in.

## Rubric checks

| Check                                                                              | Result                                                                                      |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Required sections 1–7 present, in the required order                               | ✅ Pass (8, officership and leadership, left out: no officer roles)                         |
| Every certification shows title, issuer, date earned, and certificate file or link | ✅ Pass (3 Certiport certificates, each with image + verify link)                           |
| Every course shows title, platform, and completion date                            | ✅ Pass (Java Foundations, Oracle Academy)                                                  |
| IoT project: title, description, objectives, technologies, role, evidence          | ❌ Placeholder only                                                                         |
| Capstone: title, description, objectives, technologies, team, role, status         | ❌ Placeholder only                                                                         |
| Every competition shows event, organizer, date, placement, work submitted          | ✅ Pass (3 competitions, each with certificate image)                                       |
| Every group project names my individual contribution                               | ⚠️ Unknown: the 6 projects need "solo or team", and HackForGov (team Brute4z) needs my role |
| No placeholder tags remain                                                         | ❌ 8 entries still tagged (list below)                                                      |
| No confidential data (student IDs, grades, client data, teammates' contacts)       | ✅ Pass                                                                                     |
| Grammar and spelling                                                               | ✅ Proofread                                                                                |

## Still waiting on Robert

| Section         | Entry                                            | Missing                                                                           |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| 3. IoT project  | IoT project                                      | Everything: title, description, objectives, components, role, photos, result      |
| 4. Capstone     | Capstone project                                 | Everything: title, description, objectives, tech, team, role, status, screenshots |
| 5. Projects     | OncoSense, Chainly, Spendly, Hunch, Hapag, Bakas | Course each was built for; solo or team, and my role                              |
| 7. Competitions | HackForGov 2025                                  | My role on team Brute4z                                                           |
| 2, 6            | Courses, achievements                            | Any more courses, trainings, workshops, scholarships (optional)                   |

## Technical checks

| Check                                                                                  | Result                                                                                               |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| External links (14)                                                                    | ✅ All return 200. LinkedIn returns 999 to scripts (its bot block), same URL as on robertterquin.com |
| Local images and resume (14 files)                                                     | ✅ All present; all 7 certificate images open in the Certificate Viewer                              |
| Deep links on a fresh load: `#certifications` … `#competitions`, `#stack`, `#terminal` | ✅ Each opens the right window on top of About Me; 1, 2, 7 open Certificates at their part           |
| Bad links (`#viewer`, `#nonsense`)                                                     | ✅ Fall back to About Me with a clean address                                                        |
| `?view=list#capstone`                                                                  | ✅ Opens List view at Capstone (fixed during QA: it used to stay at the top)                         |
| Phone deep link (`#competitions` at 375 px)                                            | ✅ Opens Certificates full screen at Competitions, no sideways scrolling                             |
| Console errors on the production build                                                 | ✅ None                                                                                              |
| Lighthouse, desktop                                                                    | Accessibility 100 · Best practices 100 · SEO 100 · Performance 98 (re-run 2026-10-20)                |
| Lighthouse, List view                                                                  | Accessibility 100 · Best practices 100 · SEO 100 · Performance 99 (re-run 2026-10-20)                |
| Lighthouse, phone                                                                      | Accessibility 100 · Best practices 100 · SEO 100 · Performance 99 (re-run 2026-10-20)                |
| Night theme (List view)                                                                | Accessibility 100 (Phase 5 run)                                                                      |
| Keyboard-only navigation                                                               | ✅ Logical tab order, visible focus, Enter opens, Esc closes (Phase 5)                               |
| Color contrast, Day and Night                                                          | ✅ All text pairs pass WCAG AA (Phase 5)                                                             |

## Not covered here

- **Safari, Firefox, and Edge.** Only Chromium-based browsers could be driven in this environment. Open the deployed link in each before submitting.
- **A real phone.** Tested at 375 px and tablet size in an emulated browser only.
- **Smooth scrolling in List view.** The test browser pauses animations while hidden; instant jumps were verified.

## Fixed during QA

- List view didn't jump to the linked section on page load (`?view=list#capstone`).
- Added a "My role" slot for team competitions, and flagged HackForGov as needing it.
- README now explains the views, section links, `?view=list`, and the terminal.

## Changed after QA

- Certifications, course completions, and competitions are now one **Certificates** window with three parts, instead of three folders that each showed some of the certificates. The parts keep the requirement's wording so items 1, 2, and 7 are easy to find.
- Removed repeated text: the "Information Technology Specialist certification" line on every Certiport entry, "Awarded to" in the Certificate Viewer, duplicate About buttons, the section index in List view's About (the sidebar already lists them), extra "coming soon" tags on IoT and Capstone, and a filler note in Achievements.
- Fixed links to a section landing short when web fonts loaded after the jump.
- Removed section 8, officership and leadership: Robert has held no officer roles, so the empty Leadership folder was taken out instead of left as a placeholder.
- Added Robert's portrait (from the robertterquin.com hero, cropped to 480 px) to About Me and the phone home screen, and set the year level to 4th year.

## Pre-deploy check (2026-10-20)

- Format, lint (no warnings), type check, and production build all pass; `npm audit` finds 0 vulnerabilities.
- All 15 local images and files are referenced and present, with none unused. All 13 external links return 200 (LinkedIn returns 999 to scripts, as before).
- Every window opens from its link on desktop and phone, every certificate opens in the viewer, and no view scrolls sideways. No console messages.
- Fixed: the phone number was in the public JavaScript bundle even though it was never shown. It's removed, along with an unused location field.
- Faster first paint: Google Fonts no longer block rendering, and the portrait is 320 px (26 KB) instead of 480 px. Phone performance went from 86 to 99.
- Cleanup: removed a leftover Leadership style and an unused font weight, gave gallery images a size so nothing shifts as they load, formatted two config files, and added link-preview tags.
