'use client';
import { useState } from 'react';

type ExpiryOption = 'never' | '1min' | '1h' | '12h' | '1d' | '1month' | '1y';

const EXPIRY_OPTIONS: { label: string; value: ExpiryOption; seconds: number | null }[] = [
    { label: 'Never', value: 'never', seconds: null },
    { label: '1 Minute', value: '1min', seconds: 60 },
    { label: '1 Hour', value: '1h', seconds: 3600 },
    { label: '12 Hours', value: '12h', seconds: 43200 },
    { label: '1 Day', value: '1d', seconds: 86400 },
    { label: '1 Month', value: '1month', seconds: 2592000 },
    { label: '1 Year', value: '1y', seconds: 31536000 },
];

// Get API URL from environment variable
const GREENLIGHT_API_URL = process.env.NEXT_PUBLIC_GREENLIGHT_API_URL || 'http://localhost:8081';

export default function Home() {
    const [username, setUsername] = useState('');
    const [selectedExpiry, setSelectedExpiry] = useState<ExpiryOption>('never');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ username: string; offer: string; message?: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError(null);
        setResult(null);
        setIsSuccess(false);

        try {
            const expiryOption = EXPIRY_OPTIONS.find(option => option.value === selectedExpiry);
            const expiryParam = expiryOption?.seconds ? `?expiry=${expiryOption.seconds}` : '';
            console.log('Selected expiry:', selectedExpiry);
            console.log('Expiry seconds:', expiryOption?.seconds);
            console.log('Expiry param:', expiryParam);
            
            const offerResponse = await fetch(`${GREENLIGHT_API_URL}/api/create-offer${expiryParam}`);
            const offerData = await offerResponse.json();

            if (!offerData.success) {
                throw new Error(offerData.message || 'Failed to create offer');
            }

            const createResponse = await fetch('/api/create-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    bolt12Offer: offerData.data.offer,
                }),
            });

            const createData = await createResponse.json();

            if (!createData.success) {
                throw new Error(createData.message || 'Failed to create username');
            }

            setResult({
                username: createData.data.username,
                offer: offerData.data.offer,
            });
            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main>
            <div className="container">
                <h1>Username Registration</h1>
                <p className="description">Make a Bitcoin username with @nitishjha.space</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            disabled={isProcessing || isSuccess}
                        />
                    </div>
                    <div>
                        <label htmlFor="expiry">
                            Expiration Time
                        </label>
                        <select
                            id="expiry"
                            value={selectedExpiry}
                            onChange={(e) => setSelectedExpiry(e.target.value as ExpiryOption)}
                            disabled={isProcessing || isSuccess}
                        >
                            {EXPIRY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {!isSuccess && (
                        <button
                            type="submit"
                            disabled={!username || isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Create Username'}
                        </button>
                    )}
                </form>

                {result && (
                    <div className={`result ${isSuccess ? 'success' : 'error'}`}>
                        <div className="result-title">{isSuccess ? 'Success!' : 'Error'}</div>
                        <div>{error || result.message}</div>
                        
                        {isSuccess && result.username && (
                            <div className="result-code">
                                <code>
                                    {result.username}
                                </code>
                            </div>
                        )}
                        
                        {isSuccess && (
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setUsername('');
                                    setSelectedExpiry('never');
                                    setIsSuccess(false);
                                }}
                            >
                                Register Another Username
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}