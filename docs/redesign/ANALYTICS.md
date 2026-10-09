# Funnel measurement

Client events: page_view, cta_click, book_click, media_select, video_start, video_25/50/75/complete, qualification_start, qualification_complete, calendar_ready. Optional collection begins only after consent. A random session journey ID groups events. Allowed campaign/referral fields are sanitized. No form answers, patient details or chat messages enter this event payload.

Video progress measures the union of watched intervals, not the current playback position. Large time jumps, seeking and paused gaps do not count. Starts and milestones are deduplicated per consented journey + service + media + event, including replay and player remounts. Playback, pause and seek boundaries reset the sampling baseline; chapter navigation does not count as viewing. Completion threshold is 95% coverage, not the native ended event.

Calendar_ready is emitted once per consented journey and service from Cal’s public bookerReady event when slots are ready, not from opening the page or an iframe load. Qualification_start means a visitor changed an optional context field. Qualification_complete means nonempty context was explicitly forwarded to the booking experience, not a qualified lead determined by sales. Form answers never enter analytics. Book_click is intent. The client never asserts booking completion.

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

Cal payload shapes were checked against the [official webhook documentation](https://github.com/calcom/help/blob/main/webhooks.mdx): booking events use nested payload.type; scheduled meeting events are flat and identify the event by eventTypeId. CAL_EVENT_TYPE_IDS must contain verified allowed IDs before accepting the latter. Start/end triggers fire at scheduled times, not from verified attendance. The legacy call_held label is explicitly marked scheduledTimeEvent=true in storage.

Cal bookingSuccessfulV2 is used only for UI feedback: a nonempty booking UID with ACCEPTED status and no required payment shows provider-confirmed wording; other statuses are described as requests. This browser event never writes a booked conversion. Signed server delivery and durable storage remain required for booking measurement. Cal documents that a successful booking event may still be unconfirmed: https://cal.com/help/embedding/embed-events.

Chapter controls are now always visible. Selecting a chapter resets the watched-coverage sampling baseline before and after seeking and preserves playback state. Highlighting the current chapter does not emit a conversion or change the event interface.
