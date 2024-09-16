import SearchPanel, { Feature } from "./SearchPanel";

import '../../styles/search/search-page.scss';
import ResultPanel from "./ResultPanel";
import { useEffect, useState } from "react";
import { Housing } from "../housing/HousingPage";
import { Category } from "./search-panel/Section2";
import { processTranslations } from "../../helpers/TranslationService";
import i18n from "../../i18n";

export interface FilterSetting {
    destination: string;
    period?: { startDate: Date, endDate: Date };
    travelers: { adults: number, children: number, toddlers: number, pets: number };
    category?: Category;
    beds: number;
    bedrooms: number;
    bathrooms: number;
    features: Feature[];
    priceRange: number[];
    languages: string[];
}

export interface PricesRange {
    minPrice: number, 
    maxPrice: number
}

export default function SearchPage() {
    const [housings, setHousings] = useState<Housing[]>([]);
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [featuresList, setFeaturesList] = useState<Feature[]>([]);
    const [prices, setPrices] = useState<PricesRange>({ minPrice: 0, maxPrice: 0 });
    const [amountFound, setAmountFound] = useState(0);
    const [filterSettings, setFilterSettings] = useState<FilterSetting>({
        destination: "",
        period: undefined,
        travelers: { adults: 0, children: 0, toddlers: 0, pets: 0 },
        category: undefined,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
        features: [],
        priceRange: [0, 0],
        languages: []
    } as FilterSetting);

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

    const clearFilters = () => {
        setFilterSettings({
            destination: "",
            period: undefined,
            travelers: { adults: 0, children: 0, toddlers: 0, pets: 0 },
            category: undefined,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            features: [],
            priceRange: [0, 0],
            languages: []
        } as FilterSetting);
    }

    const filterHousings = async () => {
        const queryString = toQueryString(convertToFilterSettings(filterSettings));
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/filter?${queryString}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if(response.ok) {
                console.log('ok');

                const data = await response.json();
                setHousings(data.housings as Housing[]);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const filterHousingsCount = async (filters: FilterSetting) => {
        const queryString = toQueryString(convertToFilterSettings(filters));
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/filter?${queryString}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if(response.ok) {

                const data = await response.json();
                setAmountFound(data.housings.length);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/c/get";

                const result = await fetch(url, {
                    method: "GET",
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if(result.ok) {
                    const data = await result.json();
                    const categories = data.categories as Category[];

                    categories.forEach(category => {
                        if(category.categoryTranslations) {
                            processTranslations(category.categoryTranslations);
                        }
                        if(category.categoryPropertyTranslations) {
                            processTranslations(category.categoryPropertyTranslations);
                        }
                    });

                    setCategoriesList(categories);
                }
            }
            catch (error) {

            }            
        };

        const fetchFeatures = async () => {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/f/all";

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if(response.ok) {
                    const data = await response.json();
                    const features = data.features as Feature[];

                    features.forEach(feature => {
                        if(feature.translations) {
                            processTranslations(feature.translations);
                        }
                    });

                    setFeaturesList(features);
                }
            }
            catch (error) {
                console.error(error);
            }
        };

        const fetchPrices = async () => {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/housing/prices";

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if(response.ok) {
                    const data = await response.json();
                    const prices = data as PricesRange;

                    setPrices({ minPrice: prices.minPrice, maxPrice: prices.maxPrice });

                    const updatedFilterSettings = {...filterSettings}
                    updatedFilterSettings.priceRange = [prices.minPrice, prices.maxPrice];
                    setFilterSettings(updatedFilterSettings);
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
        fetchFeatures();
        fetchPrices();
        filterHousingsCount(filterSettings);
    }, [i18n.language]);

    const handleFilterChange = (filters: FilterSetting) => {
        filterHousingsCount(filters);
        setFilterSettings(filters);
    }

    return (
        <>
            <div className="search-page">
                <div className="search-page-content">
                    <div className="main-section">
                        <SearchPanel 
                            filters={filterSettings}
                            features={featuresList}
                            categories={categoriesList}
                            priceRange={prices}
                            amountFound={amountFound}
                            searchHandler={filterHousings}
                            clearFilterHandler={clearFilters}
                            filterChangeHandler={handleFilterChange} />
                        <ResultPanel housings={housings} />
                    </div>
                    <div className="map-section">

                    </div>
                </div>      
            </div>
        </>
    );
}

interface FilterSettings {
    destination?: string;
    startDate?: Date;
    endDate?: Date;
    adults?: number;
    children?: number;
    toddlers?: number;
    pets?: number;
    categoryId?: string;
    minBeds?: number;
    minBedrooms?: number;
    minBathrooms?: number;
    featureIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    languages?: string[];
}

function convertToFilterSettings(original: FilterSetting): FilterSettings {
    return {
        destination: original.destination || undefined,
        startDate: original.period?.startDate,
        endDate: original.period?.endDate,
        adults: original.travelers.adults,
        children: original.travelers.children,
        toddlers: original.travelers.toddlers,
        pets: original.travelers.pets,
        categoryId: original.category ? original.category.id : undefined,
        minBeds: original.beds,
        minBedrooms: original.bedrooms,
        minBathrooms: original.bathrooms,
        featureIds: original.features ? original.features.map(f => f.id) : undefined,
        minPrice: original.priceRange?.[0],   // Taking the first element of priceRange as minPrice
        maxPrice: original.priceRange?.[1],   // Taking the second element of priceRange as maxPrice
        languages: original.languages.length > 0 ? original.languages : undefined,
    };
}

function toQueryString(params: FilterSettings): string {
    const query = new URLSearchParams();

    if (params.destination) query.append('destination', params.destination);
    if (params.startDate) query.append('startDate', params.startDate.toISOString());
    if (params.endDate) query.append('endDate', params.endDate.toISOString());
    if (params.adults !== undefined) query.append('adults', params.adults.toString());
    if (params.children !== undefined) query.append('children', params.children.toString());
    if (params.toddlers !== undefined) query.append('toddlers', params.toddlers.toString());
    if (params.pets !== undefined) query.append('pets', params.pets.toString());
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.minBeds !== undefined) query.append('minBeds', params.minBeds.toString());
    if (params.minBedrooms !== undefined) query.append('minBedrooms', params.minBedrooms.toString());
    if (params.minBathrooms !== undefined) query.append('minBathrooms', params.minBathrooms.toString());
    // if (params.featureIds) query.append('featureIds', JSON.stringify(params.featureIds));
    if (params.minPrice !== undefined) query.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.append('maxPrice', params.maxPrice.toString());
    if (params.languages) query.append('languages', JSON.stringify(params.languages));

    return query.toString();
}