import './styles/Topics.css'
import formDetails from '../data/formDetails.json'

type TopicsType = {
    stepIndex: number
}

export default function Topics({ stepIndex }: TopicsType) {
    console.log(stepIndex)
    return (
        <div className="Topics">
            { formDetails.map((item, i) => (
                <div className='topic' key={i}>
                    <div className={stepIndex === i ? 'number curr-step' : 'number'}>{i + 1}</div>
                    <div className="text-container">
                        <p>{'step' + (i + 1)}</p>
                        <h1>{item.topic}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}