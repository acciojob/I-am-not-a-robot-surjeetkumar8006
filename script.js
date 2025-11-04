const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
const imageContainer = document.getElementById('imageContainer');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');
const message = document.getElementById('h');

let selectedImages = [];

// Function to initialize / reset the state
function initialize() {
  imageContainer.innerHTML = '';
  para.textContent = '';
  message.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  selectedImages = [];

  // Duplicate one random image
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const allImages = [...images, images[duplicateIndex]];

  // Shuffle the images
  allImages.sort(() => Math.random() - 0.5);

  // Render images
  allImages.forEach(imgClass => {
    const img = document.createElement('img');
    img.classList.add(imgClass);
    img.addEventListener('click', () => selectImage(img, imgClass));
    imageContainer.appendChild(img);
  });
}

// Handle image selection
function selectImage(img, imgClass) {
  if (selectedImages.length === 2) return; // limit to 2 selections

  img.classList.add('selected');
  selectedImages.push({ element: img, className: imgClass });

  resetBtn.style.display = 'inline-block';

  if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset button
resetBtn.addEventListener('click', () => {
  initialize();
});

// Verify button
verifyBtn.addEventListener('click', () => {
  const [first, second] = selectedImages;
  verifyBtn.style.display = 'none';

  if (first.className === second.className) {
    para.textContent = 'You are a human. Congratulations!';
  } else {
    para.textContent = 'We can’t verify you as a human. You selected the non-identical tiles.';
  }
});

initialize();
