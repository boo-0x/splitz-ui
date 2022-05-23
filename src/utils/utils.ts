import { Notify } from "@reef-defi/react-lib";
import { toast } from "react-toastify";

export const notify = (message: string, type: Notify = "success"): void => {
    toast[type](message);
};

export const trim = (value: string, size = 19): string =>
    value.length < size ? value : `${value.slice(0, size - 5)}...${value.slice(value.length - 5)}`;

export const formatAmount = (value: number | undefined, decimals = 2): string => {
    if (value === undefined) return "0";

    return value > 0 && value < 0.01
        ? "<0.01"
        : value.toLocaleString("fullwide", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
          });
};

export const explorerUrl = (isTestnet = false): string =>
    isTestnet ? "https://testnet.reefscan.com" : "https://reefscan.com";
