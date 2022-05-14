import { Notify } from "@reef-defi/react-lib";
import { utils as ethUtils, BigNumber } from "ethers";
import { toast } from "react-toastify";

export const notify = (message: string, type: Notify = "success"): void => {
    toast[type](message);
};

export const toCurrencyFormat = (value: number, options?: any): string =>
    Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
        ...options,
    }).format(value);

export const toHumanAmount = (amount: string): string => {
    const head = amount.slice(0, amount.indexOf("."));
    const amo = amount.replace(".", "");

    if (head.length > 9) {
        return `${amo.slice(0, head.length - 9)}.${amo.slice(
            head.length - 9,
            head.length - 9 + 2
        )} B`;
    }
    if (head.length > 6) {
        return `${amo.slice(0, head.length - 6)}.${amo.slice(
            head.length - 6,
            head.length - 6 + 2
        )} M`;
    }
    if (head.length > 3) {
        return `${amo.slice(0, head.length - 3)}.${amo.slice(
            head.length - 3,
            head.length - 3 + 2
        )} k`;
    }
    return amount.slice(0, head.length + 4);
};

export const formatAmount = (amount: number, decimals: number): string =>
    toHumanAmount(
        ethUtils.formatUnits(
            BigNumber.from(amount.toLocaleString("fullwide", { useGrouping: false })).toString(),
            decimals
        )
    );
