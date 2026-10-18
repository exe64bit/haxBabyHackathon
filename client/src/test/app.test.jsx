import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import App from '../App.jsx';
import { Nightlight } from '../components/Nightlight.jsx';
import { ThemeProvider, useTheme } from '../context/ThemeContext.jsx';

describe('Pip’s Midnight Observatory Frontend Components', () => {
  it('renders the main app and hero section', () => {
    render(<App />);
    expect(screen.getByText(/Small baby\./i)).toBeInTheDocument();
    expect(screen.getByText(/BIG DREAMS!/i)).toBeInTheDocument();
    expect(screen.getByText(/Pip’s Midnight Inventions/i)).toBeInTheDocument();
  });

  it('renders Pip character profile with traits', () => {
    render(<App />);
    expect(screen.getByText(/Meet Pip the Skull Baby/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Junior Dream Engineer/i).length).toBeGreaterThan(0);
  });

  it('toggles nightlight lantern on and off', () => {
    render(<Nightlight />);
    const button = screen.getByRole('button', { name: /Turn On Cozy Glow/i });
    expect(button).toBeInTheDocument();

    // Click to turn on
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Switch Lantern Off/i })).toBeInTheDocument();

    // Click to turn off
    fireEvent.click(screen.getByRole('button', { name: /Switch Lantern Off/i }));
    expect(screen.getByRole('button', { name: /Turn On Cozy Glow/i })).toBeInTheDocument();
  });

  it('provides theme switching between day and night mode', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <span data-testid="current-theme">{theme}</span>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('current-theme');
    const initialTheme = themeSpan.textContent;
    const button = screen.getByRole('button', { name: /Toggle/i });

    fireEvent.click(button);
    expect(themeSpan.textContent).not.toBe(initialTheme);
  });
});
