import { render } from '@testing-library/react'
import { NavLink } from '.'

jest.mock("next/router", () => {
    return {
        useRouter() {
            return {
                asPath: "/"
            }
        }
    }
})

describe("NavLink component", () => {
    test('Active link renders correctly', () => {
        const { getByText } = render(
            <NavLink url='/' title="Home" active={'styles_active__l7I1o'}/>
        )
    
        expect(getByText('Home')).toBeInTheDocument()
    })
    
    test('Active link is receaving active class', () => {
        const { getByText } = render(
            <NavLink url='/' title="Home" active={'styles_active__l7I1o'}/>
        )
    
        expect(getByText('Home')).toHaveClass('styles_active__l7I1o')
    })
    
    test('NavLink isn`t receaving active class if url !=== asPath', () => {
        const { getByText } = render(
            <NavLink url='/users' title="Users" active={'styles_active__l7I1o'}/>
        )
    
        expect(getByText('Users')).not.toHaveClass()
    })
})
