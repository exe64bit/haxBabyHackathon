# 🌙 Pip’s Midnight Observatory 🔭 ⭐
### A Retro Kids’ Dream World & Full-Stack Character Portfolio

Welcome to **Pip’s Midnight Observatory**, an interactive web world and character portfolio created for **Pip**, the sleepy, gentle Skull Baby who works as a Junior Dream Engineer at Midnight Nursery.

Built for the **Baby’s First Website** hackathon on [haX.baby](https://hax.baby), the site combines:
- A whimsical children’s storybook
- A playful 1990s educational computer game
- An early-internet personal website (complete with visitor odometer and window frames)
- A collectible dream sticker album
- A toy-filled observatory with sound synthesis and bedtime nightlights

---

## 🎨 Design System & Visual Identity

### The Six Required Identity Colors
The application uses CSS custom properties defined centrally in `client/src/index.css`:
- **Peach (`#F6C3AE`)**: Storybook panels, cheeks, soft accents
- **Orange (`#F0743E`)**: Primary action buttons, retro badges, highlight tags
- **Lavender (`#CDBCDB`)**: Dreamy window headers, secondary cards, night sky nebulae
- **Sunshine Yellow (`#FDD848`)**: Star chimes, collectible rewards, glowing lanterns
- **Mint Green (`#AAD59E`)**: Success states, garden scenes, online indicators
- **Powder Blue (`#9AB2D4`)**: Sky backdrops, flight navigation, cloud routes

### Neutrals
- **Warm Cream (`#FFF8F1`)**: Daytime background
- **White (`#FFFDF9`)**: Card backgrounds
- **Warm Dark Brown (`#5C4033`)**: Headings & title typography
- **Soft Ink (`#463A4A`)**: Body copy & retro borders

### 90s Retro Web & Kids' Styling
- **Chunky Rounded Cards**: Thick borders with hard drop shadows (`4px 4px 0px var(--shadow-color)`).
- **Retro Windows**: Fake OS titlebars with colored dots and `PIP-OS 1999` status tags.
- **Web Audio Music Box**: Procedural lullaby chimes synthesized using the browser's native Web Audio API (no external mp3 files required, completely silent until the visitor clicks to wind up the box).
- **Interactive Nightlight**: Switchable bedside lantern with realistic ambient glow.
- **Starry Visitor Odometer**: Retro mechanical digits fetching atomic count from the backend.
- **Sticker Album**: Discover 6 dreams across the radar map and collect stickers saved permanently to your account.
- **Day & Night Modes**: Seamless toggle with local storage persistence and system preference detection.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 6, React Router 7, Plain CSS with Custom Properties, Lucide Icons, Canvas-Confetti, Web Audio API.
- **Backend**: Node.js, Express, Mongoose, Express Session, Connect-Mongo, Express-Validator, BcryptJS, Helmet, Express-Rate-Limit, Morgan.
- **Database**: MongoDB (Mongoose models for Users, Projects, Dreams, DreamCollections, GuestbookEntries, and VisitorStats).
- **Testing**: Vitest & Testing Library (frontend), Node test runner & Supertest (backend).

---

## 📂 Repository Structure

```text
HaxBaby/
├── client/                     # Frontend Vite + React application
│   ├── public/
│   │   └── images/             # Official Pip high-res assets & icons
│   ├── src/
│   │   ├── api/                # Reusable fetch client & service modules
│   │   ├── components/         # Modular UI components (Header, Hero, Map, etc.)
│   │   ├── context/            # AuthContext and ThemeContext
│   │   ├── hooks/              # useDreamAudio & useTheme
│   │   ├── pages/              # Home, Login, Register, Profile, NotFound
│   │   ├── test/               # Vitest test setup and unit tests
│   │   ├── app.css             # Component layout & retro styling
│   │   ├── index.css           # Global design tokens and color palette
│   │   ├── App.jsx             # Router and top-level providers
│   │   └── main.jsx            # React root entry
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── server/                     # Backend Express API
│   ├── src/
│   │   ├── config/             # Environment & MongoDB connection management
│   │   ├── controllers/        # Auth, Projects, Dreams, Guestbook, Visitors
│   │   ├── middleware/         # Auth, validation, rateLimiters, errorHandler
│   │   ├── models/             # Mongoose schemas & indexes
│   │   ├── routes/             # REST route definitions
│   │   ├── scripts/            # Safe idempotent seed script
│   │   ├── utils/              # asyncHandler & text sanitization
│   │   ├── validators/         # express-validator rule sets
│   │   ├── app.js              # Express app setup with security & sessions
│   │   └── server.js           # Server listen & graceful shutdown
│   ├── tests/                  # Integration & unit tests (supertest)
│   ├── package.json
│   └── .env.example
├── package.json                # Root monorepo workspace scripts
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `>= 18.0.0`
- npm `>= 9.0.0`
- A MongoDB database connection URL (local `mongod` or MongoDB Atlas)

### Step 1: Install Dependencies
From the repository root:
```bash
npm install
npm --prefix server install
npm --prefix client install
```

### Step 2: Configure Environment Variables
Create your `server/.env` file from the example:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and insert your MongoDB URI:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pip_midnight_observatory
CLIENT_URL=http://localhost:5173
SESSION_SECRET=a-super-secret-starry-key-1999
SESSION_NAME=pip.sid
```

*(Optional)* Create `client/.env` if your backend runs on a custom URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Seed the Database
Run the idempotent seed script to populate projects and dream catalog without wiping existing user accounts:
```bash
npm run seed
```
Output:
```text
🔌 Connecting to MongoDB for seeding...
✨ Connected. Seeding Pip’s Midnight Observatory records safely...
📦 Projects: 3 inserted, 0 already up to date.
⭐ Dreams:   6 inserted, 0 already up to date.
📟 Counter:  Initialized retro odometer at 1,042 visits.
🌟 [SEED SUCCESS] Pip’s Midnight Observatory is seeded and ready!
```

### Step 4: Run Development Servers
Start both backend and frontend concurrently:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Running Automated Tests

Run the test suite across both frontend and backend:
```bash
npm test
```

Or run them individually:
```bash
# Run backend tests (Node test runner + Supertest)
npm --prefix server test

# Run frontend tests (Vitest + Testing Library)
npm --prefix client test
```

---

## 📡 REST API Reference

All successful responses follow this format:
```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

All error responses follow this format:
```json
{
  "success": false,
  "message": "Clear error explanation",
  "errors": ["ERROR_CODE"]
}
```

### Health Check
- `GET /api/health`
  - Returns operational status, uptime, and database connection state.
  - Query parameter `?requireDb=true` returns `503` if MongoDB is offline.

### Authentication
- `POST /api/auth/register`
  - Body: `{ "nickname": "StarGazer", "email": "star@hax.baby", "password": "password123" }`
  - Normalizes email, validates input, hashes password with bcrypt, initializes session.
- `POST /api/auth/login`
  - Body: `{ "email": "star@hax.baby", "password": "password123" }`
  - Generic error on failure to protect account privacy.
- `POST /api/auth/logout`
  - Destroys server session and clears `pip.sid` cookie.
- `GET /api/auth/me`
  - Returns authenticated user details and dream sticker collection count.

### Projects
- `GET /api/projects`
  - Returns list of published inventions (The Lullaby Lab, Nightlight Collection, Dream Delivery Routes).
- `GET /api/projects/:id`
  - Returns project by MongoDB ObjectId or URL slug.

### Dreams & Collection
- `GET /api/dreams`
  - Returns all discoverable dreams.
- `GET /api/dreams/:id`
  - Returns a specific dream by slug or ObjectId.
- `POST /api/dreams/:id/collect` *(Requires Authentication)*
  - Idempotent: adds dream to user's permanent collection without duplicating.
- `GET /api/dreams/collection` *(Requires Authentication)*
  - Returns the logged-in user's collected stickers and discovery count.

### Guestbook
- `GET /api/guestbook?page=1&limit=20`
  - Returns approved messages, newest first.
- `POST /api/guestbook`
  - Body: `{ "nickname": "Sam", "message": "Good night Pip!", "sticker": "moon" }`
  - Sanitizes plain-text content and prevents HTML injection.

### Visitor Counter
- `GET /api/visitors`
  - Atomically increments visit count per session cookie, preventing increment spam on React re-renders.

---

## 🔒 Security Architecture Decisions

1. **Password Security**: Passwords are hashed using `bcryptjs` with salt rounds = 10. Password hashes have `select: false` on the User schema and are stripped from API outputs.
2. **Session-Based Authentication**: Browser sessions use `express-session` with `connect-mongo`. Cookies are configured with `HttpOnly: true`, `SameSite: 'lax'`, and `Secure: true` in production environments.
3. **CORS Configuration**: Restricts origins strictly to `CLIENT_URL` (no wildcard `*` with credentials).
4. **Input Sanitization**: Guestbook entries and nicknames are stripped of HTML tags and normalized to plain text.
5. **Rate Limiting**: Built-in rate limiters on general API routes, authentication attempts (20 / 15 mins), and guestbook postings (10 / 10 mins).
6. **Graceful Offline Degradation**: When MongoDB is disconnected, the public homepage remains fully explorable. The visitor counter and sticker album gracefully drop into temporary local modes without crashing the application.

---

## 🚀 Deploying to Render (Single-Server Full-Stack Setup)

The application is fully configured to run both frontend and backend on a **single Render Web Service**. In this mode, the Express server handles all API routes (`/api/*`) and serves the compiled React production bundle (`client/dist`) with SPA client-side routing fallback.

### Option 1: Automatic Blueprint (Recommended)
1. Push your repository to GitHub or GitLab.
2. In [Render Dashboard](https://dashboard.render.com), click **New +** > **Blueprint**.
3. Connect your repository. Render will automatically detect the [`render.yaml`](file:///home/kai/Documents/HaxBaby/render.yaml) file.
4. Set your `MONGODB_URI` environment variable when prompted.
5. Click **Apply**. Render will automatically build the client and start the server!

### Option 2: Manual Web Service
1. In [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Select your repository.
3. Configure the following settings:
   - **Name**: `pip-midnight-observatory`
   - **Region**: Any (e.g. Frankfurt, Oregon, Singapore)
   - **Branch**: `main` or `master`
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm run render:build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
4. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `SESSION_SECRET`: any strong random key (e.g. `pip-secret-key-1999`)
   - `SESSION_NAME`: `pip.sid`
5. Click **Deploy Web Service**!

---

## 🌟 Official Character Credits

Official Pip character artwork used in this project is provided by **haX.baby** for Track 1 of **Baby’s First Website**:
- `pip_avatar_cloud.png` — Pip on a dream cloud.
- `pip_lullaby_box.png` — The Lullaby Lab brass music box.
- `pip_dream_lantern.png` — Pip's glowing bedside lantern.
- `pip_portrait.png` — Studio portrait of Pip in his starry nightcap.
- Canon details: Pip is a friendly, gentle Skull Baby working as a Junior Dream Engineer at Midnight Nursery.


