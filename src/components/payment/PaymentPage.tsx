import { useLocation } from 'react-router-dom';
import '../../styles/payment/payment-page.scss';
import { ReservationSettings } from '../housing/rent/PriceSection';
import HeaderSection from './sections/HeaderSection';
import { useTranslation } from 'react-i18next';
import ReservationData from './sections/ReservationData';
import PaymentSection from './sections/PaymentSection';
import FooterSection from '../home/FooterSection';
import PhoneSection from './sections/PhoneSection';
import RefundSection from './sections/RefundSection';
import { CSSProperties, useState } from 'react';
import PriceWaySection from './sections/PriceWaySection';
import MainRulesSection from './sections/MainRulesSection';
import AgreementSection from './sections/AgreementSection';
import HousingDataSection from './sections/HousingDataSection';
import { useModal } from '../app/ModalContext';
import ReservingModal from './modals/ReservingModal';
import HeaderDoneSection from './sections/done/HeaderDoneSection';
import WriteOwnerSection from './sections/done/WriteOwnerSection';
import HousingInfoSection from './sections/done/HousingInfoSection';
import HousingCardSection from './sections/done/HousingCardSection';

export interface LongTermsBenefits {
    fullReturnAvailable: boolean;
    halfReturnDate: Date;
    secondPaymentDate?: Date | null;
}

export interface PaymentSettings {
    paymentPrice: number;
    secondPaymentPrice: number;
    secondPaymentDate: Date | undefined;
}

export default function PaymentPage() {
    const location = useLocation();
    const data = location.state as ReservationSettings;
    const { t } = useTranslation();
    const { openModal, closeModal } = useModal();

    document.title = t('Titles.PaymentPage', {name: data.housingData.name})

    const [done, setDone] = useState(false);

    const [overlayOpened, setOverlayOpened] = useState(false);
    const [longTermsBenefits] = useState(calculateLongTermsBenefits(data.selecetedDates.dateOne));
    const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
        paymentPrice: data.calculatedPrice,
        secondPaymentPrice: 0,
        secondPaymentDate: undefined
    });
    
    const handleSecondPaymentWaySelection = (selected: boolean) => {
        if(longTermsBenefits.secondPaymentDate) {
            if(selected) {
                const halfPaymentPrice = Math.floor(data.calculatedPrice / 2);
                const secondPaymentPrice = data.calculatedPrice - halfPaymentPrice;
                
                const updatedPaymentSettings = { ...paymentSettings };
                updatedPaymentSettings.paymentPrice = halfPaymentPrice;
                updatedPaymentSettings.secondPaymentPrice = secondPaymentPrice;
                updatedPaymentSettings.secondPaymentDate = longTermsBenefits.secondPaymentDate;
                setPaymentSettings(updatedPaymentSettings);
            }
            else {
                const updatedPaymentSettings = { ...paymentSettings };
                updatedPaymentSettings.paymentPrice = data.calculatedPrice;
                updatedPaymentSettings.secondPaymentPrice = 0;
                updatedPaymentSettings.secondPaymentDate = undefined;
                setPaymentSettings(updatedPaymentSettings);
            }
        }
    };

    const handleModalClosing = () => {
        closeModal('reservingModal');
        setOverlayOpened(false);
    }

    const handleModalSuccess = () => {
        setDone(true);
    }

    const handleModalCall = () => {
        openModal("reservingModal", <ReservingModal 
            closeModal={() => handleModalClosing()}
            onSuccess={() => handleModalSuccess()} 
            />, 
            { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties);
        setOverlayOpened(true);
    }

    return (
        <>
            {overlayOpened && (<div className='overlay-payment'></div>)}            
            <div className="payment-page">
                <div className="payment-page-content">
                    <div className="main-section">
                        {!done ? (
                            <>
                                <HeaderSection id={data.housingData.id} />
                                <ReservationData reservationSettins={data} />
                                <hr className='divider-gray' />
                                <PriceWaySection 
                                    reservationSettings={data} 
                                    longTermBenefits={longTermsBenefits} 
                                    paymentSettings={paymentSettings}
                                    onWayChange={handleSecondPaymentWaySelection} />
                                <hr className='divider-gray' />
                                <PaymentSection />
                                <hr className='divider-gray' />
                                <PhoneSection />
                                <hr className='divider-gray' />
                                <RefundSection 
                                    longTermBenefits={longTermsBenefits}
                                    paymentSettings={paymentSettings}/>
                                <hr className='divider-gray' />
                                <MainRulesSection />
                                <hr className='divider-gray' />
                                <AgreementSection callModal={handleModalCall} />
                            </>
                        ): (
                            <>
                                <HeaderDoneSection />
                                <WriteOwnerSection ownerData={data.ownerData} housingData={data.housingData} />
                                <hr className='divider-gray' />
                                <HousingInfoSection 
                                    housingData={data.housingData}
                                    longTermBenefits={longTermsBenefits}
                                    paymentSettings={paymentSettings} />
                            </>
                        )}
                        
                    </div>
                    <div className="info-section">
                        {!done ? (
                            <HousingDataSection reservationSettings={data} paymentSettings={paymentSettings} />
                        ) : (
                            <HousingCardSection reservationSettings={data} paymentSettings={paymentSettings}  />
                        )}
                    </div>
                </div>
                <FooterSection />
            </div>
        </>
    );
}

function calculateLongTermsBenefits(targetDate: Date): LongTermsBenefits {
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 31) {
        return {
            fullReturnAvailable: true,
            halfReturnDate: new Date(targetDate.getTime() - 7 * 24 * 60 * 60 * 1000),
            secondPaymentDate: new Date(targetDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        };
    } else if (daysDifference > 7) {
        return {
            fullReturnAvailable: false,
            halfReturnDate: new Date(targetDate.getTime() - 7 * 24 * 60 * 60 * 1000),
            secondPaymentDate: null
        };
    } else {
        return {
            fullReturnAvailable: false,
            halfReturnDate: targetDate,
            secondPaymentDate: null
        };
    }
}