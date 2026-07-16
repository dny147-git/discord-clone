# Discord Clone

A full-stack Discord-inspired communication platform built with **Next.js 16**, **React 19**, and **TypeScript**.  
The application supports real-time messaging, server and channel management, direct conversations, file sharing, and voice/video communication.

## Features

- User authentication and session management with Clerk
- Create and manage servers
- Create text, voice, and video channels
- Invite users to servers through invitation links
- Role-based member management
- Real-time text messaging with Socket.IO
- Direct messages between members
- Infinite message loading with TanStack Query
- Edit and delete messages
- Emoji picker support
- File and image uploads with UploadThing
- Voice and video rooms with LiveKit
- Responsive interface for desktop and mobile
- Light and dark theme support
- Form validation with React Hook Form and Zod

## Tech Stack

### Front End

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Axios

### Authentication and Storage

- Clerk
- UploadThing

### Real-Time Communication

- Socket.IO
- LiveKit

### Database

- Prisma ORM
- PostgreSQL or MySQL

## Project Structure

```text
discord-clone/
├── app/                  # Next.js routes, layouts, and pages
├── components/           # Reusable UI and feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, database, and service configuration
├── pages/api/socket/     # Socket.IO API handlers
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── store/                # Zustand stores
```

> The actual folder structure may differ depending on the current version of the project.

## Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js 20 or later
- npm
- PostgreSQL or MySQL database
- Clerk account
- UploadThing account
- LiveKit account

### 1. Clone the repository

```bash
git clone https://github.com/dny147-git/discord-clone.git
cd discord-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
# Database
DATABASE_URL="your_database_connection_string"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# UploadThing
UPLOADTHING_TOKEN="your_uploadthing_token"

# LiveKit
LIVEKIT_API_KEY="your_livekit_api_key"
LIVEKIT_API_SECRET="your_livekit_api_secret"
NEXT_PUBLIC_LIVEKIT_URL="your_livekit_websocket_url"

# Application
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Environment variable names can vary depending on the project's current configuration. Check the source code before deployment and update the names where necessary.

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Apply the database schema

For local development:

```bash
npx prisma db push
```

For a migration-based workflow:

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server after building the application.

```bash
npm run lint
```

Runs ESLint.

## Core Workflows

### Server and channel management

Users can create servers, generate invitation links, add members, and organize conversations into text, voice, and video channels.

### Real-time messaging

Socket.IO delivers new messages and message updates without requiring a full page refresh. TanStack Query manages cached messages, infinite pagination, and synchronization between the server and user interface.

### Direct conversations

Members can start one-to-one conversations and exchange messages outside server channels.

### Voice and video

LiveKit provides low-latency voice and video rooms for supported channels.

### File sharing

UploadThing handles file and image uploads, allowing users to share media in conversations.

### Permissions

Server roles control which actions are available to owners, moderators, and regular members. The interface displays or hides actions according to the current user's permissions.

## Database

Prisma is used to model and query application data. Typical entities include:

- Profile
- Server
- Member
- Channel
- Message
- Conversation
- DirectMessage

After changing `prisma/schema.prisma`, update the database with:

```bash
npx prisma migrate dev --name describe-your-change
```

Then regenerate the Prisma client:

```bash
npx prisma generate
```

## Deployment

The project can be deployed to platforms that support Next.js applications, such as Vercel.

Before deploying:

1. Configure all production environment variables.
2. Use a production database.
3. Run Prisma migrations.
4. Configure the production Clerk domains and redirect URLs.
5. Configure UploadThing and LiveKit for the production domain.
6. Confirm that the Socket.IO deployment environment supports persistent WebSocket connections.

> Some serverless environments require a separate Socket.IO server or a hosting provider with WebSocket support.

## Future Improvements

- Message reactions
- Message search
- Read receipts
- Typing indicators
- Notification settings
- Server discovery
- Improved moderation tools
- Automated tests
- Docker support
- CI/CD pipeline

## Repository

Source code: [github.com/dny147-git/discord-clone](https://github.com/dny147-git/discord-clone)

## Author

**Hoang Nhut Duy**

- GitHub: [dny147-git](https://github.com/dny147-git)
- Email: [nhutdny123@gmail.com](mailto:nhutdny123@gmail.com)

## License

This project is created for learning and portfolio purposes.
