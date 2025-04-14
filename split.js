document.addEventListener("DOMContentLoaded", () => {
    /**
     * Generic splitter initializer.
     * @param {string} splitSelector - Selector for the container element (split area).
     * @param {string} panel0Selector - Selector for the first panel.
     * @param {string} panel1Selector - Selector for the second panel.
     * @param {string} gutterClass - Class name for the gutter element.
     * @param {boolean} isHorizontal - If true, handles horizontal resizing; otherwise vertical.
     * @param {object} options - Customizable options (e.g., minSize0, minSize1, iframeSelector).
     */
    function initializeSplitter(splitSelector, panel0Selector, panel1Selector, gutterClass, isHorizontal, options = {}) {
        const {
            minSize0 = 100,
            minSize1 = 100,
            cursorType = isHorizontal ? "col-resize" : "row-resize",
            iframeSelector = null, // Optional: Selector for iframes
        } = options;

        const split = document.querySelector(splitSelector);
        const panel0 = document.querySelector(panel0Selector);
        const panel1 = document.querySelector(panel1Selector);

        const gutter = document.createElement("div");
        gutter.classList.add(gutterClass);
        split.insertBefore(gutter, panel1);

        let isDragging = false;
        let startCoord = 0;
        let startSize0 = 0;
        let startSize1 = 0;

        const iframes = iframeSelector ? document.querySelectorAll(iframeSelector) : null;

        const toggleIframePointerEvents = (disable) => {
            if (!iframes) return; // No iframes to handle
            iframes.forEach((iframe) => {
                iframe.style.pointerEvents = disable ? "none" : "auto";
            });
        };

        // Adjust panel sizes dynamically
        const adjustPanels = () => {
            const gutterSize = isHorizontal ? gutter.offsetWidth : gutter.offsetHeight;
            const totalSize = isHorizontal ? split.offsetWidth - gutterSize : split.offsetHeight - gutterSize;

            const panel0Size = (parseFloat(getComputedStyle(panel0)[isHorizontal ? "width" : "height"]) / totalSize) * 100;
            const panel1Size = (parseFloat(getComputedStyle(panel1)[isHorizontal ? "width" : "height"]) / totalSize) * 100;

            const remainder = 100 - (panel0Size + panel1Size);
            panel0.style[isHorizontal ? "width" : "height"] = `${panel0Size + remainder / 2}%`;
            panel1.style[isHorizontal ? "width" : "height"] = `${panel1Size + remainder / 2}%`;
        };

        // Handle dragging
        gutter.addEventListener("mousedown", (event) => {
            isDragging = true;
            startCoord = isHorizontal ? event.clientX : event.clientY;
            startSize0 = isHorizontal ? panel0.offsetWidth : panel0.offsetHeight;
            startSize1 = isHorizontal ? panel1.offsetWidth : panel1.offsetHeight;

            document.body.style.userSelect = "none";
            document.body.style.cursor = cursorType;

            // Disable pointer events for iframes
            toggleIframePointerEvents(true);

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", onStopDrag);
        });

        const onDrag = (event) => {
            if (!isDragging) return;

            const delta = (isHorizontal ? event.clientX : event.clientY) - startCoord;
            const newSize0 = startSize0 + delta;
            const newSize1 = startSize1 - delta;

            if (newSize0 > minSize0 && newSize1 > minSize1) {
                panel0.style[isHorizontal ? "width" : "height"] = `${newSize0}px`;
                panel1.style[isHorizontal ? "width" : "height"] = `${newSize1}px`;
            }
        };

        const onStopDrag = () => {
            isDragging = false;
            document.body.style.userSelect = "";
            document.body.style.cursor = "";

            toggleIframePointerEvents(false);

            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", onStopDrag);
            adjustPanels();
        };

        window.addEventListener("resize", adjustPanels);
        adjustPanels();
    }

    // Initialize vertical splitter
    initializeSplitter(
        ".split", 
        "#editor-space", 
        "#preview-space", 
        "gutter-vertical",
        true,
        {
            minSize0: 10,
            minSize1: 10,
            cursorType: "col-resize",
            iframeSelector: "iframe",
        }
    );
    // Initialize horizontal splitter
    initializeSplitter(
        ".reference-space",
        ".reference",
        ".preview",
        "gutter-horizontal",
        false,
        {
            minSize0: 10,
            minSize1: 10,
            cursorType: "row-resize",
            iframeSelector: "iframe",
        }
    );
});
