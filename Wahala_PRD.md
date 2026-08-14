# Product Requirements Document (PRD)

## Send Help (prviously Wahala-Mu) — Nigeria Emergency Contact Directory

**Version:** 1.0  
**Status:** Live (as of February 2026)  
**URL:** https://wahala-mu.vercel.app/  
**Platform:** Web (PWA-capable)  
**Last Updated:** 2026-06-04

---

## 1. Executive Summary

Wahala-Mu is a lightweight, mobile-first web application that provides Nigerians with quick access to emergency service contact numbers organized by **State** and **Local Government Area (LGA)**.

The app solves a critical information gap: during emergencies, citizens often don't know which local agency to call or what the correct number is. By geo-filtering contacts down to the LGA level, SendHelp ensures users get the most relevant, actionable emergency numbers for their exact location.

---

## 2. Product Vision & Goals

### Vision
To be the most trusted, fastest-access emergency contact directory for every Nigerian, accessible within seconds from any device.

### Goals
1. **Speed:** Enable contact lookup in under 10 seconds.
2. **Accuracy:** Provide verified, location-specific emergency numbers.
3. **Accessibility:** Work offline after first load; zero-cost access (no data charges for toll-free numbers).
4. **Coverage:** Cover all 36 states + FCT, with granular LGA-level contacts.

---

## 3. Target Users

| Persona | Description | Key Need |
|---------|-------------|----------|
| **Everyday Citizen** | General Nigerian resident | Quick access to police, fire, medical, and disaster numbers for their area |
| **Traveler / Visitor** | Someone in an unfamiliar state/LGA | Find local emergency services without prior knowledge |
| **Community Leader** | Local government official, NGO worker | Share correct emergency contacts with community members |
| **First Responder** | FRSC, police, medical personnel | Cross-reference or verify contact numbers |

---

## 4. Functional Requirements

### 4.1 Core Feature: Location-Based Contact Lookup

**FR-1: State Selection**
- User must select a state from a dropdown or searchable list.
- List includes all 36 Nigerian states + Federal Capital Territory (FCT).
- Default: no pre-selected state.

**FR-2: LGA Selection**
- Upon state selection, the LGA dropdown populates with only LGAs belonging to that state.
- User must select an LGA to view contacts.
- Default: "Select LGA" placeholder.

**FR-3: Emergency Contact Display**
- After both state and LGA are selected, the app displays a categorized list of emergency contacts for that LGA.
- Categories include (but are not limited to):
  - 🚨 General Emergency (112)
  - 🚔 Police
  - 🚑 Medical / Ambulance
  - 🔥 Fire Service
  - 🛣️ FRSC (Road Safety)
  - 🏛️ State Emergency Management
  - 👮 NSCDC
  - ♀️ Gender-Based Violence / Domestic Violence
  - 🧠 Mental Health / Suicide Prevention
  - 👶 Child Protection
  - 🌊 Disaster Response (NEMA)

**FR-4: Direct Dialing**
- Each contact number must be clickable/tappable to initiate a phone call (using `tel:` links).
- Toll-free numbers (e.g., 112, 122) must be visually flagged.

**FR-5: Universal Quick-Access Numbers**
- A persistent banner or section at the top displays nationwide emergency numbers that work regardless of location:
  - **112** — National Emergency Line (toll-free, all networks)
  - **122** — FRSC (toll-free)
  - **199** — Police Emergency

### 4.2 Data Requirements

**FR-6: Contact Database**
- The app must maintain a structured database of emergency contacts.
- Each contact record contains:
  - `state` (string)
  - `lga` (string)
  - `service_name` (string, e.g., "Lagos State Police Command")
  - `category` (enum)
  - `phone_numbers` (array of strings)
  - `is_toll_free` (boolean)
  - `notes` (optional string, e.g., "Available 24/7")

**FR-7: Data Freshness**
- Contact data must be reviewable and updatable by maintainers.
- Versioning or "last verified" date should be visible to users.

### 4.3 User Experience

**FR-8: Mobile-First Design**
- Primary use case is mobile devices; touch targets must be ≥ 44×44px.
- Responsive layout adapts to desktop but optimized for phones.

**FR-9: Offline Capability**
- After initial load, the app should cache contact data for offline use (Service Worker / PWA).
- No internet required to look up saved contacts after first visit.

