import Link from 'next/link';
import { ArrowRight, Sparkles, Users, BarChart3, CheckCircle2 } from 'lucide-react';

export default function Home() {
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
              <Link href="/guides" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Guides
              </Link>
              <Link href="/analytics" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Interview Intelligence
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
            Transform Your Hiring
            <br />
            with AI-Driven Interviews
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-slate-300">
            Create structured interview guides in minutes, conduct interviews with real-time AI assistance,
            and make evidence-based hiring decisions.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
            >
              Go to Dashboard
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/demo"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">AI Guide Creation</h3>
            <p className="mb-4 text-slate-300">
              Generate comprehensive interview guides with behavioral questions and scoring criteria in seconds.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
              <CheckCircle2 className="h-4 w-4" />
              5 hours → 5 minutes
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Real-Time Interview Player</h3>
            <p className="mb-4 text-slate-300">
              Conduct interviews with live transcription, scoring guides, and AI-powered note-taking.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
              <CheckCircle2 className="h-4 w-4" />
              Live transcription & scoring
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Evidence-Based Evaluation</h3>
            <p className="mb-4 text-slate-300">
              Get AI-powered hiring recommendations backed by transcript evidence and structured scoring.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              Data-driven decisions
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-32 grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-white">98%</div>
            <div className="text-sm text-slate-400">Faster Guide Creation</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-white">100%</div>
            <div className="text-sm text-slate-400">Consistent Scoring</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-white">40%</div>
            <div className="text-sm text-slate-400">Reduced Time-to-Hire</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-white">24/7</div>
            <div className="text-sm text-slate-400">AI Availability</div>
          </div>
        </div>
      </main>
    </div>
  );
}
