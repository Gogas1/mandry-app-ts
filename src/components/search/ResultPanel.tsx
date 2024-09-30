import '../../styles/search/result-panel.scss';

import { Housing } from '../housing/HousingPage';
import { Category } from './search-panel/Section2';
import { useContext } from 'react';
import AuthContext from '../auth/AuthenticationContext';
import ResultItem from './ResultItem';

import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';
import arrowGreyIcon from '../../assets/icons/meta/arrow-grey.svg';
import loadingAnim from '../../assets/anim/loading2.gif';

export interface HousingResultItem {
    image: string;
    name: string;
    description: string;
    beds: number;
    price: string;
    discountPrice?: string;
    totalPrice: string;
    averageRating: string;
    category: Category;
    reviews: number;
}

interface ResultPanelProps {
    pages: number;
    page: number;
    housingsLoading: boolean;
    housings: Housing[];
    pageSwitchHandler: (page: number) => void;
}

export default function ResultPanel({ housings, pages, page, housingsLoading, pageSwitchHandler }: ResultPanelProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;

    const makeFavourite = async (id: string) => {
        if(authState.isAuthenticated) {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/favourites/make?housing=${id}`;

            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    const handleSwitchBack = () => {
        if(page > 1) {
            pageSwitchHandler(page - 1);
        }
    }

    const handleSwitchForward = () => {
        if(page < pages) {
            pageSwitchHandler(page + 1);
        }
    }

    return (
        <>
            <div className='result-section-container'>
                {housingsLoading && false ? (
                    <div className='housings-loading-indicator'>
                        <img src={loadingAnim} />
                    </div>
                ) : (
                    <section className="result-section">
                        {housings.map((housing, index) => (
                            <ResultItem housing={housing} makeFavouriteHandler={makeFavourite} key={index} />
                        ))}
                    </section>
                )}
                {pages > 0 && (
                    <div className='pagination-section'>
                        <button className={`arrow-button arrow-button--left ${page <= 1 ? 'disabled' : ''}`} onClick={handleSwitchBack}>
                            <img src={page > 1 ? arrowIcon : arrowGreyIcon} />
                        </button>
                        {getNearestPages(page, pages).map((pageNum, index) => (
                            <button key={index} className={`page-button ${pageNum === page ? 'active' : ''}`} onClick={() => pageSwitchHandler(pageNum)}>
                                {pageNum}
                            </button>
                        ))}
                        <button className={`arrow-button arrow-button--right ${page >= pages ? 'disabled' : ''}`} onClick={handleSwitchForward}>
                            <img src={page !== pages ? arrowIcon : arrowGreyIcon} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

function getNearestPages(page: number, pageCount: number): number[] {
    const maxPagesToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(pageCount, page + 2);
    
    // Adjust to always return 5 pages if possible
    if (end - start + 1 < maxPagesToShow) {
        if (start === 1) {
            end = Math.min(pageCount, start + maxPagesToShow - 1);
        } else if (end === pageCount) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }
    }
    
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    
    return result;
}
