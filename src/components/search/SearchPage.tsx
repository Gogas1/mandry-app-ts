import SearchPanel from "./SearchPanel";

import '../../styles/search/search-page.scss';
import ResultPanel from "./ResultPanel";
import { useState } from "react";
import { Housing } from "../housing/HousingPage";

export default function SearchPage() {
    const [housings, setHousings] = useState<Housing[]>([]);

    const searchHousings = async () => {
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/housing/all";

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if(response.ok) {
                const data = await response.json();
                setHousings(data.housings as Housing[]);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="search-page">
                <div className="search-page-content">
                    <div className="main-section">
                        <SearchPanel searchHandler={searchHousings} />
                        <ResultPanel housings={housings} />
                    </div>
                    <div className="map-section">

                    </div>
                </div>      
            </div>
        </>
    );
}