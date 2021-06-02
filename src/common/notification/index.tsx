import { notification } from "antd"

export const notifiSuccess = (title: string, content: string) => {
    notification.config({
        duration: 2
    })
    notification['success']({
        message: title,
        description: content
    })
}