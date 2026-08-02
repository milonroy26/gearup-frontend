# GearUp Frontend

GearUp is a sports gear rental marketplace frontend built with Next.js, React, TypeScript, Tailwind CSS, and shadcn-style UI components. It connects to the GearUp backend API and provides role-based experiences for customers, providers, and admins.

## Project Overview

This application lets users browse available sports gear, create rental orders, make payments, track rental status, return items, and submit reviews. Providers can publish and manage their own gear inventory and handle incoming rental orders. Admins can monitor platform activity, manage users, review gear listings, and inspect rental orders.

## Key Features

- Public home page with hero, categories, how-it-works section, and call to action
- Gear listing page with search, price filtering, sorting, and availability display
- Gear details page with rental entry point
- Customer registration and login
- JWT cookie-based authentication
- Role-based dashboard routing for `CUSTOMER`, `PROVIDER`, and `ADMIN`
- Customer dashboard for rental overview and order history
- Rental booking form with date, quantity, and price calculation flow
- Payment initiation and payment result pages for success, fail, and cancel states
- Customer return action and review submission after eligible orders
- Provider dashboard with inventory overview
- Provider gear creation, update, delete, and availability management
- Provider incoming orders table with rental status updates
- Admin dashboard metrics
- Admin user management with role/status filters and suspend/activate actions
- Admin gear moderation view
- Admin rental order monitoring with filters and pagination
- Server actions for API communication and cache revalidation
- Responsive UI with reusable shared and UI components

## Default Credentials

| Role | Email | Password |
| --- | --- | --- |
| ADMIN | `milonchandro35@gmail.com` | `22422242#` |
| PROVIDER | `provider@gmail.com` | `password123` |
| CUSTOMER | `customer@gmail.com` | `password123` or create a new account from setup/register |

## Tech Stack

- **Framework:** Next.js `16.2.12`
- **UI Library:** React `19.2.4`
- **Language:** TypeScript
- **Styling:** Tailwind CSS `4`
- **Components:** shadcn-style components, Radix UI
- **Forms & Validation:** React Hook Form, Zod, `@hookform/resolvers`
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Authentication:** JWT access token stored in HTTP-only cookies
- **API Layer:** Server actions with a shared `fetcher`

## Environment Variables

Create a `.env` file in the project root:

```env
BACKEND_API_URL=https://gear-up-b7-a4.vercel.app/api
```

If the variable is missing, the app falls back to:

```env
http://localhost:5000/api
```

## Installation

```bash
npm install
```

## Running Locally

Start the development server: https://gearup-gear.vercel.app

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server after a successful build.

```bash
npm run lint
```

Runs ESLint checks.

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Public landing page |
| `/gear` | Browse and filter rental gear |
| `/gear/[id]` | View single gear details |
| `/login` | User login |
| `/register` | User registration |
| `/dashboard` | Role redirect/entry dashboard |
| `/dashboard/customer` | Customer overview |
| `/dashboard/customer/orders` | Customer rental orders |
| `/dashboard/customer/rent/[id]` | Rent selected gear |
| `/dashboard/provider` | Provider inventory overview |
| `/dashboard/provider/gear/new` | Add new gear |
| `/dashboard/provider/orders` | Provider incoming orders |
| `/dashboard/admin` | Admin overview |
| `/dashboard/admin/users` | Admin user management |
| `/dashboard/admin/gears` | Admin gear moderation |
| `/dashboard/admin/orders` | Admin rental order monitoring |
| `/payment/success` | Payment success page |
| `/payment/fail` | Payment failure page |
| `/payment/cancel` | Payment cancellation page |

## Role-Based Access

The app protects all dashboard routes using `middleware.ts`.

- Unauthenticated users are redirected to `/login`.
- Customers can access customer dashboard routes only.
- Providers can access provider dashboard routes only.
- Admins can access admin dashboard routes only.
- Logged-in users who visit `/login` or `/register` are redirected to their own dashboard.

## Project Structure

```text
app/                  Next.js App Router pages and layouts
components/shared/    Shared layout components like Navbar, Footer, Sidebar
components/ui/        Reusable UI primitives
features/admin/       Admin actions, types, utilities, and components
features/auth/        Login, register, auth schemas, hooks, and actions
features/gear/        Gear listing actions and UI components
features/home/        Landing page sections
features/payment/     Payment initiation actions and button
features/provider/    Provider inventory/order actions and components
features/rental/      Rental booking, return, review actions and components
lib/                  Shared utilities and API fetcher
types/                Global TypeScript interfaces and enums
middleware.ts         Auth and role-based route protection
```

## API Communication

All backend calls go through `lib/fetcher.ts`. The fetcher:

- Prefixes requests with `BACKEND_API_URL`
- Reads the `accessToken` cookie on the server
- Sends the token through request headers
- Supports Next.js cache tags and revalidation options
- Throws API error messages for failed responses

## Typical User Flows

1. A customer registers or logs in.
2. The customer browses gear from `/gear`.
3. The customer opens a gear details page and creates a rental order.
4. The customer initiates payment from the order flow.
5. The provider reviews incoming orders and updates order status.
6. The customer returns the item and can leave a review.
7. The admin monitors users, gears, rentals, and platform metrics.

## Deployment
 Vercel.

Clone the repository and install the production dependencies:

```bash
git clone (https://github.com/milonroy26/gearup-frontend.git)
cd gearup-frontend
npm install