import { useState, useEffect, useCallback, useMemo } from "react";

const defaultImages = [

  { id: 1, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28123%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123324Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0902f345ef9b03c223605a3372e0e2be0bdf99900450c4ce695821534cab793f6015ef73774756f10ce0f10a531fc731b8741297d6f4bdf5c6e96734ede21ab2d9eabec6d83bd1fa0a7d24d4359be25034b198abb65d464550a1e12052606a2ea09992d21f434dce3c94af70ddad68a0118e600e7bd720c490064bc9eeccb9fa96eb81099a599655337c97263e7a3a9835dcc5b21db0273c9f861f9733831c897949b67d9527747443d683fb5e9d2468a1eac70bcd644e4a21737391a5bdfb8c267f1fa77730ca3af4929718363bef76116be751f4f3d0f37b0316e078bf5bf86d8cf9d517049a7a37d15d92080aaa1b27868dc4e7f241c24d034af64914d697', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 2, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28121%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123324Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9c8c40734fe5da700faea24304b5db457dda5352bb68a902f7e3444f2e0f07def7b9be454c8c8c7ef2bfd0f8f5c99cc3c30ab091d57ffbc94f98ff73750050b8e0f08fedb9ba61de16a2f62a2ffdde00e63f25da4ec221d027f30fc0438d859b729be1565b50d6dd95f8a6fadbefc3884635353b05b99caf4829b5442b020eba5b420798bbaa840b3d46375a51838b39f76b836acf8c8f8fcf56594366f733c2dca55a8e4765963a053b413a122ce573ae7105e07850b6ebb052c8f31e9cbd1b54eac71cf91e1feda899d6acdff6fce4984f617cc4a576eb160aa778a6589dbefd2b4ce6d9962b77c8022ba710b79275c6db364a10a0f9c11bb0debe282ba8fd', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 3, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%2812%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123324Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2e74b7080518140664715b92d0aee15a2573d891f25dcd71e58eec213d8293f12a97a5e9fc21078530762f7d6a8f21d0f910f4d412f5f099faba4a382e552048c0082521004eee62376ed6d220c971a4358a34f9e3f581dd10527db1cac266f77a902e7d7b220623cd27b84cf3c1014bf1eb4df71dd87d5967bd9dc5fbfa2c3d43eab71ad2f29414f093d3206d3f7cbc8822c67e1c1af2f3b90c479fc2fa41bdba740b78c3bc3b30e765e7cca99fe2e5bbe443ec7559c8b6283af725037933804d75f5bab41791403b68d2205a745928a3cb6570e14eefcd03f5a28fcc2241df5430480d8ce79a0a6f54f4e9f1846597acb1cbeb994f266f6326dfc5d9de8f8f', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 4, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28146%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123524Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=93b65062832fab32b50d42e00d5cf3705ade87b4d61da27e2284fa606bb5b4fc2095e9378b298442dd1c5daa92e3f80b4518de834701784dc9b1d4528c457359423ed1fb44bf2e59040ad5e8fdd5e4725b4b5a190b0a152360eded441c6e51276daa1f11c372924fdac641df1624a48bf8520ee91b9c4743f9d2a8f237319fc8f59ed9925c44a1d0085450d8c17830ea91a5537c9d29ed59657f8f27e80a3eeff2730caedefae7955aff1fefc1aaa5b0303e3aadf6d4378c1ab8fc34a2734a27424e531c899dc9b84953dbc0e616913b9b34b4bc8780e8403ab2a4ea596470329a351b75c56bd866714cfe47cc3d4192b7b76e702a8221bc8bf6d1b9ad42fb09', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 5, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28141%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123524Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0e9bc5d5ec938d973c2c7a1969a86bcb1c7b257f584d3d5f1f0d9c212bbc6eb12aa42cefe1cb03ccf05afe9157071a413f47f97f57266876b1a2b4f25540841dc6649a8eddf9bce9d7dda06cf4c9d14dfb6446c9fc13acf858e9e8884bdb3582dcf49544f4253ff7bba065521e4d1f0e17e2a1a76a3a1db67697cce9d150fb7e1ebb8d6ef67e5e13a6888b08bd44a70f7d8e99d8a956c1907cbaadd489308f9666a66b90069a28c4da83960987b06bc1a5828a5d6254dd35ae07af48f8988c720c551a0d549535108bd19c8fd1b70c7cc07512ff58a9bda5ed81953676cdcf096327a00fc0d435f9e7b29baee6f4097dbc3ef982d193ef9f621f4311a6437b91', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 6, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28143%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123524Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=600b24eeb40b0f80f1346a7d3ecb2cc3e2dc0c068919c1128c14765a1bb74fe6a7bfed101a1598ccc87d30de78c832990bdb44fe33a6d143af36acd551f45a19c9ac22b6bf5a2c0048a581fee15f1023bee02d9e34c0e2fa7ca599d10148ae526717f8c779ee88088a33a2d8960a29e6fb996ca396974b895faf6efb7071461d113f1159de68ebee27d0e7ad2d191b37a2979cf6472b09938b4c442930db208259cae2f44409eae61317424a736b7ae954a5095793c477019660b8b9691a1b6eda80d9827347e2597f5d4ec741d1f07920446f1f009854875de8b62e75e354b8c556f373ec544bc33dfd0310928dcead035440c95622c31fc53e2fb68e3c7502', hasBus: false, hasTrafficLight: true, hasCar: false,},

  { id: 7, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28137%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123524Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=73e4fa69adb38d8ab6e37ae629393b6964a8d6c57694b51a0eb57579a6910828978e9d6eae5470099f93818565f28091911b6f0ef0b960c885f305b5e0b5994aca4e6ac2c71f8358d5130b954b745aeba3533dcd14033195dfe3b58e7f85298b05d56192a3eb80d77ccf51917f31a1c414d9293808b0ac783fc1f6d67325e55d7e4ad379cdf28e86a0a3e158a8925852ec62a03d81f447bc1982026ee9c4fcf7ad9754004336c081660eea06da83748e365a37391aa470719a78204ec6f41424de33d8d0f1a88f5e53b6451b11959105bff1ed1b9476d8f7b8129cf16e8d753a87752c31f29061aa17109869f58b48accfd944e97756be1ecb26953988026d9e', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 8, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28135%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T123524Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=73a66176af030c9424a8ceb1edcbc1831b9cda619ad877d8822c1b131015d8368e6b67b16298830a9124ee31f05f01cfd46e26a1e9f510845de46408ddb82ee8b17228fdd895d96fbb76b7d11181b1349c10b96f9ccd4a98cc81b06a6cd8399a673268f93d13a8dcd69e242fef7fa1b7f06545d175d8cbb0c92dbee38a25148c963d046fdd8883e4d7748cecb21ce0b903ba33f98c3805039930af84f60aefb41c35a148fa5ca678e9adeee9fe3012dd99de4426183d534de271731751ba70036c2e82a931b5e8681069e03c20f1a84f13b8dcd033adc44c164fc57fe35b31a40e9429c92040ff4911ebfa3718cc3b14611f1777d3acce5b0516fca00221ade1', hasBus: false, hasTrafficLight: true, hasCar: false,  },
  { id: 9, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28166%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T124607Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=61ea47cbdf8c661f1d951c6565244e8a43aecfe1c00cc837d07455239d262ffc9749703a43f01d27008172ef2df136db6f06d03f6210edef4a9fdd91702404f667b80ff118ee4f3247ddeafdbc68c1377795ca0ec0d5450a9bf8771308264e555cb3a5346cabfeec471cc5d2d03d42264a27991a324d622d4f63259f6064eb2985494c3a0d27bd43d827024e1d89ffea8344e1923a9514ca1cde62b24803683aec6090bf8b994c61359421f1aa3343aec1a062c972d5358fabffd6c8062189a8b14c0a4bf94ab2e22675003d9a2682ba85fd331540cd43817e50eeb85a3c808cc961b040a71d8ab7ca1e606a05b248b833cd848ae00b23a34d273a9be46825f1', hasBus: false, hasTrafficLight: true, hasCar: false,  },
  { id: 10, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28169%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T124607Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=135153a27c7b4814e29c0464a515c47c12e0b99b71dbeb670091c9e8c33ef94f565d9afaad7ff6acf3ea68d71d37e42922d99d9704c9147f5b481e749e83f75d7bb0a055b2db1361fefe80554e9fe1279b53d12445c8f022c0a85b64a961cf2a07d8e3a2f8fe2437a2bc8ab724d2fb559928e39130579265c6e480e35bf25fd2ce86fcde37c1fedd65288b20b1dd30efd6909f0b079f14c6acfab4d53f86e99c832cec911f6eea251a1d6c6266bd5078a8708c181a2a84fec91e2292dbf6b7b7ef6face2920da870c47641c43fd9e46f413e6f985e3a44573d7bf7600f39d2a0703f84971053dde62fbb2805496c5ec81f1c5d934892d60119c0dbfda4fec525', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 11, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28199%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T124646Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a44b517609900803b8a31201f857a3e57739dc424b1b52705e098b0dc347ef0d1e6e0140f4408747f4f7e502532bc00f9ef2015e89622b069a8aa7a6bc46a64d03f86531ecf09fce8a0b64c95dbc134c97c9820df4be368fc81e920aa770aeafa9ad6f1bb9de5c9602af9123bed959d10968b83cf6c87a62d375256e3b2f13debbdceb963028dc80635d3ece285497af7f2216e439c4dd5151befe462805ecd97603c30b75ea35964634a770d99de2b66dd237ea21c44f4da155e894168196ec73c66952da564370e6dbf735caeadb4ded6aadc7ab5cdb53f4f9a5f664e75ebca2628de84191f4988db846bc645c65f954d6283bace90ac502e106220ac9bae9', hasBus: false, hasTrafficLight: true, hasCar: false, },
  { id: 12, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Traffic%20Light/Tlight%20%28193%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T124646Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=0d99ca6c69e362ff025105d20455599d01761c8b03bd72711502b00a541a48f9df63ce68a7f8f0f204f140abd57d04156844e58e8a6394c74b0b6cc9e31583e5c259a8b61dc72467a034c8a6398e1c517c31f4e99edc85d20ecac850f0ff98d57e6d486177a5677c865f0bec8aa88fd1589b1c0fd6b87e34991289cfcaefcc578c64f3627d5d150d31bd7684816e90aa9812c1f5aac8bead2d90631fc97eb486cbce2a4c0891aeac955749977aa1cdb463d85f43a8a98393dfb1dc32a491d713552d221e42a5c08706f3f6892c969b9212247926f72000ad08c458ef9bcfc5b8dcc1365b6ef02c2623745fa045d246c42adce7bb0ed881a7e5881ffa66c9baf0', hasBus: false, hasTrafficLight: true, hasCar: false, },

  { id: 13, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281015%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=710a9cb65f1cb4ce408474fc7eff64adb7d49b5e11d4e1597b4185c282f830c1c67176254c7d80cbc21437cd91da29cba019fcaf1a3bc4a66c82cf37c4b887c8e069c9236f079f97aa9f00f106ddb955326a21e363fc9bf754dc9424a155f60e12b7006c5d7809295228fe4e93b90021258827d7de27fa016da789db4ddd699338ece09a9f7e485d72604a71623b1cb1a9dc6e8298b0ce02c0dd494720bd0d9b4e0a126f0889fbc105213ffb8ae4f8a25d1a290059078fd93e6fa5feed523e6899864a3d58c376254f317418bdb1b1001e34614e5e480e4e87e88504b354cb4c1da6770da6b7ca98ae2519bac8f328e9a8f10407b8954a4d35728fd0c2487257', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 14, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=67751dcc6631f33b4e02b2e902f879a6913b3d130f19866f9d0d8a588f9257876d3afb92947a56a15d6083e91cd79cf77e021e10e60e0c3cd177f2e60178f92960b9d489250f6025c37c2b1e55c0068b4369ba4282787cbc9bd4775911fe56a2e4f2bca22776a2180c2958796077c85492a8c558b582157ad54b72c5abe245fca3387aac9cb0d108874193d750551bf79ab2f7074501c8dda7aa209c0d25351ad634b6152f29754af8e09839cd4c9afdeb207d8f227c3ef27019e6ad297eb2c5716edd52b85fba2d8190bdb1f4e034a3da659c4cefdd7d95a9461a59c195e6b7208cb8591707850a771d5823f2ee76352c5f2fc45d56979e416a27efd6dc6b90', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 15, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281018%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2f50d5078a74f165c4f2eccef969c40e23abfbb62391f01ef2ed49a46b42dde59d68ca4e98d21f2ca87a3da4841c61eb91383b7db6bd3dcc44e218c74c248733155ffa6ea1fdf96daaa25e0f8f1773ca346d6e3ca7922d0ee4fdff7d767e019a183495acb255e5b3c69c9811f12dabf9bdc3f6dfaf1356a31a9842ff67420f8f6f245d2f13e5429b5e9860c42429fb5ac904c5ac5448c186f553ae033d68315cf332e74a36ef8fbb988855ae6895fdbd1765d81081c91fc623e443e2c01afd55284a6b58779127c85f7d0fa65fdb91977c46927f96780dbbb589a2c79b7a38cb3ed7318be37e4cd953868acc087d6ddc77f68ad813c4cb2d4af6fa39991c11f9', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 16, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281019%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=45e3bda2aa1ee32378b8cedc9e276228ed54bd4ec06cd75a8f97ef337a9486ce94d0fdb1a76d8c86e1fa1391e5cf1c7ed79c740879512c9c6fac407ba3da8fae2d2ff2a9575c4a00bb3b47de3ca84e51aca8454638ad2af3499f8b4827d7376ad24f10fb0fc5f3edd00e1bacb6163637156e821daad624cc3d805625997e97191667d17faecf69845a534be69602f86d79742df4d14b408713f9ed4b84ad1ba0d7eace57c4b916626237087f7857ade355b37c25cd586c1f890c3337d9b3279abc1ff1b31c0e9d2251224a79d7683c9239625cd895e800d1a4eefbffd0e5af9bf74d7acc0f8ef1a0166070a19a758e0d2fc75a95f5152828f3168b3f48b1e3bf', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 17, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%28102%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=12786d92dad3bbd3df943fd4954b5f473369b1b2644ffec68e58e5af2a70b6a1bddb3ce2c72487f0450f3c2640f937abf568d0e40a36fbdb88ad56c399314a7ee26fd38b2311bbd276b76b44402b35eae942c90d3ad6392551255108ceee11474b6b82d159baddb451ae5ddc607058f354ad722290845e08c1a10e911c95f8d1f6e22d03d0aaf413f2948407c28d110e8fd7cc15687c5d26feee04c20283305c4f54e9fc0767fcb06b0eb0b1f68f28a9ac32291139121a4fb46da3c5f3a69429e5f94f6b7d20587c8686f7c146cbe3c53ea2ecad56a373331c1f46cd70c9887f1eded986485781e3cf90a545880aab9b72f162e7bbf56d5cecf7b11c62ad7955', hasBus:  true, hasTrafficLight: false, hasCar: false},
  { id: 18, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281020%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1f346a5fd4268d778a890b06decfcb9e83bb4181d79e484af47ca6e96bc2e1dd9ec083a618b0d431272a1f0086806fbd96dc5c006e8a3ca08156cf26409ad5ed44a189f44d5723a3c02ee73090114276fa37606a733828313f9f7db4d00ddc000c6907bf7a8fb5bccb70dbc9cc88562e1f37741ca3962bc52c6c07e113041a81add0f21017dfd987df8e1ca640b22e4af8a5e989259e28d99f7e3c427a98befc0937cefbcf50037b23d4e755e8e95b6eee39924601ea0c4bcb9f4cc41e0e8275cc53e49847497f1ecf804623e0a6f47c2a83c17324949f13523727decf2d47a1b3627b3a83d81cda75c9834cc75c44d329f06c434f0e23f83750b0eb7670b0c6', hasBus:  true, hasTrafficLight: false, hasCar:false, },

  { id: 19, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281006%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T130438Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=57ee3a61695fac1a6a1e22f5c82f2eb9c187f04517cf8a4daf4313ca0718e16d91fd5d06c9d34269e88358ded4aa43acd3e74466249aef9b27f8dfd94f79db276d3770f34d312501e5dd50e214d63b2152414b2bec66837936de9f51783a72fac2d88cdee34065670d913813e7734b94160ccd48885651bd38f5e33d21812f2b5be372c9fff82739d40daf660ebd88a25cf5913eeb1994ea7cdfe66782a594a46184f5b4fd9ecb46f60baed29eb9c9599b25d7075520a729025bba28bbe25d9f3d6d574ca640715f13b67f75b2abe27ebbaa3fbfe522a29c497186e8fa25df902b52f08cffec9b6e6848a8ea1bf47f1acea9a2043b7df8d5d27c4d5dcdb2665d', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 20, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281021%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=8e17f8b9606e5e580baa335929507fd3f344dc3bf9d72d03e3ad952e18c67a20042dd6026910d9dab90d6eeab3f4630efa8b13782a82744f18a5f397b551607f87efb27ce12897efa10bbe9d0d366b6abbdf3681c6e873c91312008702305006c38b7842683e3fd4db67a56188267bfdc33af6827a39bffbc9fb5c2eff14e35ce3d5da7511b775fd00433f11280811e570c80382d6009b1036c8ab9b80406497a7f6ecb3955226e3decbdb8df990742f32f4b0e420cc9b7b3767ed4045df2a5e67da5343fb1423e927f97093e2baf4aff0565cb57fec01837bdac300e3f7b6c79c6d70d7ae372652e2bad4f68d3757b83e5ea6b1fb59f8a6ca1ebeef97364cc9', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 21, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=10239f9d8fa793c2fbef46f24139110a203be58dd872230759465cdab91d61095ba990583d453bdc1340d0e704b1435acefd60eab350f17cac5c6bb51757e8602ef06bb630b3f878bbf9278678e019d4dddeec6944a7dfd867a6d8afa275afa9dd93c467e43e24c3d53ead2349c9f9c92ce717ca990e9e6d6317825a466f664be854ff6f1d74eb7272575fc365ed350fe3d59c44d5b8eb706f453d23a842ed5ed0c62f52dfb5cc7db41be1d82b39b5cc512c515eedd828290c24c37e17b360697c3be3b9a1772f02cacd6adbec4ff84e684fc1766be7d177df5bae72e59588eea20a1294e59b3550892735c7f859543bfab957b8a3a85ec95b601306582d1315', hasBus:  true, hasTrafficLight: false, hasCar: false, },
  { id: 22, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281024%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=a0e8c0400cfa2293a65e0b55f2844ca08833b1921fda0e228d6ca68e3e8d89eedf6aacceea35cc04115a8ef79111294d8292a05cec77fc69401d35e3c6a1b815e7e8e94ee03d1e3edfd7fc39a52eb6b4d6d171811419c02a2cc555d4d6ee803f4f22162e30954affdf5c72cf1f8606548f197a12d40b6d7a82b53bdcd97bd46bc4db7fe6529e263772a9518c88a920fe6eb94cbc0c74cde059186662247f012302799e6778feddb05d32215a081abde3b2e772ab9af42031e70b952b72dcb014990e39610d64125702e78cf5e9355bb6669083483d2ac1f1e93293fae0ff0c0c672c3263d2d290f455bb95ac0a3245be017fd8f8c8e629bf6a5508746ccebfa3', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 23, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281025%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1f49864ccf39b569db36e0fc8143833c2ae8edab1ae3c7739851dcf1049324d9b59f24829a7986856b176fbd98d4129a0f2c02276598fbf199fdfa4977ced3cdb831b4a3e18900dbf869a99f33e1ca73c2ea7257602260f27dd16573861b3ffc14378050459c3b1e0f6ea47908c4bff245b371f1d32bd4aab520ab5fce3feea48576de0ab1ad0f00fa96d8cb3c87ebc86872ad54dcc167dc25d3a4db6773e2cf7d3c9ed58b23a798f9a2b75f02d031a0dbd28b6ca5f5270f169ea4b4f5ec257cc8342d9b0a27c448060f8f86d97fe828af064e28ff1b0b4f0a5131682b65918345f5740c79a248cbb5c8b6970779349b318720f0b59b86a3213a9f06e9ca0239', hasBus: true, hasTrafficLight: false, hasCar: false, },
  { id: 24, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Bus/Bus%20%281026%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225200Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=5d4d49db6e3b14c5758089689aecafa66028a0fdec8564cb58a594ca575e894bc5a567f2d82cc3a0c59600cb5c6d88d4dafddb433f0d08a9250edb9567cc89f1fe9053b7b35a4d3da4e9ff088e2a6d133683bb710ac14abadd469730ec5b836131986c722b2bce467fb049f978de3868c26256a0f3108b2fc92ee417eeb3bce4442269ac2f2ec1dfd40f49e84365487ace829baf25ce25a84410af2c479b3086db99babbf3ed642000248a00339f2d2316ddfe5a0110d3d50dd0b0ff06f8aa600cdbc4f07692814959fc12b63d6352b29fdbdf232e40493ece1513b92fe29f4bbdfdc6622896902abe95be9c42feb3d6f3e49549cd0d504803e806ecb7259c57', hasBus:  true, hasTrafficLight: false, hasCar: false, },

  { id: 25, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281026%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4ee6bcc883623b059a7112da80c610c5bf44af36d63acd6040a04550a553bad9c25c1ed96fdb97b7467543f69c0cc6e8555d877e7ac7492fda9effffb9198e704ea05665212275d434d18edfa8bc542f1b0adfb6346209989283da52e463de981d0ad4cce33a7c27d633f7f3f82f6c9517ec089e9620b7f0032603b91ad3ea1b56cbd91fc923c5dc02c7326d136beea17b5106130297c2c30eae66dfd50dcc126cdadcbe5babe271d9bf5a6c3a53bb566ae4312098627d4cdfa4be37d8de430e078e65529ac7fc7ef50568dd09774a42d32eec59183dd16a378028d33372f2403f915b3839078949a5ca96a54bdcda51a4fd08cbff1644a83c78d9f51cf10dfb', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 26, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281025%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=55803e67cf57417fd580b1f0455757e65142a05d5b3e750a9ed360625edd8dd3ce00b80db79ef2420feecb3e716c9162e7a95acf47e920240f88a4cc4bec222401bf874f34deb7ff0f6806fba0917eaabe2ef203b8f5985514541400a2342256b72d19a4ecdf9e0077291de395825219b5635a503c92a6a522ffe7d229fc14ca8f85d620fc484a43967407c6d872961b3294d0f8d7e4135c3e3bd516ff0130635d8f473f46b0e23052dbe7c9dbd0b2c41d2401fc2052cd17ce7f63ca44ab4052dbc3eab58d1b9360ce5c6e72ec9d0d189c37c025a76ba19871a6db0f21a0e51bb300f9b6bf03cd984fd3ffb450482c9c02f517fdf1ad2d6639f129336b6c492f', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 27, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281024%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=595a0a9f5d2791efd390b87b1c6f97ddadb28be72c210888bfcdb2ce17f817e3beaf8fc416b89cd5cccb22d23ef4fc3495b839b868aa78b55d201e260b977686e80a3b8eb7ba605bd70176a34d9bd676acc8dcd83ea8ba6b46f85c29c80c8fe471cc362d8386274331ae1250d06480a211c3994a0abc2fdd89db6a4ff605e0d36db57c2694cc050e225796e998f1f8389451e9f1f32b04f2a37f99ea5c4b8e06a582306413e48b6e82e5739b7cb9e88ed6d37302756d0b3a29819337bf32b117997fde5084165b129994202dcf3c3693e601a250b97529c71ff554bec3c8232109f9549473d53097dc33e6f65340183dfe91a740afeda0ae44e9255b4de3615d', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 28, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281023%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=32a9ed0c7ab46c7e59f65835f2e5cb46204f92bfdc449e72e52b0dd54f2c661ce1dc08aba7b61ef64d02cfc32fbeea8c27a693670ad2b50657e86b7008e7de714caaaa356f588bfbfa0a8ffbc7697bc43e3495c7567bdcf4aa3c1187f7e38dc1ad8652b37e7236dd26e31da58b55db06b6fda6889c8d265bb24d1511a1c257b7b707a0dc06db09a838aa22b00744a4b9c9d2b6422c0726857b46296602b50b20c2e22f33348d7b7db84dfd235000edbc68f2830fad71317c70eee4d0c8c66b0ae16e735a23522aa95e9b009eb03d358805500732233f0a97df98828dd09c6c8f506332a01ac7943a767c953ee02dbe26387ab79af88e5ddb2fbe6018f2654c81', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 29, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281022%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=13f9ce8b137454c9592e5f353596773efee8317abb8b5cce79ba19fdee8cdcb803a705cf71d9317be5dbb26a2d904d24fca86144fc8adb0b58ecaafc6fad57385be98aaf68f971510d47abcdd5fe923f6e1cf97c946fd31f680d49f0f3910b7ab3774b1c1c8f601229fc0d26bc693def5a3aff7f7236fba14511cfdb92ee048402b235024acc1463dfbb3c0f2d1b6a5d81728a65c186d5af00f662e3c164672e81053bfbe3b77b9fe3b42ea3ae1cd5c552e43c762d4f12cf934bf7b929a003a5ff99dcd2851a2b0f2242cb01df9e08a7314ef6be6ed18c9f178c27c00a3200159afbffb45b4e0577bf319f8348091c298f0133f6b986a7999d9636aebe72559c', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 30, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281021%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=1979e76c568bf1cecddb78f7e6d316863b6aa1e93141dee612537c999ad78ed0a130c90d5c3197d40921284b33429e2cb65c811f5ec4273cc1630176ef33968d705b86d437b553a452210cc4a3ec257b966c56439016454fe29757a6b816245c3048d176ba0de7eaf4504ed40343aca4792e9b28f3984a3f442733bc8d86641792a971c74c7a9888f820fd5719c5c1647e1f422e3d5f46d486d6138b67a27a473f2502ab46c6655d7c80b4ec76515ecf197c979c1aa9b2e4d82e11bdd509cd07b17518cef25084f15e710f340fe9bb2571d75efde6c22441400141e125aaf7ca6b79b9c48870105c49278de412f85eafdad5cec28a30d133b4a441662f973cca', hasBus: false, hasTrafficLight: false, hasCar: true},

  { id: 31, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281047%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250316%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250316T130642Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=05466fb427126b1e7d72c8e637dad97a43b9c7551aada0ad4eccf421d7457f7e87d7d1f4ea59ab8736744dcdff9d41bd40510ece4111a230c23d65a33c78678fd9266f632f754fba38d3cd7a6b4e5d1a8792b556385b1f87878d916026c6199814e27a9ab20b480eb4636024f5c1f852864df4b4c1cfb6485bbbc853a5debe5cd44e10834d8f609e1891091869c3bf253c1e6408f9a9076993dde1aab689aa043b9c9f326e6c3dc763af8ef6368b8aef60e9de40dc0876e91d1d2211bff23670d315ea59b5e2dac8a1879eddbd9996bb610af5122a0e12564bb05e6c4eb74a558a4508bd8fdc69b16a2a9291ed063b2814ea457ba3f4cbc490e1d20349531ef1', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 32, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%28102%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ad441d0ac535fa3e60cc1b6e4843c5b6ca4c91f57b7f2a54c238b5890ccc8d19ad9584b7f78d3638cd984236c6b80b204a743e7f0e285ad3b5f23627e7067694274f70a576dac9457851e8d2f6cf85dc1cafaf5b2f43ad284bf507493943e2f5462e813d1d1aa363520ac3fb9e63028645bb07aed9d0aa34f3cdf3589b209e4de5eea9893a6ea4d24733f48390401118c43b1045be5c2904920841bfc0bd7fcf84ed9364893a8cacb4840028f5ffb8ce3302fb29684c1d7d2df041ea4c46ad1d3f593ecab704baeea9cf533a737eaae8d10842ee93e2e344180038d3aad4fd068d6ac49fc5c135148bc66b2d51d59f3392128fe53fda54f9241927c3b9c78d31', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 33, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281019%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=806f748f76008dbea737061a7d7bda67e55f09b54f1132bdbe51195867ff888d25dbbc45c2c9e1a33032a9d800c90a9ae64e18157df9e0fb82e62e2a4870e769641edce3b77f2b4a161a696e534e9fd1444c4d001fc6922661236e1f627ec3a69ee9024ba3b25d95339241699a18acdc0296a13a6abdaddd8eddcf055502112eb4c61183d24c4147d09c4b83a7d30af55aa3f8853df744fad857841aa96f8108c7773ba9d24f729b14a344d17ee0e3d6e4caa2f056fbb89a638d82bf9d994c3a47a22f9ef4b8269ca91348b48e7694954b4e761da2c066bbc2042be5b6df0ede2465a2ba4a34b171a54569865c41f2b56f9df716bb116514967070ad3b651044', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 34, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281018%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=02bdb941a09f85518816649d309e62d483e5ead74330f6714053da44157d2cd75c45c0f8b5238aba0110b32e31a98b5bdfbafd1fe5b4fbbb18c4d90f937de2449dbfed26208f118138d544e7d8274f393d5d5b68c12ec7c406a7816dafd336ff5f78e586c431159d664cf3125f9b9b5bfc806e3c3bf4cc98f7326f94152fb277cdcb6243a4ef72d5c6a7a272c389f7e757c883bce307e095ef74fd46e79ea8e3e34da31db0baafe131dc010c4353ba4911e7d471dca48aab1f22edd0128e2a4e1956d3284d4df64e9d6817c523ddea0e00abd0ef86f5c732442b89489f0a8543e1068306a35132c04d63e8f58d2a2382b1cf0dcef665718062981b4196d4b286', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 35, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281017%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=4f88a6a0e312dca8b8c5f37bcb4f77aaded5b444680acaec3f278455dbce66d44b2955f6b2ab1d6a3c817cbb6eaf6529985e2697063acfe8f04990a960a706bbb4d854536df523288016bf79ecf7b0f21c97fa85029bd921891d64bba8ddf3038651d920395acae07e51c86a4cf7cb3c47327c70b2cc465045d071d4c7c6c489900f20e4988917cceeaf9aae795c168b01ef65c6020e619727aa48548ff1de463e2649ccefe8325c5dec13d786bc06b4158cdf64984d96d6e0bdbcdba076a52f1e1a27d23b85dd00a7ac34857c9f60f695e5d12cc656ad50099f6114f2d4cd888e3465a144a90bf780d43642decde560aa04ea25d3c780f010b77767e347f92e', hasBus: false, hasTrafficLight: false, hasCar: true, },
  { id: 36, src: 'https://storage.googleapis.com/kagglesdsdata/datasets/2398291/4049217/Google_Recaptcha_V2_Images_Dataset/images/Car/Car%20%281016%29.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250315%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250315T225722Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=11149f7788e1780451e01e87ce3e9ef7af1296b15e4990ca30e08b8c1212142b8184148ebfd40be878be6d4312dffff91e69c2c3815725f3cd2141dad97441d2fbf41978a20f507f698943875f2941ae6098509f18313a641aa0639df3fdc48342b8bbcecd4ebcbeb04f994f0554af2f10bc90d7f62e28d51eb3f590de7b87b34421ad8bda88e3a0024701597901c2bad23b0ae1d18bef41fb47e5747f3235851dc3a5334fd8f80f12b7f95ea3abb8dbc60a0fe115df6b57df4a19b2a0dd14c80602ab127464242b0deb183797c132519e48cbb8fa9cb723873dcc2cb01c3306dc2e51bca47a0f4675b7489c977e4c85d6d6689cc1919bf53b7764c04558303c', hasBus: false, hasTrafficLight: false, hasCar: true, }
];

const useCaptchaImages = (initialImages = defaultImages) => {
  const [images, setImages] = useState(initialImages);

  const setAllImages = useCallback((newImages) => {
    setImages(newImages);
  }, []);

  const shuffleImages = useCallback(() => {
    setImages(Images => {

      let shuffled = [...Images];

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
  const [challenge, setChallenge] = useState('bus'); 
  const [loading, setLoading] = useState(false);

  const { images, setAllImages, shuffleImages } = useCaptchaImages(customImages);

  const challenges = useMemo(() => ['bus', 'traffic light', 'car'], []);

  useEffect(() => {

    if (customImages) {
      setAllImages(customImages);
    }

    shuffleImages();
  }, [customImages, setAllImages, shuffleImages]);

  useEffect(() => {

    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);

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

      onPass(false);

      refreshChallenge();
    }
  };

  const refreshChallenge = () => {
    setSelectedImages(new Set());
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);

    shuffleImages();

    if (onChallengeChange) {
      onChallengeChange(`Select all images with a ${randomChallenge}`);
    }
  };

  return (
    <div className="max-w-[1200px] bg-white rounded-md overflow-hidden shadow-md">
      {}
      <div className="bg-[#4A90E2] text-white p-4">
        <p className="font-bold text-lg">Select all images with a</p>
        <p className="text-2xl font-bold mb-1">{challenge}</p>
        <p className="text-sm">Click verify once there are none left.</p>
      </div>

      {}
      <div className="grid grid-cols-6 gap-1 p-[1px] bg-white">
        {images.map((image) => (
          <div 
            key={image.id}
            className={`relative cursor-pointer overflow-hidden h-[120px] w-[120px] bg-white`}
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

      {}
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
        </div>
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`px-4 py-1 rounded-sm uppercase text-sm font-bold ${loading ? 'bg-gray-300 text-black' : 'bg-[#4A90E2] text-black hover:bg-[#3A80D2]'}`}
        >
          {loading ? 'Verifying...' : 'VERIFY'}
        </button>
      </div>
    </div>
  );
};

export default LargeCaptchaSelector;