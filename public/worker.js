
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

// Skip local checks for the model
env.allowLocalModels = false;
env.useBrowserCache = true;

class TranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { text, src_lang, tgt_lang } = event.data;

    try {
        let translator = await TranslationPipeline.getInstance((x) => {
            // Send progress to main thread
            self.postMessage(x);
        });

        // Run translation
        let output = await translator(text, {
            src_lang: src_lang,
            tgt_lang: tgt_lang,
        });

        // Send result back
        self.postMessage({
            status: 'complete',
            output: output,
        });
    } catch (error) {
        self.postMessage({
            status: 'error',
            data: error.message,
        });
    }
});
