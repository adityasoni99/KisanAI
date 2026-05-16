import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MarketPrices from '@/app/market-prices/page'

describe('Market Prices Page', () => {
  it('renders market prices interface', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText('बाजार भाव')).toBeInTheDocument()
    expect(screen.getByText(/आज के ताजे मंडी भाव/)).toBeInTheDocument()
  })

  it('shows search and filter options', () => {
    render(<MarketPrices />)
    
    expect(screen.getByPlaceholderText('फसल का नाम खोजें...')).toBeInTheDocument()
    expect(screen.getByText('फिल्टर')).toBeInTheDocument()
    expect(screen.getByText('मंडी चुनें')).toBeInTheDocument()
  })

  it('displays crop price cards', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText('आज के मंडी भाव')).toBeInTheDocument()
    expect(screen.getAllByText('गेहूं')[0]).toBeInTheDocument()
    expect(screen.getAllByText('चावल')[0]).toBeInTheDocument()
    expect(screen.getAllByText('सोयाबीन')[0]).toBeInTheDocument()
  })

  it('shows market trends with price changes', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText('+2.4%')).toBeInTheDocument()
    expect(screen.getByText('-2.4%')).toBeInTheDocument()
    expect(screen.getByText('+2.7%')).toBeInTheDocument()
  })

  it('shows nearby markets section', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText('नजदीकी मंडियां')).toBeInTheDocument()
    expect(screen.getAllByText('दिल्ली मंडी')[0]).toBeInTheDocument()
  })

  it('displays price alerts section', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText('मूल्य अलर्ट')).toBeInTheDocument()
    expect(screen.getByText('नया अलर्ट सेट करें')).toBeInTheDocument()
  })

  it('handles search functionality', () => {
    render(<MarketPrices />)
    
    const searchInput = screen.getByPlaceholderText('फसल का नाम खोजें...')
    fireEvent.change(searchInput, { target: { value: 'गेहूं' } })
    expect(searchInput).toHaveValue('गेहूं')
  })

  it('shows disclaimer information', () => {
    render(<MarketPrices />)
    
    expect(screen.getByText(/भाव की जानकारी APMC डेटा पर आधारित है/)).toBeInTheDocument()
  })
})
