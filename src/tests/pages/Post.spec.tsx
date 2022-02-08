import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'

jest.mock("../../services/prismic")
jest.mock("next-auth/react")

const post = { slug: 'my-new-post', title: 'New post', content: '<p>Post content</p>', updatedAt: '10 de Abril' }

describe('Post page', () => {
    test("renders correctly", () => {
        render(<Post post={post} />)

        expect(screen.getByText("New post")).toBeInTheDocument()
        expect(screen.getByText("Post content")).toBeInTheDocument()
    })

    test("redirects user if no subscription is found", async () => {
        const getSessionMocked = mocked(getSession)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: null
        } as any)

        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any)

        expect(response).toEqual(expect.objectContaining({
            redirect: expect.objectContaining({
                destination: '/posts/preview/my-new-post'
            })
        }))
    })

    test("loads initial data", async () => {
        const getSessionMocked = mocked(getSession)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-subscription'
        } as any)

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

        const response = await getServerSideProps({
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