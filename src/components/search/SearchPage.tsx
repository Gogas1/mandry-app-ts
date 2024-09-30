import SearchPanel, { Feature } from "./SearchPanel";

import loadingAnim from '../../assets/anim/loading2.gif';

import '../../styles/search/search-page.scss';
import ResultPanel from "./ResultPanel";
import { useContext, useEffect, useState } from "react";
import { Housing } from "../housing/HousingPage";
import { Category } from "./search-panel/Section2";
import { processTranslations } from "../../helpers/TranslationService";
// import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import AuthContext from "../auth/AuthenticationContext";
import { useSearchParams } from "react-router-dom";
import MapMarker from "./MapMarker";

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
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { t } = useTranslation();
    const { authState } = authContext;

    document.title = t("Titles.SearchPage");

    const [markers, setMarkers] = useState<{ id: number, housing: Housing, zIndex: number}[]>([]);
    const [focusedMarker, setFocusedMarker] = useState(-1);

    const [page, setPage] = useState(1);
    const [pageSize, ] = useState(6);
    const [pagesCount, setPagesCount] = useState(0);

    const [params, ] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [loadingHousings, setLoadingHousings] = useState(false);
    const [housings, setHousings] = useState<Housing[]>([]);
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [featuresList, setFeaturesList] = useState<Feature[]>([]);
    const [prices, setPrices] = useState<PricesRange>({ minPrice: 0, maxPrice: 0 });
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

    const filterHousings = async (settings: FilterSetting, pageNumber?: number, pageSizeNumber?: number) => {
        setLoadingHousings(true);
        const filtersSettings = convertToFilterSettings(settings);
        if(pageNumber) {
            filtersSettings.page = pageNumber;
        }
        else {
            filtersSettings.page = page;
        }

        if(pageSizeNumber) {
            filtersSettings.pageSize = pageSizeNumber;
        }
        else {
            filtersSettings.pageSize = pageSize;
        }

        const queryString = toQueryString(filtersSettings);
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/filter?${queryString}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();

                console.log(data);
                const housings = data.housings as Housing[];
                setPagesCount(data.totalPages);
                setHousings(housings);
                setMarkers(housings.map((item, index) => {
                    return { id: index, housing: item, zIndex: 1 } as { id: number, housing: Housing, zIndex: number};
                }));
            }
        }
        catch (error) {
            console.error(error);
        }

        setLoadingHousings(false);
    }

    useEffect(() => {
        const newFilterSettings = {
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
        } as FilterSetting;
        let newCategories: Category[] = [];
        let newFeatures: Feature[] = [];

        const fetchCategories = async () => {
            try {
                const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/c/get";

                const result = await fetch(url, {
                    method: "GET",
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (result.ok) {
                    const data = await result.json();
                    const categories = data.categories as Category[];

                    categories.forEach(category => {
                        if (category.categoryTranslations) {
                            processTranslations(category.categoryTranslations);
                        }
                        if (category.categoryPropertyTranslations) {
                            processTranslations(category.categoryPropertyTranslations);
                        }
                    });

                    newCategories = categories;
                    setCategoriesList(newCategories);
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
                if (response.ok) {
                    const data = await response.json();
                    const features = data.features as Feature[];

                    features.forEach(feature => {
                        if (feature.translations) {
                            processTranslations(feature.translations);
                        }
                    });

                    newFeatures = features;
                    setFeaturesList(newFeatures);
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
                if (response.ok) {
                    const data = await response.json();
                    const prices = data as PricesRange;

                    setPrices({ minPrice: prices.minPrice, maxPrice: prices.maxPrice });

                    newFilterSettings.priceRange = [prices.minPrice, prices.maxPrice];
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        const runAll = async () => {
            try {
                await Promise.all([fetchCategories(), fetchFeatures(), fetchPrices()])
                setLoading(false);
                newFilterSettings.destination = params.get('destination') ?? '';

                const queryCategory = params.get('category') ?? '';
                const targetCategory = newCategories.find(c => c.nameKey === queryCategory);
                if(targetCategory) {
                    newFilterSettings.category = targetCategory;
                }
                const queryFeature = params.get('feature') ?? '';
                const targetFeature = newFeatures.find(f => f.nameCode === queryFeature);
                if(targetFeature) {
                    newFilterSettings.features = [...newFilterSettings.features, targetFeature];
                }

                handleFilterChange(newFilterSettings);
                filterHousings(newFilterSettings, page, pageSize);
            } catch (error) {
                console.error(error);
            }
        }

        runAll();

        return () => console.log(1);
    }, []);

    const handleFilterChange = (filters: FilterSetting) => {
        setPage(1);
        setFilterSettings(filters);
    }

    const handleMouseOver = (id: number) => {
        setMarkers((prevMarkers) =>
            prevMarkers.map((marker) =>
                marker.id === id ? { ...marker, zIndex: 100 } : marker
            )
        );
    };

    const handleMouseOut = (id: number) => {
        if (focusedMarker !== id) {
            setMarkers((prevMarkers) =>
                prevMarkers.map((marker) =>
                    marker.id === id ? { ...marker, zIndex: 1 } : marker
                )
            );
        }
    };

    const handleMarkerFocus = (id: number) => {
        if(id === focusedMarker) {
            setFocusedMarker(-1);
        }
        else {
            setFocusedMarker(id);
        }
    }

    const handlePageSwitch = (pageNumber: number) => {
        setPage(pageNumber);
        filterHousings(filterSettings, pageNumber, pageSize);
    }

    return (
        <>
            <div className="search-page">
                <div className="search-page-content">
                    {loading ? (
                        <div className="loading-section">
                            <div>
                                <img src={loadingAnim} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="main-section">
                                <SearchPanel
                                    filters={filterSettings}
                                    features={featuresList}
                                    categories={categoriesList}
                                    priceRange={prices}
                                    searchHandler={filterHousings}
                                    filterChangeHandler={handleFilterChange} />
                                <ResultPanel 
                                    page={page}
                                    pages={pagesCount}
                                    housings={housings}
                                    housingsLoading={loadingHousings}
                                    pageSwitchHandler={handlePageSwitch} />
                            </div>
                            <div className="map-section">
                                <Map
                                    style={{ borderRadius: '15px' }}
                                    defaultCenter={housings.length > 0 ? getDefaultCenter(housings[0].locationCoords) : getDefaultCenter('')}
                                    defaultZoom={5}
                                    disableDefaultUI={true}
                                    mapId={'fcb21455b1eb3037'}
                                    >
                                    {markers.map((item, index) => {
                                        const normalized = normalizeCoordinateString(item.housing.locationCoords);

                                        if (normalized) {
                                            return ( 
                                                <AdvancedMarker 
                                                    key={index} 
                                                    position={normalized} 
                                                    onClick={() => handleMarkerFocus(item.id)}
                                                    className="marker-item"
                                                    zIndex={item.id === focusedMarker || item.zIndex !== 1 ? 100 : 1}
                                                    onMouseEnter={() => handleMouseOver(item.id)}
                                                    onMouseLeave={() => handleMouseOut(item.id)}>
                                                    <MapMarker housing={item.housing} focused={item.id === focusedMarker} />
                                                </AdvancedMarker>)
                                        } else {
                                            return null;
                                        }
                                    })}

                                </Map>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}

type Coordinate = {
    lat: number;
    lng: number;
};

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
    page?: number;
    pageSize?: number;
    languages?: string[];
}

const normalizeCoordinateString = (coordStr: string): Coordinate | null => {
    const [latStr, lngStr] = coordStr.split(',').map(part => part.trim());

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
    } else {
        return null;
    }
};

const getDefaultCenter = (coordStr: string): Coordinate => {
    const normalized = normalizeCoordinateString(coordStr);

    if (!normalized) return { lat: 50.45466, lng: 30.5238 };
    else {
        return normalized;
    }
}

export function convertToFilterSettings(original: FilterSetting): FilterSettings {
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

export function toQueryString(params: FilterSettings): string {
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
    if (params.featureIds) query.append('featureIds', JSON.stringify(params.featureIds));
    if (params.minPrice !== undefined) query.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) query.append('maxPrice', params.maxPrice.toString());
    if (params.languages) query.append('languages', JSON.stringify(params.languages));
    if (params.page) query.append('page', JSON.stringify(params.page));
    if (params.pageSize) query.append('pageSize', JSON.stringify(params.pageSize));

    return query.toString();
}