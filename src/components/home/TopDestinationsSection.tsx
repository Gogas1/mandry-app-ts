import { useState } from "react";
import TopDestinationsHelper from "../../helpers/ImageHelper";

import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';
import { Trans } from "react-i18next";

interface CarouselItem { 
    image: string, 
    text: string, 
    name: string, 
    link: string 
}

export default function TopDestinationsSection() {

    const [carouselIndex, setCarouselIndex] = useState(0);

    const carouselItems: CarouselItem[] = [
        { 
            image: TopDestinationsHelper.BaliInfo.image, 
            text: TopDestinationsHelper.BaliInfo.text,
            name: TopDestinationsHelper.BaliInfo.name,
            link: "" 
        },
        {
            image: TopDestinationsHelper.BarcelonaInfo.image,
            text: TopDestinationsHelper.BarcelonaInfo.text,
            name: TopDestinationsHelper.BarcelonaInfo.name,
            link: ""
        },
        {
            image: TopDestinationsHelper.DubaiInfo.image,
            text: TopDestinationsHelper.DubaiInfo.text,
            name: TopDestinationsHelper.DubaiInfo.name,
            link: ""
        },
        {
            image: TopDestinationsHelper.RomeInfo.image,
            text: TopDestinationsHelper.RomeInfo.text,
            name: TopDestinationsHelper.RomeInfo.name,
            link: ""
        },
        {
            image: TopDestinationsHelper.SidneyInfo.image,
            text: TopDestinationsHelper.SidneyInfo.text,
            name: TopDestinationsHelper.SidneyInfo.name,
            link: ""
        },
        {
            image: TopDestinationsHelper.TokyoInfo.image,
            text: TopDestinationsHelper.TokyoInfo.text,
            name: TopDestinationsHelper.TokyoInfo.name,
            link: ""
        }
    ];

    const doubledArray = carouselItems.concat(carouselItems);

    const onCarouselBack = () => {
        if(carouselIndex === 0) {
            setCarouselIndex(doubledArray.length - 1);
            
        }
        else {
            setCarouselIndex(carouselIndex - 1);
        }
    }

    const onCarouselForward = () => {
        if(carouselIndex === doubledArray.length - 1) {
            setCarouselIndex(0);
        }
        else {
            setCarouselIndex(carouselIndex + 1);
        }
        
    }

    return (
        <div className='floor-container top-dest-container'>
            <div className='top-caption'>
                <Trans i18nKey={'MainPage.Sections.Second.Caption'} 
                components={
                    { 
                        decoratedT: <span className="decorated-T" />, 
                        decoratedM: <span className="decorated-M" />}} />
                {/* {t('MainPage.Sections.Second.Caption')} */}
            </div>
            <div className='cards-wheel'>
                <div className='cards-wheel-track'>
                    {doubledArray.map((item, index) => (
                         <div className={`card-wrapper ${getClassNameForTopDestination(index, carouselIndex, doubledArray.length)}`} key={index}
                            data-index={index}
                            data-focus={carouselIndex}>
                            <div className='card'>
                                <div className="card__image-wrapper">
                                    <img className='card__image-wrapper__image' src={item.image} />
                                </div>
                                
                                <h3 className='card__name'>{item.name}</h3>
                                <div className='card__text'>
                                    {item.text}
                                </div> 
                            </div>
                        </div>
                    ))}
                </div>
                <div className='wheel-control wheel-control--back' onClick={onCarouselBack}>
                    <img src={arrowIcon} />
                </div>
                <div className='wheel-control wheel-control--forward' onClick={onCarouselForward}>
                    <img src={arrowIcon} />
                </div>
            </div>
        </div>
    )
}

function getClassNameForTopDestination(index: number, focusIndex: number, arrayLength: number): string {
    const isFirst = (focusIndex === 0 && index === arrayLength - 1);
    const isPrevious = 
        (focusIndex === 0 && index === arrayLength - 2) || 
        (focusIndex === 1 && index === arrayLength - 1);
    const isPrevious2 = 
        (focusIndex === 0 && index === arrayLength - 3) ||
        (focusIndex === 1 && index === arrayLength - 2) ||
        (focusIndex === 2 && index === arrayLength - 1);

    if (index === focusIndex) return 'second';
    if (isFirst || index === focusIndex - 1) return 'first';
    if (isPrevious || index === focusIndex - 2) return 'previous';
    if (isPrevious2 || index === focusIndex - 3) return 'previous-ready';

    // Handle end-of-list special cases
    const isEnd = focusIndex === arrayLength - 1;
    const isSecondLast = 
        (focusIndex === arrayLength - 2 && index === 0) ||
        (focusIndex === arrayLength - 1 && index === 1);

    const isNext2 = 
        (focusIndex === arrayLength - 3 && index === 0) ||
        (focusIndex === arrayLength - 2 && index === 1) ||
        (focusIndex === arrayLength - 1 && index === 2);

    if ((isEnd && index === 0) || index === focusIndex + 1) return 'third';
    if (isSecondLast || index === focusIndex + 2) return 'next';
    if (isNext2 || index === focusIndex + 3) return 'next-ready';

    return 'offscreen';
}