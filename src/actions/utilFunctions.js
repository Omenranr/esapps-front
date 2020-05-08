export const formUser = (values, type) => {
    const {firstName, lastName, email, phone, address } = values
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: type,
        password: "esapps-tutor",
        phone: phone,
        address: address,
    }
    return user
}

export const constructOrg = values => {
    const {orgName, email, firstName, lastName, password} = values
    const organisation = {
        name: orgName,
        email: email,
        admin: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    }
    return organisation
}