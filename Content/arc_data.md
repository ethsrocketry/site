[ABOUT-START]
### About the Program
The American Rocketry Challenge is the world's largest model rocket contest, challenging student teams to design, build, and fly a model rocket that meets precise altitude and flight duration parameters while carrying a fragile payload (raw eggs) safely back to Earth. 

Through this program, team members gain hands-on engineering experience spanning:
* **Aerodynamic Design & CAD Modeling**
* **Avionics & Embedded Programming**
* **Rapid Hardware Prototyping & Simulation**
* **Data-Driven Flight Optimization**
[ABOUT-END]

[YEAR-START: 2026]
title: Lil' Willy: Active Control
mission: Active Airbrakes
header_image: ../arc26-media/full assembly render 1.png
header_alt: Custom telemetry background image for 2026 logs

*Lil' Willy* is ETHS's first actively-controlled rocket, using airbrakes and custom avionics to slow the rocket to a target apogee. This year, we focused on investigating and implementing active control, improving design and build quality, and cost reduction.

### Project Scope
* **Target Apogee:** 750 ft
* **Flight Duration:** 36 – 39 s
* **Payload Allocation:** 1 Raw Egg

### Engineering Breakthroughs
- **Python-Based SIL Simulation & Controller Tuning:** We developed a custom Python rocket flight simulator with software-in-the-loop capabilities and married it to a binary search engine. The binary search engine iteratively finds the optimal PID constants for our flight controller. 
[[pdf: ../arc26-media/Sample PID Optimization Report.pdf, Sample PID Optimization Report, false]]
- **Custom Avionics Stack:** In a major step up from 2025, we created a functional custom avionics stack featuring 9-axis acceleration and orientation tracking, barometric altitude finding, and flight data logging.
[[carousel: ../arc26-media/Fully_Assembled_AV_Bay_2 (1).jpg, ../arc26-media/Avionics Assembly 1.png, ../arc26-media/Avionics Assembly 2.png, ../arc26-media/Avionics Assembly 3.png, ../arc26-media/Avionics Assembly 4.png]]
- **Working Airbrake Mechanism:** We created a linkage-based airbrake mechanism that uses a servo and linkages to push flat plates out the side of the rocket.

[[carousel: ../arc26-media/Airbrake Control Test (Numerical Input).mp4, ../arc26-media/Airbrake Render1.png, ../arc26-media/Airbrake Render2.png, ../arc26-media/Airbrake Render3.png, ../arc26-media/Airbrake Render4.png, ../arc26-media/Airbrake Render5.png, ../arc26-media/Airbrake Render7.png]]

[[carousel: ../arc26-media/Full_Rocket_Assembly_2 (1).jpg, ../arc26-media/Fully_Assembled_AV_Bay_2 (1).jpg]]

[[youtube: DBYvCB82rY4, Launch #1]]

*Tags: C++ Avionics, Python SIL Sim, Active Airbrakes, Binary Search Tuning*
[YEAR-END: 2026]

--------------------------------------------------------------------------------------------

[YEAR-START: 2025]
title: Wildkit SRB MK3: Familiarization and Gaining Experience
mission: Familiarization
header_image: ../arc25-media/Full Assembly 3.jpg
header_alt: Full Assembly

[[carousel: ../arc25-media/Full Assembly 1.jpg, ../arc25-media/Full Assembly 2.jpg]]

## Project Scope & Deliverables
* **Target Apogee:** 790 ft
* **Flight Duration:** 37 – 41 s
* **Payload Allocation:** 2 Raw Eggs

## About
Beginning in August 2024, the E-Town Rocket Bureau (ERB) started designing and building a model rocket for entry into ARC 2025. The vehicle, named Wildkit SRB MK3, drew its name from the school mascot (Wildkit), its solid propulsion system (SRB for Solid Rocket Booster), and the fact that it represented the third major design iteration (MK3).

Although initial testing showed promise, the first three versions of the Wildkit SRB were ultimately unsuccessful. However, the ERB team gained significant technical experience and insight throughout the development process.

See our Final Report here, or scroll below for a quick summary:
[[pdf: ../arc25-media/ARC 2025 Final Report.docx, ARC 2025 Final Report, false]]

## The 2025 Build Team
* Eli Corr (Class of 2025)
* Peter Elbakian (Class of 2027)
* Pradyumna Manur (Class of 2026)
* Tristan Schultz (Class of 2025)
* Special thanks to Rajan Jhaveri (Class of 2025) for his contributions through December 2024.

## Flight History & Performance Analysis

While early digital versions showed promise, our real-world launch window came down to two critical test flights that brought both breakthroughs and hard lessons.

### Flight #1: The Crew Loss
- **Mission Profile:** Launched with a target altitude (apogee) of 790 feet while carrying a "crew" of two fragile eggs.
- **What Happened:** The rocket cleared the launch rail safely but immediately weathercocked—meaning it tilted into the wind, cutting its climb short at just 450 feet. While the stages separated successfully, only the booster parachute opened. The upper crew stage plummeted back down at high speed, resulting in a catastrophic impact that destroyed the eggs and detached the lower fuselage.
- **The Post-Mortem:**
  - **Parachute Failure:** The crew parachute was packed tightly inside the crew cabin itself instead of the transition section. The small black powder ejection charge didn't have enough explosive force to push it out.
  - **Payload Damage:** Internal carbon fiber alignment rails directly struck and cracked the eggs during flight.
  - **Low Altitude:** The rocket was too heavy (650g), its steering fins were too small to fight the wind, and a shifting Center of Gravity likely fell behind its Center of Pressure, causing the rocket to wobble and create massive aerodynamic drag.

[[youtube: 5x6kl6Fxayg, Launch #1]]

### Flight #2: The Reservoir Recovery
* **Mission Profile:** A stripped-down aerodynamic test flight. We removed the heavy mass-adjustment blocks, the nose-cone support tubes, and the egg payloads. Crucially, we relocated the crew parachute to the mid-body transition section.
* **What Happened:** The rocket flew significantly straighter and higher, with a visually estimated peak of 550 feet. However, the altimeter was accidentally left turned off, leaving us with no hard data. As it reached its peak, it began rapidly pitching back and forth (a behavior accurately predicted by our simulator, EulerSimBETA). 
* **The Catch:** The angled flight path carried the rocket directly into a nearby water reservoir. Though both pieces floated and were physically recovered, the crew stage suffered irreversible water damage. With no backup airframe or spare parts available, the remainder of our season was ground-canceled.

[[carousel: yt:Kewcq5KMFVI, ../arc25-media/Floating Rocket.jpg, yt:7D0z9zdrFr4, ../arc25-media/Rocket Fishing 1.jpg, ../arc25-media/Rocket Fishing 2.jpg, yt:u9WxUJuNQEc]]

## Behind the Scenes: Programmatic Challenges

Our primary bottlenecks weren't just aerodynamic—they were logistical. 

* **The "Digital Trap":** From August to January, we worked exclusively in computer-aided design (CAD) software to save money. Because we were learning the software as we went, this process dragged on, left us disconnected from physical build realities, and delayed our physical manufacturing until February.
* **Supply Chain Crises:** Ordering parts late meant our primary Aerotech motors and exact body tubes didn't arrive on time. Without a central inventory system, we completely missed ordering several other small parts. 
* **Forced Engineering Trims:** Because parts were missing and time was short, we had to ditch our planned active airbrake system, scrap our unbuilt onboard data-collection electronics, and settle for an imprecise, heavy mass-balancing strategy.

*Tags: Dual Deployment, Altimeter Array, Drift Mitigation*
[YEAR-END: 2025]
