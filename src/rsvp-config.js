// rsvp-config.js — wiring for the RSVP form's Google Forms backend.
//
// Nothing here is secret: a Google Form ID and its field ("entry") IDs are
// submit-only public identifiers. They let the browser APPEND a response to the
// form (which anyone filling the form could do anyway) — they cannot read other
// responses or change anything. So it is safe to ship them in this static site.
//
// ── How to fill this in ───────────────────────────────────────────────────────
// 1. Create a Google Form with these questions. Make the first six "Short answer"
//    and the last one "Paragraph" (short-answer types accept any text, so the
//    front-end never has to match a fixed list of options):
//       1) Name
//       2) Email
//       3) Phone
//       4) Attending
//       5) Guests                        (number, only sent when attending)
//       6) Dietary restrictions          (only sent when attending)
//       7) Note / song request           (Paragraph)
// 2. In the Form editor click ⋮ (top right) → "Get pre-filled link". Type a dummy
//    value into every field, click "Get link", then "Copy link". The copied URL
//    contains one `entry.XXXXXXXXX=dummy` per field — copy each numeric id below.
// 3. The form's address looks like
//       https://docs.google.com/forms/d/e/FORM_ID/viewform
//    Put that FORM_ID into ACTION below (note it ends in /formResponse, not /viewform).
// 4. Link the form to a Google Sheet (Responses tab → green Sheets icon) so RSVPs
//    land in a spreadsheet you own.

export const RSVP = {
  // POST endpoint — replace FORM_ID with the long id from your form's URL:
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSfnBUmDW7F_sDZ_EIKOhcs-hQgbBrrMJoxFL8QnL4WignCMTg/formResponse',

  // The entry id for each field (the number after `entry.` in the pre-filled link):
  fields: {
    name:      'entry.1498135098',
    email:     'entry.2606285',
    phone:     'entry.628886772',
    attending: 'entry.12547938',
    guests:    'entry.1297931199',
    dietary:   'entry.113769329',
    note:      'entry.997537254',
  },

  // Canonical values sent for "Attending" (kept language-independent so the sheet
  // stays clean regardless of which language the guest used on the site):
  attendingValues: { yes: 'Yes', no: 'No' },
};

// Control whether to display the form. Until then the UI shows a "coming soon"
// placeholder instead of a form that would silently fail.
export const RSVP_READY = true;
