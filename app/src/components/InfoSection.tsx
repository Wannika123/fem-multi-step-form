import { useContext, useState } from "react"
import { FormDataContext } from "../context/FormDataContext"
import { validateName, validateEmail, validatePhone } from "../utils/validators"
import './styles/InfoSection.css'

export default function InfoSection() {
    const { data, updateData } = useContext(FormDataContext)

    const [nameErrMessage, setNameErrMessage] = useState('');
    const [emailErrMessage, setEmailErrMessage] = useState('');
    const [phoneErrMessage, setPhoneErrMessage] = useState('');

    const validateInput = (
        value: string, 
        validator: (val: string) => boolean,     
        setErrMessage: React.Dispatch<React.SetStateAction<string>>,
        inputName: string
    ) => {
        if (value === '') {
            setErrMessage('This field is required');
            return;
        }

        const validInput = validator(value);       
        if (!validInput) {
            setErrMessage('Please enter a valid ' + inputName);
        } else {
            setErrMessage('');
        }   
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validateName(e.target.value)) {
            setNameErrMessage('');
        }
        updateData({ name: e.target.value })
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validateEmail(e.target.value)) {
            setEmailErrMessage('');
        }
        updateData({ email: e.target.value })
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // This function will also try to automatically format the phone number

        let value = e.target.value;

        if (value.length > 14) {
            value = value.slice(0, 14);
        }

        if (validatePhone(value)) {
            setPhoneErrMessage('');
        }
      
        let valueArr = value.replace(/[\+\s]/g, '').split('')
        let result = [];

        for (let i = 0; i < valueArr.length; i++) {
            if (i === 0) {
                result.push('+', valueArr[i])
            } else if (i === 1 || i === 4 || i === 7) {
                result.push(' ', valueArr[i])
            } else {
                result.push(valueArr[i])
            }
        }

        updateData({ phoneNumber: result.join('') })

        // if (/^\s/.test(value)) {
        //     value = value.replace(/\s/, '');
        //     updateData({ phoneNumber: value });
        // }
        // if (/^\S{2}/.test(value)) {
        //     value = value.replace(/^\S{2}/, value[0] + ' ' + value[1]);
        //     updateData({ phoneNumber: value });
        // }
        // if (/\S{4}/.test(value)) {
        //     const matched = value.match(/\S{4}/);
        //     if (matched) {
        //         let matchedAsStr = matched[0]
        //         value = value.replace(/\S{4}/, matchedAsStr.slice(0, 3) + ' ' + matchedAsStr[3])               
        //         updateData({ phoneNumber: value })
        //     }
        // }
        // if (value.length > 13) {
        //     updateData({ phoneNumber: value.slice(0, 13) });
        // }
        // if (/\s$/.test(value)) {
        //     value = value.replace(/\s$/, '');
        //     updateData({ phoneNumber: value })
        // }
    }

    return (
        <>
            <div className="info-label-input-container">
                <label htmlFor="name" className="info-label">Name</label>
                <input 
                    className={nameErrMessage !== '' ? "info-input invalid" : "info-input" }
                    type="text" 
                    id="name" 
                    name="name" 
                    autoComplete="name" 
                    required
                    value={data.name} 
                    placeholder="e.g. Stephen King"
                    autoFocus
                    onChange={handleNameChange}
                    onBlur={e => validateInput(e.target.value, validateName, setNameErrMessage, 'name')}
                />
                {nameErrMessage !== '' && <div className="err-message">{nameErrMessage}</div>}
            </div>
            <div className="info-label-input-container">
                <label htmlFor="email" className="info-label">Email Address</label>
                <input 
                    className={emailErrMessage !== '' ? "info-input invalid" : "info-input" }
                    type="email" 
                    id="email" 
                    name="email" 
                    autoComplete="email"
                    required
                    value={data.email} 
                    placeholder="e.g. stephenking@lorem.com"
                    onChange={handleEmailChange}
                    onBlur={e => validateInput(e.target.value, validateEmail, setEmailErrMessage, 'email address')}
                />
                {emailErrMessage !== '' && <div className="err-message">{emailErrMessage}</div>}
            </div>
            <div className="info-label-input-container">
                <label htmlFor="phone" className="info-label">Phone Number</label>
                <input  
                    className={phoneErrMessage !== '' ? "info-input invalid" : "info-input" }
                    type="text" 
                    id="phone" 
                    name="phone" 
                    autoComplete="tel"
                    required
                    value={data.phoneNumber} 
                    placeholder="e.g. +1 234 567 890"
                    onChange={handlePhoneChange}
                    onBlur={e => validateInput(e.target.value, validatePhone, setPhoneErrMessage, 'US phone number')}
                />
                {phoneErrMessage !== '' && <div className="err-message">{phoneErrMessage}</div>}
            </div>
        </>
    )
}