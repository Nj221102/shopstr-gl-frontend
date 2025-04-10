'use client';
import { useState } from 'react';
import Image from 'next/image';
import shopstrLogo from '../public/shopstr_logo.png';

type ExpiryOption = 'never' | '1min' | '1h' | '12h' | '1d' | '1month' | '1y';

const EXPIRY_OPTIONS = [
    { label: 'Never', value: 'never', seconds: null },
    { label: '1 Minute', value: '1min', seconds: 60 },
    { label: '1 Hour', value: '1h', seconds: 3600 },
    { label: '12 Hours', value: '12h', seconds: 43200 },
    { label: '1 Day', value: '1d', seconds: 86400 },
    { label: '1 Month', value: '1month', seconds: 2592000 },
    { label: '1 Year', value: '1y', seconds: 31536000 },
] as const;

// Get API URL from environment variable
const GREENLIGHT_API_URL = process.env.NEXT_PUBLIC_GREENLIGHT_API_URL || 'http://localhost:8081';
const USERNAME_API_URL = process.env.NEXT_PUBLIC_USERNAME_API_URL || 'http://localhost:8080';

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
            
            const offerResponse = await fetch(`${GREENLIGHT_API_URL}/api/create-offer${expiryParam}`);
            const offerData = await offerResponse.json();

            if (!offerData.success) {
                throw new Error(offerData.message || 'Failed to create offer');
            }

            const createResponse = await fetch(`${USERNAME_API_URL}/create-username`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                message: 'Username created successfully!'
            });
            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setResult(null);
        setUsername('');
        setSelectedExpiry('never');
        setError(null);
        setIsSuccess(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Background effect */}
            <div className="lightning-bg"></div>
            
            {/* Simplified header */}
            <header className="header">
                <div className="logo-container">
                    <Image 
                        src={shopstrLogo} 
                        alt="Shopstr Logo" 
                        width={28} 
                        height={28} 
                        className="logo-icon"
                    />
                    <span className="logo-text" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Bitcoin Username Registration</span>
                </div>
            </header>

            <main className="flex-grow relative">
                <div className="container">
                    <div className="logo-title-container">
                        <Image 
                            src={shopstrLogo} 
                            alt="Shopstr Logo" 
                            width={60} 
                            height={60} 
                            priority 
                        />
                        <span>Shopstr</span>
                    </div>
                    <p className="description">Make a Bitcoin username with @nitishjha.space</p>

                    <form onSubmit={handleSubmit} className="form-container space-y-5">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                disabled={isProcessing}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiry">Expiration Time</label>
                            <select
                                id="expiry"
                                value={selectedExpiry}
                                onChange={(e) => setSelectedExpiry(e.target.value as ExpiryOption)}
                                disabled={isProcessing}
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
                                className="flex items-center justify-center"
                            >
                                {isProcessing && <span className="spinner"></span>}
                                {isProcessing ? 'Processing...' : 'Create Username'}
                            </button>
                        )}
                    </form>

                    {(isSuccess || error) && (
                        <div className={`result-message ${isSuccess ? 'result-success' : 'result-error'}`} aria-live="assertive">
                            <div className="font-semibold mb-1.5 text-base">
                                {isSuccess ? '✓ Success!' : '× Error'}
                            </div>
                            <div className="mb-2">{error || result?.message}</div>
                            
                            {isSuccess && result?.username && (
                                <div className="mt-3">
                                    <p className="text-xs mb-1 text-gray-400">Your Username:</p>
                                    <code>{result.username}</code>
                                </div>
                            )}
                            
                            {isSuccess && (
                                <button onClick={resetForm}>
                                    Register Another
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}