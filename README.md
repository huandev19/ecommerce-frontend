# V8N Ecommerce Frontend Monorepo

Welcome to the **v8n-ecomm** frontend monorepo. This repository contains the frontend applications and shared packages for the V8N Ecommerce platform, managed via [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/).

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State/Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Package Manager:** `pnpm`
- **Monorepo Tool:** Turborepo

---

## 🏗 Architecture & Workspace Structure

This monorepo is divided into **Apps** and **Packages**.

### 📱 Apps (`apps/`)

- **`apps/storefront`**: The customer-facing e-commerce web application.
- **`apps/admin-dashboard`**: The internal dashboard for managing products, orders, and users.

### 📦 Shared Packages (`packages/` & `ecommerce/`)

- **`ecommerce/ui`**: Centralized UI component library based on `shadcn-ui`. All shared UI components live here.
- **`packages/api`**: Shared API clients (Axios/Fetch), endpoints, and data-fetching hooks (TanStack Query).
- **`packages/hooks`**: Custom React hooks independent of UI (e.g., `useEventBus`, `useAuth`).
- **`packages/i18n`**: Internationalization schemas and JSON dictionaries.
- **`packages/types`**: Shared TypeScript definitions, interfaces, and DTOs.
- **`packages/config`**: Shared configuration settings (ESLint, Prettier, TypeScript).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (v9.x recommended)

### 1. Install Dependencies
Always use `pnpm` to install packages at the root level.
```bash
pnpm install
```

### 2. Start the Development Server
To start all applications simultaneously:
```bash
pnpm dev
```
- **Storefront:** `http://localhost:3000` (default)
- **Admin Dashboard:** `http://localhost:3001` (default)

To start a specific app:
```bash
pnpm --filter storefront dev
```

### 3. Build for Production
To build all apps and packages:
```bash
pnpm build
```

---

## 📜 Available Scripts (Root)

Run these commands from the root directory:

- `pnpm dev`: Starts the development servers using Turborepo.
- `pnpm build`: Builds all apps and packages.
- `pnpm lint`: Runs ESLint across all workspaces.
- `pnpm format`: Formats code using Prettier.

---

## 📖 Coding Standards & Conventions

1. **Package Management:** **ALWAYS use `pnpm`.** Never use `npm` or `yarn`.
2. **UI Components:** Do NOT install `shadcn-ui` components directly into the `apps/*` directories. Generate and maintain them inside `ecommerce/ui`.
3. **TypeScript:** Strictly enforce types. Avoid using `any`. Define core models in `packages/types`.
4. **Data Fetching:** Do NOT use raw `fetch` or `axios` directly inside components. Define services and custom hooks in `packages/api`.
5. **Form State:** Use `react-hook-form` and `zod` for all form state management instead of multiple `useState` declarations.
6. **Next.js Server Components:** Prefer Server Components by default. Only use `"use client"` when interactivity or React hooks are required.
7. **Cross-Component Communication:** Utilize the global Event Bus (`packages/hooks/useEventBus.ts`) for complex component communication decoupled from the component tree.
