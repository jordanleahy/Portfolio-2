"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface PasswordGateProps {
    onUnlock: () => void;
    correctPassword?: string;
}

export function PasswordGate({ onUnlock, correctPassword = "design2025" }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        // Fake network delay for effect
        await new Promise(resolve => setTimeout(resolve, 800));

        if (password === correctPassword) {
            onUnlock();
        } else {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md p-8 bg-neutral-900/50 border border-white/10 rounded-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/50">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-display uppercase tracking-wider text-center">Restricted Access</h2>
                    <p className="text-muted-foreground text-center mt-2">
                        This case study contains sensitive client data. Please enter the access code to view.
                        <br />
                        <span className="text-xs opacity-50">(Hint: design2025)</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Access Code"
                            className={`w-full bg-black/50 border ${error ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                            autoFocus
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-6 text-lg"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Unlock Case Study"}
                    </Button>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm text-center font-mono mt-2"
                        >
                            Access Denied: Incorrect Password
                        </motion.p>
                    )}
                </form>
            </motion.div>
        </div>
    );
}
