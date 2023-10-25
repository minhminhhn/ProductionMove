import { toast } from "react-toastify"



const TYPE_SUCCESS = 'SUCCESS';
const TYPE_INFO = 'INFO';
const TYPE_WARN = 'WARN';
const TYPE_ERROR = 'ERROR';

export default class ToastUtil {
    static show = (type, message, autoCloseDelay = 3000) => {
        const options = {
            position: toast.POSITION.TOP_RIGHT,
            pauseOnHover: true,
            autoClose: autoCloseDelay
        };
        switch (type) {
            case TYPE_SUCCESS:
                toast.success(message, options)
                break
            case TYPE_INFO:
                toast.info(message, options);
                break;
            case TYPE_WARN:
                toast.warn(message, options);
                break;
            case TYPE_ERROR:
                toast.error(message, options);
                break;
            default:
                break;
        }
    }
    static success(message, duration = 3000) {
        this.show(TYPE_SUCCESS, message, duration);
    }

    static info(message, duration = 3000) {
        this.show(TYPE_INFO, message, duration);
    }

    static warn(message, duration = 3000) {
        this.show(TYPE_WARN, message, duration);
    }

    static error(message, duration = 3000) {
        this.show(TYPE_ERROR, message, duration);
    }

    static successRaw(message, duration = 3000) {
        this.show(TYPE_SUCCESS, message, duration);
    }

    static errorRaw(message, autoCloseDelay = 3000) {
        this.show(TYPE_ERROR, message, autoCloseDelay);
    }
}