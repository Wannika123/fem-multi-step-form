import { FormEvent, useContext, useState, useMemo } from "react"
import { FormDataContext } from "../context/FormDataContext";
import { validateEmail, validateName, validatePhone } from "../utils/validators";
import formDetails from '../data/formDetails.json'

import InfoSection from "./InfoSection";
import PlanSection from "./PlanSection";
import AddOnsSection from "./AddOnsSection";
import SummarySection from "./SummarySection";
import ThankYou from "./ThankYou";
import Topics from "./Topics";
import Buttons from "./Buttons";

import './styles/MultiStepForm.css';

export default function MultiStepForm() {
    const { data } = useContext(FormDataContext);

    const [stepIndex, setStepIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const componentArr = useMemo(() => [
        <InfoSection />,
        <PlanSection />,
        <AddOnsSection />, 
        <SummarySection stepIndex={stepIndex} setStepIndex={setStepIndex} />
    ], [stepIndex])

    const next = () => {
        if (stepIndex === 0) {  // check personal info section
            if (!validateName(data.name) || !validateEmail(data.email) || !validatePhone(data.phoneNumber)) {
                return;
            }
        }
        setStepIndex(state => state + 1)
    }

    const back = () => { setStepIndex(state => state - 1) }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitted(true);
    }

    return (
        <div className="MultiStepForm">

            <Topics stepIndex={stepIndex} />
            
            {!submitted &&
                <form onSubmit={handleSubmit}>   
                    { formDetails.map((form, i) => (
                        <div className="input-btns-container" key={i} style={stepIndex === i ? {opacity: 1} : {opacity: 0, marginLeft: -2000}}>
                            <div className="input-container" key={i}>                                   
                                <div>
                                    <div className="heading-wrapper">
                                        <h1>{form.heading}</h1>
                                        <p>{form.subHeading}</p>
                                    </div>                                   
                                    {componentArr[i]}                                   
                                </div>                                   
                            </div>
                            <div className="btns-container">
                                <Buttons
                                    i={i}
                                    stepIndex={stepIndex}
                                    next={next}
                                    back={back}
                                    stepCount={formDetails.length}
                                />
                            </div>                               
                        </div>
                    ))}   
                </form>
            }
            {submitted && <div><ThankYou /></div>}
            
        </div>
    )
}