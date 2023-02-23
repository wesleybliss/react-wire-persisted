import '../../setup'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from '../../../demo/src/components/App'

test('App renders', async () => {
    
    const { asFragment, getByTestId } = render(<App />)
    
    // Wait for categories to be fetched
    // console.info('Waiting for categories')
    await waitFor(() => screen.getByTestId('categories-list'), { timeout: 4000 })
    
    // Select a category
    const categoryList = getByTestId('categories-list')
    const category = categoryList.firstChild
    fireEvent.click(category)
    
    // Wait for people to be fetched
    // console.info('Waiting for people')
    await waitFor(() => screen.getByTestId('people-list'), { timeout: 4000 })
    
    const firstRender = asFragment()
    expect(firstRender).toMatchDiffSnapshot(asFragment())
    
})


/*
screen
=====================
getByLabelText
getByPlaceholderText
getByText
getByDisplayValue
getByAltText
getByTitle
getByRole
getByTestId

render
======================
container
baseElement
debug
unmount
rerender
asFragment
findAllByLabelText
findByLabelText
getAllByLabelText
getByLabelText
queryAllByLabelText
queryByLabelText
findAllByPlaceholderText
findByPlaceholderText
getAllByPlaceholderText
getByPlaceholderText
queryAllByPlaceholderText
queryByPlaceholderText
findAllByText
findByText
getAllByText
getByText
queryAllByText
queryByText
findAllByDisplayValue
findByDisplayValue
getAllByDisplayValue
getByDisplayValue
queryAllByDisplayValue
queryByDisplayValue
findAllByAltText
findByAltText
getAllByAltText
getByAltText
queryAllByAltText
queryByAltText
findAllByTitle
findByTitle
getAllByTitle
getByTitle
queryAllByTitle
queryByTitle
findAllByRole
findByRole
getAllByRole
getByRole
queryAllByRole
queryByRole
findAllByTestId
findByTestId
getAllByTestId
getByTestId
queryAllByTestId
queryByTestId

render full
=================

container
baseElement
debug
unmount
rerender
asFragment
findAllByLabelText
findByLabelText
getAllByLabelText
getByLabelText
queryAllByLabelText
queryByLabelText
findAllByPlaceholderText
findByPlaceholderText
getAllByPlaceholderText
getByPlaceholderText
queryAllByPlaceholderText
queryByPlaceholderText
findAllByText
findByText
getAllByText
getByText
queryAllByText
queryByText
findAllByDisplayValue
findByDisplayValue
getAllByDisplayValue
getByDisplayValue
queryAllByDisplayValue
queryByDisplayValue
findAllByAltText
findByAltText
getAllByAltText
getByAltText
queryAllByAltText
queryByAltText
findAllByTitle
findByTitle
getAllByTitle
getByTitle
queryAllByTitle
queryByTitle
findAllByRole
findByRole
getAllByRole
getByRole
queryAllByRole
queryByRole
findAllByTestId
findByTestId
getAllByTestId
getByTestId
queryAllByTestId
queryByTestId

*/
