import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Weather from '@/app/weather/page'

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn()
}

Object.defineProperty(global, 'navigator', {
  value: {
    ...global.navigator,
    geolocation: mockGeolocation
  },
  configurable: true,
  writable: true
})

// Mock fetch for weather API calls
global.fetch = jest.fn()

jest.setTimeout(30000)

describe('Weather Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders loading state initially', () => {
    render(<Weather />)
    expect(screen.getByText('मौसम की जानकारी लोड हो रही है...')).toBeInTheDocument()
  })

  it('renders weather interface and information cards after loading', async () => {
    render(<Weather />)
    await waitFor(() => {
      expect(screen.getByText('मौसम की जानकारी')).toBeInTheDocument()
    }, { timeout: 10000 })
    
    expect(screen.getByText(/आपके क्षेत्र का विस्तृत मौसम पूर्वानुमान और कृषि सलाह/)).toBeInTheDocument()
    expect(screen.getByText('स्थान')).toBeInTheDocument()
    expect(screen.getByText('7 दिन का विस्तृत मौसम पूर्वानुमान')).toBeInTheDocument()
    expect(screen.getByText(/मौसम आधारित कृषि सलाह/)).toBeInTheDocument()
    expect(screen.getAllByText(/नमी:/)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/हवा:/)[0]).toBeInTheDocument()
    expect(screen.getByText('मौसम चेतावनी')).toBeInTheDocument()
    expect(screen.getByText('कृषि सुझाव')).toBeInTheDocument()
  }, 20000)

  it('handles location access and errors', async () => {
    // Test Success
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success({
        coords: { latitude: 28.6139, longitude: 77.2090 }
      })
    })

    render(<Weather />)
    const locationButton = await screen.findByRole('button', { name: /स्थान/i }, { timeout: 10000 })
    await waitFor(() => expect(locationButton).not.toBeDisabled(), { timeout: 10000 })
    
    fireEvent.click(locationButton)
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled()

    // Wait for loading to finish after the first click re-enables the button
    await waitFor(() => expect(locationButton).not.toBeDisabled(), { timeout: 10000 })

    // Test Error
    mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) => {
      error({ code: 1, message: 'Denied' })
    })
    
    fireEvent.click(locationButton)
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(2)
  }, 20000)
})
