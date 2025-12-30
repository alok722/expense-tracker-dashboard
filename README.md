# Expense Tracker Dashboard

A full-stack expense tracking web application built with React, TypeScript, Express, MongoDB, and TailwindCSS. Track your income and expenses across multiple months with beautiful visualizations and intuitive data management.

## ✨ Features

### 🔐 Authentication & User Management

- **User Registration**: Create new accounts with username and password
- **User Login**: Secure session-based authentication
- **User-Specific Data**: Each user has their own isolated financial data
- **Default User**: Pre-configured user `admin` with password `admin` for quick testing

### 💰 Financial Tracking

- **Multi-Period Management**: Track income and expenses across multiple months and years
- **Period Creation**: Add new financial periods with Month/Year selector - starts empty for clean slate
- **Carry Forward**: Automatically calculates and adds carry forward from previous month if available
- **Entry-Based System**: Add multiple entries per category with notes (e.g., "Shopping: 1500 (Amazon) + 800 (Mall)")
- **Category Grouping**: Automatically groups entries by category and displays breakdowns

### 📊 Dashboard & Overview

- **Financial Summary Cards**: View total records, total income, total expenses, and net balance
- **AI-Powered Financial Insights**: Get personalized financial health scores, spending analysis, and predictions
- **Year-Based Organization**: Months grouped by year with descending order
- **Month Cards**: Quick view of each month showing income, expense, and carry forward
- **Empty State**: Helpful guidance when no records exist

### 💵 Income Management

- **Pre-defined Categories**: Salary, Carry Forward, Bonus, Freelance, Investment Returns, Rental Income, Others
- **Add Multiple Entries**: Add multiple income entries to the same category
- **Edit & Delete Entries**: Edit individual income entries (amount, note) or delete specific entries
- **Entry Breakdown**: View detailed breakdown showing all entries with notes
- **Category Totals**: Automatic calculation of category totals
- **Delete Functionality**: Remove entire categories with confirmation
- **Category Icons**: Visual icons for each income category (Briefcase, Wallet, Gift, etc.)
- **Interactive Breakdown Tooltips**: Click edit/delete icons for each entry in the transaction details view
- **Real-time Search**: Search across categories and entry notes instantly
- **Sortable Columns**: Click column headers to sort by category name or amount (ascending/descending)
- **Smart Filtering**: Filter results with one-click clear option
- **Visual Enhancements**: Gradient hover effects, smooth animations, and modern card design

### 💳 Expense Management

- **Comprehensive Categories**: 13 default categories (Rent, EMIs, Groceries, Shopping, Food & Drinks, Credit Card, Bills & Utility, Transportation, Medical, Personal Care, Insurance, Investment, Miscellaneous)
- **Multi-Entry Support**: Add multiple expense entries to the same category
- **Edit & Delete Entries**: Edit individual expense entries (amount, note, tag) or delete specific entries
- **Need/Want/Neutral Tagging**: Tag each expense as 🔴 Need, 🟡 Want, or ⚪ Neutral for better spending insights
- **Detailed Breakdown**: View itemized expenses with notes and tags (e.g., "🔴 150(Uber) + 🟡 200(Shopping)")
- **Smart Grouping**: Expenses automatically grouped and calculated by category
- **Easy Deletion**: Remove categories with all entries
- **Category Icons**: Visual icons for each expense category (Home, CreditCard, ShoppingCart, etc.)
- **Interactive Transaction Details**: Click edit/delete icons in the breakdown tooltip to modify individual entries
- **Inline Tag Display**: Tags shown as colored dots (🔴🟡⚪) before entry descriptions
- **Advanced Search**: Real-time search across categories and entry notes
- **Tag-Based Filtering**: Filter expenses by Need/Want/Neutral with toggle buttons
- **Sortable Columns**: Sort by category name or amount with visual indicators
- **Clear All Filters**: One-click button to reset all active filters
- **Visual Enhancements**: Gradient hover effects, smooth row animations, modern filter pills
- **Recurring Expenses**: Mark expenses as recurring for auto-population in future months

