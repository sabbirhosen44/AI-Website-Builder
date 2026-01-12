import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"
import { Link } from "react-router-dom"

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative px-4 py-8">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <AuthView
          pathname={pathname}
          classNames={{
            base: 'bg-gray-900/50 border border-white/10 backdrop-blur-xl shadow-2xl rounded-xl p-6 text-white',
            title: 'text-white font-bold text-xl',
            description: 'text-gray-400 text-sm mt-1',
            content: 'space-y-4',
            form: {
              label: 'text-white font-medium text-sm mb-1.5 block',
              input: 'w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all rounded-lg px-3 py-4 text-sm outline-none',
              button: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 transition-all font-medium text-white rounded-lg py-4 mt-4 text-sm',
              error: 'text-red-400 text-xs mt-1'
            },
            separator: 'text-gray-500 text-xs my-4',
            continueWith: 'text-gray-400 text-xs mb-3',
            footerLink: 'text-purple-400 hover:text-purple-300 transition-colors text-sm'
          }}
        />

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}