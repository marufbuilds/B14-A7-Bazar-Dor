# Project-Name: Bazar Dor — Bangladesh Market Price Tracker

Bazar Dor is a modern and responsive market price web application built with Next.js. It helps users explore products, browse different categories, view product details, and access market information through a user-friendly interface. The application also provides secure authentication using email and password, Google, and GitHub.

## Technologies Used

- **Next.js** — React framework with App Router
- **React** — Building reusable UI components
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling and responsive design
- **Better Auth** — User authentication and social login
- **MongoDB** — Database integration
- **Sonner** — Success and error notifications
- **Lucide React** — Interface icons
- **Git & GitHub** — Version control and source code management
- **Vercel** — Application deployment

## Key Features

### 1. Product Library

Users can browse available products and explore market price information through a clean and organized interface.

### 2. Category-Based Navigation

Users can navigate through different product categories to find relevant products more easily.

### 3. Product Details

Each product has a dedicated details page where users can explore its information. Selected product pages are protected and require users to sign in before accessing them.

### 4. User Authentication

Users can create an account and sign in using their email address and password. The application also supports Google and GitHub authentication for convenient social login.

### 5. Protected Routes

Authentication is integrated with protected pages to restrict access to selected product and category information for unauthenticated users.

## Additional Features

- Responsive design for mobile, tablet, and desktop
- Show/hide password functionality
- Google and GitHub login buttons with provider icons
- Toast notifications for authentication success and errors
- Loading states during authentication
- Redirect handling after sign-in
- Friendly error messages for authentication failures
- Dynamic routing for products and categories

## Challenges I Faced

While developing Bazar Dor, I faced several challenges during implementation:

- **OAuth Authentication:** Configuring Google and GitHub authentication, managing callback URLs, and handling authentication errors required careful configuration of Better Auth and the OAuth providers.

- **Authentication Error Handling:** Displaying meaningful error messages for cancelled sign-ins, account-linking issues, and invalid credentials required additional error-handling logic and toast notifications.

- **Protected Routes:** Restricting access to selected pages and redirecting unauthenticated users to the sign-in page required careful handling of authentication state and redirect URLs.

- **Dynamic Routing:** Managing product and category routes, including invalid routes and missing data, required appropriate routing and error-handling strategies.

- **Next.js Data Fetching:** Handling uncached data and prerendering issues in dynamic pages was challenging. I had to investigate how data fetching and rendering work with the Next.js App Router.

- **Environment Configuration:** Setting up MongoDB connection details, authentication secrets, and OAuth credentials required careful management of environment variables for local development and deployment.

- **Responsive UI Design:** Maintaining a consistent and user-friendly interface across different screen sizes required careful use of Tailwind CSS and reusable React components.