### 📈 Data Visualizations

- **Expense Breakdown Chart**: Interactive pie chart showing expense distribution by category with percentages
- **Income vs Expense Chart**: Bar chart comparing total income and expenses for the current month
- **Need vs Want vs Neutral Chart**: Pie chart visualizing spending across need/want/neutral categories with summary cards
- **Carry Forward Trend**: Line chart tracking balance trends across all months
- **AI Monthly Insights**: OpenAI-powered analysis of spending patterns, trends, and personalized recommendations
- **Responsive Charts**: Built with Chart.js for smooth interactions and tooltips
- **Color-Coded**: Distinct colors for easy category identification

### 💎 User Experience

- **Dark Theme**: Professional dark mode interface with slate color scheme
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile
- **Modern UI Components**: Built with shadcn/ui and TailwindCSS for consistency
- **Smooth Animations**: Hover effects, transitions, loading states, and staggered row animations
- **Icon Integration**: Lucide React icons for visual clarity
- **Category Icons**: Color-coded icons for all income and expense categories
- **Empty States**: Helpful messages and CTAs when no data exists
- **Loading States**: Spinner animations during data fetch operations
- **Status Badges**: Visual indicators for surplus/deficit status
- **Interactive Tooltips**: Transaction details tooltips with edit/delete actions for each entry
- **Gradient Effects**: Modern gradient hover effects on table rows with subtle glows
- **Visual Feedback**: Smooth fade-in delete buttons, hover states, and focus rings
- **Smart Tables**: Auto-sizing columns with optimized breakdown space
- **Filter Pills**: Modern tag filter buttons with active state indicators
- **Authenticated Landing**: Shows "Go to Dashboard" when logged in, signup/login when not

### 🎯 Navigation & Layout

- **Protected Routes**: Secure routing with authentication checks
- **Top Navbar**: Persistent navigation with user info and logout
- **Breadcrumb Navigation**: Easy back navigation from detail views
- **Tab Interface**: Organized tabs for Income, Expenses, and Charts
- **Dialog Modals**: Clean dialogs for adding entries and creating periods

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript - Modern UI development
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives (Dialog, Select, Tooltip)
- **Chart.js** with react-chartjs-2 - Interactive data visualizations
- **React Router v6** - Client-side routing and navigation
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **date-fns** - Modern date utility library
- **class-variance-authority** - CSS class management

### Backend

- **Node.js + Express** - RESTful API server
- **TypeScript** - Type-safe backend code
- **MongoDB** - Cloud-hosted NoSQL database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB with schema validation
- **Google Generative AI** - AI-powered financial insights using Gemini 1.5 Flash
- **bcrypt** - Password hashing for secure authentication
- **Winston** - Professional logging system
- **Morgan** - HTTP request logging middleware
- **CORS** - Cross-origin resource sharing enabled
- **ts-node** - TypeScript execution for development
- **Nodemon** - Auto-restart on file changes

### Development Tools

- **Yarn Workspaces** - Monorepo package management
- **Concurrently** - Run multiple dev servers simultaneously
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS transformations and autoprefixer

## 📁 Project Structure

