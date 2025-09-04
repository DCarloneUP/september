'use client'

import Link from 'next/link'

const environments = [
  { name: 'Upsystems', slug: 'upsystems', desc: 'ERP • AI • Digital Transformation' },
  { name: 'Yourmerchandising', slug: 'yourmerchandising', desc: 'Corporate Merch & e-commerce' },
  { name: 'Replan ESG', slug: 'replan', desc: 'Planning & Scheduling' },
  { name: 'Teamtalent', slug: 'teamtalent', desc: 'TeamSystem System Integrator' },
]

export default function SelectEnvironmentPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-2">Seleziona un ambiente di lavoro</h1>
        <p className="text-sm text-gray-600 mb-8">
          Scegli il brand con cui lavorare. Potrai cambiare ambiente in qualsiasi momento dai{' '}
          <span className="font-medium">Settings</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {environments.map((env) => (
            <Link
              key={env.slug}
              href={`/${env.slug}`}
              className="group bg-white/70 border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition"
            >
              <div className="text-lg font-semibold">{env.name}</div>
              {env.desc && <div className="text-xs text-gray-500 mt-1">{env.desc}</div>}

              <div className="mt-4 inline-flex items-center text-sm text-purple-700 group-hover:text-purple-800">
                Vai a {env.name}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
