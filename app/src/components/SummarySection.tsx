import { useContext } from "react"
import { FormDataContext } from "../context/FormDataContext"
import planDetails from '../data/planDetails.json'
import addOnsDetails from '../data/addOnsDetails.json'
import { DataType } from "../context/FormDataContext"
import './styles/SummarySection.css'

type SummarySectionProps = {
    stepIndex: number
    setStepIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function SummarySection({ stepIndex, setStepIndex }: SummarySectionProps) {
    const { data } = useContext(FormDataContext);
    
    const selectedPlan = planDetails.find(item => item.plan === data.plan);
    const selectedAddOns = []

    const allPrices: number[] = [];
    if (selectedPlan) {
        allPrices.push(selectedPlan.price[data.billingPeriod]);
    }

    for (let i = 0; i < addOnsDetails.length; i++) {
        const addOnsKeys: (keyof DataType['addOns'])[] = ["Online service", "Larger storage", "Customizable profile"];
        if (data.addOns[addOnsKeys[i]]) {
            selectedAddOns.push(addOnsDetails[i]);

            allPrices.push(addOnsDetails[i].price[data.billingPeriod]);  // Add add-on price to allPrices array
        }        
    }

    const totalPrice = allPrices.reduce((sum, price) => {
        return sum + price
    }, 0)

    const abbr = data.billingPeriod === 'monthly' ? 'mo' : 'yr';

    const handleClick = () => {
        // This is to prevent this button to be clicked by mistake, 
        // because steps are hidden by setting opacity to 0,
        // (to ensure that form data is not lost when submitted)
        // so it's still possible to navigate to this button via keyboard.
        if (stepIndex === 3) {
            setStepIndex(1);
        }
    }

    return (
        <div className="summary-section-container">
            <div className="product-list">
                <div className="plan-list">
                    <div>
                        <h3>{data.plan} ({data.billingPeriod})</h3>
                        <button type="button" onClick={handleClick}>Change</button>
                    </div>
                    <p>${selectedPlan?.price[data.billingPeriod]}/{abbr}</p>
                </div>

                {selectedAddOns.length > 0 && <hr className="product-list-hr" />}

                {selectedAddOns.map(item => (
                    <div key={item.option} className="add-ons-list">
                        <h4>{item.option}</h4>
                        <p>+${item.price[data.billingPeriod]}/{abbr}</p>
                    </div>
                ))}

            </div>

            <div className="summary">
                <p>Total (per {data.billingPeriod.slice(0, -2)})</p>
                <h1>+${totalPrice}/{abbr}</h1>
            </div>
            
        </div>
    )
}