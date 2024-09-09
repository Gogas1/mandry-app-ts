import { useTranslation } from 'react-i18next';
import '../../styles/account/favourites-page.scss';
import { Link } from 'react-router-dom';

import heartFilled from "../../assets/icons/meta/heart-filled.svg";

export default function FavouritesPage() {
    const { t } = useTranslation();
    
    return (
        <>
            <div className="favourites-page">
                <div className="favourites-page-content">
                    <div className="top-content">
                        <h1 className='caption'>{t('FavsPage.Caption')}</h1>
                        <Link to={'/account/favourites/edit'}>
                            {t('FavsPage.Edit')}
                        </Link>
                    </div>
                    <div className="favourites-list">
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                        <div className='fav-item'>
                            <div className='image-container'>
                                <img className='image' src='https://via.placeholder.com/150' />
                                <img className='heart' src={heartFilled} />
                            </div>
                            <div className='labels'>
                                <label>Label</label>
                                <label>(1)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}