
# Portfolio Visual Refresh: "Cyber-Clinical Director"

**Date:** 2026-02-11
**Goal:** Maximum "Wow" Factor. Stop a recruiter in their tracks in 15 seconds.
**Target Audience:** Recruiters and Hiring Managers for Clinical AI / Product Design roles.

## 1. Aesthetic Direction: "Neon Data Noir"

The site will feel like a high-performance, cutting-edge software tool designed for advanced medical intelligence. It will be dark, immersive, and highly interactive.

**Key Visual Pillars:**

*   **Primary Theme:** "Living Data" (AI Native). The interface itself feels alive and computational.
*   **Color Palette:**
    *   **Background:** True Black (`#000000`) - Deep, infinite, and clean.
    *   **Primary Accent:** Electric Purple (`#8b5cf6` or similar) - Represents futuristic tech/AI.
    *   **Secondary Accent:** Sharp Neon Green (`#22c55e` or similar) - Represents clinical precision/vital signs.
    *   **Typography:** White (`#ffffff`) for maximum contrast against the black.
*   **Typography:**
    *   **Headings:** `Space Grotesk` (already in use) - Technical, modern display font.
    *   **Body:** `Inter` (already in use) - Clean, readable, standard UI font.

## 2. Hero Section: The "Neural Network Mesh"

The first impression must communicate "Clinical AI" instantly.

*   **Interaction:** A **Neural Network Mesh** (connected nodes and lines) that pulses and reacts to mouse movement.
    *   *Metaphor:* Connectivity, "connecting the dots" in patient data, AI architecture.
    *   *Implementation:* Can use `react-canvas` or `three.js` (or a lighter-weight canvas solution) to draw nodes that connect when close.
*   **Headline:** Bold, centered typography floating over the mesh.
    *   "Designing with Agents & Clinical Intelligence" (Existing copy is good, maybe tweak for punchiness).
*   **Grid:** A subtle background grid (like graph paper) to reinforce the "technical/engineering" vibe.

## 3. Work Section: The "Cinematic Stack"

We want to showcase deep, complex work without overwhelming the user.

*   **Layout:** A vertical stack of **massive, full-width project cards**.
*   **Card Design:**
    *   **Size:** Each card takes up significant screen real estate (e.g., 80-90vh or just very tall).
    *   **Visuals:** High-fidelity hero images of the interface or case study.
    *   **Interactivity:**
        *   **Parallax Scroll:** Images move slightly slower than the scroll speed for depth.
        *   **Hover:** On hover, the card might expand slightly, glow with the neon accent color, or reveal a video preview.
    *   **Content:** Minimal text on the card itself (Project Title, One-line value prop). The visual does the heavy lifting.
*   **Scroll Effect:** As you scroll down, the cards could "stack" on top of each other or fade in with a cinematic ease.

## 4. Nuanced Details & Micro-Interactions

These are the "polish" elements that signal seniority.

*   **Glow Effects:** Buttons and cards have a subtle, colorful glow (purple/green) that intensifies on hover.
*   **Custom Cursor:** A custom cursor (maybe a small circle or crosshair) that interacts with the background mesh.
*   **Smooth Scroll:** Implement smooth scrolling (e.g., `lenis`) to give the whole site a premium, "heavy" feel.
*   **Text Reveals:** Headers don't just appear; they slide up and fade in (staggered character or word animations).

## 5. Technical Implementation Strategy

We will update the existing `Hero.tsx` and `WorkGrid.tsx` components rather than rebuilding from scratch, but the styling changes will be significant.

**Phase 1: Foundation & Theme**
*   Update `globals.css` to the "Neon Data Noir" variables.
*   Implement the custom cursor and smooth scroll wrapper.

**Phase 2: The Hero**
*   Build the `NeuralMesh` background component.
*   Refine the Hero typography and entrance animations.

**Phase 3: The Work Stack**
*   Refactor `WorkGrid.tsx` into a `CinematicWorkStack.tsx`.
*   Style the large project cards with parallax/hover effects.

**Phase 4: Polish**
*   Add the "glow" utilities and text reveal animations throughout the site.
