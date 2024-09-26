import { FormEvent, useContext, useEffect, useState } from "react";
import "../styles/pages/features/features.scss"
import { useNavigate } from "react-router-dom";
import AuthContext from "./auth/AuthenticationContext";
import i18n from "../i18n";
import FeatureService from "../helpers/FeatureService";

interface Translation {
    key: string;
    languageCode: string;
    text: string;
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

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [isFeaturesLoading, setIsFeaturesLoading] = useState(true);
    const [isFeaturesLoadingErrorOccured, setIsFeaturesLoadingErrorOccured] = useState(false);

    const navigate = useNavigate();
    const authContext  = useContext(AuthContext);

    const languages = i18n.languages;

    const [translations, setTranslations] = useState(
        languages.reduce((acc, lang) => {
            acc[lang] = { name: '', description: '', type: '' };
            return acc;
        }, {} as { [key: string]: { name: string; description: string; type: string } })
    );

    const [feature, setFeature] = useState<Feature>({
        nameCode: '',
        typeCode: '',
        isAllowPinning: false,
        isRecommended: false,
        isAllowCustomName: false,
        isAllowCustomDescription: false,
        isHouseRule: false,
        isCounterFeature: false,
        isSafetyFeature: false,
        translations: []
    });

    const [featureIconFile, setFeatureIconFile] = useState<File | null>(null);
    const [parameters, setParameters] = useState<Parameter[]>([]);

