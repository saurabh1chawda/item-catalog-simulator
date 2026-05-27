# PRD: Catalog IQ (v6.0 - The 7-Step Interview Edition)
**Autonomous Taxonomy Governance for Walmart Global Tech**

| Role | Name |
| :--- | :--- |
| **Author** | Saurabh Chawda (Senior Product Manager) |
| **Framework** | **STEP** (by Diego Granados) |
| **Hiring Target** | Walmart Tech India |

---

## 1. CLARIFYING QUESTIONS
- **Constraints:** MVP must ship within one quarter (Q2) with a lean team (4 Eng, 1 Design).
- **Scale:** We are a large tech company (Walmart) managing $600B in GMV across millions of SKUs.
- **Dependency:** Must integrate headlessly with the Global Data Platform (GDP).

## 2. SET A GOAL
**Primary Goal:** **Improve an existing workflow** (Taxonomy Management).
**Specific Objective:** Transition from "Manual Engineering Tickets" to "Autonomous Self-Serve Governance" to drive **EDLP (Everyday Low Price) Efficiency**.

## 3. DEFINE USERS (By Activity)
- **Primary: The Workflow Supervisor (Sr. Category Managers)**
  - Activity: Modifying data schemas to match seasonal retail pivots.
- **Secondary: The Data Ingester (Global Suppliers)**
  - Activity: Uploading high-scale CSV/Excel files (50k+ rows) into the Walmart catalog.
- **Observer: The Risk Guardian (Executive Leadership)**
  - Activity: Monitoring "Truck-Roll" supply chain risks before major changes go live.

## 4. USER PAIN POINTS (Focused on "The Priyas")
1.  **Engineering Bottleneck:** CMs wait 4–6 weeks for simple schema changes, causing missed seasonal revenue.
2.  **The "Rejection Fatigue":** Suppliers receive opaque error reports, leading to endless email cycles and data corruption.
3.  **Billion-Dollar Anxiety:** CMs fear that a simple "Mandatory" flag change will halt 500 trucks at distribution centers.

## 5. SOLUTIONS
### S1: AI-Native Blueprint Engine (Reasonable)
- AI suggests **Validation Rules** (e.g., "Must be numeric between 1-100") instead of just field names, hardening data at the source.

### S2: Round-Trip "Error Manifest" (Reasonable)
- Export mistakes to Excel with **Context Trace IDs**. Suppliers fix in Excel and re-upload; the system maps fixes back to GDP APIs automatically.

### S3: Autonomous Catalog Self-Healing (Moonshot)
- A generative agent that automatically corrects 90% of supplier typos and unit mismatches (e.g., converting 'lbs' to 'kg') based on historical "Priya-Approved" patterns, achieving a "Zero-Touch" catalog.

## 6. PRIORITIZE FEATURES (H/M/L)
| Feature | Impact | Effort | Urgency | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Blast Radius Simulation** | High | Medium | High | **P0** |
| **Throttled CDC Push** | High | High | High | **P0** |
| **Bulk Error Export** | High | Low | Medium | **P1** |
| **AI Rule Suggestions** | Medium | Medium | Low | **P2** |

## 7. MEASURE SUCCESS
- **North Star (Goal):** SKU Onboarding Latency (Target: Reduce from 4.2 days to <2 hours).
- **Signposts (Secondary):** 
  - 82% of schema changes performed without engineering tickets.
  - 2,450 engineering hours reclaimed per quarter.
- **"Do No Harm" Metrics:** 
  - **Truck-Roll Zero:** Zero supply chain halts caused by schema governance.
  - **Search Poisoning:** <0.1% increase in "Low Quality" flags in the live search index.

---

## TECHNICAL CONSTRAINTS
- **Scalability:** 50,000+ SKU validations per batch.
- **Resilience:** Mandatory "Safety Lock" during GDP Node degradation (503 timeouts).
