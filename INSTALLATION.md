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
│   │   │   ├── models/        # Data models
│   │   │   └── services/      # Services for data handling
│   │   ├── features/          # Feature modules
│   │   │   ├── analytics/     # Analytics feature
│   │   │   ├── auth/          # Authentication feature
│   │   │   ├── content-creation/ # Content creation feature
│   │   │   ├── dashboard/     # Dashboard feature
│   │   │   ├── onboarding/    # Onboarding feature
│   │   │   └── schedule/      # Schedule feature
│   │   ├── shared/            # Shared components and utilities
│   │   │   └── components/    # Reusable components
│   │   ├── app.component.*    # Root component
│   │   └── app.routes.ts      # Application routes
│   ├── assets/                # Static assets
│   │   └── styles/            # Global styles
│   │       └── responsive.css # Responsive design styles
│   ├── environments/          # Environment configurations
│   ├── index.html             # Main HTML file
│   └── main.ts                # Main entry point
├── angular.json               # Angular configuration
├── package.json               # Project dependencies
└── tsconfig.json              # TypeScript configuration
```

## Responsive Design

The application is designed to be responsive across three main device types:
- **Mobile**: Up to 576px
- **Tablet**: 577px to 991px
- **Laptop/Desktop**: 992px and above

The responsive styles are defined in `src/assets/styles/responsive.css` and are automatically applied to the application.

## Authentication

The application includes a demo authentication system. You can log in using the following credentials:

- **Email**: demo@example.com
- **Password**: password123

## Onboarding Tour

For first-time users, the application provides an interactive onboarding tour to guide them through the main features. This tour will automatically start when a user first visits the application.

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