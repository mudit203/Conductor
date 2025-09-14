
## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mudit203/Conductor.git
cd Conductor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Conductor/
├── src/
│   ├── components/
│   │   ├── TableCloudscape.jsx    # Main data table component
│   │   ├── OrgPage.jsx           # Organization detail page
│   │   ├── EventPage.jsx         # Event detail page
│   │   └── Navbar.jsx            # Navigation component
│   ├── constants/
│   │   ├── Organization.js       # Organization mock data
│   │   └── Events.js            # Events mock data
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles
│   └── main.jsx                 # Application entry point
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
└── README.md                   # Project documentation
```