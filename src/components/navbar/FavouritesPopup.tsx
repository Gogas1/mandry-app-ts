import { useTranslation } from "react-i18next"

import crossIcon from '../../assets/icons/meta/close-cross.svg';

import "../../styles/navbar/favourites-popup.scss";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function FavouritesPopup({ isOpen, closeAll }: PopupProps) {
    const { t } = useTranslation();

    const fillSamples = (count: number) => {
        const newItems = Array.from({ length: count }, (_, index) => (
        <div className="list-item">
            <img src="https://via.placeholder.com/150" alt="Placeholder Image"/>
            <div className="text">
                <div className="label">Name</div>
                <div className="count">({index + 1})</div>
            </div>
        </div>
        ));

        return (
            <>
                {newItems.map((item) => (
                    item
                ))}
            </>
        );
    }

    return (
        <>
            <div className={`favourites-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="popup-border"></div>
                <div className="popup-panel">
                    <div className="favs-header">{t('FavouritesPopupHeader')}</div>
                    <div className="divider"></div>
                    <div className="favourites-list">
                        {fillSamples(3)}
                    </div>
                    <div className="divider"></div>
                    <button className="create-list-popup">{t('CreateFavsListBtnText')}</button>
                </div>
                <div className="popup-hide" onClick={closeAll}>
                    <img src={crossIcon} alt="close"/>
                </div>
            </div>
        </>
    )
}