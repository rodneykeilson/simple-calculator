# Scientific Calculator

A modern, responsive scientific calculator web application with a clean user interface and advanced mathematical functions. This project demonstrates a progressive enhancement approach, featuring both client-side and server-side calculation capabilities.

## Project Structure

- `index.html` - Main application interface
- `styles.css` - Styling for the calculator
- `script.js` - Client-side calculator logic with mathjs integration
- `server.js` - Node.js/Express server with calculation API
- `simple-calculator.js` - Legacy calculation module (retained for backward compatibility and reference implementation)
- `package.json` - Project configuration and dependencies
- `webpack.config.js` - Configuration for potential future bundling

## Features

### Core Calculation Engine
- **Dual Implementation**:
  - Client-side calculations using mathjs for immediate feedback
  - Server-side API for complex computations
  - Fallback to legacy calculation module when needed

### Mathematical Operations
- **Basic**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- **Scientific**:
  - Trigonometric functions (sin, cos, tan) with degree support
  - Square root (√) and power (^) operations
  - Logarithmic functions (log, ln)
  - Mathematical constants (π, e)
  - Parentheses for complex expressions

### User Experience
- **Responsive Design**: Works on all device sizes
- **Dark Theme**: Easy on the eyes with high contrast
- **Calculation History**: Track previous operations
- **Keyboard Support**: Full keyboard navigation
- **Animated UI**: Visual feedback for interactions

## Why Two JavaScript Files?

The project includes two main JavaScript files serving different purposes:

1. `script.js` - The modern implementation using mathjs for precise calculations and advanced mathematical functions. This is the primary calculator logic used in the application.

2. `simple-calculator.js` - A legacy calculation module that serves as:
   - A reference implementation of core calculations
   - A fallback mechanism if the primary mathjs library fails to load
   - A demonstration of different implementation approaches for educational purposes

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
- **Development Mode** (with auto-restart):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/calculate` - Evaluate mathematical expressions
  - Request body: `{ "expression": "2+2" }`
  - Response: `{ "success": true, "result": 4 }`

## Development

### Key Dependencies
- **Frontend**:
  - mathjs - Advanced math library
  - Font Awesome - Icons
  - Google Fonts - Typography

- **Backend**:
  - Express.js - Web server
  - nodemon - Development server with auto-restart

## Browser Support

This calculator is tested and works on all modern browsers including:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
