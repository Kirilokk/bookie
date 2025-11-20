import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

function ToastViewport({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Viewport
            ref={ref}
            className={cn(
        "fixed top-4 z-[100] flex flex-col-reverse h-40 w-full overflow-y-auto p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                className
            )}
            {...props}
        />
    );
};
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

function Toast({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(
                "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border-2 p-6 pr-8 shadow-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full border-primary/40 bg-card text-card-foreground shadow-primary/20",
                className
            )}
            {...props}
        />
    );
};
Toast.displayName = ToastPrimitives.Root.displayName;


function ToastAction({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Action
            ref={ref}
            className={cn(
                "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};
ToastAction.displayName = ToastPrimitives.Action.displayName;




function ToastClose({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Close
            ref={ref}
            className={cn(
                "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                className
            )}
            toast-close=""
            {...props}
        >
            <X className="h-4 w-4" />
        </ToastPrimitives.Close>
    );
};
ToastClose.displayName = ToastPrimitives.Close.displayName;



function ToastTitle({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Title
            ref={ref}
            className={cn(
                "text-lg font-semibold",
                className
            )}
            {...props}
        />
    );
};
ToastTitle.displayName = ToastPrimitives.Title.displayName;


function ToastDescription({ className, ref, ...props }) {
    return (
        <ToastPrimitives.Description
            ref={ref}
            className={cn(
                "text-md opacity-90",
                className
            )}
            {...props}
        />
    );
};
ToastTitle.displayName = ToastPrimitives.Description.displayName;



export {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
