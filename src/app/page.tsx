'use client';

import { useState, useEffect } from 'react';
import { useWorker } from '@/hooks/useWorker';

const LANGUAGES = [
    { code: 'eng_Latn', name: 'English' },
    { code: 'spa_Latn', name: 'Spanish' },
    { code: 'fra_Latn', name: 'French' },
    { code: 'deu_Latn', name: 'German' },
    { code: 'hin_Deva', name: 'Hindi' },
    { code: 'zho_Hans', name: 'Chinese (Simplified)' },
    { code: 'jpn_Jpan', name: 'Japanese' },
    { code: 'rus_Cyrl', name: 'Russian' },
    { code: 'por_Latn', name: 'Portuguese' },
    { code: 'ara_Arab', name: 'Arabic' },
];

export default function Home() {
    const { ready, progress, result, translate } = useWorker();

    const [input, setInput] = useState('');
    const [sourceLang, setSourceLang] = useState('eng_Latn');
    const [targetLang, setTargetLang] = useState('spa_Latn');

    // Load basic example text
    useEffect(() => {
        setInput('Hello world! Welcome to the future of AI translation.');
    }, []);

    // Typewriter effect state
    const [displayedResult, setDisplayedResult] = useState('');

    useEffect(() => {
        if (result) {
            let i = 0;
            setDisplayedResult('');
            const interval = setInterval(() => {
                setDisplayedResult(result.substring(0, i + 1));
                i++;
                if (i > result.length) clearInterval(interval);
            }, 30); // Speed of typing
            return () => clearInterval(interval);
        } else {
            setDisplayedResult('');
        }
    }, [result]);

    const handleTranslate = () => {
        if (!input) return;
        translate(input, sourceLang, targetLang);
    };

    return (
        <>
            <div className="background-wrapper">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="grid-overlay"></div>

            <main className="container">
                <h1>AI Translator</h1>
                <p className="subtitle">Universal translation powered by neural networks</p>

                <div className="card">
                    <div className="controls">
                        <div className="select-wrapper">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem' }}>
                            ⇄
                        </div>

                        <div className="select-wrapper">
                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="translation-area">
                        <div className="textarea-wrapper">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter text to translate..."
                                spellCheck={false}
                            />
                        </div>
                        <div className="textarea-wrapper">
                            <textarea
                                readOnly
                                value={progress ? "" : displayedResult}
                                placeholder={progress ? "" : "Translation appearing..."}
                            />
                            {progress && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'rgba(255,255,255,0.5)',
                                    pointerEvents: 'none'
                                }}>
                                    Thinking...
                                </div>
                            )}
                        </div>
                    </div>

                    {progress && (
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress.progress || 0}%` }}
                                ></div>
                            </div>
                            <p className="status-text">
                                {progress.status === 'initiate' ? 'Booting Neural Engine...' :
                                    progress.status === 'download' ? `Downloading Model Weights (${Math.round(progress.progress || 0)}%)` :
                                        'Synthesizing Translation...'}
                            </p>
                        </div>
                    )}

                    <button
                        className="btn-translate"
                        onClick={handleTranslate}
                        disabled={!!progress}
                    >
                        {progress ? 'Processing...' : 'Translate Text'}
                    </button>
                </div>
            </main>

            <div className="trademark">Project by Anav Jain</div>
        </>
    );
}
