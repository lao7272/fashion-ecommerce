
const validateForm = (name:string, lastname:string, age: number, email:string, password:string, confirmPassword:string) => {
    const errorMessages = {
        nameError: "",
        lastnameError: "",
        ageError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-]{8,20}$/;
    const isValidPassword = passwordPattern.test(password);
    if(!name) {
        errorMessages.nameError = "Name field cannot be empty";
    }
    if(!lastname) {
        errorMessages.lastnameError = "Lastname field cannot be empty";
    }
    if(!age || age === 0) {
        errorMessages.ageError = "Age field cannot be empty";
    } else if(age < 18){
        errorMessages.ageError = "Must be over 18 years of age";
    }
    if (!email) {
        errorMessages.emailError = "Email field cannot be empty";
    }
    if(!isValidPassword || !password) {
        errorMessages.passwordError = "Password must be 8-20 characters long, and contain one uppercase and one lowercase character.";
    }
    if (!confirmPassword) {
        errorMessages.confirmPasswordError = "Confirm password field cannot be empty";
    } else if (password !== confirmPassword) {
        errorMessages.confirmPasswordError = "Those passwords didn't match. Try again.";
    }
    let isValid = true;
    if(
        errorMessages.nameError 
        || errorMessages.lastnameError
        || errorMessages.ageError 
        || errorMessages.passwordError 
        || errorMessages.confirmPasswordError 
        || errorMessages.emailError
    ) isValid = false;
    return {
        isValid,
        errorMessages
    };
}
export default validateForm;