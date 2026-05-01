import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import FormPage from '../pages/FormPage'

vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        login: vi.fn(),
        user: { name: 'Test User', email: 'test@test.com' },
        token: 'fake-token'
    })
}))

vi.mock('../api/client', () => ({
    default: {
        post: vi.fn().mockResolvedValue({
            data: { token: 'fake-token', user: { name: 'Test User', email: 'test@test.com' } }
        }),
        get: vi.fn().mockResolvedValue({ data: [] })
    }
}))

// TEST 1 - Login form renders h1
describe('Login Page', () => {
    it('renders login form', () => {
        render(<BrowserRouter><Login /></BrowserRouter>)
        expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    })
})

// TEST 2 - Register form renders h1
describe('Register Page', () => {
    it('renders register form', () => {
        render(<BrowserRouter><Register /></BrowserRouter>)
        expect(screen.getByRole('heading', { name: /register/i })).toBeTruthy()
    })
})

// TEST 3 - Form page renders
describe('Form Page', () => {
    it('renders post creation form', () => {
        render(<BrowserRouter><FormPage /></BrowserRouter>)
        expect(screen.getByText(/publish post/i)).toBeTruthy()
    })
})

// TEST 4 - Form page has media type selector
describe('Form Page Media Type', () => {
    it('has TEXT IMAGE MUSIC options', () => {
        render(<BrowserRouter><FormPage /></BrowserRouter>)
        expect(screen.getByRole('option', { name: /text/i })).toBeTruthy()
        expect(screen.getByRole('option', { name: /image/i })).toBeTruthy()
        expect(screen.getByRole('option', { name: /music/i })).toBeTruthy()
    })
})

// TEST 5 - Login shows error on failed submit
describe('Login Error', () => {
    it('shows error on failed login', async () => {
        const clientModule = await import('../api/client')
        clientModule.default.post.mockRejectedValueOnce(new Error('Login failed'))
        render(<BrowserRouter><Login /></BrowserRouter>)
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
        fireEvent.click(screen.getByRole('button', { name: /login/i }))
        await waitFor(() => {
            expect(screen.getByText(/login failed/i)).toBeTruthy()
        })
    })
})

// TEST 6 - Register shows error on failed submit
describe('Register Error', () => {
    it('shows error on failed registration', async () => {
        const clientModule = await import('../api/client')
        clientModule.default.post.mockRejectedValueOnce(new Error('Registration failed'))
        render(<BrowserRouter><Register /></BrowserRouter>)
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
        fireEvent.click(screen.getByRole('button', { name: /register/i }))
        await waitFor(() => {
            expect(screen.getByText(/registration failed/i)).toBeTruthy()
        })
    })
})