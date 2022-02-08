import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'

jest.mock("next/router")
jest.mock("next-auth/react", () => {
    return {
        useSession: () => [null, false]
    }
})
jest.mock("../../services/stripe")

describe('Home page', () => {
    test("renders correctly", () => {
        render(<Home product={{ amount: '$23,00'}} />)

        expect(screen.getByText('for $23,00 month')).toBeInTheDocument()
    })

    test("loads initial data", async () => {
        const retriveStripePricesMocked = mocked(stripe.prices.retrieve)
        retriveStripePricesMocked.mockResolvedValueOnce({
            unit_amount: 1000
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(expect.objectContaining({
            props: {
                product: {
                    amount: '$10.00'
                }
            }
        }))
    })
})