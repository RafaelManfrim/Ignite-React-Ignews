import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async } from "."

test("It renders correctly", async () => {
    render(<Async />)

    expect(screen.getByText("Hello World")).toBeInTheDocument()
    // expect(await screen.findByText("Button", {}, { timeout: 3000 })).toBeInTheDocument()

    await waitFor(() => {
        return expect(screen.getByText("Button")).toBeInTheDocument()
    }, { timeout: 3000 })

    // waitForElementToBeRemoved() espera um elemento ser removido: usar com queryByText ou outros
})