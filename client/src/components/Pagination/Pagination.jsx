import React from 'react'
import { useEffect } from 'react'
import './Pagination.css'

const Pagination = ({nextPage, prevPage, currentPage, gamesPerPage, allVideogames}) => {

    useEffect(() => { 
        window.scrollTo(0, 0)
    }, [currentPage])

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
    <div>
        <div className="pagination">
            <div className="pagination_container">
              <div className="pagination_btns">
                {
                    currentPage > 1
                    ? <button className="pagination_btn_prev" onClick={() => prevPage(currentPage - 1)}>Prev</button>
                    : <button className="btn_disabled" disabled>Prev</button>
                }
                <p className='info_pages'> Page {currentPage} of {Math.ceil(allVideogames / gamesPerPage)} </p>
                {
                    //si es la ultima pagina mostrar el boton de next deshabilitado con la clase btn_disabled
                    currentPage === Math.ceil(allVideogames / gamesPerPage) ?
                    <button className="btn_disabled" disabled>Next</button>
                    :
                    <button className="pagination_btn_next" onClick={() => nextPage(currentPage + 1)} disabled={currentPage === Math.ceil(allVideogames / gamesPerPage)}>Next</button>
                }
              </div>
            </div>
          </div>
    </div>
  )
}

export default Pagination