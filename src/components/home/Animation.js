        <style jsx>{`
          @keyframes slowScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes slideRight {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideUp {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0.9);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes textFocus {
            0% {
              filter: blur(4px);
              opacity: 0;
            }
            100% {
              filter: blur(0);
              opacity: 1;
            }
          }

          @keyframes grow {
            0% {
              width: 0;
            }
            100% {
              width: 100%;
            }
          }

          .animate-slow-scroll {
            animation: slowScroll 30s linear infinite;
          }

          .animate-slide-right {
            animation: slideRight 1s ease-out forwards;
          }

          .animate-slide-up {
            animation: slideUp 1s ease-out forwards;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-fade-in-delayed {
            animation: fadeIn 1s ease-out 0.3s forwards;
            opacity: 0;
          }

          .animate-scale-in {
            animation: scaleIn 1.2s ease-out forwards;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-text-focus {
            animation: textFocus 0.8s ease-out forwards;
          }

          .animate-grow {
            animation: grow 1s ease-out forwards;
          }

          .animate-card {
            opacity: 0;
            animation: fadeIn 0.8s ease-out forwards;
          }

          .animate-card:nth-child(1) {
            animation-delay: 0.2s;
          }
          .animate-card:nth-child(2) {
            animation-delay: 0.4s;
          }
          .animate-card:nth-child(3) {
            animation-delay: 0.6s;
          }

          .animate-slow-scroll:hover {
            animation-play-state: paused;
          }

          .logo-item {
            transition: all 0.3s ease;
          }

          .logo-item:hover {
            transform: scale(1.1);
            opacity: 0.8;
          }
          @keyframes gradientText {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardPopUp {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes gradientShine {
            0% {
              background-position: 200% 50%;
            }
            100% {
              background-position: -200% 50%;
            }
          }

          @keyframes pulseButton {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes bounceButton {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          .animate-gradient-text {
            background-size: 200% auto;
            animation: gradientText 3s linear infinite;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-card-pop-up {
            opacity: 0;
            animation: cardPopUp 0.6s ease-out forwards;
          }

          .animate-gradient-shine {
            background-size: 200% auto;
            animation: gradientShine 3s linear infinite;
          }

          .animate-pulse-soft {
            animation: pulseButton 2s infinite;
          }

          .animate-bounce-button {
            animation: bounceButton 2s infinite;
          }

          .animate-image-hover {
            transform-origin: center;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(-30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes bounceIn {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes numberPulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-slide-up {
            animation: slideUp 1s ease-out forwards;
          }

          .animate-slide-in {
            opacity: 0;
            animation: slideIn 0.8s ease-out forwards;
          }

          .animate-scale-in {
            animation: scaleIn 1s ease-out forwards;
          }

          .animate-bounce-in {
            animation: bounceIn 1s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
          }

          .animate-number {
            animation: numberPulse 2s ease-in-out infinite;
          }

          .hover-float:hover {
            transform: translateY(-10px);
            transition: transform 0.3s ease;
          }

          .hover-bright {
            transition: all 0.3s ease;
          }

          .hover-bright:hover {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            transform: scale(1.05);
          }

          .animate-fade-in-delayed {
            opacity: 0;
            animation: fadeIn 1s ease-out 0.3s forwards;
          }
          @keyframes slowScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes slideRight {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideUp {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes bounceSlow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes textFocus {
            0% {
              filter: blur(4px);
              opacity: 0;
            }
            100% {
              filter: blur(0);
              opacity: 1;
            }
          }

          .animate-slow-scroll {
            animation: slowScroll 30s linear infinite;
          }

          .animate-slide-right {
            animation: slideRight 1s ease-out forwards;
          }

          .animate-slide-up {
            animation: slideUp 1s ease-out forwards;
            opacity: 0;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-fade-in-delayed {
            animation: fadeIn 1s ease-out 0.3s forwards;
            opacity: 0;
          }

          .animate-scale-in {
            animation: scaleIn 1.2s ease-out forwards;
          }

          .animate-bounce-slow {
            animation: bounceSlow 3s ease-in-out infinite;
          }

          .animate-text-focus {
            animation: textFocus 0.8s ease-out forwards;
          }

          .animate-slow-scroll:hover {
            animation-play-state: paused;
          }

          .logo-item {
            transition: all 0.3s ease;
          }

          .logo-item:hover {
            transform: scale(1.1);
            opacity: 0.8;
          }
        `}</style>