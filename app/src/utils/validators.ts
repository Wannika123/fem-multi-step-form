export function validateName(val: string) {
    if (/[^a-zA-Z ]/.test(val) || val === '') {
        return false
    }
    return true
}

export function validateEmail(val: string) {
    if (/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(val)) {
        return true
    }
    return false
}

export function validatePhone(val: string) {
    if (/^\+1\s\d{3}\s\d{3}\s\d{3}$/.test(val)) {
        return true
    }
    return false
}
