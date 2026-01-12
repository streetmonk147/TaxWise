import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
  }

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Main gradient circle */}
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          {/* Inner accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
          
          {/* Letter T with modern design */}
          <svg
            viewBox="0 0 100 100"
            className="w-3/4 h-3/4 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* T letter with rounded edges */}
            <path
              d="M30 25 L70 25 L70 35 L55 35 L55 75 L45 75 L45 35 L30 35 Z"
              fill="white"
              fillRule="evenodd"
            />
            {/* Small accent dot */}
            <circle cx="50" cy="85" r="4" fill="white" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizes[size]} leading-tight`}>
            Tax<span className="text-blue-600">Wise</span>
          </span>
          <span className="text-xs text-gray-500 -mt-0.5 font-medium">
            Smart Tax Solutions
          </span>
        </div>
      )}
    </Link>
  )
}
