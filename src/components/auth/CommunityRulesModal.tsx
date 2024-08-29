import { CSSProperties } from 'react';


import arrowIcon from '../../assets/icons/meta/arrow.svg';
import logoIcon from '../../assets/icons/meta/small-logo.svg';

import '../../styles/auth/c-rules-modal.scss';
import { useModal } from '../app/ModalContext';
import AgreementModal from './AgreementModal';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface CommunityRulesModalProps {
    hideModal: () => void;
}

export default function CommunityRulesModal({ hideModal }: CommunityRulesModalProps) {
    const { closeModal, openModal } = useModal();
    const { t } = useTranslation();

    const handleClose = () => {
        hideModal();
        openModal('agreement', 
            <AgreementModal 
                hideModal={() => { closeModal('agreement'); }}
                 />, 
            { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties);
    }

    return (
        <>
            <div className="rules-modal-border"></div>
            <div className="rules-modal-panel">
                <img className='rules-modal-panel__icon' src={logoIcon} />
                <div className='rules-modal-panel__caption'>
                    {t('Modals.Rules.Caption')}
                </div>
                <section className='scroll-section'>
                    <section className='agreement-section'>
                        <div className='rules-modal-panel__definition'>
                            <Trans i18nKey={'Modals.Rules.Definition'}
                                components={{
                                    decoratedName: <span className='decorated-name' />
                                }} />
                        </div>
                        <div className='rules-modal-panel__proceed'>
                            {t('Modals.Rules.ProceedToAgreement')}
                        </div>
                        <div className='rules-modal-panel__agreement'>
                            {t('Modals.Rules.Agreement')}
                        </div>
                    </section>
                    <section className='rules-section'>
                        <div className='rules-section__caption'>
                            {t('Modals.Rules.Rules.Caption')}
                        </div>
                        <section className='rules-section__rules'>
                            <div className='rule'>
                                <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule1.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule1.Text1')}
                                </div>
                            </div>
                            <div className='rule'>
                                <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule2.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule2.Text1')}
                                </div>
                            </div>
                            <div className='rule'>
                                <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule3.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule3.Text1')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule3.Text2')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule3.Text3')}
                                </div>
                            </div>
                            <div className='rule'>
                            <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule4.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule4.Text1')}
                                </div>
                            </div>
                            <div className='rule'>
                                <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule5.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    {t('Modals.Rules.Rules.Rule5.Text1')}
                                </div>
                            </div>
                            <div className='rule'>
                                <div className='rule-header'>
                                    {t('Modals.Rules.Rules.Rule6.Title')}
                                </div>
                                <div className='rule-paragraph'>
                                    <Trans 
                                        i18nKey={'Modals.Rules.Rules.Rule6.Text1'}
                                        components={{
                                            link1: <Link to={'#'} />,
                                            link2: <Link to={'#'} />
                                        }} />
                                </div>
                            </div>
                        </section>
                    </section>
                    <button className='back-button' onClick={handleClose}>
                        {t('Modals.Rules.BackButton')}
                    </button>
                </section> 
            </div>
            <button className="rules-modal-button" onClick={handleClose}>
                <img src={arrowIcon} />
            </button>
        </>
    );
}