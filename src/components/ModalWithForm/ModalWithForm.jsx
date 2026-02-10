import "./ModalWithForm.css";

function ModalWithForm({
  titleText,
  buttonText,
  name,
  onSubmit, 
  onChange,
  isOpen,
  onCloseModal,
  nameInput,
  values
}) {
  return (
    <div className={`modal ${isOpen ? "modal_open": ""}`}>
      <div className="modal__content">
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          <div className="modal__form_header">
            <h2 className="modal__title">{titleText}</h2>
            <button
              className="modal__close"
              onClick={onCloseModal}
              type="button"
            >
              x
            </button>
          </div>
          <label htmlFor="email" className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={values.email}
            />
          </label>
          <label htmlFor="password" className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={values.password}
            />
          </label>
          {nameInput}
          <button className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
