import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/layout/Header'

describe('Header Component', () => {
  it('renders header with logo and navigation', () => {
    render(<Header />)
    
    // Check if main elements are present
    expect(screen.getAllByText('KisanAI')[0]).toBeInTheDocument()
    expect(screen.getAllByText('आवाज सहायक')[0]).toBeInTheDocument()
    expect(screen.getAllByText('फसल विश्लेषण')[0]).toBeInTheDocument()
    expect(screen.getAllByText('मौसम')[0]).toBeInTheDocument()
    expect(screen.getAllByText('बाजार भाव')[0]).toBeInTheDocument()
    expect(screen.getAllByText('सरकारी योजनाएं')[0]).toBeInTheDocument()
    expect(screen.getAllByText('KCC आवेदन')[0]).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('displays logo with correct styling', () => {
    render(<Header />)
    
    const logo = screen.getAllByText('KisanAI')[0]
    expect(logo).toHaveClass('text-white')
    expect(logo).toHaveClass('font-bold')
  })

  it('renders mobile menu toggle button', () => {
    render(<Header />)
    
    // Check for mobile menu button (responsive behavior)
    const menuButtons = screen.getAllByRole('button')
    expect(menuButtons.length).toBeGreaterThan(0)
  })
})