    const handleTranslationInputChange = (lang: string, field: 'name' | 'description' | 'type', value: string) => {
        setTranslations(prevTranslations => ({
            ...prevTranslations,
            [lang]: {
                ...prevTranslations[lang],
                [field]: value
            }
        }));
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
                    'Authorization': `Bearer ${authContext?.authState.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFeature(prevFeature => ({
                    ...prevFeature,
                    featureIcon: {  id: data.image.id, src: data.image.src }
                }));
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const packTranslations = () => {
        const packedTranslations: Translation[] = Object.keys(translations).flatMap(lang => [
            {
                key: feature.nameCode,
                languageCode: lang,
                text: translations[lang].name
            },
            {
                key: feature.descriptionCode || '',
                languageCode: lang,
                text: translations[lang].description
            },
            {
                key: feature.typeCode,
                languageCode: lang,
                text: translations[lang].type
            }
        ]);

        setFeature(prevFeature => ({
            ...prevFeature,
            translations: packedTranslations,
            parameters: parameters
        }));
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
                    setFeatures(data.features as Feature[]);
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

        if (featureIconFile) {
            await handleFileUpload(featureIconFile);
        }

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
            });

            if(response.ok) {
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGroups);
            } else if(response.status === 401) {
                console.log('Unauthenticated');
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleParameterChange = (index: number, field: keyof Parameter, value: string) => {
        setParameters(prevParams => {
            const updatedParams = [...prevParams];
            updatedParams[index] = { ...updatedParams[index], [field]: value };
            return updatedParams;
        });
    };

    const handleParameterTranslationChange = (paramIndex: number, lang: string, value: string) => {
        setParameters(prevParams => {
            const updatedParams = [...prevParams];
            const targetParam = updatedParams[paramIndex];
            const translations = targetParam.translations.map(t =>
                t.languageCode === lang ? { ...t, key: targetParam.nameKey, text: value } : t
            );
            updatedParams[paramIndex].translations = translations;
            return updatedParams;
        });
    };

    const addParameter = () => {
        setParameters(prevParams => [
            ...prevParams,
            {
                id: '',
                nameKey: '',
                parameterKey: '',
                defaultValue: '',
                translations: languages.map(lang => ({ key: '', languageCode: lang, text: '' }))
            }
        ]);
    };

    return (
        <>
            <div className="features-page">
                <div className="form">
                    <input 
                        placeholder="Name code" 
                        className="form-input" 
                        onChange={e => setFeature({ ...feature, nameCode: e.target.value })}/>
                    <input 
                        placeholder="Type code" 
                        className="form-input" 
                        onChange={e => setFeature({ ...feature, typeCode: e.target.value})}/>
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
                    <label className="container">Is recommended
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
                    <label className="container">Is counter feature
                        <input 
                            type="checkbox" 
                            onChange={e => setFeature({ ...feature, isCounterFeature: e.target.checked})}/>
                        <span className="checkmark"></span>
                    </label>
                    <input 
                        placeholder="Counter feature to" 
                        className="form-input" 
                        onChange={e => setFeature({ ...feature, counterFeatureTo: e.target.value })}/>
                    <label className="container">Is safety feature
                        <input 
                            type="checkbox" 
                            onChange={e => setFeature({ ...feature, isSafetyFeature: e.target.checked})}/>
                        <span className="checkmark"></span>
                    </label>
                    <div>
                        <input 
                            type="file"
                            onChange={e => setFeatureIconFile(e.target.files?.[0] || null)} />
                    </div>
                    <div className="translations-creation">
                        {languages.map(lang => (
                            <div key={lang} className="translation-group">
                                <div>{lang.toUpperCase()}</div>
                                <input 
                                    placeholder="Name translation"
                                    value={translations[lang]?.name || ''}
                                    onChange={e => handleTranslationInputChange(lang, 'name', e.target.value)} />
                                <input 
                                    placeholder="Description translation"
                                    value={translations[lang]?.description || ''}
                                    onChange={e => handleTranslationInputChange(lang, 'description', e.target.value)}/>
                                <input 
                                    placeholder="Type translation"
                                    value={translations[lang]?.type || ''}
                                    onChange={e => handleTranslationInputChange(lang, 'type', e.target.value)}/>
                            </div>
                        ))}
                    </div>

                    <div className="parameters-section">
                        <h3>Parameters</h3>
                        {parameters.map((param, index) => (
                            <div key={index} className="parameter-group">
                                <input
                                    placeholder="Parameter Name Key"
                                    value={param.nameKey}
                                    onChange={e => handleParameterChange(index, 'nameKey', e.target.value)}
                                />
                                <input
                                    placeholder="Parameter Key"
                                    value={param.parameterKey}
                                    onChange={e => handleParameterChange(index, 'parameterKey', e.target.value)}
                                />
                                <input
                                    placeholder="Default Value"
                                    value={param.defaultValue}
                                    onChange={e => handleParameterChange(index, 'defaultValue', e.target.value)}
                                />
                                <div className="parameter-translations">
                                    {languages.map(lang => (
                                        <div key={lang}>
                                            <strong>{lang.toUpperCase()}</strong>
                                            <input
                                                placeholder="Translation Text"
                                                value={param.translations.find(t => t.languageCode === lang)?.text || ''}
                                                onChange={e => handleParameterTranslationChange(index, lang, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button onClick={addParameter}>Add Parameter</button>
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
                                    <div className="feature-table-cell">Type Code</div>
                                    <div className="feature-table-cell">Description Code</div>
                                    <div className="feature-table-cell">Is Allow Pinning</div>
                                    <div className="feature-table-cell">Is Recommended</div>
                                    <div className="feature-table-cell">Is Allow Custom Name</div>
                                    <div className="feature-table-cell">Is Allow Custom Description</div>
                                    <div className="feature-table-cell">Is House Rule</div>
                                    <div className="feature-table-cell">Is Counter Feature</div>
                                    <div className="feature-table-cell">Is Safety Feature</div>
                                    <div className="feature-table-cell">Feature Icon</div>
                                    <div className="feature-table-cell">Parameters</div>
                                    <div className="feature-table-cell">Translations</div>
                                </div>
                            </div>
                            {features.map((item, index) => (
                                <div key={index} className="features-row">
                                    <div className="feature-table-cell">{item.id}</div>
                                    <div className="feature-table-cell">{item.nameCode}</div>
                                    <div className="feature-table-cell">{item.typeCode}</div>
                                    <div className="feature-table-cell">{item.descriptionCode}</div>
                                    <div className="feature-table-cell">{item.isAllowPinning.toString()}</div>
                                    <div className="feature-table-cell">{item.isRecommended.toString()}</div>
                                    <div className="feature-table-cell">{item.isAllowCustomName.toString()}</div>
                                    <div className="feature-table-cell">{item.isAllowCustomDescription.toString()}</div>
                                    <div className="feature-table-cell">{item.isHouseRule.toString()}</div>
                                    <div className="feature-table-cell">{item.isCounterFeature.toString()}</div>
                                    <div className="feature-table-cell">{item.isSafetyFeature.toString()}</div>                                    
                                    <div className="feature-table-cell">
                                        {item.featureIcon ? <img src={FeatureService.getFeatureIcon(item.featureIcon.src)} alt="Feature Icon" /> : 'No Icon'}
                                    </div>
                                    <div className="feature-table-cell">
                                        {item.parameters?.length ? (
                                            <table className="parameter-table">
                                                <thead>
                                                    <tr className="parameter-table-header">
                                                        <th className="parameter-table-cell">Name Key</th>
                                                        <th className="parameter-table-cell">Parameter Key</th>
                                                        <th className="parameter-table-cell">Default Value</th>
                                                        <th className="parameter-table-cell">Translations</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.parameters.map((param, pIndex) => (
                                                        <tr key={pIndex} className="parameter-table-row">
                                                            <td className="parameter-table-cell">{param.nameKey}</td>
                                                            <td className="parameter-table-cell">{param.parameterKey}</td>
                                                            <td className="parameter-table-cell">{param.defaultValue}</td>
                                                            <td className="parameter-table-cell">
                                                                <table className="translation-table">
                                                                    <thead>
                                                                        <tr className="translation-table-header">
                                                                            <th className="translation-table-cell">Language Code</th>
                                                                            <th className="translation-table-cell">Key</th>
                                                                            <th className="translation-table-cell">Text</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {param.translations.map((translation, tIndex) => (
                                                                            <tr key={tIndex} className="translation-table-row">
                                                                                <td className="translation-table-cell">{translation.languageCode}</td>
                                                                                <td className="translation-table-cell">{translation.key}</td>
                                                                                <td className="translation-table-cell">{translation.text}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            "No Parameters"
                                        )}
                                    </div>
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
