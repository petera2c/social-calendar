# Calendar App

A responsive, full-screen calendar application built with React and TypeScript, styled with Tailwind CSS, and featuring month navigation and year selection. The calendar displays a grid of days for the selected month, including days from the previous and next months to fill the grid, similar to Google Calendar's month view.

## Features

- **Full-Screen Layout**: Fills the viewport with a maximum width of 2000px.
- **Month Navigation**: Use Font Awesome icons (`<<` and `>>`) to move between months.
- **Year Selection**: Choose a year from a dropdown (±10 years from the current year) using Ant Design's `Select` component.
- **Complete Grid**: Displays 6 weeks (42 days), including days from the previous and next months to fill empty slots.
- **Responsive Design**: Adapts to screen sizes while maintaining a clean, boxed-day layout.
- **Highlighted Current Day**: The current day is marked with a blue circle and border.

## Tech Stack

- **React**: Frontend framework with TypeScript support.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Font Awesome**: Icons for navigation (`fa-angle-double-left` and `fa-angle-double-right`).
- **Day.js**: Lightweight library for date manipulation.
- **Ant Design**: `Select` component for year selection.
- **TypeScript**: Static typing for better code reliability.

## Project Structure
