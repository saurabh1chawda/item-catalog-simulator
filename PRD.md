# PRD: Catalog IQ (v5.0 - Reality-Hardened)
**Autonomous Taxonomy Governance & High-Scale Ingestion Engine**

| Role | Name |
| :--- | :--- |
| **Author** | Saurabh Chawda (Senior Product Manager) |
| **Status** | Certified for Executive Review |
| **Hiring Target** | Walmart Tech India |

---

## 1. Executive Summary
Catalog IQ is a "Command Center" for the world’s largest retail catalog. It shifts item governance from manual engineering tickets to an **Autonomous Supervisor Model**, enabling Category Managers to pivot hierarchies in real-time while protecting the $600B global supply chain from "Truck-Roll" data errors.

## 2. Strategic Objectives (The "So What?")
- **Drive EDLP Efficiency:** Eliminate the "Data Tax" (manual corrections) to reduce Operational COGS by **$185k/qtr**.
- **Market Dominance:** Reduce SKU onboarding latency from **4.2 days to <2 hours**.
- **Risk Mitigation:** Prevent billion-dollar supply chain halts via **Blast Radius Analysis**.

## 3. Core Features (Implemented)

### P0: Reality-Hardened Hierarchy Engine
- **AI Co-Pilot:** Suggests validation rules (Regex, Range checks) based on historical SKU patterns.
- **Throttled CDC Invalidation:** Mass SKU updates are buffered in **5,000-unit batches** to prevent search index crashes.
- **GDP API Headless Design:** Proves the UI is a transparent skin over Global Data Platform microservices.

### P0: Executive Governance Chain
- **Blast Radius DC Mapping:** Real-time visibility into affected Distribution Centers (e.g., "12 US-East DCs at risk").
- **Safety Lock Resilience:** Automated "Commit Lock" if the GDP Cluster signals <99.9% uptime.
- **Governance Sign-off:** Multi-stakeholder approval (Logistics/Legal) with **SLA-Auto-Pass** logic.

### P1: Operational Supplier Portal
- **Round-Trip Error Export:** Excel fixes for suppliers via CSV manifests with **Context Trace IDs**.
- **Advisory Validation:** Strategic "Warning" mode that allows listing but flags "Low Quality" to maintain velocity.

## 4. Product Roadmap (Future Phases)

### Phase 2: Predictive SKU Intelligence (Q3 2026)
- **Zero-Touch Classification:** LLM-native mapping that requires human intervention only for <85% confidence scores.
- **Predictive ROI:** Simulation of GMV lift based on schema completeness.

### Phase 3: Global Edge Sync (Q4 2026)
- **Regional Schema Forking:** Allow India/US/Mexico to fork L4 attributes for local compliance while maintaining L1-L3 global integrity.

## 5. Technical Architecture (Constraints)
- **CDC Impact Graph:** Sub-second blast radius calculation via Graph DB lookups.
- **Idempotent gRPC:** Ensuring single-touch updates across distributed systems.
