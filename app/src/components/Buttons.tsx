import './styles/Button.css'

type ButtonsProps = {
    i: number
    stepIndex: number
    next: () => void
    back: () => void
    stepCount: number
}

export default function Buttons({ i, stepIndex, next, back, stepCount }: ButtonsProps ) {
    const handleNextClick = () => {
        if (stepIndex === i) {
            next()
        }
    }

    const handleBackClick = () => {
        if (stepIndex === i) {
            back()
        }
    }

    return (
        <>
            { stepIndex > 0 &&
                <button 
                    type="button" 
                    onClick={handleBackClick}
                    className="back-btn"
                > 
                    Go Back
                </button>
            }
            { stepIndex === stepCount - 1 &&
                <button type="submit" className="confirm-btn">Confirm</button>
            }
            { stepIndex < stepCount - 1 &&
                <button 
                    type="button" 
                    onClick={handleNextClick}
                    className="next-btn"
                > 
                    Next Step
                </button>
            }           
        </>   
    )
}