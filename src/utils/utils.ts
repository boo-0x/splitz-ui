import { Notify } from "@reef-defi/react-lib";
import { toast } from "react-toastify";

export const notify = (message: string, type: Notify = "success"): void => {
    toast[type](message);
};

export const trim = (value: string, size = 19): string =>
    value.length < size ? value : `${value.slice(0, size - 5)}...${value.slice(value.length - 5)}`;
