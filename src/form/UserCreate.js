import { useState, useEffect } from 'react';

function UserCreate() {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneType, setPhoneType] = useState('')
    const [bio, setBio] = useState('')
    const [staff, setStaff] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(true);

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [validationErrors, setValidationErrors] = useState({})

    const handleStudentChange = () => {
        setStaff('student');
    };

    const handleInstructorChange = () => {
        setStaff('instructor');
    };

    const handleChangeEmailNotifications = () => {
        setEmailNotifications(!emailNotifications);
    };

    useEffect(() => {
        const errors = {};
        if (!name.length) errors['name'] = 'Please enter your Name';
        if (!email.includes('@')) errors['email'] = 'Please provide a valid Email';
        setValidationErrors(errors);
    }, [name, email])

    const onSubmit = e => {
        e.preventDefault();

        setHasSubmitted(true);

        if (Object.values(validationErrors).length)
            return alert(`The following errors were found:

        ${validationErrors.name ? "* " + validationErrors.name : ""}
        ${validationErrors.email ? "* " + validationErrors.email : ""}`);

        const contactUsInformation = {
            name,
            email,
            phoneNumber,
            phoneType,
            bio,
            staff,
            emailNotifications,
            submittedOn: new Date()
        };

        console.log(contactUsInformation);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setPhoneType('');
        setBio('');
        setStaff('');
        setEmailNotifications(true)
        setValidationErrors({});
        setHasSubmitted(false);
    }

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };

    const RadioButton = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="radio" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };

    return (

        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='name'>Name:</label>
                <input
                    id='name'
                    type='text'
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    type='text'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div>
                <label htmlFor='phoneNumber'>Phone Number:</label>
                <input
                    id='phoneNumber'
                    type='text'
                    onChange={e => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                <select
                    name='phoneType'
                    onChange={e => setPhoneType(e.target.value)}
                    value={phoneType}
                >
                    <option value='Home'>Home</option>
                    <option value='Work'>Work</option>
                    <option value='Mobile'>Mobile</option>
                </select>
            </div>

            <div>
                <RadioButton
                    label="Student"
                    value={staff === 'student'}
                    onChange={handleStudentChange}
                />
                <RadioButton
                    label="Instructor"
                    value={staff === 'instructor'}
                    onChange={handleInstructorChange}
                />
            </div>

            <div>
                <div>
                    <label htmlFor='bio'>Bio:</label>
                    <textarea
                        id='bio'
                        name='bio'
                        onChange={e => setBio(e.target.value)}
                        value={bio}
                    />
                </div>
            </div>

            <div>
                <Checkbox
                    label="Sign up for email notifications"
                    value={emailNotifications}
                    onChange={handleChangeEmailNotifications}
                />
            </div>

            <button>Submit</button>

        </form>
    );
}

export default UserCreate;
