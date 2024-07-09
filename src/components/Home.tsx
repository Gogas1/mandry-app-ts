import { Link } from 'react-router-dom'
import '../styles/pages/home/home.scss'
import instaIcon from '../assets/icons/home/insta_idle.svg';
import ttIcon from '../assets/icons/home/tt_idle.svg';
import fbIcon from '../assets/icons/home/fb_idle.svg';
import destIcon from '../assets/icons/home/dest_icn.svg';
import TextField from './home/TextField';

export default function Home() {
    return (
        <>
            <div id="home-page">
                <div id='side-line'>
                    <div className='line' id='top-line'></div>
                    <Link to="/is" className='icon-link'>
                        <img src={instaIcon} alt='instagram' />
                    </Link>
                    <Link to="/is" className='icon-link'>
                        <img src={ttIcon} alt='tiktok' />
                    </Link>
                    <Link to="/is" className='icon-link'>
                        <img src={fbIcon} alt='facebook' />
                    </Link>

                    <div className='line' id='bottom-line'></div>
                </div>
                <div id='content-container'>
                    <div id='main-content'>

                    </div>
                    <div id='bottom-content'>
                        <div id='bottom-panel-wrapper'>
                            <div id='bottom-panel'>
                                <div className='bottom-panel-item' id='bottom-panel-destination'>
                                    <img src={destIcon} alt='destination' />
                                    <TextField label='Напрямок' />
                                </div>
                                <div className='bottom-panel-divider'></div>
                                <div className='bottom-panel-item' id='bottom-panel-dates'>

                                </div>
                                <div className='bottom-panel-divider'></div>
                                <div className='bottom-panel-item' id='bottom-panel-group'>

                                </div>
                            </div>
                        </div>                
                    </div>
                    
                </div>
            </div>            
        </>
    );
}