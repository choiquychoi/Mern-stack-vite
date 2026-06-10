# Trello Frontend - Modern DnD & AI Integration

The client-side application for a professional Trello clone, built with React, Vite, and Material UI. It features a seamless **Drag & Drop** experience and integrates with an **AI-powered sorting** backend.

---

## 🚀 Key Features

- **Advanced Drag & Drop:** Fluid movement of cards and columns using the high-performance **@dnd-kit** library.
- **AI Sorting Trigger:** Dedicated UI action to sort tasks within a column using Google Gemini AI.
- **Responsive Design:** Polished UI built with **Material UI (MUI)**, supporting both Dark and Light modes.
- **Optimistic UI:** Immediate visual feedback on drag-and-drop actions for a smooth user experience.
- **Real-time Sync:** Efficiently communicates with the backend to persist board states.
- **Customizable Components:** Modularized structure for Boards, Columns, and Cards.

---

## 🛠 Tech Stack

- **Framework:** React.js (Vite)
- **UI Library:** Material UI (MUI)
- **Drag & Drop:** @dnd-kit
- **State Management:** React Hooks
- **API Client:** Axios
- **Icons:** MUI Icons
- **Notifications:** React-Toastify

---

## 📂 Project Structure

```text
src/
├── apis/           # API call definitions using Axios
├── components/     # Reusable UI components (AppBar, Menus, etc.)
├── pages/          # Main views (Board Details Page)
│   └── Boards/
│       ├── BoardBar/
│       └── BoardContent/   # Core DnD and AI sorting logic
├── theme.js        # MUI Custom Theme (Colors, Typography, etc.)
├── utils/          # Formatter, Sort, and Constant helpers
└── App.jsx         # Root component
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js** (v18.x or higher)
- **Backend Running:** Ensure the [Trello Backend] is active.

### 2. Steps
```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
yarn install

# Configure environment variables
# Create a .env file and add your backend API root:
# VITE_APP_API_ROOT=http://localhost:8017
```

### 3. Run the App
```bash
# Development mode
yarn dev
```

---

## 🌟 Personal Contributions

- **AI UI Integration:** Implemented the "Sort by AI" button and integrated it with the backend AI service, including loading states and toast notifications.
- **DnD Optimization:** Configured `@dnd-kit` sensors (Mouse, Touch, Pointer) for a better cross-platform drag-and-drop experience.
- **State Management Logic:** Developed the logic to update the local board state after AI sorting and complex movements.

---

## 📝 License
Base project inspired by TrungQuanDev. Enhanced by [Your Name].
