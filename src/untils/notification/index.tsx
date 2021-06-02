import { notification } from 'antd';
import 'antd/dist/antd.css';


export const notifiError = (title: string, content: string) => {
    notification.config({
        duration: 2,
    });
    notification["error"]({
        message: title,
        description: content,
    });
};

export const notifiSuccess = (title: string, content: string) => {
    notification.config({
        duration: 2,
    });
    notification["success"]({
        message: title,
        description: content,
    });
};