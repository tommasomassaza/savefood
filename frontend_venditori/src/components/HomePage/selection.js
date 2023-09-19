window.onload = () => {
    const listings = Array.from(document.getElementsByClassName('listings1'))

    // loop through listings
    listings.forEach(listing => handleSlider(listing))
}

// define function to handle slider
const handleSlider = listing => {
    const listingsGrid = listing.getElementsByClassName('listings-grid1')[0]
    const arrowLeft = listing.getElementsByClassName('left1')[0]
    const arrowRight = listing.getElementsByClassName('right1')[0]

    if (!listingsGrid || !arrowLeft || !arrowRight) {
        console.log(listing)
        return
    }

    arrowRight.addEventListener('click', e => {
        // prevent default button behaviour
        e.preventDefault()

        handleClassChange('right1')

        listingsGrid.scrollTo({
            left: listingsGrid.offsetWidth,
            behaviour: 'smooth',
        })
    })

    arrowLeft.addEventListener('click', e => {
        e.preventDefault()

        handleClassChange('left1')

        listingsGrid.scrollTo({
            left: 0,
            behaviour: 'smooth',
        })
    })

    const handleClassChange = direction => {
        if (direction === 'right1') {
            arrowRight.classList.remove('darker1')
            arrowLeft.classList.add('darker1')
        } else if (direction === 'left1') {
            arrowLeft.classList.remove('darker1')
            arrowRight.classList.add('darker1')
        }
    }
}