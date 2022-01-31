import { render, screen, fireEvent } from '@testing-library/react'
import { SubscribeButton } from '.'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

jest.mock("next-auth/react")

jest.mock("next/router")

describe("SubscribeButton component", () => {
    test('SubscribeButton renders correctly', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValue({ data: null, status: 'unauthenticated' })

        render(
            <SubscribeButton />
        )
    
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })

    test('SubscribeButton redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)

        render(
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)
    
        expect(signInMocked).toHaveBeenCalled()
    })

    test('SubscribeButton redirects to posts when user already has a subscription', () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({ data: { user: { name: 'Jhon Doe', email: 'jhon.doe@example.com' }, expires: 'fake-expires', activeSubscription: 'fake-active-subscription' }, status: 'authenticated' })

        const pushMock = jest.fn()

        const useRouterMocked = mocked(useRouter)
        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(
            <SubscribeButton />
        )

        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)
    
        expect(pushMock).toHaveBeenCalledWith("/posts")
    })
})
