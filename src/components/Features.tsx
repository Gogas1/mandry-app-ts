import { FormEvent, useContext, useEffect, useState } from "react";
import "../styles/pages/features/features.scss"
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth/AuthenticationContext";

interface Translation {
    key: string;
    languageCode: string;
    text: string;
}

interface Feature {
    id: string;
    nameCode: string;
    descriptionCode: string;
    isAllowPinning: boolean;
    isRecommended: boolean;
    isAllowCustomName: boolean;
    isAllowCustomDescription: boolean;
    isHouseRule: boolean;
    translations: Translation[];
}

export default function Features() {
    const [features, setFeautres] = useState<Feature[]>([]);
    const [isFeaturesLoading, setIsFeaturesLoading] = useState(true);
    const [isFeaturesLoadingErrorOccured, setIsFeaturesLoadingErrorOccured] = useState(false);

    const navigate = useNavigate();
    const authContext  = useContext(AuthContext);

    const languages = ['ukr', 'en'];

    const [translations, setTranslations] = useState(
        languages.reduce((acc, lang) => {
            acc[lang] = { name: '', description: '' };
            return acc;
        }, {} as { [key: string]: { name: string; description: string } })
    );

    const [feature, setFeature] = useState<Feature>({
        id: '',
        nameCode: '',
        descriptionCode: '',
        isAllowPinning: false,
        isRecommended: false,
        isAllowCustomName: false,
        isAllowCustomDescription: false,
        isHouseRule: false,
        translations: []
      });    

    const handleTranslationInputChange = (lang: string, field: 'name' | 'description', value: string) => {
        setTranslations(prevTranslations => ({
            ...prevTranslations,
            [lang]: {
                ...prevTranslations[lang],
                [field]: value
            }
        }));
    };

    const packTranslations = () => {
        const packedTranslations: Translation[] = Object.keys(translations).flatMap(lang => [
          {
            key: feature.nameCode,
            languageCode: lang,
            text: translations[lang].name
          },
          {
            key: feature.descriptionCode,
            languageCode: lang,
            text: translations[lang].description
          }
        ]);
    
        setFeature(prevFeature => ({
          ...prevFeature,
          translations: packedTranslations
        }));

        console.log(translations);
        console.log(packedTranslations);
      };

    useEffect(() => {
        const fetchData = async () =>{
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
                    setFeautres(data.features as Feature[]);
                    setIsFeaturesLoading(false);
                }
            }
            catch (error) {
                console.error(error);
                setIsFeaturesLoading(false);
                setIsFeaturesLoadingErrorOccured(true);
            }
        }
        
        fetchData();
    }, []);

    const createFeatureHandle = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        packTranslations();

        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/f/create";

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(feature),
                headers: {
                    'Authorization': `Bearer ${authContext?.authState.token}`,
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
                }
            })
            if(response.ok) {
                navigate("/");
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
            } else if(response.status === 401) {
                console.log('Unauthenticated')
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="features-page">
                <div className="form">
                    <input 
                        placeholder="Name code" 
                        className="form-input" 
                        onChange={e => setFeature({ ...feature, nameCode: e.target.value })}/>
                    <input 
                        placeholder="Description code" 
                        className="form-input" 
                        onChange={e => setFeature({ ...feature, descriptionCode: e.target.value})}/>
                    <label className="container">Is allow pinning
                        <input 
                            type="checkbox" 
                            onChange={e => setFeature({ ...feature, isAllowPinning: e.target.checked})}/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Is recomended
                        <input 
                            type="checkbox"
                            onChange={e => setFeature({ ...feature, isRecommended: e.target.checked})} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Is allow custom name
                        <input 
                            type="checkbox"
                            onChange={e => setFeature({ ...feature, isAllowCustomName: e.target.checked})} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Is allow custom description
                        <input 
                            type="checkbox"
                            onChange={e => setFeature({ ...feature, isAllowCustomDescription: e.target.checked})} />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Is house rule
                        <input 
                            type="checkbox" 
                            onChange={e => setFeature({ ...feature, isHouseRule: e.target.checked})}/>
                        <span className="checkmark"></span>
                    </label>
                    <div className="translsations-creation">
                        {languages.map(lang => (
                            <div key={lang} className="translation-group">
                                <div>
                                    {lang.toUpperCase()}
                                </div>
                                <input 
                                    placeholder="Name translation"
                                    value={translations[lang]?.name || ''}
                                    onChange={e => handleTranslationInputChange(lang, 'name', e.target.value)} />
                                <input 
                                    placeholder="Description translation"
                                    value={translations[lang]?.description || ''}
                                    onChange={e => handleTranslationInputChange(lang, 'description', e.target.value)}/>
                            </div>
                        ))}
                    </div>
                    
                    <div className="button-group">
                        <button onClick={createFeatureHandle}>Create</button>
                    </div>
                </div>
                <hr />
                <div className="features">
                    {isFeaturesLoading ? (
                        <p>Loading...</p>
                    ) : isFeaturesLoadingErrorOccured ? (
                        <p>Error occurred while loading.</p>
                    ) : (
                        <>
                            <div className="features-header">
                                <div className="features-row">
                                    <div className="feature-table-cell">ID</div>
                                    <div className="feature-table-cell">Name Code</div>
                                    <div className="feature-table-cell">Description Code</div>
                                    <div className="feature-table-cell">Is Allow Pinning</div>
                                    <div className="feature-table-cell">Is Recommended</div>
                                    <div className="feature-table-cell">Is Allow Custom Name</div>
                                    <div className="feature-table-cell">Is Allow Custom Description</div>
                                    <div className="feature-table-cell">Is House Rule</div>
                                    <div className="feature-table-cell">Translations</div>
                                </div>
                            </div>
                            {features.map((item, index) => (
                                <div key={index} className="features-row">
                                    <div className="feature-table-cell">{item.id}</div>
                                    <div className="feature-table-cell">{item.nameCode}</div>
                                    <div className="feature-table-cell">{item.descriptionCode}</div>
                                    <div className="feature-table-cell">{item.isAllowPinning}</div>
                                    <div className="feature-table-cell">{item.isRecommended}</div>
                                    <div className="feature-table-cell">{item.isAllowCustomName}</div>
                                    <div className="feature-table-cell">{item.isAllowCustomDescription}</div>
                                    <div className="feature-table-cell">{item.isHouseRule}</div>
                                    <div className="feature-table-cell">
                                        <table className="translation-table">
                                            <thead>
                                                <tr className="translation-table-header">
                                                    <th className="translation-table-cell">Language Code</th>
                                                    <th className="translation-table-cell">Key</th>                                                    
                                                    <th className="translation-table-cell">Text</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.translations.map((translation, index) => (
                                                    <tr key={index} className="translation-table-row">        
                                                        <td className="translation-table-cell">{translation.languageCode}</td>
                                                        <td className="translation-table-cell">{translation.key}</td>
                                                        <td className="translation-table-cell">{translation.text}</td>
                                                    </tr>
                                                ))}
                                            </tbody>                                    
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </>
                        
                    )}
                </div>
            </div>            
        </>
    );
}