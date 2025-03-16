import { useModal } from '../lib/Modal';
import { ChessPuzzle } from './chess';
import ImageCaptchaSelector from './ImageCaptchaSelector';
import { useState, useCallback, useEffect, useMemo } from 'react';
import LargeCaptchaSelector from './LargeCaptchaSelector';
import RizzQ from '../pages/RizzQ';
import CATpcha from '../components/CATpcha'
const VerificationContent = ({ onComplete }) => {
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [imageCaptchaTitle, setImageCaptchaTitle] = useState(
    'Select all images with a bus'
  );
  const { updateModalTitle } = useModal();

  const captchaComponents = useMemo(
    () => [
      {
        component: RizzQ,
        title: '',
      },
      {
        component: ImageCaptchaSelector,
        title: '',
      },
      {
        component: LargeCaptchaSelector,
        title: '',
      },
      {
        component: ChessPuzzle,
        title: '',
      },
      {
        component: RizzQ,
        title: '',
      },
      {
        component: CATpcha,
        title: '',
      },

    ],
    [imageCaptchaTitle]
  );

  const handleImageChallengeChange = useCallback(
    (newTitle) => {
      setImageCaptchaTitle(newTitle);
      if (currentCaptchaIndex === 1) {
        updateModalTitle(newTitle);
      }
    },
    [currentCaptchaIndex, updateModalTitle]
  );

  useEffect(() => {
    updateModalTitle(captchaComponents[currentCaptchaIndex].title);
  }, [currentCaptchaIndex, updateModalTitle, captchaComponents]);

  const handleCaptchaPass = useCallback(
    (success) => {
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
            setCurrentCaptchaIndex((prevIndex) => prevIndex + 1);
          } else {
            if (onComplete) onComplete();
          }
        }, 1000);
      }, 1000);
    },
    [currentCaptchaIndex, captchaComponents.length, onComplete]
  );

  const CurrentCaptcha = captchaComponents[currentCaptchaIndex].component;

  return (
    <div className="relative w-full h-full">
      {!showSpinner && !showCheckmark && (
        currentCaptchaIndex === 0 ? (
          <CurrentCaptcha 
            onPass={handleCaptchaPass} 
            onChallengeChange={handleImageChallengeChange}
          />
        ) : (
          <CurrentCaptcha onPass={handleCaptchaPass} />
        )
      )}
  
      {showSpinner && (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
          <img
            src='/captcha_spinner.gif'
            alt='Verifying'
            className='min-w-24 min-h-24'
          />
        </div>
      )}

      {showCheckmark && (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
          <div className='min-w-24 min-h-24 bg-green-500 rounded-full flex items-center justify-center'>
            <svg className='w-16 h-16 text-white' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
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
    openModal(<VerificationContent onComplete={handleCaptchaComplete} />, '', {
      showFooter: false,
      contentProps: {
        className:
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50',
      },
    });
  }, [openModal, handleCaptchaComplete]);

  return (
    <div className='font-roboto text-sm '>
      {}
      <div className='inline-block border border-gray-300 rounded shadow-sm bg-white w-72'>
        <div className='flex w-full items p-3'>
          <div className='flex items-center w-full'>
            <div
              onClick={!isVerified ? openVerificationModal : undefined}
              className={`w-6 h-6 border border-gray-300 rounded mr-2 relative flex items-center justify-center ${
                !isVerified
                  ? 'cursor-pointer  hover:border-[#2196f3]'
                  : 'bg-[#009688]'
              }`}
            >
              {isVerified && (
                <div className='absolute w-4 h-4 bg-[#009688] rounded-sm flex items-center justify-center'>
                  <svg className='w-3 h-3 text-white' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className='text-black font-weight[550]'>I'm not a robot</span>
            <div className="ml-auto text-center">
              <img src="../../public/recaptcha_logo.svg" className="h-14 w-14 mx-auto" />
              <p className="text-[0.6rem] text-gray-600 mt-1">
                <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a> -
                <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" rel="noopener noreferrer" className="hover:underline"> Terms</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
