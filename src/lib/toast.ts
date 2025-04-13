import { toast } from "sonner"

export function notifySuccess(title: string, description?: string) {
    toast(title, {
        description,
        className: "bg-emerald-900 border border-emerald-600 text-white shadow-xl",
        duration: 4000,
        icon: "✅",
    });
}

export function notifyError(title: string, description?: string) {
    toast(title, {
        description,
        className: "bg-red-900 border border-red-600 text-white shadow-md",
        duration: 5000,
        icon: "❌",
    });
}

export function notifyInfo(title: string, description?: string) {
    toast(title, {
        description,
        className: "bg-blue-900 border border-blue-600 text-white shadow-md",
        duration: 4000,
        icon: "ℹ️",
    });
}
