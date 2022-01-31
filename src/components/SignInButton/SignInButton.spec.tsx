import { render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'

jest.mock("next-auth/react")

describe("SignInButton component", () => {
    test('SignInButton renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

        render(
            <SignInButton />
        )
    
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    test('SignInButton renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({ data: { user: { name: 'Jhon Doe', email: 'jhon.doe@example.com' }, expires: 'fake-expires' }, status: 'authenticated' })
        render(
            <SignInButton />
        )
    
        expect(screen.getByText('Jhon Doe')).toBeInTheDocument()
    })
})
