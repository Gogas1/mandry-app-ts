import { useTranslation } from 'react-i18next';
import '../../../styles/search/filter-modal/languages-filter.scss';
import CheckboxRound from '../../app/CheckboxRound';

export default function LanguagesFilter() {
    const { t } = useTranslation();

    return (
        <>
            <div className="languages-filter">
                <h2 className='languages-filter__header'>
                    {t("Modals.Filters.Sections.Languages.Header")}
                </h2>
                <div className='languages-filter__list'>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Українська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Угорська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Французька
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Польська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Англійська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Німецька
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Італійська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Португальська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Іспанська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Голандська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Турецька
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Чешська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Корейська
                        </div>
                        <CheckboxRound />
                    </div>
                    <div className='language-item'>
                        <div className='language-item__label'>
                            Фінська
                        </div>
                        <CheckboxRound />
                    </div>
                </div>
            </div>
        </>
    );
}