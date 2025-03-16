import { useState, useEffect, useCallback, useMemo } from "react";

const defaultImages = [
  { 
    id: 1, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%28100%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4f827a1b1055580e57088a0dc1ac5efefe23c0cf6e7e3a53da9628c5d235d7f0dfd1a9993932fa484427b64a1734f5cdbccc5d8da6cbdfb5a26decb4b80bc603fae11569adf3e8972cd0d3ec60923949f0ae6135ec6c1b7cd16464eb85e237dccf595276c09a1166dd1fbb583ceb1139592f136f7264bbd492ae0af2534c37cdc58cd8a95850af71dc2b2fe30cebc2935b9e050a9cc24d2cf51a88cadb17bd388310013900653308a7db03b04315238069a4822edfaf77c1b220599f61431f4e9b8d5ac1cbf512ae20b3f4512cdcefc4787881ee4ebcee7bc7c32f69674811ba7a34e36d1b6225c84901f85e4cb93c07e946a04319e2da35f4dd83703641c25e', 
    hasBus: true, 
    hasTrafficLight: false, 
    hasCar: false, 
  },
  { 
    id: 2, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281014%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=60e9d1050f1cf2eec47e8791d027dc1ba053b068ac88aaeeef77ccb35733161125f50c62cb7d58771ed29fd7c328ded4079a7ea1961f0d29eef8a25759fe683d01c7cebcbad7389b408212928e2a2ff3885f3b4500536716b62e24b0ecac6af1386360538840e8df7fcdf4a6eb293301bf914914cf35311d0c1b25f49cc2487583ebe0c30ed0a9a8edace6a2cf2872fe92259f0153e9613d8f3fb9daa3c09afabba85cc97a3127e6935f03b9ba1cbbbaaa593b4ebb97f4fecf727815fd61d4d1adbc5f098e7512438c817eeb70388b5325471af714b3da804cd65dc42fe86b13adeb52efc6fc2e835f25d6d8eed2091afab0c5ad2794a64eb527ef0785d8c8d8', 
    hasBus: false, 
    hasTrafficLight: false, 
    hasCar: true, 
  },
  { 
    id: 3, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28111%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T224659Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9271cf221370a48b19c267a345d7c246adc0bcb983959265aa98948583753126ef0a8f8f84a67961731e3043b4510f7762b9fd5a29742c7b6040277c70d15e98deaec09c684137d315ff277439cf32581d8a85eb8a3fb8060bfbe393c429c7c32c65174927117b278ef931abb22ee70981750198da31eab7d56100fa817be8e7cdb645fedec022a73da33669b91c5f214d086a447be6e06b71bc91004bd084003b0d5a4d53280983e9144924b4742ca668e751afe3a0b5dc4f781a97db68ae28f59387b4ea4f2332bc59421bf3688ca536eac16c8f55df652376a7681b61946962c72082e282c4258f6d12bab8f1b3ff8b0f621bfb5c61a733ed87a499469233', 
    hasBus: false, 
    hasTrafficLight: true, 
    hasCar: false, 

  },
  { 
    id: 4, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281013%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2b48f38522580139232912d6f5baefc8b59e78fa73e11b4ec4d4ea99174c1be6b6ee48bcdde3c963e9663909fc56c5d5f21c488987e600632ad434a0cbab3b99e97bcff619f405cea8885196fb014b7e799871d111e54e4330351be8ce6c8cbe3c493c1298c572466d154cc48c222cb216481b654991f52a5d3fcf323fad9a51b808e5ac78ebd311140017510be510f015202118dc7cf51e77ca3c2ce4601e3a8465c402146a7945a1c27e2fa4e6afcb7bbe347c85aed96802853f6f99cc65c0b6dbe4f20cfe522e5a1f7344dec899b0672ed7db607b3583b1d5b2dedd9dc2449475f81802e595b74039b7059642ab633c6b4c4f6d59ce2cf77bcad606511296', 
    hasBus: true, 
    hasTrafficLight: false, 
    hasCar: false, 
  },
  { 
    id: 5, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28119%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T224659Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a0b1f9ebb37de9e7fc27979aa052dff0f02d2d96a68732fe146d2eb9d6b647d5b8e0daf81a593fb15e8a0e538e91775e09f9227fe67af9af226c3a15a487db27c89cb7a6608f2152c9fb2a6858ee988107137d1a34f73c3b5fda61aab05f8c6077f56ba2e20801fdea888785d2b970db9c4a5146bfbea18a76edac32403d0e0e857e1a2a0b32fa5ef3a804941fde35605a3d00fb5653357ea42cbbb93f761a22a552ab84970bbe1fb522df3d5344d42aeecb95f8c5236ff3bb84de74413c4015500564546f4f2b729f8c2470ad5c67702ee47604f39d2461ca63d0f120fbceb4f954591f08cdd3118b236cdf6d86b74874f7b0b34d7b284a342671162e9175d3', 
    hasBus: false, 
    hasTrafficLight: true, 
    hasCar: false, 

  },
  { 
    id: 6, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28118%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T224659Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ac73acbb4b0f753e0633c93b9ccc156c37c6cbe65d73816c4c44cb554225d4b8721497333c4a73b34b8a37fbbed256993bf4c47d3365b764f72ece4283a78f878990c00cabc3a7e16a408ff8c992ec0d89a096909c243c3d61c1ec6a8287a5fee4985d0538bcc7ff905726334c7adff3f7ac392b6d49f17ecb625bb0384010c353f42e252aff3929f554595c2c22ae77217a033201a79062e3d7fd602f06a3931696ae5ce4b038a0a05ed2e6fe2beb43f4d35bc245917ec9136a0bd649ac1a553c074944a9e90f2cee2d43e399ce405eab246c02c734ab85e6fce4abcf0be6be6eae99314180b156c624af9e9278d4dfc5d45a641cd6de4e8b9c3a3530cbf954', 
    hasBus: false, 
    hasTrafficLight: true, 
    hasCar: false, 


  },
  { 
    id: 7, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281016%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=11149f7788e1780451e01e87ce3e9ef7af1296b15e4990ca30e08b8c1212142b8184148ebfd40be878be6d4312dffff91e69c2c3815725f3cd2141dad97441d2fbf41978a20f507f698943875f2941ae6098509f18313a641aa0639df3fdc48342b8bbcecd4ebcbeb04f994f0554af2f10bc90d7f62e28d51eb3f590de7b87b34421ad8bda88e3a0024701597901c2bad23b0ae1d18bef41fb47e5747f3235851dc3a5334fd8f80f12b7f95ea3abb8dbc60a0fe115df6b57df4a19b2a0dd14c80602ab127464242b0deb183797c132519e48cbb8fa9cb723873dcc2cb01c3306dc2e51bca47a0f4675b7489c977e4c85d6d6689cc1919bf53b7764c04558303c', 
    hasBus: false, 
    hasTrafficLight: false, 
    hasCar: true, 
  },
  { 
    id: 8, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=67751dcc6631f33b4e02b2e902f879a6913b3d130f19866f9d0d8a588f9257876d3afb92947a56a15d6083e91cd79cf77e021e10e60e0c3cd177f2e60178f92960b9d489250f6025c37c2b1e55c0068b4369ba4282787cbc9bd4775911fe56a2e4f2bca22776a2180c2958796077c85492a8c558b582157ad54b72c5abe245fca3387aac9cb0d108874193d750551bf79ab2f7074501c8dda7aa209c0d25351ad634b6152f29754af8e09839cd4c9afdeb207d8f227c3ef27019e6ad297eb2c5716edd52b85fba2d8190bdb1f4e034a3da659c4cefdd7d95a9461a59c195e6b7208cb8591707850a771d5823f2ee76352c5f2fc45d56979e416a27efd6dc6b90', 
    hasBus: true, 
    hasTrafficLight: false, 
    hasCar: false, 

  },
  { 
    id: 9, 
    src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281007%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a9cc146ae110982f58256ca8b2ee5ce1b61d6cfb6c6395a22484011af4611b9ca985466079e0e1322f1fae11456cea5f006974ae08cb4a55001238cc02af4abac474b2e804c619b20d8dce227efe7950ef349e04635f4f8a4ed3c226ee4b14a0f6c2eeac6343a7d2ead2556905028869dc0c7819472c7b9943d8117c209160c956a647799d36f075398311e6bc4c7c58413430ebf764f3ebf661aca04689eebeb9888cbfdb4e89eaa79642a7544ef1b62e7c6196552f6fa22be3e88e68ec2d3f69d8c3f029adb4786d6e7c093770e27354b569a4ef8a51d7f6c47d4b66c1120c87af790ca9cec127a8eee1f99470276db05073e9e8bc7724c0e38a0608f609bd', 
    hasBus: false, 
    hasTrafficLight: false, 
    hasCar: true, 

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

const ImageCaptchaSelector = ({ onPass, onChallengeChange, customImages }) => {
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [challenge, setChallenge] = useState('bus'); // Default challenge type
  const [loading, setLoading] = useState(false);
  
  // Use the custom hook to manage images
  const { images, setAllImages, shuffleImages } = useCaptchaImages(customImages);

  const challenges = useMemo(() => ['bus', 'traffic light', 'car'], []);

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
      onChallengeChange(`Select all images with a ${randomChallenge}`);
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
        (challenge === 'bus' && image.hasBus) ||
        (challenge === 'bicycle' && image.hasBicycle) ||
        (challenge === 'fire hydrant' && image.hasFireHydrant) ||
        (challenge === 'crosswalk' && image.hasCrosswalk) ||
        (challenge === 'traffic light' && image.hasTrafficLight) ||
        (challenge === 'car' && image.hasCar)
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
      onChallengeChange(`Select all images with a ${randomChallenge}`);
    }
  };

  return (
    <div className="max-w-[96rem] bg-white rounded-md overflow-hidden pt-8 p-4 ">
      {/* Header */}
      <div className="bg-[#4A90E2] text-white p-4">
        <p className="font-bold text-lg">Select all images with a</p>
        <p className="text-2xl font-bold mb-1">{challenge}</p>
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
          className={`px-4 py-2 rounded-sm font-bold ${loading ? 'bg-gray-300 text-gray-600' : 'bg-[#4A90E2] text-white hover:bg-[#3A80D2]'}`}
        >
          {loading ? 'Verifying...' : 'VERIFY'}
        </button>
      </div>
    </div>
  );
};

export default ImageCaptchaSelector; 