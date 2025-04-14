self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Only intercept image requests that are from the same origin
    const isImage = url.pathname.match(/\.(jpe?g|png)$/i);
    const isSameOrigin = url.origin === self.location.origin;

    if (isImage && isSameOrigin) {
        event.respondWith(fetchAndCompressImage(event.request));
    }
});

async function fetchAndCompressImage(request) {
    try {
        // Fetch the original image
        const originalResponse = await fetch(request);
        const blob = await originalResponse.blob();

        // Create an ImageBitmap to handle image data in the background
        const imageBitmap = await createImageBitmap(blob);

        // Resize image: downscale to 600px max width (if needed)
        const maxWidth = 600;
        const scale = Math.min(1, maxWidth / imageBitmap.width);

        const canvas = new OffscreenCanvas(imageBitmap.width / 3, imageBitmap.height / 3);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

        // Compress the image into WebP format with reduced quality (0.3)
        const compressedBlob = await canvas.convertToBlob({
            type: "image/webp",
            quality: 0.3,
        });

        // Return the compressed image as a response
        return new Response(compressedBlob, {
            headers: {
                "Content-Type": "image/webp",
            },
        });
    } catch (error) {
        console.error("Error compressing image:", error);
        // In case of any error, just return the original image (fallback)
        return fetch(request);
    }
}
