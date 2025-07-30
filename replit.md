# Overview

This is a full-stack web application built with a modern tech stack featuring Express.js backend, React frontend with TypeScript, PostgreSQL database with Drizzle ORM, and shadcn/ui component library. The application is a modern, purple-themed one-page website for ContentToCalls, a content agency that helps coaches get qualified sales calls through content funnels. It features testimonials, animated UI components, and a complete dark/light mode system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema Location**: `shared/schema.ts` for shared type definitions

## Key Components

### Shared Schema (`shared/schema.ts`)
- Defines database schema using Drizzle ORM
- Contains User table with id, username, and password fields
- Exports TypeScript types for both insert and select operations
- Uses Zod for runtime validation

### Storage Layer (`server/storage.ts`)
- Abstract storage interface (IStorage) for CRUD operations
- In-memory implementation (MemStorage) for development
- Designed to be easily replaceable with database implementation

### Frontend Components
- **Home Page**: Marketing/landing page with testimonials and animations
- **UI Library**: Complete shadcn/ui component set including forms, dialogs, data tables
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Built-in dark mode support with CSS variables

### API Client (`client/src/lib/queryClient.ts`)
- Centralized API request handling
- React Query integration for caching and synchronization
- Error handling with proper HTTP status code management
- Credential inclusion for authentication

## Data Flow

1. **Client Requests**: Frontend makes HTTP requests through the queryClient
2. **Express Middleware**: Requests pass through logging and JSON parsing middleware
3. **Route Handling**: Routes are registered in `server/routes.ts` (currently minimal)
4. **Storage Operations**: Business logic interacts with storage interface
5. **Response**: JSON responses sent back to client with proper error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **cmdk**: Command palette component

### Development Dependencies
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler
- **vite**: Frontend build tool
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with automatic restart on changes
- **Database**: Connects to Neon PostgreSQL via DATABASE_URL environment variable

### Production Build
1. **Frontend**: Vite builds static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script

### Environment Configuration
- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Uses ES modules throughout the application
- Configured for serverless deployment patterns

The application follows a clean separation of concerns with shared TypeScript types, modular architecture, and modern development practices. The storage layer is abstracted to allow easy transition from in-memory to database persistence when needed.