**FR-10: Progressive Web App (PWA)**
- Must be installable to home screen.
- Must have a manifest.json with app name, icons, and theme colors.
- Should work in standalone mode.

### 4.4 Additional Pages

**FR-11: About Page**
- Explains the mission of Wahala-Mu.
- Credits data sources (e.g., NEMA, HEI, state government websites).
- Disclaimer: "This app is for informational purposes. In life-threatening emergencies, always call 112 first."

**FR-12: Feedback / Report Incorrect Number**
- Simple form or mailto link allowing users to report outdated numbers.
- Fields: State, LGA, Service Name, Correct Number, Source/Proof.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-1:** First Contentful Paint (FCP) < 1.5s on 3G networks.
- **NFR-2:** Time to Interactive (TTI) < 3s.
- **NFR-3:** Contact list render < 100ms after LGA selection.

### 5.2 Reliability
- **NFR-4:** 99.9% uptime (Vercel Edge Network SLA).
- **NFR-5:** Graceful degradation if JavaScript fails — basic HTML fallback with emergency numbers visible.

### 5.3 Security
- **NFR-6:** No user data collection (privacy-first).
- **NFR-7:** HTTPS only.
- **NFR-8:** No third-party trackers or analytics without explicit consent.

### 5.4 Compatibility
- **NFR-9:** Support last 2 versions of Chrome, Safari, Firefox, Edge.
- **NFR-10:** Support iOS Safari 12+ and Android Chrome 80+.
- **NFR-11:** Functional on low-end devices (≤ 2GB RAM).

---

## 6. User Interface (UI) Specification

### 6.1 Home Page Layout

```
┌─────────────────────────────────────┐
│  🚨 Wahala-Mu                       │
│  Nigeria Emergency Contacts         │
├─────────────────────────────────────┤
│  ⚡ Quick Dial (Always Visible)     │
│  ┌─────────┐ ┌─────────┐          │
│  │  112    │ │  122    │          │
│  │ General │ │  FRSC   │          │
│  └─────────┘ └─────────┘          │
├─────────────────────────────────────┤
│  📍 Select Your Location            │
│  ┌─────────────────────────────┐    │
│  │ ▼ Select State              │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ ▼ Select LGA               │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  📋 Emergency Contacts for [LGA]    │
│  ┌─────────────────────────────┐    │
│  │ 🚔 Police                   │    │
│  │    0803-XXX-XXXX            │    │
│  │    [📞 Call]                │    │
│  ├─────────────────────────────┤    │
│  │ 🚑 Medical / Ambulance      │    │
│  │    070-XXX-XXXX             │    │
│  │    [📞 Call]                │    │
│  ├─────────────────────────────┤    │
│  │ 🔥 Fire Service             │    │
│  │    01-XXX-XXXX              │    │
│  │    [📞 Call]                │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  💡 Tip: Keep this app on your      │
│  home screen for quick access.      │
└─────────────────────────────────────┘
```

### 6.2 Visual Design

| Element | Specification |
|---------|--------------|
| **Primary Color** | Emergency Red (`#DC2626`) — urgency, action |
| **Secondary Color** | Deep Blue (`#1E3A8A`) — trust, authority |
| **Background** | White (`#FFFFFF`) or very light gray (`#F9FAFB`) |
| **Text** | Dark gray (`#111827`) for readability |
| **Toll-Free Badge** | Green (`#059669`) pill/badge |
| **Font** | System UI stack (Inter or native sans-serif) |
| **Icons** | Emoji (native) or lightweight SVG icon set |
| **Buttons** | Rounded corners (8px), full-width on mobile |

### 6.3 States & Interactions

- **Loading State:** Skeleton loaders while LGA list populates.
- **Empty State:** "No contacts found for this LGA. Call 112 for immediate assistance."
- **Error State:** "Unable to load contacts. Please check your connection or try again."
- **Success Feedback:** Subtle highlight animation on contact card when number is tapped.

---

## 7. Technical Architecture

### 7.1 Stack
- **Frontend:** React / Next.js (static export) or vanilla HTML/JS
- **Styling:** Tailwind CSS or plain CSS
- **Hosting:** Vercel (Edge Network)
- **Data Storage:** Static JSON files (embedded in build) or lightweight CMS
- **PWA:** `manifest.json`, Service Worker for caching

