import { useState, useEffect, useRef, useCallback } from 'react';

export function useWorker() {
    // Use 'any' type to avoid complex Worker typing for this simple project
    const workerRef = useRef<Worker | null>(null);
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState<any>(null); // { status, name, file, progress, loaded, total }
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        // Initialize the worker
        workerRef.current = new Worker('/worker.js', {
            type: 'module',
        });

        const onMessage = (event: MessageEvent) => {
            const { status, output, data } = event.data;

            if (status === 'initiate' || status === 'download' || status === 'progress') {
                setProgress(event.data);
            } else if (status === 'complete') {
                setResult(output[0].translation_text);
                setProgress(null);
            } else if (status === 'error') {
                console.error('Worker Error:', data);
                alert('Translation Error: ' + data);
                setProgress(null);
            }
        };

        workerRef.current.addEventListener('message', onMessage);
        setReady(true);

        return () => {
            workerRef.current?.removeEventListener('message', onMessage);
            workerRef.current?.terminate();
        };
    }, []);

    const translate = useCallback((text: string, src_lang: string, tgt_lang: string) => {
        if (workerRef.current) {
            setResult(null);
            workerRef.current.postMessage({ text, src_lang, tgt_lang });
        }
    }, []);

    return { ready, progress, result, translate };
}
