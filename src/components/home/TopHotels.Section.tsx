import { useState } from "react";
import TopDestinationsHelper, { HousingsImageHelper, TopHotelsHelper } from "../../helpers/ImageHelper";

import arrowIcon from '../../assets/icons/meta/arrow-thin.svg';
import { Trans, useTranslation } from "react-i18next";

import '../../styles/pages/home/top-hotels-section.scss';

interface CarouselItem { 
    image: string, 
    text: string, 
    name: string, 
    link: string 
}

export default function TopHotelsSection() {
    const { t } = useTranslation();

    const [carouselIndex, setCarouselIndex] = useState(0);

    const carouselItems: CarouselItem[] = [
        { 
            image: TopHotelsHelper.FranceInfo.image, 
            text: TopHotelsHelper.FranceInfo.text,
            name: TopHotelsHelper.FranceInfo.name,
            link: "" 
        },
        {
            image: TopHotelsHelper.GreeceInfo.image,
            text: TopHotelsHelper.GreeceInfo.text,
            name: TopHotelsHelper.GreeceInfo.name,
            link: ""
        },
        {
            image: TopHotelsHelper.LondonInfo.image,
            text: TopHotelsHelper.LondonInfo.text,
            name: TopHotelsHelper.LondonInfo.name,
            link: ""
        },
        {
            image: TopHotelsHelper.MandivesInfo.image,
            text: TopHotelsHelper.MandivesInfo.text,
            name: TopHotelsHelper.MandivesInfo.name,
            link: ""
        },
        {
            image: TopHotelsHelper.TokyoInfo.image,
            text: TopHotelsHelper.TokyoInfo.text,
            name: TopHotelsHelper.TokyoInfo.name,
            link: ""
        },
        {
            image: TopHotelsHelper.VeniceInfo.image,
            text: TopHotelsHelper.VeniceInfo.text,
            name: TopHotelsHelper.VeniceInfo.name,
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
                <Trans i18nKey={'MainPage.Sections.Sixth.Caption'} 
                components={
                    { 
                        decoratedT: <span className="decorated-T" />, 
                        decoratedI: <span className="decorated-I" />}} />
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

function getArrayAroundIndex(array: CarouselItem[], index: number): CarouselItem[] {
    const targetIndexes: number[] = [];
    if(array.length < 6) {
        targetIndexes.push(0,1,2,3,4);
        const targetArray = Array.from(targetIndexes.map((value) => array[value]));
        return targetArray;
    }
    else {
        if(index === 0) {
            targetIndexes.push(array.length - 2, array.length - 1, 0,1,2);
            const targetArray = Array.from(targetIndexes.map((value) => array[value]));
            return targetArray;
        } else if(index === 1) {
            targetIndexes.push(array.length - 1, 0, 1, 2, 3);
            const targetArray = Array.from(targetIndexes.map((value) => array[value]));
            return targetArray;
        } else if(index === array.length - 2) {
            targetIndexes.push(array.length - 2, array.length - 1, 0,1,2);
            const targetArray = Array.from(targetIndexes.map((value) => array[value]));
            return targetArray;
        } else if(index === array.length - 1) {
            targetIndexes.push(array.length - 1, 0, 1, 2, 3);
            const targetArray = Array.from(targetIndexes.map((value) => array[value]));
            return targetArray;
        } else {
            targetIndexes.push(
                index - 2,
                index - 1,
                index,
                index + 1,
                index + 2
            );
            const targetArray = Array.from(targetIndexes.map((value) => array[value]));

            return targetArray;
        }
    }
}