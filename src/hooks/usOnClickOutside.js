import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        // Define the listener on touch/click events
        const listener = (event) => {
            // ref.current tells us if the ProfileDropDown has been mounted or not. 
            // If the click/touch is inside the ref element, do nothing
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // Otherwise, it's an outsside handler, so handle the event
            handler(event);
        };

        // Mounting the listener for mousedown and touchstart events
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // Cleanup function to unmount the listener when ref/handler changes
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}