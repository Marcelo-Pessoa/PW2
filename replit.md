# Product API Backend

## Overview
This is a Node.js/TypeScript backend API for managing products. The project was imported from GitHub and configured to run in the Replit environment.

## Project Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Port**: 3000 (backend API)
- **Host**: 0.0.0.0 (accessible for API calls)

## Recent Changes (September 23, 2025)
- Migrated from MySQL to PostgreSQL for Replit compatibility
- Fixed TypeScript syntax errors in controller and utility files
- Configured proper Express middleware for JSON parsing
- Added health check endpoint at `/api/health`
- Set up Prisma migrations for PostgreSQL
- Configured deployment for production with VM target

## API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/product` - List all active products
- `/api/product` - Full CRUD operations (some endpoints still need implementation)

## Database Schema
- **Product model**: id, name, description, stock, status, createdAt, updatedAt
- Prisma client generated at `src/generated/prisma`

## Development Workflow
- Backend API runs on port 3000
- Uses nodemon for development with hot reload
- TypeScript compilation handled by tsx
- Prisma handles database operations

## Deployment Configuration
- **Target**: VM (for stateful backend API)
- **Build**: `npm run build` (TypeScript compilation)
- **Run**: `npm run start:prod` (production mode)

## Environment
- DATABASE_URL: Configured for PostgreSQL
- PORT: Default 3000, configurable via environment

This is a backend-only project with no frontend components.