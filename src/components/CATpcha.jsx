import { useState, useEffect, useCallback, useMemo } from "react";

const defaultImages = [
  { 
    id: 1, 
    src: "https://catpedia.wiki/images/3/3c/Zazu.jpg", 
    sillycat: true, 
  },
  { 
    id: 2, 
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYAisN75L5Wxo9d2F7Y_F_kUOhk9tz_bQUA&s", 
    sillycat: true,
  },
  { 
    id: 3, 
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7IlP_9dfIAcBDcSUr7SZeF6rsJ7US0j27gW138p_LurnJP4eFogZx6IX1dXHVZ3LODU&usqp=CAU", 
    sillycat: true,

  },
  { 
    id: 4, 
    src: "https://www.meme-arsenal.com/memes/08bb39abd141b3dbaf3f3093c1dd243a.jpg", 
    sillycat: true,
  },
  { 
    id: 5, 
    src: "https://i1.sndcdn.com/artworks-Tv8GPoDybgPxybY7-3EE3jQ-t500x500.jpg", 
    sillycat: true,

  },
  { 
    id: 6, 
    src: "https://i.redd.it/m0qrku4m8fb61.jpg", 
    sillycat: true,


  },
  { 
    id: 7, 
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5szWL45_SSCxUWSwLJa_Ptp9GPUbM4dhOaA&s", 
    sillycat: false,
  },
  { 
    id: 8, 
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg", 
    sillycat: false,

  },
  { 
    id: 9, 
    src: "https://styles.redditmedia.com/t5_35n40/styles/communityIcon_2pszua9nncu41.jpg?format=pjpg&s=29d0b10a37d6a038f5b686f62962ff818c533447", 
    sillycat: false,

  },
];

// Custom hook to manage captcha images
const useCaptchaImages = (initialImages = defaultImages) => {
  const [images, setImages] = useState(initialImages);
  
  // Function to update a specific image
  const updateImage = useCallback((id, newImageData) => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === id ? { ...img, ...newImageData } : img
      )
    );
  }, []);
  
  // Function to replace all images
  const setAllImages = useCallback((newImages) => {
    setImages(newImages);
  }, []);
  
  // Function to shuffle the images array
  const shuffleImages = useCallback(() => {
    setImages(prevImages => {
      // Create a copy of the array to avoid mutating the original
      const shuffled = [...prevImages];
      
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled;
    });
  }, []);
  
  return { images, updateImage, setAllImages, shuffleImages };
};

const CATpcha = ({ onPass, onChallengeChange, customImages }) => {
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [challenge, setChallenge] = useState('bus'); // Default challenge type
  const [loading, setLoading] = useState(false);
  
  // Use the custom hook to manage images
  const { images, setAllImages, shuffleImages } = useCaptchaImages(customImages);

  const challenges = useMemo(() => ['sillycat'], []);

  useEffect(() => {
    // If customImages prop changes, update all images
    if (customImages) {
      setAllImages(customImages);
    }
    
    // Shuffle the images when component mounts
    shuffleImages();
  }, [customImages, setAllImages, shuffleImages]);

  useEffect(() => {
    // Randomly select a challenge
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
    // Notify parent component about challenge change
    if (onChallengeChange) {
      onChallengeChange(`Select all images with a Silly Cat)`);
    }
  }, [challenges, onChallengeChange]);

  const toggleImageSelection = (imageId) => {
    const newSelectedImages = new Set(selectedImages);
    if (newSelectedImages.has(imageId)) {
      newSelectedImages.delete(imageId);
    } else {
      newSelectedImages.add(imageId);
    }
    setSelectedImages(newSelectedImages);
  };

  const validateSelections = () => {
    let correctSelections = new Set();
    
    images.forEach(image => {
      if (
        (challenge === 'sillycat' && image.sillycat)
      ) {
        correctSelections.add(image.id);
      }
    });

    // Check if user selected all correct images and no incorrect ones
    const selectedArray = Array.from(selectedImages);
    const correctArray = Array.from(correctSelections);
    
    const allCorrectSelected = correctArray.every(id => selectedImages.has(id));
    const noIncorrectSelected = selectedArray.every(id => correctSelections.has(id));
    
    return allCorrectSelected && noIncorrectSelected;
  };

  const handleVerify = () => {
    setLoading(true);
    setLoading(false);
    const isCorrect = validateSelections();
    
    if (isCorrect) {
      onPass(true);
    } else {
      // Pass false to onPass callback instead of just refreshing
      onPass(false);
      // Still refresh the challenge
      refreshChallenge();
    }
  };

  const refreshChallenge = () => {
    setSelectedImages(new Set());
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
    // Shuffle the images when refreshing the challenge
    shuffleImages();
    // Notify parent component about challenge change
    if (onChallengeChange) {
      onChallengeChange(`Select all images with a Silly Cat`);
    }
  };

  return (
    <div className="max-w-[96rem] bg-white rounded-md overflow-hidden pt-8 p-4 ">
      {/* Header */}
      <div className="bg-[#4A90E2] text-white p-4">
        <p className="font-bold text-lg">Select all images with a</p>
        <p className="text-2xl font-bold mb-1">Silly Cat</p>
        <p className="text-sm">Click verify once there are none left.</p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {images.map((image) => (
          <div 
            key={image.id}
            className={`relative cursor-pointer overflow-hidden `}
            onClick={() => toggleImageSelection(image.id)}
          >
            <img 
              src={image.src} 
              alt={`Captcha image ${image.id}`} 
              className="w-[150px] h-[150px] object-cover"
            />
            {selectedImages.has(image.id) && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-2 bg-[#F9F9F9] border-t border-gray-300">
        <div className="flex space-x-3">
          <button 
            onClick={refreshChallenge}
            className="text-gray-600 hover:text-gray-800"
            title="Get a new challenge"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800" title="Audio challenge">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800" title="Information">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`px-4 py-2 rounded-sm font-bold ${loading ? 'bg-gray-300 text-white-600' : 'bg-[#4A90E2] text-white hover:bg-[#3A80D2]'}`}
        >
          {loading ? 'Verifying...' : 'VERIFY'}
        </button>
      </div>
    </div>
  );
};
export default CATpcha;