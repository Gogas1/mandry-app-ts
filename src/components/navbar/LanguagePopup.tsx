import i18next from 'i18next';

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function LanguagePopup({ isOpen, closeAll }: PopupProps) {
    if(!isOpen) return null;

    const resources = i18next.options.resources as Record<string, any>;
    const lngs = Object.keys(resources).map(code => {
      return {
        code: code,
        name: resources[code].translation.nativeName
      };
    });

    return ( 
        <div className='language-menu'>
            <select
                value={i18next.resolvedLanguage}
                onChange={(e) => i18next.changeLanguage(e.target.value)}>
                {lngs.map((lng) => (
                    <option key={lng.code} value={lng.code}>
                        {lng.name}
                            </option>
                        ))}
            </select>
            <div onClick={closeAll}>Close</div>
        </div>
    )
}