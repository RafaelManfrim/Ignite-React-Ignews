import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'

jest.mock("../../services/prismic")
jest.mock("next-auth/react")
jest.mock("next/router")

const post = { slug: 'my-new-post', title: 'New post', content: '<p>Post content</p>', updatedAt: '10 de Abril' }

describe('Post Preview page', () => {
    test("renders correctly", () => {
        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

        render(<Post post={post} />)

        expect(screen.getByText("New post")).toBeInTheDocument()
        expect(screen.getByText("Post content")).toBeInTheDocument()
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
    })

    test("redirects user to full post when user is subscribed", async () => {
        const useSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()
        
        useSessionMocked.mockReturnValueOnce({ data: { user: { name: 'fake-name' }, expires: 'fake-expires', activeSubscription: 'fake-subscription' }, status: 'authenticated'})

        useRouterMocked.mockReturnValueOnce({ push: pushMock } as any)

        render(<Post post={post} />)

        expect(pushMock).toHaveBeenCalledWith(`/posts/${post.slug}`)
    })

    test("loads initial data", async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new post' }
                    ],
                    content: [
                        { type: 'paragraph', text: 'Post content'}
                    ]
                },
                last_publication_date: '04-01-2021'
            })
        } as any)

        const response = await getStaticProps({
            params: { slug: 'my-new-post'}
        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post', 
                        title: "My new post",
                        content: '<p>Post content</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )

    })
})