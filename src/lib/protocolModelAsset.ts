let protocolModelBufferPromise: Promise<ArrayBuffer> | null = null;

export function preloadProtocolModelBuffer() {
  if (protocolModelBufferPromise) return protocolModelBufferPromise;

  protocolModelBufferPromise = fetch("/protocol.glb", { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Protocol model request failed: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .catch((error) => {
      protocolModelBufferPromise = null;
      throw error;
    });

  return protocolModelBufferPromise;
}
