import React from "react";

interface Modal {
    id?: string;
    backdropClose?: boolean;
}

export const Modal: React.FC<Modal> = ({
    children,
    id = "modal",
    backdropClose = true,
}): JSX.Element => (
    <div
        className="modal fade"
        id={id}
        data-bs-backdrop={backdropClose ? "true" : "static"}
        tabIndex={-1}
        aria-labelledby={id}
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-rad">{children}</div>
        </div>
    </div>
);

export const ModalHeader: React.FC<unknown> = ({ children }): JSX.Element => (
    <div className="modal-header border-0">{children}</div>
);

export const ModalBody: React.FC<unknown> = ({ children }): JSX.Element => (
    <div className="modal-body py-0">{children}</div>
);

export const ModalFooter: React.FC<unknown> = ({ children }): JSX.Element => (
    <div className="modal-footer bg-white border-0 border-rad">{children}</div>
);

interface ModalClose {
    onClick?: () => void;
    className?: string;
    closeOnBtnClick?: boolean;
}

export const ModalClose: React.FC<ModalClose> = ({
    children,
    onClick = () => {},
    className,
    closeOnBtnClick = true,
}): JSX.Element =>
    closeOnBtnClick ? (
        <button
            type="button"
            className={className || "btn-close"}
            onClick={onClick}
            data-bs-dismiss="modal"
            aria-label="Close"
        >
            {children}
        </button>
    ) : (
        <button type="button" className={className} onClick={onClick}>
            {children}
        </button>
    );

interface OpenModalButton {
    id?: string;
    disabled?: boolean;
    className?: string;
}

export const OpenModalButton: React.FC<OpenModalButton> = ({
    children,
    id = "open-modal-button",
    disabled,
    className,
}): JSX.Element => (
    <button
        type="button"
        disabled={disabled}
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
        className={className || "btn btn-reef btn-lg border-rad w-100"}
    >
        <span>{children}</span>
    </button>
);

interface ConfirmationModal {
    id?: string;
    backdropClose?: boolean;
    title: string;
    onClickFun: () => void;
    btnLabel?: string;
    closeOnBtnClick?: boolean;
    hideCloseBtn?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModal> = ({
    id = "exampleModal",
    backdropClose = true,
    title,
    onClickFun,
    btnLabel = "Confirm",
    closeOnBtnClick = true,
    hideCloseBtn = false,
    children,
}): JSX.Element => (
    <Modal id={id} backdropClose={backdropClose}>
        <ModalHeader>
            <h5 className="title-text user-select-none">{title}</h5>
            {!hideCloseBtn && <ModalClose />}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
            <ModalClose
                onClick={onClickFun}
                closeOnBtnClick={closeOnBtnClick}
                className="btn btn-reef border-rad"
            >
                <span>{btnLabel}</span>
            </ModalClose>
        </ModalFooter>
    </Modal>
);

export default ConfirmationModal;
