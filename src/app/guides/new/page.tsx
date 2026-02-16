'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Loader2, CheckCircle2, Zap, Upload, FileText, Link as LinkIcon } from 'lucide-react';

const jobFamilies = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'Operations'];
const levels = ['Entry', 'Professional', 'Senior', 'Lead', 'Executive'];

type InputMode = 'manual' | 'upload';
type JDInputMethod = 'file' | 'link' | 'text';

export default function NewGuidePage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [inputMode, setInputMode] = useState<InputMode>('manual');
    const [jdInputMethod, setJDInputMethod] = useState<JDInputMethod>('file');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        jobFamily: '',
        role: '',
        level: '',
        jobDescription: '',
        jdLink: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulate AI generation
        setTimeout(() => {
            setIsGenerating(false);
            // In real app, redirect to guide details
            window.location.href = '/guides/1';
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            // Simulate extracting info from JD
            setTimeout(() => {
                setFormData({
                    title: 'Senior Software Engineer - Backend',
                    jobFamily: 'engineering',
                    role: 'Software Engineer',
                    level: 'senior',
                    jobDescription: 'Sample job description extracted from uploaded file...',
                    jdLink: '',
                });
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">AI Interview Platform</span>
                        </div>
                        <nav className="flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Dashboard
                            </Link>
                            <Link href="/guides" className="text-sm font-medium text-white transition-colors hover:text-white">
                                Guides
                            </Link>
                            <Link href="/analytics" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-6 py-8">
                {/* Back Button */}
                <Link
                    href="/dashboard"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-white">Create Interview Guide</h1>
                    <p className="text-slate-400">AI will generate skills and behavioral questions based on your job description</p>
                </div>


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Guide Title - Always Required */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <h2 className="mb-6 text-xl font-bold text-white">Guide Title</h2>
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-300">
                                Guide Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Senior Software Engineer - Backend"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                            <p className="mt-2 text-sm text-slate-400">
                                This will be the name of your interview guide
                            </p>
                        </div>
                    </div>

                    {/* Input Mode Selector */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h2 className="mb-4 text-lg font-bold text-white">How would you like to create your guide?</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setInputMode('manual')}
                                className={`rounded-xl border p-6 text-left transition-all ${inputMode === 'manual'
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                                    }`}
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-white">Enter Details Manually</h3>
                                <p className="text-sm text-slate-400">Fill out the form with job details and description</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setInputMode('upload')}
                                className={`rounded-xl border p-6 text-left transition-all ${inputMode === 'upload'
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                                    }`}
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                    <Upload className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-white">Upload Job Description</h3>
                                <p className="text-sm text-slate-400">Upload a JD file and AI will extract the details</p>
                            </button>
                        </div>
                    </div>

                    {/* JD Input Options (shown when upload mode is selected) */}
                    {inputMode === 'upload' && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                            <h2 className="mb-6 text-xl font-bold text-white">Provide Job Description</h2>

                            {/* JD Input Method Selector */}
                            <div className="mb-6 grid gap-3 md:grid-cols-3">
                                <button
                                    type="button"
                                    onClick={() => setJDInputMethod('file')}
                                    className={`rounded-lg border p-4 text-left transition-all ${jdInputMethod === 'file'
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                                        }`}
                                >
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                        <Upload className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="mb-1 text-sm font-semibold text-white">Upload File</h3>
                                    <p className="text-xs text-slate-400">PDF, DOC, DOCX, TXT</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setJDInputMethod('link')}
                                    className={`rounded-lg border p-4 text-left transition-all ${jdInputMethod === 'link'
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                                        }`}
                                >
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                        <LinkIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="mb-1 text-sm font-semibold text-white">Add Link</h3>
                                    <p className="text-xs text-slate-400">URL to JD page</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setJDInputMethod('text')}
                                    className={`rounded-lg border p-4 text-left transition-all ${jdInputMethod === 'text'
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                                        }`}
                                >
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                                        <FileText className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="mb-1 text-sm font-semibold text-white">Paste Text</h3>
                                    <p className="text-xs text-slate-400">Copy & paste JD</p>
                                </button>
                            </div>

                            {/* File Upload */}
                            {jdInputMethod === 'file' && (
                                <div>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="jd-upload"
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="jd-upload"
                                            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-12 transition-colors hover:border-purple-500/50 hover:bg-white/10"
                                        >
                                            <Upload className="mb-4 h-12 w-12 text-purple-400" />
                                            <p className="mb-2 text-lg font-medium text-white">
                                                {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                                            </p>
                                            <p className="text-sm text-slate-400">PDF, DOC, DOCX, or TXT (max 10MB)</p>
                                        </label>
                                    </div>

                                    {uploadedFile && (
                                        <div className="mt-4 flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                                            <div className="flex-1">
                                                <p className="font-medium text-white">File uploaded successfully</p>
                                                <p className="text-sm text-slate-400">AI is extracting job details...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Link Input */}
                            {jdInputMethod === 'link' && (
                                <div>
                                    <label htmlFor="jdLink" className="mb-2 block text-sm font-medium text-slate-300">
                                        Job Description URL
                                    </label>
                                    <input
                                        type="url"
                                        id="jdLink"
                                        name="jdLink"
                                        value={formData.jdLink}
                                        onChange={handleChange}
                                        placeholder="https://example.com/careers/job-posting"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    />
                                    <p className="mt-2 text-sm text-slate-400">
                                        AI will fetch and analyze the job description from this URL
                                    </p>
                                </div>
                            )}

                            {/* Text Input */}
                            {jdInputMethod === 'text' && (
                                <div>
                                    <label htmlFor="jdText" className="mb-2 block text-sm font-medium text-slate-300">
                                        Job Description Text
                                    </label>
                                    <textarea
                                        id="jdText"
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                        rows={12}
                                        placeholder="Paste the full job description here. AI will analyze it to generate relevant skills and behavioral interview questions..."
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    />
                                    <p className="mt-2 text-sm text-slate-400">
                                        The more detailed your job description, the better the AI-generated questions will be.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Basic Info Card (shown for both modes, but required only for manual) */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Basic Information</h2>
                            {inputMode === 'upload' && uploadedFile && (
                                <span className="text-sm text-green-400">Auto-filled from JD</span>
                            )}
                        </div>

                        {/* Optional fields message for upload mode */}
                        {inputMode === 'upload' && (
                            <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="h-5 w-5 flex-shrink-0 text-blue-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-300">Optional but Recommended</p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Adding these details will help AI generate more fine-tuned recommendations.
                                            However, leaving them blank won't negatively impact the results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="jobFamily" className="mb-2 block text-sm font-medium text-slate-300">
                                        Job Family {inputMode === 'manual' && '*'}
                                        {inputMode === 'upload' && <span className="ml-1 text-xs text-slate-500">(Optional)</span>}
                                    </label>
                                    <select
                                        id="jobFamily"
                                        name="jobFamily"
                                        required={inputMode === 'manual'}
                                        value={formData.jobFamily}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    >
                                        <option value="">Select job family</option>
                                        {jobFamilies.map((family) => (
                                            <option key={family} value={family.toLowerCase()}>
                                                {family}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="level" className="mb-2 block text-sm font-medium text-slate-300">
                                        Level {inputMode === 'manual' && '*'}
                                        {inputMode === 'upload' && <span className="ml-1 text-xs text-slate-500">(Optional)</span>}
                                    </label>
                                    <select
                                        id="level"
                                        name="level"
                                        required={inputMode === 'manual'}
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    >
                                        <option value="">Select level</option>
                                        {levels.map((level) => (
                                            <option key={level} value={level.toLowerCase()}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-300">
                                    Role Title {inputMode === 'manual' && '*'}
                                    {inputMode === 'upload' && <span className="ml-1 text-xs text-slate-500">(Optional)</span>}
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    required={inputMode === 'manual'}
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g., Software Engineer"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>
                    </div>


                    {/* AI Features Info */}
                    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm">
                        <div className="mb-4 flex items-center gap-2 text-purple-400">
                            <Zap className="h-5 w-5" />
                            <h3 className="font-semibold">What AI will generate:</h3>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                                <div>
                                    <div className="font-medium text-white">8 Core Skills</div>
                                    <div className="text-sm text-slate-400">Role-specific competencies</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                                <div>
                                    <div className="font-medium text-white">24 Questions</div>
                                    <div className="text-sm text-slate-400">Behavioral STAR format</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                                <div>
                                    <div className="font-medium text-white">Scoring Guides</div>
                                    <div className="text-sm text-slate-400">High/Medium/Low criteria</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/dashboard"
                            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Generating with AI...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-5 w-5" />
                                    Generate Interview Guide
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Generation Progress (shown when generating) */}
                {isGenerating && (
                    <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-8 backdrop-blur-sm">
                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">AI is creating your interview guide...</h3>
                            <p className="text-slate-400">This usually takes 10-15 seconds</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                                <span className="text-white">Analyzing job description</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                                <span className="text-white">Generating skills and competencies</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                                <span className="text-slate-400">Creating behavioral questions</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                                <span className="text-slate-400">Building scoring guides</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
