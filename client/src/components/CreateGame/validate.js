const validate = (input) => {
    let errors = {};

    if(!input.name) {
        errors.name = 'Name is required';
        //only letters, spaces and numbers
    } else if (!/^[A-Za-z0-9 ]+$/.test(input.name)) {
        errors.name = 'alphanumeric characters only';
    }

    if(!input.description) {
        errors.description = 'Description is required';
    } else if (!/^[A-Za-z0-9 ]+$/.test(input.description)) {
        errors.description = 'alphanumeric characters only';
    }

    if(input.platforms.length === 0) {
        errors.platforms = 'At least one platform is required';
    }
    
    return errors;
}

export default validate;