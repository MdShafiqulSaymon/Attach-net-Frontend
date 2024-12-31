export default function AttachNetLogo(){
    return(
        <div className="w-28 h-28 mb-2">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Background Circle */}
              <circle cx="100" cy="100" r="90" fill="#4F46E5" />
              
              {/* Abstract Network Lines */}
              <path
                d="M60,100 L140,100 M100,60 L100,140"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="15"
                strokeLinecap="round"
              />
              
              {/* Connected Dots */}
              <circle cx="60" cy="100" r="12" fill="white" />
              <circle cx="140" cy="100" r="12" fill="white" />
              <circle cx="100" cy="60" r="12" fill="white" />
              <circle cx="100" cy="140" r="12" fill="white" />
              <circle cx="100" cy="100" r="15" fill="white" />
              
              {/* Animated Pulse Ring */}
              <circle 
                cx="100" 
                cy="100" 
                r="25" 
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="animate-ping opacity-75"
              />
              
              {/* Connection Lines */}
              <path
                d="M60,100 L100,60 M100,60 L140,100 M140,100 L100,140 M100,140 L60,100"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
    )
}