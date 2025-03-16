import { useModal } from '../lib/Modal';
import RizzQ from '../pages/RizzQ';

// Captcha verification content component
const VerificationContent = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[300px]'>
      <span className='text-black'>
        This is a visual clone, no actual verification logic
      </span>

      <button className='mt-6 bg-[#4a90e2] px-4 py-2 rounded hover:bg-[#3b7dd8]'>
        Verifys
      </button>
    </div>
  );
};

export const CaptchaBase = () => {
  const { openModal } = useModal();

  const openVerificationModal = () => {
    openModal(<RizzQ />);
  };

  return (
    <div className='font-roboto text-sm'>
      {/* Main reCAPTCHA widget */}
      <div className='inline-block border border-gray-300 rounded shadow-sm bg-white'>
        <div className='flex items-center p-3 w-72'>
          <div className='flex items-center'>
            <div
              onClick={openVerificationModal}
              className='w-6 h-6 border border-gray-300 rounded mr-2 relative flex items-center justify-center cursor-pointer bg-white hover:border-[#2196f3]'
            >
              <div className='absolute w-4 h-4 bg-[#009688] rounded-sm flex items-center justify-center'>
                <svg className='w-3 h-3 text-white' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
                  />
                </svg>
              </div>
            </div>
            <span className='text-gray-600'>I'm not a robot</span>
          </div>
        </div>
      </div>
    </div>
  );
};
