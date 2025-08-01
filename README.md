# Junior Angular Developer Test Task

## Description

This is a small Angular application designed to manage a list of employees. It includes the use of **Reactive Forms**, **RxJS operators**, and **Angular best practices**. The app allows adding, editing, deleting, searching, and sorting employee records, and includes custom templates and mobile-responsive styling.

## Tech Stack

- Angular 16+
- Angular Material
- TypeScript
- Reactive Forms
- RxJS
- SCSS (Flexbox)
- Standalone Components

## Features

### 1. **Employee Form**

- Reactive form with fields:
  - Full Name (required, min 3 characters)
  - Email (required, valid format)
  - Position (dropdown: Developer, Designer, QA, Manager)
  - Start Date (required, date input or picker)
  - Skills (FormArray with skill + years of experience)
- Dynamic add/remove skills
- Real-time form validation with error messages and visual feedback

### 2. **Employee List**

- Displays employee data using cards or a table
- Edit/Delete employee entries
- Sortable by:
  - Full Name (asc/desc)
  - Start Date
  - Number of Skills

### 3. **Search Filter**

- Live search by full name or email
- Debounced, distinct search using RxJS (`debounceTime`, `distinctUntilChanged`, `map`, `filter`)

### 4. **Custom Card Template**

- Support for both default and custom card templates
- Reusable component logic for custom views

## Styling

- Mobile-responsive layout (min width: 320px)
- Visual feedback for inputs (hover, focus, errors)
- Clean layout with Flexbox or Grid

## Additional Features

- Employees are managed in a local array or service
- Unique ID assignment for each employee
- Proper use of TypeScript interfaces
- Modular component structure:
  - `employee-form`
  - `employee-list`
  - `employee-card` (optional)

## Bonus

- LocalStorage persistence

## Getting Started

### Prerequisites

- Node.js (v14+)
- Angular CLI (`npm install -g @angular/cli`)

### Setup Instructions

1. Clone the repository or download the ZIP
2. Navigate to the project directory:
   ```bash
   cd managewise
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
```bash
   ng serve
```

5. Open your browser and go to:
```
http://localhost:4200
```

## Notes

- The app uses Reactive Forms for nested form control structures
- RxJS is used to implement an efficient and debounced search filter
- Custom templates allow flexibility in how employee data is displayed
- The code is modular, cleanly organized, and adheres to Angular best practices
