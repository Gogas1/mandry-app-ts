import { useEffect, useState } from 'react';
import '../../styles/housing/housing-page.scss';

import heartIcon from '../../assets/icons/meta/heart-empty-grey.svg';
import shareIcon from '../../assets/icons/meta/share.svg';

import image1 from '../../assets/samples/housing/3.jpg';
import image2 from '../../assets/samples/housing/4.jpg';
import image3 from '../../assets/samples/housing/5.jpg';
import image4 from '../../assets/samples/housing/6.jpg';
import image5 from '../../assets/samples/housing/7.jpg';
import { processTranslations, Translation } from '../../helpers/TranslationService';
import { useTranslation } from 'react-i18next';
import ComponentsSection from './sections/ComponentsSection';
import DescriptionSection from './sections/DescriptionSection';
import BedroomsSection from './sections/BedroomsSection';
import FeaturesSection from './sections/FeaturesSection';

type Category = {
    id: string,
    nameKey: string,
    isCategoryPropertyRequired?: boolean,
    categoryPropertyDescriptionKey?: string,
    
    categoryTranslations: Translation[]
    categoryPropertyTranslations?: Translation[]
}

type Bedroom = {
    beds: Bed[]
}

export type Feature = {
    nameCode: string,
    descriptionCode: string,
    featureIcon: string,
    typeCode: string,

    translations: Translation[]
}

export type Bed = {
    type: string,
    size: number
}

export interface Housing {
    id: string,
    name: string,
    country: string,
    place: string,
    category: Category,
    bathrooms: number,
    maxGuests: number,
    description: string;
    shortDescription: string,
    
    bedrooms: Bedroom[],
    images: string[],
    features: Feature[]
}

