import { useModal } from "../lib/Modal";
import { ChessPuzzle } from "./chess";
import ImageCaptchaSelector from "./ImageCaptchaSelector";
import { useState, useCallback, useEffect, useMemo } from "react";
import LargeCaptchaSelector from "./LargeCaptchaSelector";

const TextCaptcha = ({ onPass }) => (
  <div className="flex flex-col items-center justify-center w-[96rem] min-h-[48rem]">
    <div className="text-xl mb-4">Text verification captcha would go here</div>
    <button 
      onClick={() => onPass(true)} 
      className="bg-blue-500 text-black p-2 rounded"
    >
      Simulate Pass
    </button>
  </div>
);

const VerificationContent = ({ onComplete }) => {
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [imageCaptchaTitle, setImageCaptchaTitle] = useState("Select all images with a bus");
  const { updateModalTitle } = useModal();

  const captchaComponents = useMemo(() => [
    {
        component: ImageCaptchaSelector,
        title: ""
      },
    {
        component: LargeCaptchaSelector,
        title: ""
    },
    {
      component: ChessPuzzle,
      title: "What is the best move? White to play, use long algebraic notation e.g. e2e5"
    },
    {
      component: TextCaptcha,
      title: "Type the characters you see in the image"
    }
  ], [imageCaptchaTitle]);

  const handleImageChallengeChange = useCallback((newTitle) => {
    setImageCaptchaTitle(newTitle);
    if (currentCaptchaIndex === 1) {
      updateModalTitle(newTitle);
    }
  }, [currentCaptchaIndex, updateModalTitle]);

  useEffect(() => {
    updateModalTitle(captchaComponents[currentCaptchaIndex].title);
  }, [currentCaptchaIndex, updateModalTitle, captchaComponents]);

  const handleCaptchaPass = useCallback((success) => {
    // If the captcha failed, don't show success animations
    if (success === false) {
      return;
    }
    
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
      setShowCheckmark(true);

      setTimeout(() => {
        setShowCheckmark(false);

        if (currentCaptchaIndex < captchaComponents.length - 1) {
          setCurrentCaptchaIndex(prevIndex => prevIndex + 1);
        } else {
          if (onComplete) onComplete();
        }
      }, 1000);
    }, 1500);
  }, [currentCaptchaIndex, captchaComponents.length, onComplete]);

  const CurrentCaptcha = captchaComponents[currentCaptchaIndex].component;

  return (
    <div className="relative">
      {}
      {!showSpinner && !showCheckmark && (
        currentCaptchaIndex === 0 ? (
          <CurrentCaptcha 
            onPass={handleCaptchaPass} 
            onChallengeChange={handleImageChallengeChange}
            // Uncomment the line below to use custom images
            // customImages={customCaptchaImages}
          />
        ) : (
          <CurrentCaptcha onPass={handleCaptchaPass} />
        )
      )}

      {/* Spinner animation */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <img src="/captcha_spinner.gif" alt="Verifying" className="w-24 h-24" />
        </div>
      )}

      {/* Checkmark animation */}
      {showCheckmark && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center transform scale-100">
            <svg className="w-16 h-16 text-black" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export const CaptchaBase = () => {
  const { openModal, closeModal } = useModal();
  const [isVerified, setIsVerified] = useState(false);

  const handleCaptchaComplete = useCallback(() => {
    setIsVerified(true);
    closeModal();
  }, [closeModal]);

  const openVerificationModal = useCallback(() => {
    openModal(
      <VerificationContent onComplete={handleCaptchaComplete} />, 
      "",
      {
        showFooter: false,
        contentProps: {
          className:
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50",
        },
      }
    );
  }, [openModal, handleCaptchaComplete]);

  return (
    <div className="font-roboto text-sm">
      {}
      <div className="inline-block border border-gray-300 rounded shadow-sm bg-white">
        <div className="flex items-center p-3 w-72">
          <div className="flex items-center">
            <div
              onClick={!isVerified ? openVerificationModal : undefined}
              className={`w-6 h-6 border border-gray-300 rounded mr-2 relative flex items-center justify-center ${!isVerified ? 'cursor-pointer bg-white hover:border-[#2196f3]' : 'bg-[#009688]'}`}
            >
              {isVerified && (
                <div className="absolute w-4 h-4 bg-[#009688] rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-gray-600">I'm not a robot</span>
          </div>
        </div>
      </div>
    </div>
  );
};