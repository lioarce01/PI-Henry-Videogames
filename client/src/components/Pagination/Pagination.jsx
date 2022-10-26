import React from 'react'
import { useEffect } from 'react'
import './Pagination.css'

const Pagination = ({nextPage, prevPage, currentPage, gamesPerPage, allVideogames}) => {
  const lastPage = Math.ceil(allVideogames.length / gamesPerPage)
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
                ? <button className="pagination_btn_prev" onClick={() => prevPage(currentPage - 1)}>{'<'}</button>
                : <button className="btn_disabled" disabled>{'<'}</button>
            }
            {
              pageNumbers.map(number => {
                return (
                  <button
                    key={number}
                    className={currentPage === number ? 'pagination_btn_active' : 'pagination_btn'}
                    onClick={() => nextPage(number)}
                  >
                    {number}
                  </button>
                )
              })
            }

            {
              currentPage === Math.ceil(allVideogames / gamesPerPage) 
                ? <button className="btn_disabled" disabled>{'>'}</button>
                : <button className="pagination_btn_next" onClick={() => nextPage(currentPage + 1)}>{'>'}</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination