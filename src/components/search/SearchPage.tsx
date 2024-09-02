import SearchPanel from "./SearchPanel";

import '../../styles/search/search-page.scss';
import ResultPanel from "./ResultPanel";

export default function SearchPage() {
    return (
        <>
            <div className="search-page">
                <div className="search-page-content">
                    <div className="main-section">
                        <SearchPanel />
                        <ResultPanel />
                    </div>
                    <div className="map-section">

                    </div>
                </div>      
            </div>
        </>
    );
}