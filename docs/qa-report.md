# QA report: student.os

Run on 2026-10-19 against the production build (`npm run build` + `npm run preview`), before deploying. Result: the site works and passes every technical check that could be run here. It is **not ready to submit** until the missing details below are filled in.

## Rubric checks

| Check                                                                              | Result                                                                                      |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| All 8 required sections present, in the required order                             | ✅ Pass                                                                                     |
| Every certification shows title, issuer, date earned, and certificate file or link | ✅ Pass (3 Certiport certificates, each with image + verify link)                           |
| Every course shows title, platform, and completion date                            | ✅ Pass (Java Foundations, Oracle Academy)                                                  |
| IoT project: title, description, objectives, technologies, role, evidence          | ❌ Placeholder only                                                                         |
| Capstone: title, description, objectives, technologies, team, role, status         | ❌ Placeholder only                                                                         |
| Every competition shows event, organizer, date, placement, work submitted          | ✅ Pass (3 competitions, each with certificate image)                                       |
| Every officer role shows organization, position, A.Y., responsibilities            | ❌ No roles yet                                                                             |
| Every group project names my individual contribution                               | ⚠️ Unknown: the 6 projects need "solo or team", and HackForGov (team Brute4z) needs my role |
| No placeholder tags remain                                                         | ❌ 9 entries still tagged (list below)                                                      |
| No confidential data (student IDs, grades, client data, teammates' contacts)       | ✅ Pass                                                                                     |
| Grammar and spelling                                                               | ✅ Proofread                                                                                |

## Still waiting on Robert

| Section         | Entry                                            | Missing                                                                           |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Profile         | About me                                         | Year level and section                                                            |
| 3. IoT project  | IoT project                                      | Everything: title, description, objectives, components, role, photos, result      |
| 4. Capstone     | Capstone project                                 | Everything: title, description, objectives, tech, team, role, status, screenshots |
| 5. Projects     | OncoSense, Chainly, Spendly, Hunch, Hapag, Bakas | Course each was built for; solo or team, and my role                              |
| 7. Competitions | HackForGov 2025                                  | My role on team Brute4z                                                           |
| 8. Leadership   | (none yet)                                       | Organization, position, A.Y., responsibilities, certificates                      |
| 2, 6            | Courses, achievements                            | Any more courses, trainings, workshops, scholarships (optional)                   |

## Technical checks

| Check                                                                                | Result                                                                                               |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| External links (14)                                                                  | ✅ All return 200. LinkedIn returns 999 to scripts (its bot block), same URL as on robertterquin.com |
| Local images and resume (14 files)                                                   | ✅ All present; all 7 certificate images open in the Certificate Viewer                              |
| Deep links on a fresh load: `#certifications` … `#leadership`, `#stack`, `#terminal` | ✅ Each opens the right window on top of About Me                                                    |
| Bad links (`#viewer`, `#nonsense`)                                                   | ✅ Fall back to About Me with a clean address                                                        |
| `?view=list#capstone`                                                                | ✅ Opens List view at Capstone (fixed during QA: it used to stay at the top)                         |
| Phone deep link (`#competitions` at 375 px)                                          | ✅ Opens Trophies full screen, no sideways scrolling                                                 |
| Console errors on the production build                                               | ✅ None                                                                                              |
| Lighthouse, desktop                                                                  | Accessibility 100 · Best practices 100 · SEO 100 · Performance 97                                    |
| Lighthouse, List view                                                                | Accessibility 100 · Best practices 100 · SEO 100 · Performance 97                                    |
| Lighthouse, phone                                                                    | Accessibility 100 · Best practices 100 · SEO 100 · Performance 93                                    |
| Night theme (List view)                                                              | Accessibility 100 (Phase 5 run)                                                                      |
| Keyboard-only navigation                                                             | ✅ Logical tab order, visible focus, Enter opens, Esc closes (Phase 5)                               |
| Color contrast, Day and Night                                                        | ✅ All text pairs pass WCAG AA (Phase 5)                                                             |

## Not covered here

- **Safari, Firefox, and Edge.** Only Chromium-based browsers could be driven in this environment. Open the deployed link in each before submitting.
- **A real phone.** Tested at 375 px and tablet size in an emulated browser only.
- **Smooth scrolling in List view.** The test browser pauses animations while hidden; instant jumps were verified.

## Fixed during QA

- List view didn't jump to the linked section on page load (`?view=list#capstone`).
- Added a "My role" slot for team competitions, and flagged HackForGov as needing it.
- README now explains the views, section links, `?view=list`, and the terminal.
