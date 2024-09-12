import { FilterSetting } from "../SearchPage";

import '../../../styles/search/filter-modal/price-filter.scss';
import { Trans, useTranslation } from "react-i18next";
import { Slider } from "@mui/material";

interface PriceFilterProps {
    filters: FilterSetting;
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function PriceFilter({ filters, filterChangeHandler }: PriceFilterProps) {
    const { t } = useTranslation();

    const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
        console.log(event);
        const updatedFilter = { ...filters }
        updatedFilter.priceRange = newValue as number[];
        filterChangeHandler(updatedFilter);
    };

    return (
        <>
            <div className="price-filter">
                <div className="price-filter__head">
                    <h2 className="price-filter__header">
                        {t('Modals.Filters.Sections.Price.Header')}
                    </h2>
                    <p className="price-filter__label">
                        {t('Modals.Filters.Sections.Price.Label')}
                    </p>
                </div>
                <div className="price-filter__body">
                    <Slider
                        value={filters.priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay='auto'
                        min={64}
                        max={64}
                        sx={{
                            '& .MuiSlider-rail': {
                                backgroundColor: '#B7B7B7',
                                boxShadow: '0px 0px 4px 5px #B7B7B7 inset',
                                borderRadius: '15px',
                                height: '6px',
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#FD941A',
                                borderRadius: '15px',
                                border: '0',
                                height: '6px',
                                boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.25) inset'
                            },
                            '& .MuiSlider-thumb': {
                                background: 'radial-gradient(50% 50% at 50% 50%, #FD941A 0%, #DF5114 100%)'
                            },
                            '& .MuiSlider-thumb.Mui-active': {
                                boxShadow: '0'
                            },
                            '& .MuiSlider-thumb.Mui-focusVisible': {
                                boxShadow: '0'
                            }
                        }}
                    />
                    <p className="price-range">
                        <Trans
                            i18nKey={'Modals.Filters.Sections.Price.PriceRange'}
                            values={{
                                currency: '$', 
                                valueFrom: 64, 
                                valueTo: 64
                            }}

                            components={{
                                currencyDec: <span className="currency-dec" />
                            }}
                        />
                    </p>
                </div>
            </div>
        </>
    );
}