import { useContext } from "react"
import { FormDataContext } from "../context/FormDataContext"
import addOnsDetails from '../data/addOnsDetails.json'
import { DataType } from "../context/FormDataContext";
import checkMark from '../assets/images/icon-checkmark.svg'
import './styles/AddOnsSection.css';

export default function AddOnsSection() {
    const { data, updateData } = useContext(FormDataContext);
    
    // This is simply to fix annoying TS error
    const addOnsKeys: (keyof DataType['addOns'])[] = ["Online service", "Larger storage", "Customizable profile"]

    return (
        <div>
            {addOnsDetails.map((item, i) => (
                <label key={i} className="checkbox-label" htmlFor={item.option}>
                    <div className="checkbox-container">
                        <div className="custom-checkbox">
                            <img src={checkMark} alt="" />
                        </div>
                        <input 
                            type="checkbox" 
                            id={item.option}
                            value={item.option}
                            name="add-on"
                            checked={data.addOns[addOnsKeys[i]] === true}
                            onChange={e => {
                                updateData({ addOns: {...data.addOns, [item.option]: e.target.checked} })
                            }}
                        />
                    </div>
                    <div className="add-ons-text-container">
                        <h2>{item.option}</h2>
                        <p>{item.description}</p>
                    </div>
                    <p className="add-ons-price">
                        +${item.price[data.billingPeriod]}/
                        {data.billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </p>
                </label>
            ))}
        </div>
    )
}