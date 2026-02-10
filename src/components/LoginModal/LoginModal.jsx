import {useInput} from "../../utils/useInput";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({onLoginUser, onCloseModal, isOpen}) {
    const defValues = {email: "", password: ""};
    const { values, setValues, handleChange } = useInput(defValues);
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await onLoginUser(values);
        setValues(defValues);
    };
    return (
        <ModalWithForm
            name="login-user"
            buttonText="Log In"
            titleText="Log In"
            onSubmit={handleSubmit}
            onChange={handleChange}
            isOpen={isOpen}
            onCloseModal={onCloseModal}
            values={values}
        >
        </ModalWithForm>
        
    )
};

export default LoginModal;