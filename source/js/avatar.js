const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('.ad-form-header__preview img');
const avatarField = document.querySelector('.ad-form__field input[type=file]');
const photoField = document.querySelector('.ad-form__upload input[type=file]');
const photoView = document.querySelector('.ad-form__photo');


avatarField.addEventListener('change', () => {
  const file = avatarField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarChooser.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

photoField.addEventListener('change', () => {
  const file = photoField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const preview = document.createElement('img');
      preview.width = 70;
      preview.height = 70;
      preview.src = reader.result;
      photoView.appendChild(preview);
    });
    reader.readAsDataURL(file);
  }
});
