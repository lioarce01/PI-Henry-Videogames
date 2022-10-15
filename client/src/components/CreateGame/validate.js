const validate = (input) => {
    let errors = {};

    if(!input.name) {
        errors.name = 'Name is required';
        //only letters, spaces and numbers
    } else if (!/^[A-Za-z0-9 ]+$/.test(input.name)) {
        errors.name = 'Only letters, spaces and numbers';
    }

    if(!input.description) {
        errors.description = 'Description is required';
    } else if (!/^[A-Za-z ]+$/.test(input.description)) {
        errors.description = 'Only letters and spaces';
    }

    if(!input.platforms) {
        errors.platforms = 'Platform is required';
    }

    return errors;
}

export default validate;