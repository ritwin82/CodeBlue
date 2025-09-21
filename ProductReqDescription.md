MediGuardAI — Product Requirements Document (PRD)
Prepared by: Product Management
Version: 0.1 (MVP / Hackathon)
Scope: Consumer-facing web + mobile health companion (MVP public launch + roadmap)
Audience: Engineers, designers, clinical advisors, product stakeholders
________________________________________
1. Executive Summary
MediGuardAI is a consumer-focused health companion (web + mobile) that gives plain-language, evidence-backed triage and guidance, shows uncertainty transparently, and provides one-tap emergency escalation (structured alerts to hospitals/contacts). The backend uses a Mixture-of-Experts router with a RAGuard retrieval layer and uncertainty quantification (UQ). The MVP targets lay users (and caregivers) who need trustworthy, timely guidance; later phases extend functionality for clinicians, telemedicine integrations, and privacy-focused on-device modes.
________________________________________
2. Problem Statement
People frequently face medical uncertainty, misinformation, and delayed escalation. MediGuardAI solves:
•	Health uncertainty for lay users: Clear, actionable triage to decide self-care vs. clinician vs. emergency.
•	Misinformation & unsafe advice: Only vetted sources presented via RAGuard; unsafe suggestions blocked.
•	Missed red flags & delayed escalation: Automated detection of danger signs and one-tap emergency sharing.
•	Poor emergency communication: Deliver structured clinical summaries to hospitals/dispatch.
•	Medication misuse risk: Basic pharmacology checks to warn about dangerous OTC/prescription combos.
•	Anxiety from uncertainty: UQ + plain explanations to set expectations.
•	Secondary benefits: reduce unnecessary ER visits, speed first-responder intake, empower users.
________________________________________
3. Target Audiences & Personas
Primary (End Users)
•	Non-medical adults seeking symptom guidance and next steps.
•	Caregivers / parents / elderly caregivers needing fast, reliable advice.
•	People in low-access areas who need guidance before traveling to care.
Example Personas
•	Harried parent — child fever at 2 AM, needs triage and next step.
•	Elderly person living alone — vague chest pain, needs red-flag detection.
•	Remote worker — limited access, wants evidence-backed guidance.
Secondary (Professional / Institutional)
•	Clinicians / triage nurses — quick second opinion and structured patient alerts.
•	Hospitals & ambulance services — receive emergency payloads for faster intake.
•	Telemedicine providers — integrate for handoffs/booking.
________________________________________
4. Value Hypothesis & Success Metrics (KPIs)
Primary success metrics for MVP:
•	Triage agreement rate: ≥ 70% agreement vs clinician triage on curated cases.
•	Emergency delivery success: ≥ 95% of demo emergency alerts acknowledged by mock hospital.
•	User satisfaction: Avg helpfulness rating ≥ 4 / 5.
•	False-negative critical misses: ≤ 5% on test emergency dataset.
•	Engagement: 20–30% follow recommended action or request teleconsult (initial).
•	Privacy incidents: zero PII leakage incidents in demo.
________________________________________
5. Product Scope & Prioritized Features
MVP (Must-Have)
•	Plain-Language Symptom Checker (text + guided questions)
o	User story: Enter symptoms and answer a few guided Qs to get next steps.
o	Acceptance: For 10 test cases returns clear rec + confidence, ≥70% triage match.
•	One-Tap Emergency Button (public-facing)
o	User story: Press Emergency to alert nearby hospital/contacts with summary & location.
o	Acceptance: Mock hospital receives structured alert within 5s; user gets confirmation.
•	Simple, Actionable Recommendations with UQ
o	User story: See “What to do now” + confidence (High/Med/Low) + one-line reason.
o	Acceptance: Every rec includes confidence label + short reason.
•	RAGuard — Trusted Source Fetch + Lay Summaries
o	User story: Tap “See sources” to view simplified summaries of evidence.
o	Acceptance: Each rec cites ≥1 trusted source with a 1–2 sentence lay summary.
•	Mixture-of-Experts Routing (transparent)
o	User story: Specialist modules handle domain-specific checks (cardio, respiratory, pharmacology).
o	Acceptance: Router invokes correct expert(s) for test inputs.
•	Basic Pharmacology Safety Check
o	User story: If I list meds, warn about interactions with suggested OTC remedies.
o	Acceptance: Known dangerous interactions generate citation-backed warnings.
•	Emergency Payload & Consent Flow
o	User story: Review what will be shared; option to remain anonymous.
o	Acceptance: Consent recorded; anonymous toggle strips PII.
•	Simple Telemedicine Handoff (demo)
o	User story: Button triggers simulated teleconsult booking.
o	Acceptance: Simulated session or booking flow triggers.
•	Local Language & Accessibility (basic)
o	User story: Use preferred language and large text support.
o	Acceptance: At least 2 languages + basic screen reader compatibility.
•	Feedback Capture
o	User story: Rate helpfulness (thumbs + text).
o	Acceptance: Feedback persisted in analytics.
Phase 2 / Advanced
•	Image upload & analysis (rash/wound; heatmaps for demo)
•	Vitals integration (wearables/manual)
•	Integrated ambulance dispatch where APIs exist
•	Personalized risk profiles (chronic conditions, allergies)
•	Offline first-aid PDFs and downloadable guidance
•	Appointment booking & follow-up reminders
•	On-device / federated mode for privacy
•	AI explainability panel (detailed mode)
Admin / Infra / Compliance
•	Audit trail & traceability for each case & consent
•	Role-based Admin console (hospital staff ack/acknowledge)
•	Encryption, data minimization, retention/deletion controls
•	Monitoring & model-drift alerts
•	HIPAA / GDPR compliance templates & consent flows
________________________________________
6. Emergency System — Technical + UX Details (MVP)
UX Flow
1.	Trigger: Prominent Emergency button (sticky). For auto-detected red flags, prompt: “We detected a possible emergency. Call ambulance? / Send alert?”
2.	Consent & Recipients: Single confirmation screen listing shareable items (name optional, age, summary, vitals, location, confidence). Anonymous toggle available.
3.	Send: User taps Send.
4.	Acknowledgement & Escalation: Expect ACK from hospital API. If no ACK within configurable timeout (e.g., 30s demo), escalate to fallback channels (SMS → Email → call).
5.	User feedback: Show delivery status and next steps (call ambulance button, call local emergency).
Structured Payload (MVP demo)
JSON
{
  "case_id": "MG-<uuid>",
  "timestamp": "2025-09-19T12:34:56Z",
  "location": {"lat": 12.9716, "lng": 77.5946, "accuracy_m": 20},
  "patient": {"name": null, "age": 45, "anonymous": true},
  "brief_summary": "Sudden severe chest pain, sweating, difficulty breathing.",
  "vitals": {"hr_bpm": 110, "spo2": 92, "temp_c": 37.2},
  "confidence_level": "HIGH",
  "recommended_action": "Ambulance dispatch",
  "source_links": ["https://example.org/protocol"]
}

