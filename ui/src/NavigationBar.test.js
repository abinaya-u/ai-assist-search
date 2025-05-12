import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('NavigationBar Component', () => {
  test('renders the logo', () => {
    render(<NavigationBar />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders all navigation menu items', () => {
    render(<NavigationBar />);
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
    render(<NavigationBar />);
    const baseImage = screen.getByAltText(/logo/i); // Assuming the alt text for the base image is "logo"
    expect(baseImage).toBeInTheDocument();
  });

  test('renders AI Assist menu item with icon', () => {
    render(<NavigationBar />);
    const aiAssistMenuItem = screen.getByText(/AI Assist/i);
    expect(aiAssistMenuItem).toBeInTheDocument();
  });
});