```
expense-tracker-dashboard/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ui/            # shadcn/ui base components
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   ├── Charts/        # Data visualization components
│   │   │   │   ├── CarryForwardTrendChart.tsx
│   │   │   │   ├── ExpenseBreakdownChart.tsx
│   │   │   │   ├── IncomeBreakdownChart.tsx
│   │   │   │   ├── IncomeVsExpenseChart.tsx
│   │   │   │   ├── MonthTrendChart.tsx
│   │   │   │   └── NeedWantNeutralChart.tsx
│   │   │   ├── AIInsights/    # AI-powered insights components
│   │   │   │   ├── OverviewInsightsCard.tsx
│   │   │   │   ├── MonthlyInsightsCard.tsx
│   │   │   │   └── InsightItem.tsx
│   │   │   ├── Tables/        # Enhanced table components
│   │   │   │   ├── BreakdownTooltip.tsx
│   │   │   │   └── CategoryIcon.tsx
│   │   │   ├── Layout/        # Navigation and layout components
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── Dashboard.tsx  # Main dashboard view
│   │   │   ├── ExpenseSection.tsx
│   │   │   ├── IncomeSection.tsx
│   │   │   ├── Login.tsx      # Authentication page
│   │   │   ├── MonthCard.tsx  # Month summary card
│   │   │   └── MonthDetail.tsx # Detailed month view
│   │   ├── context/
│   │   │   └── AppContext.tsx # Global state management
│   │   ├── services/
│   │   │   └── api.ts         # API client with Axios
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript type definitions
│   │   ├── utils/
│   │   │   ├── calculations.ts # Helper functions
│   │   │   └── categoryIcons.ts # Category icon mappings
│   │   ├── lib/
│   │   │   └── utils.ts       # Utility functions
│   │   ├── App.tsx            # App router setup
│   │   ├── main.tsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── components.json        # shadcn/ui config
│   ├── package.json           # Client dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── tsconfig.json          # TypeScript config
├── server/                     # Backend Express API
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   │   ├── auth.ts        # Authentication endpoints
│   │   │   ├── data.ts        # Data management endpoints
│   │   │   ├── recurring.ts   # Recurring expenses endpoints
│   │   │   └── insights.ts    # AI insights endpoints
│   │   ├── models/            # Mongoose schemas and models
│   │   │   ├── User.ts        # User model
│   │   │   ├── MonthData.ts   # Month data model
│   │   │   ├── RecurringExpense.ts  # Recurring expense model
│   │   │   ├── InsightsCache.ts     # AI insights cache model
│   │   │   └── index.ts       # Model exports
│   │   ├── services/          # Business logic services
│   │   │   ├── AuthService.ts
│   │   │   ├── MonthDataService.ts
│   │   │   ├── RecurringExpenseService.ts
│   │   │   ├── OpenAIService.ts     # OpenAI integration
│   │   │   ├── InsightsService.ts   # Insights caching logic
│   │   │   └── index.ts
│   │   ├── config/            # Configuration files
│   │   │   ├── database.ts    # MongoDB connection
│   │   │   └── logger.ts      # Winston logger setup
│   │   ├── utils/             # Utility functions
│   │   │   ├── idGenerator.ts # Unique ID generation
│   │   │   └── monthCalculations.ts # Financial calculations
│   │   ├── middleware/        # Express middleware
│   │   │   └── errorHandler.ts # Global error handler
│   │   └── index.ts           # Express server setup
│   ├── data/
│   │   └── data.json          # Seed data template
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Server dependencies
│   └── tsconfig.json          # TypeScript config
├── package.json               # Root workspace configuration
├── yarn.lock                  # Dependency lock file
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **Yarn** package manager (v1.22+ or v3+)
- **MongoDB Atlas Account** (free tier available at [mongodb.com](https://www.mongodb.com/cloud/atlas))

### Environment Setup

1. **Set up MongoDB Atlas**

   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Set up database access (username and password)
   - Whitelist your IP address (or use 0.0.0.0/0 for development)
   - Get your connection string

2. **Configure Server Environment Variables**

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Update the `.env` file with your MongoDB credentials:

```env
DB_PASSWORD=your_mongodb_password_here
PORT=5001

# Google AI Studio Configuration (Required for AI Insights)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash-latest
```

**Get your Gemini API Key:**

1. Sign up at [Google AI Studio](https://aistudio.google.com/)
2. Navigate to "Get API key" section
3. Create a new API key
4. Add it to your `.env` file

**Note:** The MongoDB connection URL is configured in `server/src/config/database.ts`. Update the username and cluster details if needed.

3. **Configure Client Environment Variables**

Create a `.env` file in the `client/` directory:

```bash
cd client
cp .env.example .env
```

The default configuration should work for local development:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5001/api

# Application Configuration
VITE_APP_NAME=Expense Tracker Dashboard
```

