# AapadNet

A disaster management platform that helps coordinate emergency response by allowing people to report their safety status, request resources, and manage relief operations through an admin dashboard.

## Features

- 🏠 **Homepage** - Central hub with server status and navigation
- ✅ **I Am Safe** - Report personal safety status during emergencies
- 📦 **Resource Requests** - Submit requests for food, water, shelter, and medical aid
- 📊 **Admin Dashboard** - View and manage all reports and requests
- 🔐 **Secure Authentication** - Password-protected admin access with bcrypt encryption
- 💾 **Data Persistence** - SQLite3 database for reliable data storage
- 🎨 **Responsive UI** - Tailwind CSS styling for modern design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Database**: SQLite3
- **Styling**: Tailwind CSS
- **Authentication**: bcrypt, express-session
- **Development Tools**: Nodemon, Concurrently

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dipanjan2907/Aapad-Net.git
cd Aapad-Net
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`:

- express
- sqlite3
- ejs
- tailwindcss
- bcrypt
- express-session
- dotenv
- And more...

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
SESSION_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
```

**Note**: Generate a strong `SESSION_SECRET` for production use. You can use:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Database Setup

The SQLite database will be automatically created when you run the server for the first time. The database file (`database.db`) will appear in the root directory.

## Running the Project

### Development Mode (Recommended)

Runs the server with Nodemon (auto-reload on changes) and Tailwind CSS in watch mode:

```bash
npm run dev
```

This command:

- Watches for changes in your server code and automatically restarts
- Monitors CSS changes and rebuilds Tailwind styles
- Runs both processes concurrently

### Production Mode

Runs the server without auto-reload:

```bash
npm start
```

### CSS Only Commands

If you need to manage CSS separately:

```bash
# Build CSS once
npm run build:css

# Watch CSS for changes (development)
npm run watch:css
```

## Accessing the Application

Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the AapadNet homepage with:

- Server status indicator
- Login link for admin access
- Navigation buttons for safe routes, resource requests, and admin dashboard

## Project Structure

```
Aapad-Net/
├── server.js                 # Express server setup and routes
├── db.js                     # Database initialization and queries
├── database.db              # SQLite database (auto-created)
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .env                     # Environment variables (create this)
│
├── views/                   # EJS template files
│   ├── index.ejs           # Homepage
│   ├── safe.ejs            # I Am Safe form
│   ├── request.ejs         # Resource request form
│   └── admin.ejs           # Admin dashboard
│
├── public/                  # Static files
│   ├── style.css           # Generated Tailwind CSS
│   └── input.css           # Tailwind directives
│
└── src/                     # Source files
    └── input.css           # Tailwind source configuration
```

## Available Routes

| Route      | Method | Description                 |
| ---------- | ------ | --------------------------- |
| `/`        | GET    | Homepage                    |
| `/safe`    | GET    | I Am Safe page              |
| `/safe`    | POST   | Submit safety status        |
| `/request` | GET    | Resource request page       |
| `/request` | POST   | Submit resource request     |
| `/admin`   | GET    | Admin dashboard (protected) |
| `/login`   | GET    | Admin login page            |
| `/login`   | POST   | Admin authentication        |

## Common Issues & Troubleshooting

### Tailwind CSS not working?

1. Make sure you have a `postcss.config.js` file with:

   ```javascript
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

2. Run the CSS build command:

   ```bash
   npm run build:css
   ```

3. Ensure `views/**/*.ejs` files are in the Tailwind `content` array in `tailwind.config.js`

### Port 3000 already in use?

Change the port in your `.env` file or kill the process using the port:

```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Database corruption?

Delete the `database.db` file and restart the server. It will create a fresh database.

```bash
rm database.db
npm run dev
```

## Development Workflow

### Working with the Code

1. **Server Changes**: Edit `server.js` or `db.js` - Nodemon will auto-restart
2. **Template Changes**: Edit `.ejs` files - refresh browser to see changes
3. **Style Changes**: Edit Tailwind classes directly in `.ejs` files - watch mode will rebuild CSS
4. **Database**: Add queries in `db.js` and use them in `server.js` routes

### Example: Adding a New Route

1. Create a new EJS template in `views/newpage.ejs`
2. Add route in `server.js`:
   ```javascript
   app.get("/newpage", (req, res) => {
     res.render("newpage");
   });
   ```
3. Server auto-restarts and route is live!

## Advanced Setup

### Using with ngrok for Testing

To expose your local server to the internet:

```bash
npx ngrok http 3000
```

### Database Backups

Your SQLite database is stored as `database.db`. Backup by copying this file regularly.

## Contributing

1. Create a new branch for features:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally

3. Commit with descriptive messages:

   ```bash
   git commit -m "Add: feature description"
   ```

4. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## License

This project is licensed under the ISC License - see the `package.json` file for details.

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify your `.env` file is correctly configured
4. Check the terminal for error messages
5. Open an issue on the [GitHub repository](https://github.com/dipanjan2907/Aapad-Net/issues)

---

**Made with ❤️ in Bharat for disaster relief coordination**