Transmission Channels & Retry Order
•	Primary: POST to hospital emergency API (if integrated).
•	Fallback 1: SMS/WhatsApp via Twilio to hospital contact.
•	Fallback 2: Email to emergency inbox.
•	Fallback 3: Call user’s emergency contact or prompt user to call local emergency number.
Safeguards
•	Single confirmation to avoid accidental sends.
•	Anonymous option strips PII but includes location/summary.
•	Offline handling: advise user to call local emergency number and queue SMS when possible.
________________________________________
7. Uncertainty Quantification (UQ) & Explainability
•	User-facing labels: High (likely) / Medium (possible) / Low (uncertain).
•	Display: Confidence pill + short explanation line (one sentence) + “Why this matters” tip.
•	Advanced: “Explain more” expands to expert snippets, retrieved sources, and per-expert confidence distribution (Phase 2).
Example UI Texts
•	High: “We’re fairly confident this needs urgent attention. Please call an ambulance.”
•	Medium: “Could be serious; book a teleconsult within 24–48h.”
•	Low: “Not enough info — consider seeing a clinician if worried.”
________________________________________
8. Acceptance Criteria & Testing
Key Measurable Acceptance Criteria for MVP
•	Symptom checker matches clinician triage ≥70% on curated 20-scenario set.
•	Emergency alerts reach mock hospital and receive ACK within 5s for ≥95% of cases.
•	Each recommendation includes a confidence label + 1–2 sentence lay summary and ≥1 trusted source.
•	Pharmacology warnings fire for known dangerous interactions (predefined set).
•	Consent flow records user choice; anonymous payloads contain no PII.
•	Accessibility: app navigable via screen reader for common flows.
Testing Plan
•	Unit tests for routing, UQ, and payload generation.
•	Integration tests for emergency delivery (mock endpoints with latency/failure simulations).
•	Clinical validation sessions with triage nurses for curated scenarios.
•	Usability testing for emergency confirmation and accidental-press mitigation.
________________________________________
9. Architecture & Technology Recommendations
Frontend (Recommended)
•	Framework: React + TypeScript (Vite)
•	Styling: Tailwind CSS
•	Form & validation: react-hook-form + zod
•	Data fetching: TanStack Query (React Query)
•	Maps: react-leaflet
•	Realtime / ACKs: Socket.IO client for real-time acknowledgement/status updates
•	i18n & accessibility: react-i18next, ARIA-first designs
•	Mobile: React Native or web progressive app (PWA) for MVP; RN for native capabilities (camera/vitals).
•	Why: Fast dev, type safety, rich ecosystem for forms, queries, maps.
Backend (Recommended)
•	Language / framework: Python + FastAPI (type hints, fast prototyping)
•	Database: PostgreSQL (users, cases, logs)
•	Cache & tasks: Redis (cache + background jobs). Worker: Celery or RQ for retries, UQ sampling, emergency retries.
•	Vector DB / RAG: Weaviate (managed) or FAISS for embeddings — choose Weaviate if ops budget limited.
•	RAG orchestration: LangChain or LlamaIndex with a RAGuard wrapper to only surface curated snippets.
•	LLMs & embeddings: OpenAI API (or other provider) for embeddings + generation (swapable).
•	Messaging / fallbacks: Twilio for SMS/WhatsApp, email via SMTP/provider.
•	Containerization: Docker + docker-compose for local dev.
•	Observability: Sentry (errors), structured logs (JSON stdout), metrics to Prometheus / Grafana.
Storage & Infra
•	File uploads: S3 (or S3 compatible local for dev).
•	CI/CD: GitHub Actions for tests & lint.
•	Secrets management: Vault or cloud provider secret manager.
•	Hosting: Cloud provider (AWS/GCP/Azure) or managed platform for initial MVP.
________________________________________
10. Data, Privacy & Compliance
•	Privacy-first defaults: Emergency sharing requires explicit consent; anonymous mode available.
•	Encryption: TLS in transit; AES-256 at rest for PII and vitals.
•	Data minimization: Store only what’s necessary; PII stripped in anonymous mode.
•	Retention & deletion: Configurable retention; user export & delete (GDPR/HIPAA needs).
•	Audit trail: Full logs of inputs, which experts ran, sources fetched, outputs, and consent decisions.
•	Compliance checklist: Draft HIPAA / GDPR guidance for production (legal review required prior to live clinical use).
•	Risk mitigations: Medical disclaimer, emergency fallback recommendations, human clinician handoff for unclear or serious cases.
________________________________________
11. UI Components & Figma Deliverables (MVP Priority)
Atoms → Molecules → Pages (High Priority)
•	Header / nav with language selector
•	Symptom input card (text + suggested questions)
•	Guided question modal / stepper
•	Recommendation card (title, plain recommendation, confidence pill, CTA buttons)
•	“Why?” toggle / sources modal (lay summary + source link)
•	Confidence visualization (icon + pill + tooltip)
•	Emergency Button (prominent, sticky) + Confirmation modal (consent + anonymous toggle)
•	Feedback widget (thumbs + short text)
•	Image upload component (camera + preview)
•	Profile & meds list component
•	Map preview + location pin
•	Notification / toast UI (success, ack received)
•	Hospital/Clinician: Alert list item + Alert detail panel + ACK modal
Pages
•	Landing / Home
•	Symptom flow (multi-step)
•	Recommendation result
•	Emergency confirmation
•	Sources / explanation
•	Profile & meds
•	Case history
•	Booking / teleconsult (demo)
•	Hospital Dashboard (mock) — Alert Inbox, Alert Detail
________________________________________
12. Product Roadmap & Prioritized Build Checklist
Sprint 1 — MVP (Must-Have)
•	Landing + Symptom Flow + Recommendation Result UI
•	Emergency Button + Confirmation modal + mock hospital endpoint
•	Profile & meds (basic)
•	Backend: RAGuard + 3 expert modules (Infectious/Respiratory, Cardio red-flags, Pharmacology) + UQ wrapper endpoints
•	Hospital dashboard (mock) to display & ACK alerts
•	Basic analytics (triage agreement tracking)
Sprint 2 — Reliability & UX
•	Feedback capture + case history + sources modal
•	Twilio SMS fallback, ACK retry/escalation
•	Image upload (basic) + map preview
•	Localization + accessibility improvements
Sprint 3 — Stretch / Phase 2
•	Teleconsult booking integration
•	Wearables/vitals integration
•	On-device inference / federated mode
•	Model monitoring and retraining pipelines
________________________________________
13. Monitoring, Instrumentation & Maintenance
•	Instrument pipeline for: inputs, experts invoked, sources fetched, confidence outputs, emergency sends & acks.
•	Alerts for model drift: rising disagreement rates between experts or increased low-confidence outputs.
•	Sentry for runtime errors; Prometheus/Grafana for system metrics; periodic clinical review reports.
________________________________________
14. Risks & Mitigations
•	Clinical safety risk: Mitigate with clear disclaimers, UQ UI, clinician review in testing, and conservative triage thresholds for high-risk flags.
•	False negatives: Monitor and target ≤5% on test datasets; escalate to human reviewers for edge cases.
•	Privacy & compliance: Default opt-out sharing, anonymization, legal review before live integrations.
•	Operational: Have clear fallback flows for emergency (SMS/phone) and test mock endpoints thoroughly.
________________________________________
15. Appendix
Sample Plain-Language Outputs (to paste in UI)
•	High (urgent): “We detected signs that could be serious (chest pain + sweating). Please call an ambulance or press Emergency. Confidence: High — we recommend immediate care.”
•	Medium (see doctor): “Symptoms suggest a possible infection. Take fluids and book a teleconsult within 24–48 hours. Confidence: Medium — get checked if it worsens.”
•	Low (self-care): “This looks like mild irritation. Home care: rest, hydrate, OTC paracetamol if needed. Confidence: Low — if symptoms persist for 3+ days, see a doctor.”
Emergency Sample Alert (MVP demo)
EMERGENCY ALERT — Priority: HIGH Location: 12.9716 N, 77.5946 E (accuracy: 20m)
Patient: Anonymous, Age: 45
Summary: Sudden severe chest pain, sweating, difficulty breathing.
Confidence: HIGH (cardiac red-flag detected)
Vitals: HR 110 bpm, SpO2 92%
Recommended: Ambulance dispatch
Case ID: MG-abc123
________________________________________
16. Next Steps (Recommended Immediate Actions)
1.	Assemble Core Team: PM, Tech lead (backend), Frontend lead, Clinical advisor (triage nurse/physician), Designer, DevOps.
2.	Define clinical validation plan: 20–50 curated scenarios, clinical review sessions.
3.	Set up dev stack & skeleton: FastAPI backend, React + TS frontend (Vite), mock hospital API, basic DB schema.
4.	Prototype key flows: Symptom flow → recommendation → emergency send → mock hospital ACK.
5.	Usability & safety testing: Rapid sessions focusing on emergency flow & consent.

