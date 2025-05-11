import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders all navigation menu items', () => {
    render(<App />);
    const menuItems = [
      'What we do',
      'Whom we work with',
      'Insights',
      'Careers',
      'Contact',
      'AI Assist',
    ];
    menuItems.forEach((item) => {
      const menuItem = screen.getByText(item);
      expect(menuItem).toBeInTheDocument();
    });
  });

  test('renders the base image', () => {
    render(<App />);
    const baseImage = screen.getByAltText(/logo/i); // Assuming the alt text for the base image is "logo"
    expect(baseImage).toBeInTheDocument();
  });

  test('renders AI Assist menu item with icon', () => {
    render(<App />);
    const aiAssistMenuItem = screen.getByText(/AI Assist/i);
    expect(aiAssistMenuItem).toBeInTheDocument();
  });
});