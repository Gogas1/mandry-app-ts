import { useTranslation } from 'react-i18next';
import '../../../styles/payment/sections/reservation-data.scss';
import { ReservationSettings, SummTravelers } from '../../housing/rent/PriceSection';

interface ReservationDataProps {
    reservationSettins: ReservationSettings;
}

export default function ReservationData({ reservationSettins }: ReservationDataProps) {
    const { t } = useTranslation();

    return (
        <>
            <section className="reservation-data">
                <h2 className='reservation-data__header'>{t('PaymentPage.Sections.Data.Header')}</h2>
                <div className='reservation-data__item'>
                    <div className='item-head'>
                        <p className='item-head__header'>{t('PaymentPage.Sections.Data.DatesHeader')}</p>
                        {reservationSettins.selecetedDates.dateOne && reservationSettins.selecetedDates.dateTwo ?
                        (<p className='item-head__body'>
                            {t('PaymentPage.Sections.Data.DatesValues', 
                                {
                                    dateOne: FormatDateLongShort(reservationSettins.selecetedDates.dateOne),
                                    dateTwo: FormatDateLongShort(reservationSettins.selecetedDates.dateTwo)
                                } )}
                        </p>) : ''}
                    </div>
                    <div className='item-edit'>
                        <p>{t('PaymentPage.Sections.Data.Edit')}</p>
                    </div>
                </div>
                <h3 className='divider' />
                <div className='reservation-data__item'>
                    <div className='item-head'>
                        <p className='item-head__header'>{t('PaymentPage.Sections.Data.GuestsHeader')}</p>
                        <p className='item-head__body'>
                            {t('PaymentPage.Sections.Data.GuestsCount', 
                                { 
                                    number: SummTravelers(reservationSettins.travelersData), 
                                    count: SummTravelers(reservationSettins.travelersData) 
                                } )}
                        </p>
                    </div>
                    <div className='item-edit'>
                        <p>{t('PaymentPage.Sections.Data.Edit')}</p>
                    </div>
                </div>
            </section>
        </>
    );
}

const FormatDateLongShort = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
    });
};