import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';
import { useContext, useMemo } from 'react';
import { FormDataContext } from '../context/FormDataContext';
import planDetails from '../data/planDetails.json';
import './styles/PlanSection.css'

export default function PlanSection() {
    const { data, updateData } = useContext(FormDataContext);

    const billingPeriod = data.billingPeriod;

    const planIcons = useMemo(() => 
        [arcadeIcon, advancedIcon, proIcon]
    , []);

    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value= e.target.value
        if (value === 'Arcade' || value === 'Advanced' || value === 'Pro')
        updateData({ plan: value })
    }

    return (
        <div className='plan-section-container'>

            <div className='toggle-btns-container'>
                <label htmlFor='monthly' className='month-label'>Monthly</label>
                <div className='toggle-btns'>
                    <input 
                        className='monthly-btn'
                        type='radio' 
                        value='monthly' 
                        id='monthly' 
                        name='billingPeriod' 
                        checked={billingPeriod === 'monthly'}
                        onChange={() => updateData({ billingPeriod: 'monthly' })}
                    />
                    <input  
                        className='yearly-btn'
                        type='radio' 
                        value='yearly' 
                        id='yearly' 
                        name='billingPeriod' 
                        checked={billingPeriod === 'yearly'}
                        onChange={() => updateData({ billingPeriod: 'yearly' })}
                    />
                    <div className='ball'></div>
                </div>
                <label htmlFor='yearly' className='year-label'>Yearly</label>
            </div>

            <div className='plan-options-container'>
                {planDetails.map((item, i) => (
                    <div key={i} className='plan-option'>
                        <input  
                            type='radio' 
                            id={item.plan} 
                            value={item.plan} 
                            name='plan'
                            checked={data.plan === item.plan}
                            onChange={handlePlanChange}
                        />
                        <label htmlFor={item.plan}>
                            <div>
                                <img src={planIcons[i]} alt={item.plan + ' icon'} />
                            </div>
                            <div>
                                <h2>{item.plan}</h2>
                                <p>
                                    ${item.price[billingPeriod]}/
                                    { billingPeriod === 'monthly' ? 'mo' : 'yr' }
                                </p>
                                { billingPeriod === 'yearly' && <p className='free-months'>2 months Free</p>}
                            </div>
                        </label>
                    </div>
                ))}
            </div>

        </div>
    )
}