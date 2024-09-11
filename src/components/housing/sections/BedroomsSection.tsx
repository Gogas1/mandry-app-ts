import { useTranslation } from "react-i18next";

import '../../../styles/housing/sections/bedrooms-section.scss';
import { Bed, Housing } from "../HousingPage";

import oneSizeBedIcon from '../../../assets/icons/housing/bed-size-one.svg';
import twoSizeBedIcon from '../../../assets/icons/housing/bed-size-two.svg';

interface BedroomsSectionProps {
    className?: string;
    housingData: Housing
}

export default function BedroomsSection({ housingData, className }: BedroomsSectionProps) {
    const { t } = useTranslation();

    return (
        <>
            <section className={`bedrooms-section ${className}`}>
                <h2 className="bedrooms-section__header">{t('HousingPage.Sections.Bedrooms.Header')}</h2>
                <div className="bedrooms">
                    {housingData.bedrooms.map((bedroom, index) => {
                        const groupedBeds = bedroom.beds.reduce((acc, bed) => {
                            if(!acc[bed.size]) {
                                acc[bed.size] = [];
                            }
                    
                            acc[bed.size].push(bed);
                            return acc;
                        }, {} as Record<number, Bed[]>);

                        return (
                            <div className="bedroom" key={index}>
                                <h3 className="bedroom__title">{t('HousingPage.Sections.Bedrooms.BedroomTitle')}</h3>
                                <div className="bedroom__beds-icons">
                                    {bedroom.beds.some(b => b.size === 1) ?
                                    (
                                        <div className="bed">
                                            <img src={oneSizeBedIcon} />
                                        </div>
                                    ) : ''
                                    }
                                    {bedroom.beds.some(b => b.size === 2) ?
                                    (
                                        <div className="bed">
                                            <img src={twoSizeBedIcon} />
                                        </div>
                                    ) : ''
                                    }
                                </div>
                                <div className="bedroom__beds-labels">
                                    {Object.entries(groupedBeds).map(([size, beds], index) => {
                                        return (
                                            <div className="bed" key={index}>
                                                {t(size === '1' ? 
                                                "HousingPage.Sections.Bedrooms.BedSizeOne" :
                                                "HousingPage.Sections.Bedrooms.BedSizeTwo", { count: beds.length, number: beds.length })}
                                            </div>
                                        );
                                    })}
                                    
                                </div>
                            </div>
                        )
                        
                    })}
                </div>
            </section>
        </>  
    );
}