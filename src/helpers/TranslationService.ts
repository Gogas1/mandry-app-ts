import i18n from "../i18n";

export type Translation = {
    key: string;
    languageCode: string;
    text: string;
}

export function processTranslations(translations: Translation[]) {
    const translationsByLanguage: Record<string, Record<string, string>> = {};
    translations.forEach(translation => {
        const { languageCode, key, text } = translation;

        if(!translationsByLanguage[languageCode]) {
            translationsByLanguage[languageCode] = {};
        }

        translationsByLanguage[languageCode][key] = text;
    });

    Object.keys(translationsByLanguage).forEach(languageCode => {
        i18n.addResources(languageCode, 'translation', translationsByLanguage[languageCode]);
    });
};