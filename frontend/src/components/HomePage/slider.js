window.onload = () => {
    const listings = Array.from(document.getElementsByClassName('options-btn1'))

    // loop through listings
    listings.forEach(listing => handleSlider(listing));
}

// define function to handle slider
const handleSlider = listing => {
    const selected = listing.getElementsByClassName('selected1')[0]
    const uno = listing.getElementsByClassName('uno')[0]
    const due = listing.getElementsByClassName('due')[0]
    const tre = listing.getElementsByClassName('tre')[0]
    const quattro = listing.getElementsByClassName('quattro')[0]

    if (!uno || !due || !tre || !quattro) {
        console.log(listing);
        return;
    }

    uno.addEventListener('click', e => {
        // prevent default button behaviour
        e.preventDefault()

        handleClassChange('uno')


    })

    due.addEventListener('click', e => {
        e.preventDefault()

        handleClassChange('due')


    })

    tre.addEventListener('click', e => {
        e.preventDefault()

        handleClassChange('tre')


    })

    quattro.addEventListener('click', e => {
        e.preventDefault()

        handleClassChange('quattro')


    })

    const handleClassChange = direction => {
        if (direction === 'uno') {
            selected.classList.remove('darker1')
            uno.classList.add('darker1')
        } else if (direction === 'due') {
            selected.classList.remove('darker1')
            due.classList.add('darker1')
        } else if (direction === 'tre') {
            selected.classList.remove('darker1')
            tre.classList.add('darker1')
        } else if (direction === 'quattro') {
            selected.classList.remove('darker1')
            quattro.classList.add('darker1')
        }
    }
}