### 7.2 Data Structure (JSON)

```json
{
  "states": [
    {
      "name": "Lagos",
      "lgas": ["Ikeja", "Eti-Osa", "Alimosho", ...],
      "contacts": [
        {
          "lga": "Ikeja",
          "services": [
            {
              "category": "police",
              "name": "Lagos State Police Command",
              "numbers": ["0803-XXX-XXXX"],
              "toll_free": false,
              "notes": "24/7"
            }
          ]
        }
      ]
    }
  ]
}
```

### 7.3 File Structure

```
/
├── index.html          # Main app
├── about.html          # About page
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── /css
│   └── styles.css
├── /js
│   ├── app.js          # Main logic
│   ├── data.js         # Contact database
│   └── utils.js
├── /assets
│   └── icons/          # PWA icons
└── /data
    └── contacts.json   # Source of truth
```

---

## 8. Content & Copy

### 8.1 Home Page Copy
- **Headline:** "Nigeria Emergency Contacts"
- **Subheadline:** "Quick access to emergency services across Nigerian states"
- **CTA:** "Select Your Location" / "Choose your state and LGA to view emergency contacts"
- **Footer Note:** "🚨 For immediate emergencies, dial the numbers above directly. Keep this app accessible for quick emergency contact lookup."

### 8.2 About Page Copy
- **Mission:** "Wahala-Mu exists to ensure every Nigerian can access the right emergency number, for the right service, in the right location — within seconds."
- **Data Sources:** NEMA, Federal/State Emergency Services, verified government directories.
- **Disclaimer:** "While we strive to keep all information accurate and up-to-date, emergency numbers may change. Always verify critical numbers through official channels. This app is not a replacement for official emergency services."

---

## 9. Analytics & Success Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Monthly Active Users (MAU) | 10,000 | Vercel Analytics |
| Average Time to Find Contact | < 10 seconds | Custom event tracking |
| Bounce Rate | < 30% | Vercel Analytics |
| PWA Install Rate | > 5% of return visitors | Custom event |
| Contact Accuracy Reports | < 1% of sessions | User feedback form |
| Offline Usage | > 20% of sessions | Service Worker logs |

---

## 10. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Outdated contact numbers | High | Medium | Quarterly audit; user feedback loop; display "last verified" date |
| Data not available for all LGAs | Medium | High | Start with state-level contacts; crowdsource LGA data |
| Low awareness / adoption | High | Medium | Partner with NGOs, state governments; social media campaigns |
| App blocked by network | Low | Low | Use lightweight PWA; ensure no heavy assets |
| Toll-free numbers not actually free | Medium | Medium | Clearly label toll-free status; include disclaimers |

---

## 11. Future Roadmap

| Phase | Feature | Timeline |
|-------|---------|----------|
| **v1.1** | Add "Nearby Services" using geolocation API | Q3 2026 |
| **v1.2** | Multi-language support (Hausa, Yoruba, Igbo, Pidgin) | Q4 2026 |
| **v1.3** | SMS alert feature for disaster warnings | Q1 2027 |
| **v1.4** | Integration with Emergency Response Africa API | Q2 2027 |
| **v2.0** | Native Android/iOS apps (React Native / Flutter) | Q4 2027 |

---

## 12. Appendices

### Appendix A: Key Emergency Numbers (Nigeria)
| Service | Number | Toll-Free |
|---------|--------|-----------|
| National Emergency | 112 | ✅ |
| FRSC | 122 | ✅ |
| Police | 199 | ✅ |
| NEMA | 0800-CALL-NEMA | ✅ |
| ERA Ambulance | 08000-ERA-ERA | ✅ |

### Appendix B: Data Verification Sources
- [Emergency Response Africa](https://emergencyresponseafrica.com/)
- [Health Emergency Initiative (HEI)](https://hei.org.ng/)
- NEMA Official Directory
- State Government Emergency Portals

### Appendix C: Glossary
- **LGA:** Local Government Area — Nigeria's third-level administrative division.
- **FRSC:** Federal Road Safety Corps.
- **NEMA:** National Emergency Management Agency.
- **NSCDC:** Nigeria Security and Civil Defence Corps.
- **ERA:** Emergency Response Africa.

---

**Document Owner:** Product Team — Wahala-Mu  
**Review Cycle:** Quarterly  
**Next Review Date:** 2026-09-04
