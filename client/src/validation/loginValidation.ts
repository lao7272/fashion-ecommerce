import { LoginErrorMessages } from "../Types/Types"

const validateForm = (email:string, password:string) => {
    const errorMessages: LoginErrorMessages = {
        emailError: "",
        passwordError: ""
    }
    if(!email) {
        errorMessages.emailError = "Email field cannot be empty."
    }
    if (!password){
        errorMessages.passwordError = "Password field cannot be empty."
    }
    let isValid = true;
    if(errorMessages.emailError || errorMessages.passwordError) isValid = false;
    return {
        errorMessages, 
        isValid 
    }
}
export default validateForm;