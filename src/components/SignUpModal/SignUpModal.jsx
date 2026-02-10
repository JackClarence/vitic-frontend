import {useInput} from "../../utils/useInput";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({onSignUpUser, onCloseModal, isOpen}) {
    const defValues = {email: "", password: "", name: ""};
    const { values, setValues, handleChange } = useInput(defValues);
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const user = values;
        await onSignUpUser(user);
        setValues(defValues);
    };
    const nameInput = (<label htmlFor="name" className="modal__label">Name<input type="text" name="name" className="modal__input" id="name" placeholder="Name" onChange={handleChange} value={values.name}/></label>);
    return (
        <ModalWithForm
            name="sign-in-user"
            buttonText="Sign Up"
            titleText="Sign Up"
            nameInput={nameInput}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            values={values}
        >
        </ModalWithForm>
        
    )
};

export default SignUpModal;