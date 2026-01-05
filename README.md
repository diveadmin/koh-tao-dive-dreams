# Koh Tao Dive Dreams

A React-based website for Koh Tao Dive Dreams, a PADI dive center in Koh Tao, Thailand. This application allows users to explore dive courses, book inquiries, and manage bookings through an admin panel.

## Features

- **Course Exploration**: Browse and learn about various PADI dive courses
- **Dive Site Information**: Discover dive sites around Koh Tao
- **Booking System**: Submit booking inquiries for courses and dive sites
- **Course Recommendation**: AI-powered course recommendations based on user preferences
- **Admin Panel**: Manage bookings, settings, and user roles
- **Local SQLite Database**: Data is stored locally using SQLite in the browser

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, Shadcn/ui components
- **Database**: SQLite (via sql.js for browser compatibility)
- **State Management**: React Query for server state
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd koh-tao-dive-dreams
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

### Admin Access

- **Email**: admin@example.com
- **Password**: admin

## Database

The application uses SQLite running in the browser via WebAssembly (sql.js). Data is persisted in the browser's localStorage.

### Default Data

- Admin user with email `admin@example.com`
- Notification email setting

## Build for Production

```sh
npm run build
```

## Migration from Supabase

This project has been migrated from Supabase to a local SQLite database for simplified deployment and data management. The migration includes:

- Replaced Supabase client with a custom SQLite client using sql.js
- Implemented local authentication for admin access
- Mocked edge functions for course recommendations and email notifications
- Maintained the same API interface for seamless transition

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/262b1d2a-b9e8-4e3a-8aaf-307801ed16f9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
