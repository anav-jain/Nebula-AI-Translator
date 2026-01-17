# 🌌 Browser-Based AI Translator

> A privacy-first, offline-capable Neural Machine Translation app running entirely in your browser.

![Project Banner](https://img.shields.io/badge/Status-Active-success) ![Tech](https://img.shields.io/badge/Powered%20By-Transformers.js-yellow)

## 📖 Overview

This project implements a **client-side AI translation engine** using Next.js and Meta's NLLB (No Language Left Behind) model. Unlike traditional translation apps that send your text to a server (API), this app runs the AI model **locally on your device**.

### Why is this cool?
*   **🔒 Privacy**: Your text never leaves your browser. Zero data is sent to the cloud.
*   **⚡ Speed**: After the initial model load, translations happen near-instantly using WebGPU/WASM.
*   **🎨 UI**: Features a custom "Nebula" glassmorphism theme with 3D depth layers.

---

## 🛠️ Technical Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Drive)
*   **AI Engine**: [Transformers.js](https://huggingface.co/docs/transformers.js/index) by Xenova
*   **Model**: `nllb-200-distilled-600M` (Quantized to 8-bit for web)
*   **Styling**: Vanilla CSS (CSS Modules) with keyframe animations

---

## 📂 Code Architecture

This isn't just a UI wrapper; it's a multi-threaded web application. Here's how the code is structured:

### 1. The Brain: `public/worker.js`
Since AI models are heavy, we cannot run them on the main UI thread (it would freeze the page).
*   **Role**: Acts as a background thread that holds the AI model.
*   **Logic**: Listens for text messages → Runs inference → Sends back translated text.
*   **Implementation**: Uses the `CDN` version of Transformers.js to avoid Node.js bundling issues in the browser.

### 2. The Bridge: `src/hooks/useWorker.ts`
A custom React Hook that manages complexity.
*   **Role**: Initializes the Web Worker safely and handles the asynchronous communication (postMessage/onMessage).
*   **Logic**: Provides a simple `translate()` function to the UI while handling all the messy thread synchronization under the hood.

### 3. The Face: `src/app/page.tsx`
The main visual interface.
*   **Role**: Handles user input, animations, and state.
*   **Features**: Includes a custom "Typewriter" effect that makes the translation appear character-by-character, and controls the "Nebula" background animations.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+ installed

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/ai-translator.git
    cd ai-translator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000)

> **Note**: The first time you translate text, the app will download the AI model (~100MB). This is normal and happens only once per browser.

---

## ✨ Features

- [x] **Real-time Translation**: Supports English, Spanish, French, Hindi, Chinese, and more.
- [x] **Web Worker Multithreading**: Keeps UI buttery smooth during inference.
- [x] **Responsive Design**: Works on Desktop and Mobile.
- [x] **Visual Effects**: Background parallax depth and glowing glass cards.

---

## 👨‍💻 Author

**Anav Jain**
*   Project created for AI Course Module E.
