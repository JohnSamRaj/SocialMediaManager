# Social Media Manager - Installation Guide

This document provides step-by-step instructions for setting up and running the Social Media Manager application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.x or higher)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **Angular CLI** (v17.x or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd social-media-manager
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

## Dependencies Used

### Core Dependencies

| Package Name | Version | Description |
|--------------|---------|-------------|
| @angular/animations | ^17.0.0 | Angular animations library |
| @angular/common | ^17.0.0 | Angular common library |
| @angular/compiler | ^17.0.0 | Angular compiler |
| @angular/core | ^17.0.0 | Core Angular framework |
| @angular/forms | ^17.0.0 | Angular forms library |
| @angular/platform-browser | ^17.0.0 | Angular browser platform |
| @angular/platform-browser-dynamic | ^17.0.0 | Angular browser dynamic platform |
| @angular/router | ^17.0.0 | Angular router |
| chart.js | ^4.3.0 | JavaScript charting library for analytics |
| rxjs | ~7.8.0 | Reactive Extensions for JavaScript |
| tslib | ^2.3.0 | Runtime library for TypeScript |
| zone.js | ~0.14.2 | Zone.js implementation for Angular |

### Development Dependencies

| Package Name | Version | Description |
|--------------|---------|-------------|
| @angular-devkit/build-angular | ^17.0.0 | Angular build tools |
| @angular/cli | ^17.0.0 | Angular command line interface |
| @angular/compiler-cli | ^17.0.0 | Angular compiler CLI |
| @types/jasmine | ~4.3.0 | TypeScript definitions for Jasmine |
| jasmine-core | ~4.6.0 | Jasmine testing framework |
| karma | ~6.4.0 | Test runner for JavaScript |
| karma-chrome-launcher | ~3.2.0 | Chrome launcher for Karma |
| karma-coverage | ~2.2.0 | Test coverage for Karma |
| karma-jasmine | ~5.1.0 | Jasmine framework for Karma |
| karma-jasmine-html-reporter | ~2.1.0 | HTML reporter for Jasmine |
| typescript | ~5.2.2 | TypeScript language |

## Running the Application

To start the development server:

```bash
ng serve
```

This will start the application on `http://localhost:4200/`.

For production builds:

```bash
ng build --configuration production
```

## Project Structure

```
social-media-manager/
├── src/
│   ├── app/
│   │   ├── core/              # Core functionality, services, models
│   │   │   ├── auth/          # Authentication related code
│   │   │   │   ├── auth.guard.ts     # Route guard for protected routes
│   │   │   │   └── auth.service.ts   # Authentication service
│   │   │   ├── models/        # Data models
│   │   │   │   ├── analytics.model.ts # Analytics data models
│   │   │   │   ├── post.model.ts      # Post and content models
│   │   │   │   └── user.model.ts      # User models
│   │   │   └── services/      # Services for data handling
│   │   │       ├── ai.service.ts         # AI content generation service
│   │   │       ├── in-memory-db.service.ts # Mock database service
│   │   │       ├── instagram.service.ts   # Instagram API service
│   │   │       └── tour.service.ts       # Onboarding tour service
│   │   ├── features/          # Feature modules
│   │   │   ├── analytics/     # Analytics feature
│   │   │   │   ├── analytics.component.ts  # Analytics dashboard
│   │   │   │   ├── analytics.component.html
│   │   │   │   └── analytics.component.css
│   │   │   ├── auth/          # Authentication feature
│   │   │   │   ├── auth.component.ts       # Login/Register
│   │   │   │   ├── auth.component.html
│   │   │   │   └── auth.component.css
│   │   │   ├── content-creation/ # Content creation feature
│   │   │   │   ├── content-creation.component.ts
│   │   │   │   ├── content-creation.component.html
│   │   │   │   └── content-creation.component.css
│   │   │   ├── dashboard/     # Dashboard feature
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   ├── notifications/ # Notifications feature
│   │   │   │   ├── notifications.component.ts
│   │   │   │   ├── notifications.component.html
│   │   │   │   └── notifications.component.css
│   │   │   ├── onboarding/    # Onboarding feature
│   │   │   │   ├── onboarding.component.ts
│   │   │   │   ├── onboarding.component.html
│   │   │   │   └── onboarding.component.css
│   │   │   ├── schedule/      # Schedule feature
│   │   │   │   ├── schedule.component.ts
│   │   │   │   ├── schedule.component.html
│   │   │   │   └── schedule.component.css
│   │   │   └── settings/      # Settings feature
│   │   │       ├── settings.component.ts
│   │   │       ├── settings.component.html
│   │   │       └── settings.component.css
│   │   ├── shared/            # Shared components and utilities
│   │   │   └── components/    # Reusable components
│   │   │       └── tour/      # Tour component for onboarding
│   │   ├── app.component.*    # Root component
│   │   └── app.routes.ts      # Application routes
│   ├── assets/                # Static assets
│   │   ├── images/            # Image assets
│   │   └── styles/            # Global styles
│   │       ├── responsive.css # Responsive design styles
│   │       └── variables.css  # CSS variables and theme
│   ├── environments/          # Environment configurations
│   ├── index.html             # Main HTML file
│   └── main.ts                # Main entry point
├── angular.json               # Angular configuration
├── INSTALLATION.md            # Installation documentation
├── package.json               # Project dependencies
└── tsconfig.json              # TypeScript configuration
```

## Responsive Design

The application is designed to be fully responsive across multiple device sizes using the following breakpoints:

- **Extra small devices (phones)**: 600px and down
- **Small devices (portrait tablets and large phones)**: 600px to 767px
- **Medium devices (landscape tablets)**: 768px to 991px
- **Large devices (laptops/desktops)**: 992px to 1199px
- **Extra large devices (large laptops and desktops)**: 1200px and up

All responsive styles are implemented using the following media query format:

```css
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {...}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {...}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {...}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {...}
```

### Responsive Design Features

The responsive design includes:

1. **Dynamic Font Sizes**: Font sizes adjust automatically based on screen size
   - Base font size: 16px (desktop) down to 14px (mobile)
   - Heading sizes scale proportionally

2. **Chart Optimizations**: Charts and graphs are properly aligned on all devices
   - Mobile view: Full width charts with scrollable containers
   - Tablet view: Optimized 2-column layout
   - Desktop view: Full analytics dashboard experience

3. **Responsive Grid Layouts**: Grid layouts adjust columns based on available space
   - Mobile: Single column layout
   - Tablet: 2-column layout
   - Desktop: 3-4 column layout

4. **Touch-friendly Interactions**: Larger touch targets on mobile devices with appropriate spacing

5. **Responsive Navigation**: Collapsible sidebar on mobile with hamburger menu toggle

The responsive styles are defined in `src/assets/styles/responsive.css` and are automatically applied throughout the application.

## Authentication

The application includes a demo authentication system. You can log in using the following credentials:

- **Email**: demo@example.com
- **Password**: password123

## Application Features

### Dashboard
The dashboard provides an overview of your social media performance, including recent posts, engagement metrics, and follower growth statistics.

### Content Creation
The content creation feature allows you to create and edit posts, with AI-assisted caption and hashtag generation. You can upload media, add descriptions, and schedule posts for future publication.

### Analytics
The analytics dashboard offers detailed metrics on your social media performance, including:
- Audience growth over time
- Engagement rates and trends
- Content performance analysis
- Audience demographics

### Schedule
The schedule feature provides a calendar view of your planned content, allowing you to manage and visualize your content strategy across time.

### Notifications
The notifications page displays activity related to your posts and account, including likes, comments, mentions, and system notifications.

### Settings
The settings page allows you to configure application preferences, notification settings, security options, and connected accounts.

### Profile
The profile page lets you manage your personal information, profile picture, and connected social media accounts.

## Onboarding Tour

For first-time users, the application provides an interactive onboarding tour to guide them through all these main features. This tour will automatically start when a user first logs in for the first time.

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly:
   ```bash
   npm install
   ```

2. Clear the Angular cache:
   ```bash
   ng cache clean
   ```

3. If you have issues with the Angular CLI:
   ```bash
   npm uninstall -g @angular/cli
   npm cache clean --force
   npm install -g @angular/cli@latest
   ```

4. Restart your development server:
   ```bash
   ng serve
   ```

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [RxJS Documentation](https://rxjs.dev/guide/overview)