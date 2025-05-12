import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AIPromptDialog from './AIAssistDialog';

describe('AIPromptDialog Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dialog with title and input field', () => {
    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter your question')).toBeInTheDocument();
    expect(screen.getByText('Ask')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('closes the dialog when the Close button is clicked', () => {
    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('disables the Ask button when input is empty', () => {
    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const askButton = screen.getByText('Ask');
    expect(askButton).toBeDisabled();
  });

  test('enables the Ask button when input is provided', () => {
    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const inputField = screen.getByLabelText('Enter your question');
    fireEvent.change(inputField, { target: { value: 'What is AI?' } });

    const askButton = screen.getByText('Ask');
    expect(askButton).not.toBeDisabled();
  });

  test('shows loading indicator when Ask button is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ answer: 'Artificial Intelligence' }),
      }),
    );

    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const inputField = screen.getByLabelText('Enter your question');
    fireEvent.change(inputField, { target: { value: 'What is AI?' } });

    const askButton = screen.getByText('Ask');
    fireEvent.click(askButton);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
  });

  test('displays the response after fetching', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ answer: 'Artificial Intelligence' }),
      }),
    );

    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const inputField = screen.getByLabelText('Enter your question');
    fireEvent.change(inputField, { target: { value: 'What is AI?' } });

    const askButton = screen.getByText('Ask');
    fireEvent.click(askButton);

    await waitFor(() => expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument());
  });

  test('handles API error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API error')));

    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    const inputField = screen.getByLabelText('Enter your question');
    fireEvent.change(inputField, { target: { value: 'What is AI?' } });

    const askButton = screen.getByText('Ask');
    fireEvent.click(askButton);

    await waitFor(() => expect(screen.getByText('Error: API error')).toBeInTheDocument());
  });

  test('renders history from sessionStorage', () => {
    const mockHistory = [
      { prompt: 'What is AI?', response: 'Artificial Intelligence' },
      { prompt: 'What is React?', response: 'A JavaScript library' },
    ];
    sessionStorage.setItem('ai-assist-history', JSON.stringify(mockHistory));

    render(<AIPromptDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library')).toBeInTheDocument();
  });
});