For production, update `VITE_API_BASE_URL` to point to your deployed backend API.

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd expense-tracker-dashboard
```

2. **Install all dependencies**

```bash
yarn install
```

This will install dependencies for both client and server using Yarn workspaces.

3. **Start the development servers**

```bash
# Start both frontend and backend concurrently
yarn dev

# Or start individually:
yarn dev:client  # Frontend on http://localhost:3000
yarn dev:server  # Backend on http://localhost:5001 (requires DB_PASSWORD env var)
```

For the backend, you can also start it with inline environment variables:

```bash
cd server
PORT=5001 DB_PASSWORD='your_password' yarn dev
```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Default Credentials

The application comes with pre-seeded test data. Login with:

- **Username**: `admin`
- **Password**: `admin`

The seed data includes:

- 2 months of financial data (January & February 2025)
- Sample income and expense entries with various categories
- 4 recurring expenses (Rent, Netflix, Internet, Gym)

### Production Build

```bash
# Build the client for production
yarn build

# Start the production server
yarn start
```

The production build will be available in `client/dist/`

## 📖 Usage Guide

### Creating Your First Period

1. Click the **"Add Period"** button on the dashboard
2. Select the **month** and **year** from the dropdowns
3. Click **"Create Period"** - a new empty period will be created
4. If you have a carry forward amount from the previous month, it will be automatically added as income
5. Your new period card will appear on the dashboard - start adding income and expenses as needed

### Adding Income

1. Click on a month card to open the detail view
2. Navigate to the **"Income"** tab
3. Click **"Add Income"** button
4. Select a **category** (Salary, Bonus, Freelance, etc.)
5. Enter the **amount** and a descriptive **note**
6. Click **"Add Income"** to save
7. You can add multiple entries to the same category (they will be grouped automatically)

### Adding Expenses

1. From the month detail view, go to the **"Expenses"** tab
2. Click **"Add Expense"** button
3. Choose a **category** (Rent, Groceries, Shopping, etc.)
4. Enter the **amount** and **note** (e.g., "Amazon order", "Uber ride")
5. Select a **tag**:
   - **🔴 Need**: Essential expenses (rent, groceries, bills)
   - **🟡 Want**: Discretionary spending (entertainment, dining out)
   - **⚪ Neutral**: Default or uncategorized expenses
6. Click **"Add Expense"**
7. Multiple entries per category are supported and displayed with breakdowns showing tags

### Viewing Analytics

1. In the month detail view, click on the **"Charts"** tab
2. View four types of visualizations:
   - **Expense Breakdown**: Pie chart showing category-wise expense distribution
   - **Income vs Expense**: Bar chart comparing income and expenses
   - **Need vs Want vs Neutral**: Pie chart showing spending breakdown by expense type with percentage analysis
   - **Carry Forward Trend**: Line chart showing balance trends across all months

### Using AI Financial Insights

1. **Dashboard Overview Insights**:

   - Automatically generated on the dashboard when you have financial data
   - Shows your financial health score (0-100)
   - Provides key insights about spending patterns, budget optimization, and savings tips
   - Offers predictions based on your financial trends
   - Click "Refresh" to regenerate insights with latest data

2. **Monthly AI Insights**:

   - Navigate to any month and click the **"AI Insights"** tab
   - Get detailed month-specific analysis
   - See month-over-month comparisons with previous period
   - View spending breakdown by category and need/want/neutral tags
   - Receive actionable recommendations for that specific month
   - Click "Refresh" to get fresh insights

3. **Smart Caching**:

   - Insights are cached for 24 hours for fast loading
   - Automatically refreshed when you add/edit/delete transactions
   - Powered by OpenAI GPT-4o-mini for cost-effective, high-quality analysis

4. **What AI Analyzes**:
   - Overall financial health and savings rate
   - Spending patterns across categories
   - Need vs Want expense distribution
   - Month-over-month trends and changes
   - Budget optimization opportunities
   - Future spending predictions

### Managing Entries

- **Delete Categories**: Click the trash icon (appears on hover) to remove all entries in a category
- **View Detailed Breakdowns**: Hover over the breakdown text with info icon to see a rich tooltip with tabular data
- **Search Entries**: Use the search bar to find entries by category or note text
- **Sort Data**: Click column headers to sort by category name or amount
- **Filter by Tags** (Expenses): Use filter pills to show only Need, Want, or Neutral expenses
- **Clear Filters**: One-click button to reset all search and filter criteria
- **Track Balance**: Monitor your carry forward (surplus/deficit) in real-time

### Managing Recurring Expenses

Navigate to your **Profile** page (click user icon in navbar) to manage recurring expenses:

1. **View Recurring Expenses**

   - See all your recurring expenses with category, amount, note, and tag
   - Total recurring expenses displayed at the bottom

2. **Add New Recurring Expense**

   - Click **"Add Recurring Expense"** button
   - Enter category name (e.g., "Netflix Subscription")
   - Enter amount (e.g., 649)
   - Add a note (e.g., "Premium plan subscription")
   - Select tag: 🔴 Need, 🟡 Want, or ⚪ Neutral
   - Click **"Add"**

3. **Edit Recurring Expense**

   - Click the **pencil icon** (✏️) next to any recurring expense
   - Modify category, amount, note, or tag
   - Click **"Save Changes"**

4. **Delete Recurring Expense**
   - Click the **trash icon** (🗑️) next to any recurring expense
   - Confirm deletion in the dialog
   - Expense will be removed from your recurring list

**Use Case**: Set up recurring expenses like rent, subscriptions, or regular bills. These can serve as templates when adding expenses to future months.

### Multi-User Support

- Each user has completely isolated data
- Register new users from the login page
- Switch between accounts by logging out and back in

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint             | Description       | Request Body             |
| ------ | -------------------- | ----------------- | ------------------------ |
| POST   | `/api/auth/login`    | User login        | `{ username, password }` |
| POST   | `/api/auth/register` | User registration | `{ username, password }` |

### Data Management Routes

| Method | Endpoint                      | Description                | Query/Body                                 |
| ------ | ----------------------------- | -------------------------- | ------------------------------------------ |
| GET    | `/api/data`                   | Fetch all months for user  | Query: `?userId={id}`                      |
| GET    | `/api/data/month/:monthId`    | Get specific month details | -                                          |
| POST   | `/api/data/month`             | Create new month/period    | `{ userId, year, month }`                  |
| POST   | `/api/data/income/entry`      | Add income entry           | `{ monthId, category, amount, note }`      |
| PUT    | `/api/data/income/entry/:id`  | Update income entry        | `{ monthId, amount, note }`                |
| DELETE | `/api/data/income/entry/:id`  | Delete income entry        | Body: `{ monthId }`                        |
| POST   | `/api/data/expense/entry`     | Add expense entry          | `{ monthId, category, amount, note, tag }` |
| PUT    | `/api/data/expense/entry/:id` | Update expense entry       | `{ monthId, amount, note, tag }`           |
| DELETE | `/api/data/expense/entry/:id` | Delete expense entry       | Body: `{ monthId }`                        |

### Recurring Expenses Routes

| Method | Endpoint             | Description              | Query/Body                                |
| ------ | -------------------- | ------------------------ | ----------------------------------------- |
| GET    | `/api/recurring`     | Fetch recurring expenses | Query: `?userId={id}`                     |
| POST   | `/api/recurring`     | Create recurring expense | `{ userId, category, amount, note, tag }` |
| PUT    | `/api/recurring/:id` | Update recurring expense | `{ category, amount, note, tag }`         |
| DELETE | `/api/recurring/:id` | Delete recurring expense | -                                         |

### Insights Routes

| Method | Endpoint                                  | Description               | Query/Body            |
| ------ | ----------------------------------------- | ------------------------- | --------------------- |
| GET    | `/api/insights/overview`                  | Get dashboard insights    | Query: `?userId={id}` |
| GET    | `/api/insights/month/:monthId`            | Get monthly insights      | Query: `?userId={id}` |
| POST   | `/api/insights/regenerate/overview`       | Force regenerate overview | Body: `{ userId }`    |
| POST   | `/api/insights/regenerate/month/:monthId` | Force regenerate monthly  | Body: `{ userId }`    |

### Health Check

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/api/health` | Server health status |

