# User Guide: Catalog IQ Interactive Sandbox

Welcome to the **Catalog IQ** walkthrough. This guide is designed for the Hiring Manager to navigate the prototype and understand the strategic signals being demonstrated.

## 👥 Target Audience
- **Primary:** Senior Category Managers (like "Priya") who manage thousands of SKUs.
- **Secondary:** Engineering Leads (gRPC/CDC integration) and Walmart Executives (CEO/CPO).

---

## ⚡ The "Walmart Mess" Pain Points & Solutions

| Pain Point | Catalog IQ Solution | Strategic Value (EDLP) |
| :--- | :--- | :--- |
| **Manual Bottlenecks** | **AI Co-Pilot:** Auto-suggests rules, reducing CM load by 60%. | Lower COGS via reclaimed hours. |
| **Supply Chain Risk** | **Blast Radius Engine:** Visualizes DC impact *before* a change is live. | Zero "Truck-Roll" incidents. |
| **Supplier Rejection** | **Round-Trip Export:** Line-by-line Excel fixes for high-speed re-upload. | Faster Time-to-Market (TTM). |
| **System Instability** | **Safety Lock:** Detects GDP Node degradation and prevents commits. | High System Availability. |

---

## 🕹️ Interactive Demo Scenarios

### Scenario 1: The CEO "Truck-Roll" Test
1.  Go to the **Taxonomy Engine** tab.
2.  Select **"Gaming Laptops"** in the Tree.
3.  Click **"Run Blast Radius Analysis"**.
4.  Observe the **Affected SKUs (45,000)** and DC mapping.
5.  **Bonus:** Click "GDP Node: Operational" to toggle it to **"Degraded"**—observe how the system locks the "Authorize" button to protect the warehouse.

### Scenario 2: The Priya "Excel Reality" Test
1.  Go to the **Ingestion Portal** tab.
2.  Select a category and type a few errors (e.g., non-numeric in a number field).
3.  Click the **Download (Icon)** in the Ingestion Quality card.
4.  Notice the tooltip explaining the **"Round-Trip Manifest"**—this solves for suppliers who refuse to use web forms.

---

## 📈 Success Metrics
- **Performance:** Sub-second Blast Radius calculation via CDC.
- **ROI:** 2,450 engineering hours reclaimed per quarter.
- **Adoption:** 82% self-serve governance target.
