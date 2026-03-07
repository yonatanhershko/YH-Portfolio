import './Loader.scss';
import loadingImg from '../../assets/imgs&svg/loading.png';

const Loader = ({ fading }) => (
    <div className={`loader-screen${fading ? ' fade-out' : ''}`}>
        <img src={loadingImg} alt="Loading" className="loader-img" />
        <p className="loader-text">Loading</p>
    </div>
);

export default Loader;
