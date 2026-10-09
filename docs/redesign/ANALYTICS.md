# Funnel measurement

Client events: page_view, cta_click, book_click, media_select, video_start, video_25/50/75/complete, qualification_complete, calendar_ready. Optional collection begins only after consent. A random session journey ID groups events. Allowed campaign/referral fields are sanitized. No form answers, patient details or chat messages enter this event payload.

Video progress measures the union of watched intervals, not the current playback position. Large time jumps, seeking and paused gaps do not count. Each milestone fires once per player instance; aggregate by unique journey + media + milestone so replay/tab remounts do not inflate viewers. Completion threshold is 95% coverage, not the native ended event.

Calendar_ready means the embed iframe loaded, not a successful reservation. Qualification_complete means the optional context was forwarded to the booking experience, not a qualified lead determined by sales. Book_click is intent. The client never asserts booking completion.

Signed Cal deliveries produce operational booking-created, cancelled and rescheduled events. Exact lifecycle state (UID + event + start time) is duplicate-safe. No-show updates are named no_show_updated, not automatically asserted as a confirmed absence. Meeting-ended retains legacy call_held for downstream compatibility; it cannot prove attendance or a sale. The receiver returns 503 on storage failure to support retry. Signing setup remains a release dependency until verified at both providers.

Use a server-only report, with QA campaigns excluded:

```sql
select payload->>'service' as service, event,
       count(distinct lead_ref) as distinct_consented_journeys
from public.sdr_events
where kind='web'
  and created_at >= now() - interval '30 days'
  and coalesce(payload->'attribution'->>'utm_source','') <> 'qa'
  and coalesce(payload->'attribution'->>'ref','') not like 'fa-sdr-qa%'
group by 1,2;
```

Separate signed bookings from consented website conversion rates: some visitors decline analytics, attribution can be absent, and one user may have several sessions. Never present consented journey percentages as all-traffic conversions. Actual qualified attendance and sales outcomes require CRM updates or verified records; they are not fabricated from calendar events.

Privacy preferences can be changed from the footer. Declining clears session journey/attribution storage. Necessary locale/preferences and operational booking administration remain separate. Rate-limiter records store HMAC IP keys, rotate minute windows and opportunistically clear entries older than one day. Define an operational retention/deletion schedule for analytics before using it long-term; existing policy applies until a fixed retention is adopted.
