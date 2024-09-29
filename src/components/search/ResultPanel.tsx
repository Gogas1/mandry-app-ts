import '../../styles/search/result-panel.scss';

import { Housing } from '../housing/HousingPage';
import { Category } from './search-panel/Section2';
import { useContext } from 'react';
import AuthContext from '../auth/AuthenticationContext';
import ResultItem from './ResultItem';

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
    housings: Housing[]
}

export default function ResultPanel({ housings }: ResultPanelProps) {
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

    return (
        <section className="result-section">
            {housings.map((housing, index) => (
                <ResultItem housing={housing} makeFavouriteHandler={makeFavourite} key={index} />
            ))}
            
            
        </section>
    );
}