### Response Formats

**Success Response:**

```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**

```json
{
  "error": "Error message here"
}
```

## 📋 Default Categories

### Income Categories

- **Salary** - Regular employment income
- **Carry Forward** - Balance from previous periods
- **Bonus** - Performance bonuses and incentives
- **Freelance** - Freelance project payments
- **Investment Returns** - Dividends, interest, capital gains
- **Rental Income** - Property rental income
- **Others** - Miscellaneous income sources

### Expense Categories

- **Rent** - Monthly rent payments
- **EMIs** - Loan EMIs (home, car, personal)
- **Groceries** - Food and household items
- **Shopping** - Clothing, electronics, online purchases
- **Food & Drinks** - Restaurants, cafes, food delivery
- **Credit Card** - Credit card payments
- **Bills & Utility** - Electricity, water, internet, phone
- **Transportation** - Fuel, public transport, cab rides
- **Medical** - Healthcare, medicines, insurance
- **Personal Care** - Grooming, salon, wellness
- **Insurance** - Life, health, vehicle insurance
- **Investment** - Mutual funds, stocks, savings
- **Miscellaneous** - Other expenses

**Note:** New periods start empty. Categories are created automatically when you add your first entry to that category. You can add multiple entries to each category, and they will be automatically grouped and displayed with breakdowns.

## 🏗️ Architecture & Database

### MongoDB Integration

The application uses **MongoDB Atlas** (cloud-hosted) with **Mongoose ODM** for robust data persistence:

- **Cloud Database**: MongoDB Atlas free tier (512 MB storage)
- **Connection**: Environment-based configuration with connection pooling
- **Schema Validation**: Mongoose schemas ensure data consistency
- **Password Security**: bcrypt hashing with salt rounds
- **Error Handling**: Winston logger for production-ready error tracking
- **Nested Arrays**: Proper handling of income/expense entries with `markModified()`

### Data Models

1. **User Model** (`User.ts`)

   - Handles authentication and user profiles
   - Password hashing with bcrypt
   - Currency preference per user

2. **MonthData Model** (`MonthData.ts`)

   - Stores monthly financial records
   - Nested arrays for income and expense entries
   - Auto-calculated totals and carry forward
   - Tracks per-entry notes and tags

3. **RecurringExpense Model** (`RecurringExpense.ts`)

   - User-defined recurring expenses
   - Can be used to auto-populate future months
   - Supports need/want/neutral categorization

4. **InsightsCache Model** (`InsightsCache.ts`)
   - Caches AI-generated insights for 24 hours
   - Stores financial health scores and predictions
   - Automatically invalidated on data mutations
   - TTL-based expiry for efficient memory management

### Backend Architecture

- **RESTful API**: Express.js with TypeScript
- **Route Organization**: Separate routers for auth, data, recurring expenses, and AI insights
- **Middleware**: Error handling, CORS, request logging (Morgan)
- **AI Integration**: OpenAI GPT-4o-mini for financial insights generation
- **Smart Caching**: MongoDB-based insights cache with TTL and mutation-triggered invalidation
- **Utilities**: ID generation, financial calculations
- **Logging**: Winston for structured logging with log levels
- **Environment Config**: dotenv for secrets management

### Testing

The application has been thoroughly tested with a comprehensive E2E test suite covering:

- ✅ Authentication (login, registration, invalid credentials)
- ✅ Month data CRUD operations
- ✅ Income entry operations (add, edit, delete)
- ✅ Expense entry operations with tag validation
- ✅ Recurring expenses management
- ✅ Financial calculation accuracy (100% verified)
- ✅ Category totals vs entry sums validation

**Test Results**: 19/19 tests passed (100% pass rate)

## 📂 Data Storage

### MongoDB Database Structure

The application uses MongoDB with Mongoose ODM for data persistence. Data is stored in three main collections:

#### Users Collection

```javascript
{
  _id: ObjectId("..."),
  username: "admin",
  password: "$2b$10$hashed_password...", // bcrypt hashed
  name: "Admin",
  currency: "INR",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

#### MonthData Collection

```javascript
{
  _id: ObjectId("..."),
  userId: "user_object_id",
  monthName: "January 2025",
  year: 2025,
  month: 0, // Zero-based (0 = January, 11 = December)
  income: [
    {
      id: "inc-1",
      category: "Salary",
      amount: 185000,
      comment: "185000(Monthly salary + performance bonus)",
      entries: [
        {
          id: "entry-inc-1",
          amount: 185000,
          note: "Monthly salary + performance bonus"
        }
      ]
    }
  ],
  expenses: [
    {
      id: "exp-1",
      category: "Groceries",
      amount: 8500,
      comment: "8500(Monthly groceries)",
      entries: [
        {
          id: "entry-exp-1",
          amount: 8500,
          note: "Monthly groceries",
          tag: "need" // "need" | "want" | "neutral"
        }
      ]
    }
  ],
  totalIncome: 185000,
  totalExpense: 8500,
  carryForward: 176500,
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

#### RecurringExpenses Collection

```javascript
{
  _id: ObjectId("..."),
  userId: "user_object_id",
  category: "Rent",
  amount: 28000,
  note: "Monthly rent for 2BHK apartment",
  tag: "need", // "need" | "want" | "neutral"
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### Key Features

- **MongoDB ObjectIds**: All documents use MongoDB's native `_id` field
- **Password Security**: User passwords are hashed using bcrypt (salt rounds: 10)
- **Timestamps**: Automatic `createdAt` and `updatedAt` tracking
- **Entry-Based Structure**: Both income and expenses use nested entries arrays
- **Tag System**: Expenses support categorization as need/want/neutral
- **Referential Integrity**: userId links across collections (string reference to User.\_id)

## 🚀 Potential New Features

- Budget planning & alerts with progress tracking
- Split transactions across categories
- Multi-currency support with conversion
- Savings goals tracker
- Bill reminders & due dates
- Advanced date range filters
- Enhanced visualizations (trends, heatmaps, comparisons)
- Year-over-year comparison charts
- Tax planning & reports
- Attach receipts to transactions
- Custom expense categories
- Dashboard customization
- Keyboard shortcuts
- Bulk operations
- Undo/Redo functionality
- Investment tracking
- Bank integration & auto-import
- Shared/Family accounts
- Mobile app (iOS/Android)
- Voice input for expenses
- Expense calendar view
- Offline PWA support
- Financial health score
- Data backup & restore
- API & webhooks
- Smart notifications
- Gamification (achievements, streaks)

## 🤖 AI-Powered Financial Insights

### Overview

The expense tracker now includes AI-powered financial insights using Google's Gemini 1.5 Flash model. Get personalized analysis, actionable recommendations, and predictive insights based on your financial data.

### Features

**Dashboard Overview Insights:**

- Financial health score (0-100) based on savings rate and expense control
- Overall financial summary and trend analysis
- Key insights covering spending patterns, budget optimization, and financial health
- Forward-looking predictions and recommendations
- Visual categorization by severity (info, warning, success, critical)

**Monthly Analytics Insights:**

- Detailed month-specific analysis
- Month-over-month comparison with previous periods
- Category-wise spending breakdown
- Need/Want/Neutral expense analysis
- Actionable recommendations tailored to the month
- Visual indicators for spending increases/decreases

### Technical Implementation

**Caching Strategy:**

- Insights are cached in MongoDB for 24 hours
- Automatic cache invalidation on any data mutation (add/edit/delete)
- Reduces API costs and provides instant load times for cached results
- Per-user and per-month granular caching

**Cache Invalidation:**

- Creating a new period clears overview cache
- Adding/editing/deleting income entries clears both month and overview cache
- Adding/editing/deleting expense entries clears both month and overview cache
- Manual refresh button to regenerate insights on-demand

**Cost Optimization:**

- Uses Gemini 1.5 Flash (Free tier: 15 requests/minute, 1M requests/day)
- Estimated cost: FREE for most users (within free tier limits)
- Smart prompting reduces token usage
- Structured JSON responses for efficient parsing

**Performance:**

- Cached insights: <100ms load time
- Fresh generation: 2-4 seconds
- Background processing with loading states
- Error handling with fallback messages

### Configuration

1. **Get Gemini API Key:**

   - Sign up at [Google AI Studio](https://aistudio.google.com/)
   - Click "Get API key" in the top navigation
   - Create a new API key for your project
   - Add to server `.env` file:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     GEMINI_MODEL=gemini-1.5-flash-latest
     ```

2. **Model Selection:**
   - Default: `gemini-1.5-flash-latest` (recommended - fast & free)
   - Alternative: `gemini-1.5-pro-latest` (more capable)
   - Alternative: `gemini-pro` (stable version)
   - Can be changed via `GEMINI_MODEL` environment variable

### Usage

1. **Enable Insights:**

   - Add your Gemini API key to server `.env`
   - Restart the server
   - Insights will automatically appear on Dashboard and Month Detail pages

2. **View Dashboard Insights:**

   - Navigate to Dashboard
   - Scroll to "AI Financial Insights" card
   - Review health score, key insights, and predictions
   - Click "Refresh" to regenerate

3. **View Monthly Insights:**

   - Open any month detail page
   - Click "AI Insights" tab
   - Review month summary, comparisons, and recommendations
   - Click "Refresh" to regenerate

4. **Best Practices:**
   - Add at least 2-3 months of data for better analysis
   - Include detailed notes on transactions for context-aware insights
   - Use Need/Want/Neutral tags for more accurate spending insights
   - Review recommendations and take actionable steps

### Architecture

```
User Action (Add/Edit/Delete) → Backend Route → Update Database
                                       ↓
                                Clear Cache (InsightsService)
                                       ↓
                              (Invalidates stale insights)

User Views Dashboard/Month → Frontend Component → API Call
                                       ↓
                              InsightsService checks cache
                                       ↓
                         Cache Hit → Return cached insights
                         Cache Miss → Gemini API call → Cache result → Return insights
```

### API Endpoints

- `GET /api/insights/overview?userId={id}` - Get dashboard overview insights
- `GET /api/insights/month/:monthId?userId={id}` - Get monthly insights
- `POST /api/insights/regenerate/overview` - Force regenerate overview
- `POST /api/insights/regenerate/month/:monthId` - Force regenerate monthly

### Security

- API key stored server-side only (never exposed to client)
- User-specific insights (isolated data per user)
- Free tier rate limiting via Google's quotas
- Error handling prevents crashes on API failures

## 💡 Contributing

This is a personal project, but contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs**: Open an issue with detailed reproduction steps
- 💡 **Suggest features**: Share your ideas in the issues section
- 🔧 **Submit PRs**: Fork the repo and submit pull requests
- 📖 **Improve docs**: Help improve documentation and examples
- 🎨 **Design improvements**: Suggest UI/UX enhancements

### Development Guidelines

1. Follow the existing code style and conventions
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation for new features
5. Keep PRs focused on a single feature/fix

### Setting Up for Development

```bash
# Fork and clone the repository
git clone <your-fork-url>
cd expense-tracker-dashboard

# Install dependencies
yarn install

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
yarn dev

# Commit and push
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

## 📝 License

MIT License

Copyright (c) 2025 Alok Raj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Radix UI** - For accessible component primitives
- **Chart.js** - For powerful data visualizations
- **Lucide** - For the clean icon set
- **TailwindCSS** - For the utility-first CSS framework

---

## 📧 Contact

For questions, suggestions, or feedback:

- GitHub Issues: [Create an issue](../../issues)
- Project Link: [Expense Tracker Dashboard](../../)

---

**Built with ❤️ by Alok Raj**
