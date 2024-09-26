import { CSSProperties, FormEvent, useEffect, useState } from "react";
import i18n from "../../i18n";

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


export default function AdminCategories() {

    const languages = i18n.languages;

    const [translations, setTranslations] = useState(
        languages.reduce((acc, lang) => {
            acc[lang] = { name: '', description: '' };
            return acc;
        }, {} as { [key: string]: { name: string; description: string } })
    );
    const [categories, setCategories] = useState<Category[]>([]);

    const [category, setCategory] = useState<Category>(
        {
            id: '',
            nameKey: '',
            categoryPropertyDescriptionKey: '',
            isCategoryPropertyRequired: false,
            categoryTranslations: [],
            categoryPropertyTranslations: []
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/c/get";

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories as Category[]);
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const packTranslations = () => {
        const packedTranslations: Translation[] = Object.keys(translations).flatMap(lang => [
            {
                key: category.nameKey,
                languageCode: lang,
                text: translations[lang].name
            },
        ]);

        setCategory(prevCategory => ({
            ...prevCategory,
            categoryTranslations: packedTranslations
        }));
    };

    const handleTranslationInputChange = (lang: string, field: 'name', value: string) => {
        setTranslations(prevTranslations => ({
            ...prevTranslations,
            [lang]: {
                ...prevTranslations[lang],
                [field]: value
            }
        }));
    };

    const createFeatureHandle = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        packTranslations();

        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/c/add";

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(category),
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
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
            <div style={{ minHeight: '100vh', backgroundColor: "#f6f6f6" }}>
                <div style={{ paddingTop: '104px' }}>
                    <div style={{ margin: '20px 0 20px 105px', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'start' }}>
                        <input
                            placeholder="Name code"
                            className="form-input"
                            onChange={e => setCategory({ ...category, nameKey: e.target.value })} />
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
                                </div>
                            ))}
                        </div>
                        <button onClick={createFeatureHandle}>Create</button>
                    </div>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={headerRowStyle}>
                                <th style={thStyle}>Id</th>
                                <th style={thStyle}>Name key</th>
                                <th style={thStyle}>Category Property Description Key</th>
                                <th style={thStyle}>Is Category Property Required</th>
                                <th style={thStyle}>Category Translations</th>
                                <th style={thStyle}>Category Property Translations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, key) => (
                                <tr key={key}>
                                    <td style={tdStyle}>{item.id}</td>
                                    <td style={tdStyle}>{item.nameKey}</td>
                                    <td style={tdStyle}>{item.categoryPropertyDescriptionKey}</td>
                                    <td style={tdStyle}>{item.isCategoryPropertyRequired ? "Yes" : "No"}</td>
                                    <td style={tdStyle}>
                                        <table style={translationTableStyle}>
                                            <thead>
                                                <tr style={translationHeaderStyle}>
                                                    <th style={translationCellStyle}>Language Code</th>
                                                    <th style={translationCellStyle}>Key</th>
                                                    <th style={translationCellStyle}>Text</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.categoryTranslations &&
                                                    item.categoryTranslations.map((translation, index) => (
                                                        <tr key={index}>
                                                            <td style={translationCellStyle}>
                                                                {translation.languageCode}
                                                            </td>
                                                            <td style={translationCellStyle}>{translation.key}</td>
                                                            <td style={translationCellStyle}>{translation.text}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style={tdStyle}>
                                        <table style={translationTableStyle}>
                                            <thead>
                                                <tr style={translationHeaderStyle}>
                                                    <th style={translationCellStyle}>Language Code</th>
                                                    <th style={translationCellStyle}>Key</th>
                                                    <th style={translationCellStyle}>Text</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.categoryPropertyTranslations &&
                                                    item.categoryPropertyTranslations.map((translation, index) => (
                                                        <tr key={index}>
                                                            <td style={translationCellStyle}>
                                                                {translation.languageCode}
                                                            </td>
                                                            <td style={translationCellStyle}>{translation.key}</td>
                                                            <td style={translationCellStyle}>{translation.text}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
} as CSSProperties;

const thStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
} as CSSProperties;

const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
} as CSSProperties;

const headerRowStyle = {
    backgroundColor: "#f2f2f2",
} as CSSProperties;

const translationTableStyle = {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
} as CSSProperties;

const translationCellStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
} as CSSProperties;

const translationHeaderStyle = {
    backgroundColor: "#e0e0e0",
    color: "#333",
} as CSSProperties;