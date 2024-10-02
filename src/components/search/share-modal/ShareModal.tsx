import { Housing } from "../../housing/HousingPage";

import crossIcon from '../../../assets/icons/meta/close-cross.svg'
import starIcon from '../../../assets/icons/meta/star.svg'

import copyIcon from '../../../assets/icons/share/copy.svg';
import buildInIcon from '../../../assets/icons/share/buildin.svg';
import emailIcon from '../../../assets/icons/share/email.svg';
import facebookIcon from '../../../assets/icons/share/facebook.svg';
import messageIcon from '../../../assets/icons/share/message.svg';
import messengerIcon from '../../../assets/icons/share/messenger.svg';
import moreIcon from '../../../assets/icons/share/more.svg';
import twitterIcon from '../../../assets/icons/share/twitter.svg';
import wupIcon from '../../../assets/icons/share/wup.svg';
import xIcon from '../../../assets/icons/share/xicon.svg';

import '../../../styles/search/share-modal/share-modal.scss';
import { useTranslation } from "react-i18next";
import FeatureService from "../../../helpers/FeatureService";

interface ShareModalProps {
    housing: Housing;
    hideModal: () => void;
}

export default function ShareModal({ housing, hideModal }: ShareModalProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className="share-modal-wrapper">
                <div className="share-modal-panel">
                    <h1 className="header">
                        Поділитися цією сторінкою
                    </h1>
                    <hr className="share-modal-divider" />
                    <div className="housing-info-section">
                        <img src={housing.images.length > 0 ?
                            FeatureService.getFeatureIcon(housing.images[0].src) :
                            FeatureService.getFeatureIcon("images/features/3.jpg")}
                            className="thumbnail" />
                        <div className="housing-info">
                            <p>{housing.name}</p>
                            <div className="rating-info">
                                <img src={starIcon} />
                                <span>
                                    {`${housing.averageRating.toFixed(2)} ~ ${t('HousingPage.RentSections.Rating.ReviewsCount',
                                        {
                                            number: housing.reviewsCount,
                                            count: housing.reviewsCount
                                        })}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="options-list">
                        <button className="option">
                            <img src={copyIcon} />
                            Копіювати посилання
                        </button>

                        <button className="option">
                            <img src={emailIcon} />
                            Електронна пошта
                        </button>

                        <button className="option">
                            <img src={messageIcon} />
                            Повідомлення
                        </button>

                        <button className="option">
                            <img src={wupIcon} />
                            WhatsApp
                        </button>

                        <button className="option">
                            <img src={messengerIcon} />
                            Messenger
                        </button>

                        <button className="option">
                            <img src={facebookIcon} />
                            Facebook
                        </button>

                        <button className="option">
                            <img src={xIcon} />
                            Twitter
                        </button>

                        <button className="option">
                            <img src={buildInIcon} />
                            Вбудувати
                        </button>

                        <button className="option">
                            <img src={moreIcon} />
                            Більше варіантів
                        </button>
                    </div>
                </div>
                <button className="share-modal-close" onClick={hideModal}>
                    <img src={crossIcon} />
                </button>
            </div>
        </>
    );
}