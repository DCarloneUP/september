'use client'

import { useRouter } from 'next/navigation'

const environments = [
  { name: 'Upsystems', slug: 'upsystems' },
  { name: 'Yourmerchandising', slug: 'yourmerchandising' },
  { name: 'Replan ESG', slug: 'replan' },
  { name: 'Teamtalent', slug: 'teamtalent' },
]

export default function SelectEnvironmentPage() {
  const router = useRouter()

  const handleSelect = (slug: string) => {
    router.push(`/${slug}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-8">Seleziona un ambiente di lavoro</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        {environments.map((env) => (
          <button
            key={env.slug}
            onClick={() => handleSelect(env.slug)}
            className="bg-white border hover:border-gray-400 shadow-md hover:shadow-lg text-lg px-6 py-4 rounded transition"
          >
            {env.name}
          </button>
        ))}
      </div>
    </div>
  )
}
