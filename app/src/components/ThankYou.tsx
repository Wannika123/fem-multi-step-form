import thankYouIcon from '../assets/images/icon-thank-you.svg';
import './styles/ThankYou.css';

export default function ThankYou() {
    return (
        <div className='thank-you-container'>
            <img src={thankYouIcon} alt='thank you icon' />
            <h1>Thank You!</h1>
            <p>
                Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
            </p>
        </div>
    )
}