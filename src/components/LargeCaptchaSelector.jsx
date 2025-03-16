import { useState, useEffect, useCallback, useMemo } from "react";

// Default images with blank src, 36 items for a 6x6 grid
// 12 items with hasBus=true, 12 with hasTrafficLight=true, 12 with hasCar=true
const defaultImages = [
  // Row 1
  { id: 1, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281014%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=60e9d1050f1cf2eec47e8791d027dc1ba053b068ac88aaeeef77ccb35733161125f50c62cb7d58771ed29fd7c328ded4079a7ea1961f0d29eef8a25759fe683d01c7cebcbad7389b408212928e2a2ff3885f3b4500536716b62e24b0ecac6af1386360538840e8df7fcdf4a6eb293301bf914914cf35311d0c1b25f49cc2487583ebe0c30ed0a9a8edace6a2cf2872fe92259f0153e9613d8f3fb9daa3c09afabba85cc97a3127e6935f03b9ba1cbbbaaa593b4ebb97f4fecf727815fd61d4d1adbc5f098e7512438c817eeb70388b5325471af714b3da804cd65dc42fe86b13adeb52efc6fc2e835f25d6d8eed2091afab0c5ad2794a64eb527ef0785d8c8d8', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 2, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4f88a6a0e312dca8b8c5f37bcb4f77aaded5b444680acaec3f278455dbce66d44b2955f6b2ab1d6a3c817cbb6eaf6529985e2697063acfe8f04990a960a706bbb4d854536df523288016bf79ecf7b0f21c97fa85029bd921891d64bba8ddf3038651d920395acae07e51c86a4cf7cb3c47327c70b2cc465045d071d4c7c6c489900f20e4988917cceeaf9aae795c168b01ef65c6020e619727aa48548ff1de463e2649ccefe8325c5dec13d786bc06b4158cdf64984d96d6e0bdbcdba076a52f1e1a27d23b85dd00a7ac34857c9f60f695e5d12cc656ad50099f6114f2d4cd888e3465a144a90bf780d43642decde560aa04ea25d3c780f010b77767e347f92e', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 3, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281018%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=02bdb941a09f85518816649d309e62d483e5ead74330f6714053da44157d2cd75c45c0f8b5238aba0110b32e31a98b5bdfbafd1fe5b4fbbb18c4d90f937de2449dbfed26208f118138d544e7d8274f393d5d5b68c12ec7c406a7816dafd336ff5f78e586c431159d664cf3125f9b9b5bfc806e3c3bf4cc98f7326f94152fb277cdcb6243a4ef72d5c6a7a272c389f7e757c883bce307e095ef74fd46e79ea8e3e34da31db0baafe131dc010c4353ba4911e7d471dca48aab1f22edd0128e2a4e1956d3284d4df64e9d6817c523ddea0e00abd0ef86f5c732442b89489f0a8543e1068306a35132c04d63e8f58d2a2382b1cf0dcef665718062981b4196d4b286', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 4, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281019%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=806f748f76008dbea737061a7d7bda67e55f09b54f1132bdbe51195867ff888d25dbbc45c2c9e1a33032a9d800c90a9ae64e18157df9e0fb82e62e2a4870e769641edce3b77f2b4a161a696e534e9fd1444c4d001fc6922661236e1f627ec3a69ee9024ba3b25d95339241699a18acdc0296a13a6abdaddd8eddcf055502112eb4c61183d24c4147d09c4b83a7d30af55aa3f8853df744fad857841aa96f8108c7773ba9d24f729b14a344d17ee0e3d6e4caa2f056fbb89a638d82bf9d994c3a47a22f9ef4b8269ca91348b48e7694954b4e761da2c066bbc2042be5b6df0ede2465a2ba4a34b171a54569865c41f2b56f9df716bb116514967070ad3b651044', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 5, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%28102%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ad441d0ac535fa3e60cc1b6e4843c5b6ca4c91f57b7f2a54c238b5890ccc8d19ad9584b7f78d3638cd984236c6b80b204a743e7f0e285ad3b5f23627e7067694274f70a576dac9457851e8d2f6cf85dc1cafaf5b2f43ad284bf507493943e2f5462e813d1d1aa363520ac3fb9e63028645bb07aed9d0aa34f3cdf3589b209e4de5eea9893a6ea4d24733f48390401118c43b1045be5c2904920841bfc0bd7fcf84ed9364893a8cacb4840028f5ffb8ce3302fb29684c1d7d2df041ea4c46ad1d3f593ecab704baeea9cf533a737eaae8d10842ee93e2e344180038d3aad4fd068d6ac49fc5c135148bc66b2d51d59f3392128fe53fda54f9241927c3b9c78d31', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 6, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281020%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=35f131bedb6d45409be76007ef227b4122def036ea5b83765546946f68a0f4f5462ddef175fb31f64e053c02125d8bb68f13f42782ff058b4c36ae2178aae48cfc4ab2f5d9767867b5cb9977f961f9f3ae356318eb44a720e477cd0a1a71cfbbae0977ce9c658405f8972499fb8dbca9637657a03fb6556d17b2f430b706c80eb2bdbc7953d36cbed36c9134d60fce7d65948745a6d6f8b1a2c146648268c79baa56aa8c75b83703c27326d5131cbb49c170c43c2040f5e1c7453eac050900cc85330b2ff8ccd5db2a619d3413927920cb85422937ef818d0292d1673d8795b784d2faa1bf071ac661b619fba046bc5ead03af843a3440718ac4be8b43144893', hasBus: false, hasTrafficLight: true, hasCar: false,},
  
  // Row 2
  { id: 7, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281021%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1979e76c568bf1cecddb78f7e6d316863b6aa1e93141dee612537c999ad78ed0a130c90d5c3197d40921284b33429e2cb65c811f5ec4273cc1630176ef33968d705b86d437b553a452210cc4a3ec257b966c56439016454fe29757a6b816245c3048d176ba0de7eaf4504ed40343aca4792e9b28f3984a3f442733bc8d86641792a971c74c7a9888f820fd5719c5c1647e1f422e3d5f46d486d6138b67a27a473f2502ab46c6655d7c80b4ec76515ecf197c979c1aa9b2e4d82e11bdd509cd07b17518cef25084f15e710f340fe9bb2571d75efde6c22441400141e125aaf7ca6b79b9c48870105c49278de412f85eafdad5cec28a30d133b4a441662f973cca', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 8, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=13f9ce8b137454c9592e5f353596773efee8317abb8b5cce79ba19fdee8cdcb803a705cf71d9317be5dbb26a2d904d24fca86144fc8adb0b58ecaafc6fad57385be98aaf68f971510d47abcdd5fe923f6e1cf97c946fd31f680d49f0f3910b7ab3774b1c1c8f601229fc0d26bc693def5a3aff7f7236fba14511cfdb92ee048402b235024acc1463dfbb3c0f2d1b6a5d81728a65c186d5af00f662e3c164672e81053bfbe3b77b9fe3b42ea3ae1cd5c552e43c762d4f12cf934bf7b929a003a5ff99dcd2851a2b0f2242cb01df9e08a7314ef6be6ed18c9f178c27c00a3200159afbffb45b4e0577bf319f8348091c298f0133f6b986a7999d9636aebe72559c', hasBus: false, hasTrafficLight: true, hasCar: false,  },
  { id: 9, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281023%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=32a9ed0c7ab46c7e59f65835f2e5cb46204f92bfdc449e72e52b0dd54f2c661ce1dc08aba7b61ef64d02cfc32fbeea8c27a693670ad2b50657e86b7008e7de714caaaa356f588bfbfa0a8ffbc7697bc43e3495c7567bdcf4aa3c1187f7e38dc1ad8652b37e7236dd26e31da58b55db06b6fda6889c8d265bb24d1511a1c257b7b707a0dc06db09a838aa22b00744a4b9c9d2b6422c0726857b46296602b50b20c2e22f33348d7b7db84dfd235000edbc68f2830fad71317c70eee4d0c8c66b0ae16e735a23522aa95e9b009eb03d358805500732233f0a97df98828dd09c6c8f506332a01ac7943a767c953ee02dbe26387ab79af88e5ddb2fbe6018f2654c81', hasBus: false, hasTrafficLight: true, hasCar: false,  },
  { id: 10, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281024%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=595a0a9f5d2791efd390b87b1c6f97ddadb28be72c210888bfcdb2ce17f817e3beaf8fc416b89cd5cccb22d23ef4fc3495b839b868aa78b55d201e260b977686e80a3b8eb7ba605bd70176a34d9bd676acc8dcd83ea8ba6b46f85c29c80c8fe471cc362d8386274331ae1250d06480a211c3994a0abc2fdd89db6a4ff605e0d36db57c2694cc050e225796e998f1f8389451e9f1f32b04f2a37f99ea5c4b8e06a582306413e48b6e82e5739b7cb9e88ed6d37302756d0b3a29819337bf32b117997fde5084165b129994202dcf3c3693e601a250b97529c71ff554bec3c8232109f9549473d53097dc33e6f65340183dfe91a740afeda0ae44e9255b4de3615d', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 11, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281025%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=55803e67cf57417fd580b1f0455757e65142a05d5b3e750a9ed360625edd8dd3ce00b80db79ef2420feecb3e716c9162e7a95acf47e920240f88a4cc4bec222401bf874f34deb7ff0f6806fba0917eaabe2ef203b8f5985514541400a2342256b72d19a4ecdf9e0077291de395825219b5635a503c92a6a522ffe7d229fc14ca8f85d620fc484a43967407c6d872961b3294d0f8d7e4135c3e3bd516ff0130635d8f473f46b0e23052dbe7c9dbd0b2c41d2401fc2052cd17ce7f63ca44ab4052dbc3eab58d1b9360ce5c6e72ec9d0d189c37c025a76ba19871a6db0f21a0e51bb300f9b6bf03cd984fd3ffb450482c9c02f517fdf1ad2d6639f129336b6c492f', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 12, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281026%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4ee6bcc883623b059a7112da80c610c5bf44af36d63acd6040a04550a553bad9c25c1ed96fdb97b7467543f69c0cc6e8555d877e7ac7492fda9effffb9198e704ea05665212275d434d18edfa8bc542f1b0adfb6346209989283da52e463de981d0ad4cce33a7c27d633f7f3f82f6c9517ec089e9620b7f0032603b91ad3ea1b56cbd91fc923c5dc02c7326d136beea17b5106130297c2c30eae66dfd50dcc126cdadcbe5babe271d9bf5a6c3a53bb566ae4312098627d4cdfa4be37d8de430e078e65529ac7fc7ef50568dd09774a42d32eec59183dd16a378028d33372f2403f915b3839078949a5ca96a54bdcda51a4fd08cbff1644a83c78d9f51cf10dfb', hasBus: false, hasTrafficLight: true, hasCar: false, },
  
  // Row 3
  { id: 13, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281015%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=710a9cb65f1cb4ce408474fc7eff64adb7d49b5e11d4e1597b4185c282f830c1c67176254c7d80cbc21437cd91da29cba019fcaf1a3bc4a66c82cf37c4b887c8e069c9236f079f97aa9f00f106ddb955326a21e363fc9bf754dc9424a155f60e12b7006c5d7809295228fe4e93b90021258827d7de27fa016da789db4ddd699338ece09a9f7e485d72604a71623b1cb1a9dc6e8298b0ce02c0dd494720bd0d9b4e0a126f0889fbc105213ffb8ae4f8a25d1a290059078fd93e6fa5feed523e6899864a3d58c376254f317418bdb1b1001e34614e5e480e4e87e88504b354cb4c1da6770da6b7ca98ae2519bac8f328e9a8f10407b8954a4d35728fd0c2487257', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 14, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=67751dcc6631f33b4e02b2e902f879a6913b3d130f19866f9d0d8a588f9257876d3afb92947a56a15d6083e91cd79cf77e021e10e60e0c3cd177f2e60178f92960b9d489250f6025c37c2b1e55c0068b4369ba4282787cbc9bd4775911fe56a2e4f2bca22776a2180c2958796077c85492a8c558b582157ad54b72c5abe245fca3387aac9cb0d108874193d750551bf79ab2f7074501c8dda7aa209c0d25351ad634b6152f29754af8e09839cd4c9afdeb207d8f227c3ef27019e6ad297eb2c5716edd52b85fba2d8190bdb1f4e034a3da659c4cefdd7d95a9461a59c195e6b7208cb8591707850a771d5823f2ee76352c5f2fc45d56979e416a27efd6dc6b90', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 15, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281018%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2f50d5078a74f165c4f2eccef969c40e23abfbb62391f01ef2ed49a46b42dde59d68ca4e98d21f2ca87a3da4841c61eb91383b7db6bd3dcc44e218c74c248733155ffa6ea1fdf96daaa25e0f8f1773ca346d6e3ca7922d0ee4fdff7d767e019a183495acb255e5b3c69c9811f12dabf9bdc3f6dfaf1356a31a9842ff67420f8f6f245d2f13e5429b5e9860c42429fb5ac904c5ac5448c186f553ae033d68315cf332e74a36ef8fbb988855ae6895fdbd1765d81081c91fc623e443e2c01afd55284a6b58779127c85f7d0fa65fdb91977c46927f96780dbbb589a2c79b7a38cb3ed7318be37e4cd953868acc087d6ddc77f68ad813c4cb2d4af6fa39991c11f9', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 16, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281019%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=45e3bda2aa1ee32378b8cedc9e276228ed54bd4ec06cd75a8f97ef337a9486ce94d0fdb1a76d8c86e1fa1391e5cf1c7ed79c740879512c9c6fac407ba3da8fae2d2ff2a9575c4a00bb3b47de3ca84e51aca8454638ad2af3499f8b4827d7376ad24f10fb0fc5f3edd00e1bacb6163637156e821daad624cc3d805625997e97191667d17faecf69845a534be69602f86d79742df4d14b408713f9ed4b84ad1ba0d7eace57c4b916626237087f7857ade355b37c25cd586c1f890c3337d9b3279abc1ff1b31c0e9d2251224a79d7683c9239625cd895e800d1a4eefbffd0e5af9bf74d7acc0f8ef1a0166070a19a758e0d2fc75a95f5152828f3168b3f48b1e3bf', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 17, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%28102%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=12786d92dad3bbd3df943fd4954b5f473369b1b2644ffec68e58e5af2a70b6a1bddb3ce2c72487f0450f3c2640f937abf568d0e40a36fbdb88ad56c399314a7ee26fd38b2311bbd276b76b44402b35eae942c90d3ad6392551255108ceee11474b6b82d159baddb451ae5ddc607058f354ad722290845e08c1a10e911c95f8d1f6e22d03d0aaf413f2948407c28d110e8fd7cc15687c5d26feee04c20283305c4f54e9fc0767fcb06b0eb0b1f68f28a9ac32291139121a4fb46da3c5f3a69429e5f94f6b7d20587c8686f7c146cbe3c53ea2ecad56a373331c1f46cd70c9887f1eded986485781e3cf90a545880aab9b72f162e7bbf56d5cecf7b11c62ad7955', hasBus:  true, hasTrafficLight: false, hasCar: false},
  { id: 18, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281020%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1f346a5fd4268d778a890b06decfcb9e83bb4181d79e484af47ca6e96bc2e1dd9ec083a618b0d431272a1f0086806fbd96dc5c006e8a3ca08156cf26409ad5ed44a189f44d5723a3c02ee73090114276fa37606a733828313f9f7db4d00ddc000c6907bf7a8fb5bccb70dbc9cc88562e1f37741ca3962bc52c6c07e113041a81add0f21017dfd987df8e1ca640b22e4af8a5e989259e28d99f7e3c427a98befc0937cefbcf50037b23d4e755e8e95b6eee39924601ea0c4bcb9f4cc41e0e8275cc53e49847497f1ecf804623e0a6f47c2a83c17324949f13523727decf2d47a1b3627b3a83d81cda75c9834cc75c44d329f06c434f0e23f83750b0eb7670b0c6', hasBus:  true, hasTrafficLight: false, hasCar:false, },
  
  // Row 4
  { id: 19, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=10239f9d8fa793c2fbef46f24139110a203be58dd872230759465cdab91d61095ba990583d453bdc1340d0e704b1435acefd60eab350f17cac5c6bb51757e8602ef06bb630b3f878bbf9278678e019d4dddeec6944a7dfd867a6d8afa275afa9dd93c467e43e24c3d53ead2349c9f9c92ce717ca990e9e6d6317825a466f664be854ff6f1d74eb7272575fc365ed350fe3d59c44d5b8eb706f453d23a842ed5ed0c62f52dfb5cc7db41be1d82b39b5cc512c515eedd828290c24c37e17b360697c3be3b9a1772f02cacd6adbec4ff84e684fc1766be7d177df5bae72e59588eea20a1294e59b3550892735c7f859543bfab957b8a3a85ec95b601306582d1315', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 20, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281021%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=8e17f8b9606e5e580baa335929507fd3f344dc3bf9d72d03e3ad952e18c67a20042dd6026910d9dab90d6eeab3f4630efa8b13782a82744f18a5f397b551607f87efb27ce12897efa10bbe9d0d366b6abbdf3681c6e873c91312008702305006c38b7842683e3fd4db67a56188267bfdc33af6827a39bffbc9fb5c2eff14e35ce3d5da7511b775fd00433f11280811e570c80382d6009b1036c8ab9b80406497a7f6ecb3955226e3decbdb8df990742f32f4b0e420cc9b7b3767ed4045df2a5e67da5343fb1423e927f97093e2baf4aff0565cb57fec01837bdac300e3f7b6c79c6d70d7ae372652e2bad4f68d3757b83e5ea6b1fb59f8a6ca1ebeef97364cc9', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 21, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=10239f9d8fa793c2fbef46f24139110a203be58dd872230759465cdab91d61095ba990583d453bdc1340d0e704b1435acefd60eab350f17cac5c6bb51757e8602ef06bb630b3f878bbf9278678e019d4dddeec6944a7dfd867a6d8afa275afa9dd93c467e43e24c3d53ead2349c9f9c92ce717ca990e9e6d6317825a466f664be854ff6f1d74eb7272575fc365ed350fe3d59c44d5b8eb706f453d23a842ed5ed0c62f52dfb5cc7db41be1d82b39b5cc512c515eedd828290c24c37e17b360697c3be3b9a1772f02cacd6adbec4ff84e684fc1766be7d177df5bae72e59588eea20a1294e59b3550892735c7f859543bfab957b8a3a85ec95b601306582d1315', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 22, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281024%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a0e8c0400cfa2293a65e0b55f2844ca08833b1921fda0e228d6ca68e3e8d89eedf6aacceea35cc04115a8ef79111294d8292a05cec77fc69401d35e3c6a1b815e7e8e94ee03d1e3edfd7fc39a52eb6b4d6d171811419c02a2cc555d4d6ee803f4f22162e30954affdf5c72cf1f8606548f197a12d40b6d7a82b53bdcd97bd46bc4db7fe6529e263772a9518c88a920fe6eb94cbc0c74cde059186662247f012302799e6778feddb05d32215a081abde3b2e772ab9af42031e70b952b72dcb014990e39610d64125702e78cf5e9355bb6669083483d2ac1f1e93293fae0ff0c0c672c3263d2d290f455bb95ac0a3245be017fd8f8c8e629bf6a5508746ccebfa3', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 23, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281025%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1f49864ccf39b569db36e0fc8143833c2ae8edab1ae3c7739851dcf1049324d9b59f24829a7986856b176fbd98d4129a0f2c02276598fbf199fdfa4977ced3cdb831b4a3e18900dbf869a99f33e1ca73c2ea7257602260f27dd16573861b3ffc14378050459c3b1e0f6ea47908c4bff245b371f1d32bd4aab520ab5fce3feea48576de0ab1ad0f00fa96d8cb3c87ebc86872ad54dcc167dc25d3a4db6773e2cf7d3c9ed58b23a798f9a2b75f02d031a0dbd28b6ca5f5270f169ea4b4f5ec257cc8342d9b0a27c448060f8f86d97fe828af064e28ff1b0b4f0a5131682b65918345f5740c79a248cbb5c8b6970779349b318720f0b59b86a3213a9f06e9ca0239', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 24, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281026%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=5d4d49db6e3b14c5758089689aecafa66028a0fdec8564cb58a594ca575e894bc5a567f2d82cc3a0c59600cb5c6d88d4dafddb433f0d08a9250edb9567cc89f1fe9053b7b35a4d3da4e9ff088e2a6d133683bb710ac14abadd469730ec5b836131986c722b2bce467fb049f978de3868c26256a0f3108b2fc92ee417eeb3bce4442269ac2f2ec1dfd40f49e84365487ace829baf25ce25a84410af2c479b3086db99babbf3ed642000248a00339f2d2316ddfe5a0110d3d50dd0b0ff06f8aa600cdbc4f07692814959fc12b63d6352b29fdbdf232e40493ece1513b92fe29f4bbdfdc6622896902abe95be9c42feb3d6f3e49549cd0d504803e806ecb7259c57', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  
  // Row 5
  { id: 25, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281026%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4ee6bcc883623b059a7112da80c610c5bf44af36d63acd6040a04550a553bad9c25c1ed96fdb97b7467543f69c0cc6e8555d877e7ac7492fda9effffb9198e704ea05665212275d434d18edfa8bc542f1b0adfb6346209989283da52e463de981d0ad4cce33a7c27d633f7f3f82f6c9517ec089e9620b7f0032603b91ad3ea1b56cbd91fc923c5dc02c7326d136beea17b5106130297c2c30eae66dfd50dcc126cdadcbe5babe271d9bf5a6c3a53bb566ae4312098627d4cdfa4be37d8de430e078e65529ac7fc7ef50568dd09774a42d32eec59183dd16a378028d33372f2403f915b3839078949a5ca96a54bdcda51a4fd08cbff1644a83c78d9f51cf10dfb', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 26, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281025%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=55803e67cf57417fd580b1f0455757e65142a05d5b3e750a9ed360625edd8dd3ce00b80db79ef2420feecb3e716c9162e7a95acf47e920240f88a4cc4bec222401bf874f34deb7ff0f6806fba0917eaabe2ef203b8f5985514541400a2342256b72d19a4ecdf9e0077291de395825219b5635a503c92a6a522ffe7d229fc14ca8f85d620fc484a43967407c6d872961b3294d0f8d7e4135c3e3bd516ff0130635d8f473f46b0e23052dbe7c9dbd0b2c41d2401fc2052cd17ce7f63ca44ab4052dbc3eab58d1b9360ce5c6e72ec9d0d189c37c025a76ba19871a6db0f21a0e51bb300f9b6bf03cd984fd3ffb450482c9c02f517fdf1ad2d6639f129336b6c492f', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 27, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281024%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=595a0a9f5d2791efd390b87b1c6f97ddadb28be72c210888bfcdb2ce17f817e3beaf8fc416b89cd5cccb22d23ef4fc3495b839b868aa78b55d201e260b977686e80a3b8eb7ba605bd70176a34d9bd676acc8dcd83ea8ba6b46f85c29c80c8fe471cc362d8386274331ae1250d06480a211c3994a0abc2fdd89db6a4ff605e0d36db57c2694cc050e225796e998f1f8389451e9f1f32b04f2a37f99ea5c4b8e06a582306413e48b6e82e5739b7cb9e88ed6d37302756d0b3a29819337bf32b117997fde5084165b129994202dcf3c3693e601a250b97529c71ff554bec3c8232109f9549473d53097dc33e6f65340183dfe91a740afeda0ae44e9255b4de3615d', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 28, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281023%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=32a9ed0c7ab46c7e59f65835f2e5cb46204f92bfdc449e72e52b0dd54f2c661ce1dc08aba7b61ef64d02cfc32fbeea8c27a693670ad2b50657e86b7008e7de714caaaa356f588bfbfa0a8ffbc7697bc43e3495c7567bdcf4aa3c1187f7e38dc1ad8652b37e7236dd26e31da58b55db06b6fda6889c8d265bb24d1511a1c257b7b707a0dc06db09a838aa22b00744a4b9c9d2b6422c0726857b46296602b50b20c2e22f33348d7b7db84dfd235000edbc68f2830fad71317c70eee4d0c8c66b0ae16e735a23522aa95e9b009eb03d358805500732233f0a97df98828dd09c6c8f506332a01ac7943a767c953ee02dbe26387ab79af88e5ddb2fbe6018f2654c81', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 29, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=13f9ce8b137454c9592e5f353596773efee8317abb8b5cce79ba19fdee8cdcb803a705cf71d9317be5dbb26a2d904d24fca86144fc8adb0b58ecaafc6fad57385be98aaf68f971510d47abcdd5fe923f6e1cf97c946fd31f680d49f0f3910b7ab3774b1c1c8f601229fc0d26bc693def5a3aff7f7236fba14511cfdb92ee048402b235024acc1463dfbb3c0f2d1b6a5d81728a65c186d5af00f662e3c164672e81053bfbe3b77b9fe3b42ea3ae1cd5c552e43c762d4f12cf934bf7b929a003a5ff99dcd2851a2b0f2242cb01df9e08a7314ef6be6ed18c9f178c27c00a3200159afbffb45b4e0577bf319f8348091c298f0133f6b986a7999d9636aebe72559c', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 30, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281021%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1979e76c568bf1cecddb78f7e6d316863b6aa1e93141dee612537c999ad78ed0a130c90d5c3197d40921284b33429e2cb65c811f5ec4273cc1630176ef33968d705b86d437b553a452210cc4a3ec257b966c56439016454fe29757a6b816245c3048d176ba0de7eaf4504ed40343aca4792e9b28f3984a3f442733bc8d86641792a971c74c7a9888f820fd5719c5c1647e1f422e3d5f46d486d6138b67a27a473f2502ab46c6655d7c80b4ec76515ecf197c979c1aa9b2e4d82e11bdd509cd07b17518cef25084f15e710f340fe9bb2571d75efde6c22441400141e125aaf7ca6b79b9c48870105c49278de412f85eafdad5cec28a30d133b4a441662f973cca', hasBus: false, hasTrafficLight: false, hasCar: true},
  
  // Row 6
  { id: 31, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281020%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=35f131bedb6d45409be76007ef227b4122def036ea5b83765546946f68a0f4f5462ddef175fb31f64e053c02125d8bb68f13f42782ff058b4c36ae2178aae48cfc4ab2f5d9767867b5cb9977f961f9f3ae356318eb44a720e477cd0a1a71cfbbae0977ce9c658405f8972499fb8dbca9637657a03fb6556d17b2f430b706c80eb2bdbc7953d36cbed36c9134d60fce7d65948745a6d6f8b1a2c146648268c79baa56aa8c75b83703c27326d5131cbb49c170c43c2040f5e1c7453eac050900cc85330b2ff8ccd5db2a619d3413927920cb85422937ef818d0292d1673d8795b784d2faa1bf071ac661b619fba046bc5ead03af843a3440718ac4be8b43144893', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 32, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%28102%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ad441d0ac535fa3e60cc1b6e4843c5b6ca4c91f57b7f2a54c238b5890ccc8d19ad9584b7f78d3638cd984236c6b80b204a743e7f0e285ad3b5f23627e7067694274f70a576dac9457851e8d2f6cf85dc1cafaf5b2f43ad284bf507493943e2f5462e813d1d1aa363520ac3fb9e63028645bb07aed9d0aa34f3cdf3589b209e4de5eea9893a6ea4d24733f48390401118c43b1045be5c2904920841bfc0bd7fcf84ed9364893a8cacb4840028f5ffb8ce3302fb29684c1d7d2df041ea4c46ad1d3f593ecab704baeea9cf533a737eaae8d10842ee93e2e344180038d3aad4fd068d6ac49fc5c135148bc66b2d51d59f3392128fe53fda54f9241927c3b9c78d31', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 33, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281019%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=806f748f76008dbea737061a7d7bda67e55f09b54f1132bdbe51195867ff888d25dbbc45c2c9e1a33032a9d800c90a9ae64e18157df9e0fb82e62e2a4870e769641edce3b77f2b4a161a696e534e9fd1444c4d001fc6922661236e1f627ec3a69ee9024ba3b25d95339241699a18acdc0296a13a6abdaddd8eddcf055502112eb4c61183d24c4147d09c4b83a7d30af55aa3f8853df744fad857841aa96f8108c7773ba9d24f729b14a344d17ee0e3d6e4caa2f056fbb89a638d82bf9d994c3a47a22f9ef4b8269ca91348b48e7694954b4e761da2c066bbc2042be5b6df0ede2465a2ba4a34b171a54569865c41f2b56f9df716bb116514967070ad3b651044', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 34, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281018%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=02bdb941a09f85518816649d309e62d483e5ead74330f6714053da44157d2cd75c45c0f8b5238aba0110b32e31a98b5bdfbafd1fe5b4fbbb18c4d90f937de2449dbfed26208f118138d544e7d8274f393d5d5b68c12ec7c406a7816dafd336ff5f78e586c431159d664cf3125f9b9b5bfc806e3c3bf4cc98f7326f94152fb277cdcb6243a4ef72d5c6a7a272c389f7e757c883bce307e095ef74fd46e79ea8e3e34da31db0baafe131dc010c4353ba4911e7d471dca48aab1f22edd0128e2a4e1956d3284d4df64e9d6817c523ddea0e00abd0ef86f5c732442b89489f0a8543e1068306a35132c04d63e8f58d2a2382b1cf0dcef665718062981b4196d4b286', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 35, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4f88a6a0e312dca8b8c5f37bcb4f77aaded5b444680acaec3f278455dbce66d44b2955f6b2ab1d6a3c817cbb6eaf6529985e2697063acfe8f04990a960a706bbb4d854536df523288016bf79ecf7b0f21c97fa85029bd921891d64bba8ddf3038651d920395acae07e51c86a4cf7cb3c47327c70b2cc465045d071d4c7c6c489900f20e4988917cceeaf9aae795c168b01ef65c6020e619727aa48548ff1de463e2649ccefe8325c5dec13d786bc06b4158cdf64984d96d6e0bdbcdba076a52f1e1a27d23b85dd00a7ac34857c9f60f695e5d12cc656ad50099f6114f2d4cd888e3465a144a90bf780d43642decde560aa04ea25d3c780f010b77767e347f92e', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 36, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281016%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=11149f7788e1780451e01e87ce3e9ef7af1296b15e4990ca30e08b8c1212142b8184148ebfd40be878be6d4312dffff91e69c2c3815725f3cd2141dad97441d2fbf41978a20f507f698943875f2941ae6098509f18313a641aa0639df3fdc48342b8bbcecd4ebcbeb04f994f0554af2f10bc90d7f62e28d51eb3f590de7b87b34421ad8bda88e3a0024701597901c2bad23b0ae1d18bef41fb47e5747f3235851dc3a5334fd8f80f12b7f95ea3abb8dbc60a0fe115df6b57df4a19b2a0dd14c80602ab127464242b0deb183797c132519e48cbb8fa9cb723873dcc2cb01c3306dc2e51bca47a0f4675b7489c977e4c85d6d6689cc1919bf53b7764c04558303c', hasBus: false, hasTrafficLight: false, hasCar: true, }
];

// Custom hook to manage captcha images
const useCaptchaImages = (initialImages = defaultImages) => {
  const [images, setImages] = useState(initialImages);
  
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
  
  return { images, setAllImages, shuffleImages };
};

const LargeCaptchaSelector = ({ onPass, onChallengeChange, customImages }) => {
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
    <div className="max-w-[600px] bg-white rounded-md overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#4A90E2] text-white p-4">
        <p className="font-bold text-lg">Select all images with a</p>
        <p className="text-2xl font-bold mb-1">{challenge}</p>
        <p className="text-sm">Click verify once there are none left.</p>
      </div>

      {/* Image Grid - Now 6x6 instead of 3x3 */}
      <div className="grid grid-cols-6 gap-[1px] p-[1px] bg-[#aaa]">
        {images.map((image) => (
          <div 
            key={image.id}
            className={`relative cursor-pointer overflow-hidden h-[90px] w-[90px] bg-white`}
            onClick={() => toggleImageSelection(image.id)}
          >
            <img 
              src={image.src} 
              alt={`Captcha image ${image.id}`} 
              className="w-full h-full object-cover"
            />
            {selectedImages.has(image.id) && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-2 bg-[#F9F9F9] border-t border-gray-200">
        <div className="flex space-x-3">
          <button 
            onClick={refreshChallenge}
            className="text-gray-600 hover:text-gray-800"
            title="Get a new challenge"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800" title="Audio challenge">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800" title="Information">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`px-4 py-1 rounded-sm uppercase text-sm font-bold ${loading ? 'bg-gray-300 text-gray-600' : 'bg-[#4A90E2] text-white hover:bg-[#3A80D2]'}`}
        >
          {loading ? 'Verifying...' : 'VERIFY'}
        </button>
      </div>
    </div>
  );
};

export default LargeCaptchaSelector; 