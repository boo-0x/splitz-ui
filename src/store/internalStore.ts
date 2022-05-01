const SIGNER_POINTER = "reef-app-signer-pointer";

export const saveSignerLocalPointer = (index: number): void => {
    localStorage.setItem(SIGNER_POINTER, `${index}`);
};