export default function HousingPage() {
    const { t } = useTranslation();

    const [housingData, setHousingData] = useState<Housing>(housingA);

    useEffect(() => {
        processTranslations(housingData.category.categoryTranslations);
        housingData.features.forEach(feature => {
            processTranslations(feature.translations);
        });
    }, [housingData]);

    return (
        <>
            <div className="housing-page">
                <div className='housing-page-content'>
                    <section className='header-section'>
                        <h1 className='housing-name'>
                            {housingData.name}
                        </h1>
                        <div className='housing-actions'>
                            <img src={shareIcon} />
                            <img src={heartIcon} />
                        </div>
                    </section>
                    <section className='housing-images-section'>
                        <div className='big-picture-container'>
                            <div className='big-picture-wrapper'>
                                <img src={housingData.images[0]} />
                            </div>   
                        </div>
                        <div className='small-pictures-container'>
                            {housingData.images.slice(1, housingData.images.length > 4 ? 5 : housingData.images.length - 1).map((image, index) => (    
                                <div className='small-picture-wrapper' key={index}>
                                    <img src={image} key={index} />
                                </div>                            
                                
                            ))}
                        </div>
                    </section>
                    <div className='main-section'>
                        <div className='data-section'>
                            <section className='location-section'>
                                {`${housingData.place}, ${housingData.country}: ${t(housingData.category.nameKey)}`}
                            </section>
                            <ComponentsSection housingData={housingData} />
                            <DescriptionSection housingData={housingData} />
                            <hr className='divider' />
                            <BedroomsSection housingData={housingData} />
                            <hr className='divider' />
                            <FeaturesSection housingData={housingData} />
                        </div>
                        <div className='rent-section'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const housingA: Housing = {
    id: "1234",
    name: "Haus Hepi B&B біля озера Hallstatt 2",
    images: [
        image1,
        image2,
        image3,
        image4,
        image5
    ],
    country: "Австрія",
    place: "Obertraun",
    category: {
        id: "1234",
        nameKey: "category.room",
        categoryTranslations: [
            {
                key: "category.room",
                languageCode: "uk",
                text: "Кімната"
            }
        ]
    },
    bathrooms: 2,
    bedrooms: [
        {
            beds: [
                { 
                    type: "queen-size",
                    size: 2
                },
                { 
                    type: "queen-size",
                    size: 1
                }
            ]
        },
        {
            beds: [
                { 
                    type: "queen-size",
                    size: 1
                }
            ]
        }
    ],
    maxGuests: 5,
    description: "Наш сімейний пансіонат ідеально розташований в ідилічному сільському містечку Обертраун в районі озер і гір Австрії, лише в декількох хвилинах ходьби від берегів озера Гальштат.Ми маємо чотири двомісні номери з сучасними ванними кімнатами та сонячними балконами з видом на гори, озеро та село. Ми надаємо туалетні принадлежности, фен і сейф у вашій кімнаті, і, звичайно, вся білизна та рушники включені. Крім того, ми маємо одну меншу двомісну кімнату з ванною кімнатою, яку можна використовувати для одномісного або двомісного проживання.Кожна спальня була традиційно мебльована, щоб відобразити наше альпійське оточення, і кожна з них має сучасну ванну кімнату з душем та туалетом.Сніданок входить до вартості вашого номера, ми пропонуємо обширний сніданок, який включає в себе вибір свіжозапечених рулетів, місцевого м 'яса, сирів, паштету та масла, домашніх консервів, круп, свіжих фруктів, яєць вільного діапазону та вибір гарячих та холодних напоїв. Наш просторий, сонячний зал для сніданку з панорамним видом на навколишній ліс, луги та гори. Показана ціна за номер за ніч з включенням сніданку.", 
    shortDescription: "Наш B&B розташований у спокійному місці, недалеко від лісу в Обертрауні, пропонує комфортний дім з домашньої атмосфери.  Зручно розташовані залізнична станція, берег озера та автобусна зупинка знаходяться всього в п 'яти хвилинах ходьби. Відкрийте для себе затишне село з багатьма пішохідними та велосипедними доріжками, що ведуть безпосередньо від дверей.  Порада: - Спитайте про вечерю!",

    features: [
        {
            nameCode: "features.hairdryer",
            descriptionCode: "",
            featureIcon: "hair-dryer",
            typeCode: "features.types.bathroom",
            translations: [
                {
                    key: "features.hairdryer",
                    languageCode: "uk",
                    text: "Фен"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "uk",
                    text: "Ванна кімната"
                },
                {
                    key: "features.hairdryer",
                    languageCode: "en",
                    text: "Hair dryer"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "en",
                    text: "Bathroom"
                },
            ]
        },
        {
            nameCode: "features.shampoo",
            descriptionCode: "",
            featureIcon: "shampoo",
            typeCode: "features.types.bathroom",
            translations: [
                {
                    key: "features.shampoo",
                    languageCode: "uk",
                    text: "Шампунь"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "uk",
                    text: "Ванна кімната"
                },
                {
                    key: "features.shampoo",
                    languageCode: "en",
                    text: "Shampoo"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "en",
                    text: "Bathroom"
                },
            ]
        },
        {
            nameCode: "features.hotwater",
            descriptionCode: "",
            featureIcon: "hot-water",
            typeCode: "features.types.bathroom",
            translations: [
                {
                    key: "features.hotwater",
                    languageCode: "uk",
                    text: "Гаряча вода"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "uk",
                    text: "Ванна кімната"
                },
                {
                    key: "features.hotwater",
                    languageCode: "en",
                    text: "Hot water"
                },
                {
                    key: "features.types.bathroom",
                    languageCode: "en",
                    text: "Bathroom"
                },
            ]
        },
        {
            nameCode: "features.smokeDetector",
            descriptionCode: "",
            featureIcon: "smoke-detector",
            typeCode: "features.types.safety",
            translations: [
                {
                    key: "features.smokeDetector",
                    languageCode: "uk",
                    text: "Детектор диму"
                },
                {
                    key: "features.types.safety",
                    languageCode: "uk",
                    text: "Безпека помешкання"
                },
                {
                    key: "features.smokeDetector",
                    languageCode: "en",
                    text: "Smoke detector"
                },
                {
                    key: "features.types.safety",
                    languageCode: "en",
                    text: "Housing safety"
                },
            ]
        },
        {
            nameCode: "features.extinguisher",
            descriptionCode: "",
            featureIcon: "extinguisher",
            typeCode: "features.types.safety",
            translations: [
                {
                    key: "features.extinguisher",
                    languageCode: "uk",
                    text: "Вогнегасник"
                },
                {
                    key: "features.types.safety",
                    languageCode: "uk",
                    text: "Безпека помешкання"
                },
                {
                    key: "features.extinguisher",
                    languageCode: "en",
                    text: "Fire extinguisher"
                },
                {
                    key: "features.types.safety",
                    languageCode: "en",
                    text: "Housing safety"
                },
            ]
        }
    ]
}