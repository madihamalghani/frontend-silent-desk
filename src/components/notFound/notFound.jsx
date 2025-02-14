import React from 'react'

function notFound() {
    return (
        <>
            <div className='container-notfound mb-3'>
                <img className="image-notfound" src='../src/assets/notfound.svg'/>
                <button className="button">
                <div className="button-content"><a class="link-decoration" href="/">Return To Home Page</a></div>
            </button>
            </div>

        </>
    )
}

export default notFound
