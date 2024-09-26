import { CSSProperties, useContext, useEffect, useState } from "react";
import DropdownField from "../app/DropdownField";
import { DropdownOption } from "../app/DropdownAddition";
import { processTranslations } from "../../helpers/TranslationService";
import { useTranslation } from "react-i18next";
import FeatureService from "../../helpers/FeatureService";
import AuthContext from "../auth/AuthenticationContext";

interface FeatureParameterModel {
    id: string;
    value: string;
}

interface FeatureModel {
    id: string;
    parameters: FeatureParameterModel[];
}

interface BedroomModel {
    beds: BedModel[];
}

interface BedModel {
    type: string;
    size: number;
}

interface ImageModel {
    id: string;
    src: string;
}

interface Housing {
    name: string;
    pricePerNight: number;
    cleaningFee: number;
    categoryProperty: string;
    oneLineDescription: string;
    shortDescription: string;
    description: string;
    locationPlace: string;
    locationCountry: string;
    locationCoords: string;
    maxGuests: number;
    bathrooms: number;
    categoryId: string;
    features: FeatureModel[];
    availabilities: Date[];
    bedrooms: BedroomModel[];
    images: ImageModel[];
}

export default function AdminHousing() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState } = authContext;

    const { t } = useTranslation();
    const [housing, setHousing] = useState<Housing>({
        name: '',
        pricePerNight: 0,
        cleaningFee: 0,
        categoryProperty: '',
        oneLineDescription: '',
        shortDescription: '',
        description: '',
        locationPlace: '',
        locationCountry: '',
        locationCoords: '',
        maxGuests: 0,
        bathrooms: 0,
        categoryId: '',
        features: [],
        availabilities: [],
        bedrooms: [],
        images: []
    });

    const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([]);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/c/get";

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
                    const categories = data.categories as Category[];
                    categories.forEach(c => processTranslations(c.categoryTranslations));

                    setCategoryOptions(categories.map((category) => {
                        return { display: t(category.nameKey), value: category.id } as DropdownOption;
                    }))
                }
            }
            catch (error) {
                console.error(error);
            }
        }

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
                    const featrs = data.features as Feature[];
                    
                    featrs.forEach(f => {
                        processTranslations(f.translations);
                        if(f.parameters) {
                            f.parameters.forEach(p => processTranslations(p.translations));
                        }
                    });
                    setFeatures(featrs);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        

        fetchCategories();
        fetchFeatures();
    }, []);

    const handleCategoryChange = (value: string) => {
        setHousing({...housing, categoryId: value});
    }

    const handleFeaturesChange = (value: Feature) => {
        const updatedHousing = { ...housing };
        const featureIndex = updatedHousing.features.findIndex(f => f.id === value.id);
    
        // If feature already exists, remove it
        if (featureIndex !== -1) {
            updatedHousing.features.splice(featureIndex, 1);
            setHousing(updatedHousing);
            return;
        }
    
        // Add new feature if not found
        const newFeature: FeatureModel = { id: value.id || '', parameters: [] };
        
        if (value.parameters) {
            newFeature.parameters = value.parameters.map(p => ({
                id: p.id,
                value: '' // Default value
            }));
        }
    
        updatedHousing.features.push(newFeature);
        setHousing(updatedHousing);
    };    

    const handleParamChange = (feature: Feature, param: Parameter, value: string) => {
        const updatedHousing = { ...housing };
        const target = updatedHousing.features.find(f => f.id === feature.id);
    
        if (target) {
            const targetParameter = target.parameters.find(p => p.id === param.id);
    
            if (targetParameter) {
                targetParameter.value = value;
            }
        }
    
        console.log(updatedHousing);
        setHousing(updatedHousing);
    };

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/f/safe-image";

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authState.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                const updatedHousing = { ...housing };
                updatedHousing.images.push({ id: data.image.id, src: data.image.src } as ImageModel)
                setHousing(updatedHousing);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleDateSelection = () => {
        const updatedHousing = { ...housing };
        updatedHousing.availabilities.push(selectedDate);
        setHousing(updatedHousing);
    }

    const handleBedroomAddition = () => {
        const updatedHousing = { ...housing };
        updatedHousing.bedrooms.push({ beds: [] } as BedroomModel)

        setHousing(updatedHousing);
    }

    const handleBedAddition = (index: number) => {
        const updatedHousing = { ...housing };
        const targetBedroom = updatedHousing.bedrooms[index];
        targetBedroom.beds.push({ type: '', size: 1 } as BedModel);

        setHousing(updatedHousing);
    }

    const handleBedTypeChange = (bedroomIndex: number, bedIndex: number, value: string) => {
        const updatedHousing = { ...housing };
        const targetBedroom = updatedHousing.bedrooms[bedroomIndex];
        const targetBed = targetBedroom.beds[bedIndex];
        targetBed.type = value;

        setHousing(updatedHousing);
    }

    const handleBedSizeChange = (bedroomIndex: number, bedIndex: number, value: number) => {
        const updatedHousing = { ...housing };
        const targetBedroom = updatedHousing.bedrooms[bedroomIndex];
        const targetBed = targetBedroom.beds[bedIndex];
        targetBed.size = value;

        setHousing(updatedHousing);
    }

    const handleHousingSave = async () => {
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/housing/create";
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(housing),
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                }
            })
            if (response.ok) {

            } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div style={{ minHeight: '100vh', backgroundColor: "#f6f6f6", padding: '20px 0'}}>
                <div style={{ padding: '104px 105px 0 105px' }}>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <input
                            placeholder="Name"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, name: e.target.value })} />

                        <input
                            placeholder="Price per night"
                            className="form-input"
                            type="number"
                            onChange={e => setHousing({ ...housing, pricePerNight: Number.parseFloat(e.target.value) })} />
                        <input
                            placeholder="Cleaning fee"
                            className="form-input"
                            type="number"
                            onChange={e => setHousing({ ...housing, cleaningFee: Number.parseFloat(e.target.value) })} />

                        <input
                            placeholder="Сategory property"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, categoryProperty: e.target.value })} />
                        <input
                            placeholder="One Line Description"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, oneLineDescription: e.target.value })} />
                        <input
                            placeholder="Short Description"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, shortDescription: e.target.value })} />
                        <textarea
                            placeholder="Description"
                            className="form-input"
                            rows={7}
                            cols={50}
                            onChange={e => setHousing({ ...housing, description: e.target.value })} />
                        <input
                            placeholder="Location Place"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, locationPlace: e.target.value })} />
                        <input
                            placeholder="Location Country"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, locationCountry: e.target.value })} />
                        <input
                            placeholder="Location Coords"
                            className="form-input"
                            onChange={e => setHousing({ ...housing, locationCoords: e.target.value })} />

                        <input
                            placeholder="Max Guests"
                            className="form-input"
                            type="number"
                            onChange={e => setHousing({ ...housing, maxGuests: Number.parseFloat(e.target.value) })} />
                        <input
                            placeholder="Bathrooms"
                            className="form-input"
                            type="number"
                            onChange={e => setHousing({ ...housing, bathrooms: Number.parseFloat(e.target.value) })} />
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <DropdownField 
                            label="Category"
                            onChange={handleCategoryChange}
                            options={categoryOptions}
                        />
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <ul style={{ padding: 0 }}>
                            {features.map((feature, index) => (
                                <li key={index} style={listItemStyle}>
                                    <div style={rowStyle}>
                                        <input type="checkbox" onChange={() => handleFeaturesChange(feature)} />
                                        {t(feature.nameCode)}
                                        <img src={feature.featureIcon ? FeatureService.getFeatureIcon(feature.featureIcon.src) : ''} />
                                    </div>
                                    {feature.parameters && (
                                        <div style={paramStyle}>
                                            {feature.parameters.map((param, index) => (
                                                <div key={index} style={rowStyle}>
                                                    <span>{t(param.nameKey)}</span>
                                                    <span>{param.parameterKey}</span>
                                                    <input onChange={e => handleParamChange(feature, param, e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <div style={rowStyle}>
                            <input type="date" onChange={e => setSelectedDate(new Date(e.target.value))} />
                            <button onClick={handleDateSelection}>Add date</button>
                        </div>
                        <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                            {housing.availabilities.map((item, index) => (
                                <div key={index}>{item.toISOString()}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <div style={rowStyle}>
                            <button onClick={handleBedroomAddition}>Add bedroom</button>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                            {housing.bedrooms.map((bedroom, brindex) => (
                                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }} key={brindex}>
                                    <div style={rowStyle}>
                                        {`Bedroom ${brindex}`}
                                        <button onClick={() => handleBedAddition(brindex)}>Add bed</button>
                                    </div>
                                    <ul style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                                        {bedroom.beds.map((bed, bdindex) => (
                                            <li style={rowStyle} key={bdindex}>
                                                {`Bed ${bdindex}`}
                                                <input 
                                                    placeholder="type" 
                                                    value={bed.type} 
                                                    onChange={e => handleBedTypeChange(brindex, bdindex, e.target.value)} />
                                                <input 
                                                    placeholder="size" 
                                                    type="number" 
                                                    value={bed.size}
                                                    onChange={e => handleBedSizeChange(brindex, bdindex, Number.parseInt(e.target.value))} />
                                            </li>    
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <div style={rowStyle}>
                            <input 
                                type="file"
                                onChange={e => setSelectedImage(e.target.files?.[0] || null)} />
                            <button onClick={() => selectedImage && handleFileUpload(selectedImage)}>Add image</button>
                        </div>
                        <ul style={{ padding: 0 }}>
                            {housing.images.map((img, index) => (
                                <li key={index} style={{ margin: '10px 0', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                                    <span>{img.id}</span>
                                    <a target="_blank" href={FeatureService.getFeatureIcon(img.src)}>
                                        {FeatureService.getFeatureIcon(img.src)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleHousingSave}>
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}

interface Translation {
    key: string;
    languageCode: string;
    text: string;
}

interface Category {
    id: string;
    nameKey: string;
    categoryPropertyDescriptionKey: string;
    isCategoryPropertyRequired: boolean;
    categoryTranslations: Translation[];
    categoryPropertyTranslations: Translation[];
}

interface FeatureIcon {
    id: string;
    src: string;
}

interface ParameterTranslation {
    key: string;
    languageCode: string;
    text: string;
}

interface Parameter {
    id: string;
    nameKey: string;
    parameterKey: string;
    defaultValue: string;
    translations: ParameterTranslation[];
}

interface Feature {
    id?: string;
    nameCode: string;
    descriptionCode?: string;
    typeCode: string;
    isAllowPinning: boolean;
    isRecommended: boolean;
    isAllowCustomName: boolean;
    isAllowCustomDescription: boolean;
    isHouseRule: boolean;
    isCounterFeature: boolean;
    counterFeatureTo?: string;
    isSafetyFeature: boolean;
    featureIcon?: FeatureIcon;
    translations: Translation[];
    parameters?: Parameter[];
}

const listItemStyle = { display: 'flex', flexDirection: 'column' } as CSSProperties;
const rowStyle = { display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' } as CSSProperties;
const paramStyle = { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' } as CSSProperties;