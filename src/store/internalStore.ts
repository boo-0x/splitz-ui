const SIGNER_POINTER = "splitz-signer-pointer";
const ERC20_TOKENS = "splitz-erc20-tokens";
const COLOR_SCHEME = "color-scheme";

export const saveSignerLocalPointer = (index: number): void => {
    localStorage.setItem(SIGNER_POINTER, `${index}`);
};

export const getSignerLocalPointer = (): number => {
    const item = localStorage.getItem(SIGNER_POINTER);
    return item ? parseInt(item, 10) : 0;
};

export const addErc20ToStorage = (address: string): void => {
    const erc20Tokens = getErc20Storage();
    if (erc20Tokens.indexOf(address) === -1) {
        erc20Tokens.push(address);
        localStorage.setItem(ERC20_TOKENS, JSON.stringify(erc20Tokens));
    }
};

export const removeErc20FromStorage = (address: string): void => {
    const erc20Tokens = getErc20Storage();
    const index = erc20Tokens.indexOf(address);
    if (index > -1) {
        erc20Tokens.splice(index, 1);
        localStorage.setItem(ERC20_TOKENS, JSON.stringify(erc20Tokens));
    }
};

export const getErc20Storage = (): string[] => {
    const erc20Tokens = localStorage.getItem(ERC20_TOKENS);
    return erc20Tokens ? JSON.parse(erc20Tokens) : [];
};

export const saveColorScheme = (darkMode: boolean): void => {
    localStorage.setItem(COLOR_SCHEME, darkMode ? "dark" : "light");
};

export const isColorSchemeDark = (): boolean => {
    const colorScheme = localStorage.getItem(COLOR_SCHEME);
    return colorScheme !== "light";
};
