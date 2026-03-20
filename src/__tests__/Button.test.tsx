// IMP-027: Marketing Website tests — Button component coverage
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-emerald');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button', { name: /secondary/i });
    expect(btn.className).toContain('bg-navy-dark');
  });

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button', { name: /outline/i });
    expect(btn.className).toContain('border');
  });

  it('renders large size', () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole('button', { name: /large/i });
    expect(btn.className).toContain('h-14');
  });

  it('renders small size', () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole('button', { name: /small/i });
    expect(btn.className).toContain('h-9');
  });

  it('passes through HTML attributes', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const btn = screen.getByRole('button', { name: /custom/i });
    expect(btn.className).toContain('custom-class');
  });
});
