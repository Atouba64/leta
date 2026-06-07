# The Leta Tech Toolkit: Native vs. Third-Party Alternatives

At Leta, we build powerful native tools into our app to make your job seamless. However, we believe in **technician autonomy**. If you prefer to use industry-standard, free third-party tools with great UIs for certain tasks, you always have that option.

Whenever you perform an operation in the Leta App, you will see an option to "Use Leta Native" or "Open External App."

Below is the definitive list of supported third-party tools, what they do, and when you might choose them over the native Leta experience.

---

## 1. Navigation & Routing
**The Leta Way:** Leta Predictive Geospatial Routing (automatically calculates traffic, gated community delays, and parking walk-times directly in the app).
**Third-Party Options:**
*   **Google Maps:** Best for general routing and satellite views to find loading docks.
    *   *iOS:* Available on App Store
    *   *Android:* Pre-installed
*   **Waze:** Best for real-time traffic and avoiding speed traps on Georgia interstates.
    *   *iOS & Android*
*   **Apple Maps:** Deeply integrated into iOS hardware; best for Apple Watch turn-by-turn.
    *   *iOS Only*

## 2. Network Diagnostics & Scanning
**The Leta Way:** Native Leta API Pinger and CRDT-synced MAC address scraper.
**Third-Party Options:**
*   **Ubiquiti WiFiman:** Beautiful UI. The absolute best free tool for mapping Wi-Fi dead zones, checking channel interference, and testing latency.
    *   *iOS & Android*
*   **Fing:** The industry standard for scanning a local network to find the IP addresses of newly connected POS terminals, printers, or cameras.
    *   *iOS & Android*
*   **Ookla Speedtest:** The universally accepted proof of bandwidth. (Many partners require an Ookla screenshot for their deliverables).
    *   *iOS, Android, & Web*

## 3. Remote Console & SSH (For Routers & Switches)
**The Leta Way:** Leta WebRTC Remote Shell (Allows our Level 3 NOC to console directly into the device through your phone's USB-C port).
**Third-Party Options:**
*   **Termius:** The best free SSH/Telnet client with an incredible mobile UI. Use this if you need to manually configure a Cisco switch on your phone.
    *   *iOS & Android*
*   **AnyDesk / TeamViewer:** Best if the partner's NOC requires remote control of a local PC or server you are working on.
    *   *iOS, Android, & Windows/macOS*

## 4. Document Scanning & Deliverables
**The Leta Way:** Native Offline-First Camera. (Compresses photos and queues them for upload when signal is restored).
**Third-Party Options:**
*   **Adobe Scan or Microsoft Lens:** If the Leta app is restricted by client firewall settings, use these to convert paper sign-off sheets into perfectly cropped PDFs, then upload them to the Leta Web Portal later.
    *   *iOS & Android*

---
*Note to App Developers: See `tech-tools-manifest.json` to implement the deep-link buttons in the mobile UI.*
