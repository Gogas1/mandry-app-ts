import { useTranslation } from "react-i18next"

import '../../../styles/account/verification-page.scss';

export default function VerificationPage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="verification-page">
                <div className="verification-page-content">
                    <div className="verification-steps">
                        <div className="verification-step">
                            <div className="header">
                                {t('VerificationPage.Steps.IDStep.Header')}
                            </div>
                            <div className="description">
                                {t('VerificationPage.Steps.IDStep.Description')}
                            </div>
                            <div className="ways-list">
                                <div className="way-item">
                                    <div className="head-part">
                                        <div className="label">
                                            {t('VerificationPage.Steps.IDStep.Ways.UploadPhoto.Header')}
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div className="undertext-part">
                                        {t('VerificationPage.Steps.IDStep.Ways.UploadPhoto.Undertext')}
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="way-item">
                                    <div className="head-part">
                                        <div className="label">
                                            {t('VerificationPage.Steps.IDStep.Ways.TakePhoto.Header')}
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div className="undertext-part">
                                        {t('VerificationPage.Steps.IDStep.Ways.TakePhoto.Undertext')}
                                    </div>
                                </div>
                            </div>
                            <button className="step-button">{t('VerificationPage.Steps.IDStep.ContinueLabel')}</button>
                        </div>                        
                    </div>
                    <div className="privacy">
                        <div className="header">
                            {t('VerificationPage.Privacy.Header')}
                        </div>
                        <div className="body">
                            {t('VerificationPage.Privacy.Body')}
                        </div>
                        <div className="link-explanation">
                            {t('VerificationPage.Privacy.Explanation')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}