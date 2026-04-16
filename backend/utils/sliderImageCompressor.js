const compressSliderImage = async (filePath, folder = "admin/slider_image") => {
  const fileName = `${Date.now()}-${Math.floor(Math.random() * 9999)}.jpg`;

  const outputDir = `uploads/${folder}`;

  // ensure folder exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = `${outputDir}/${fileName}`;

  await sharp(filePath)
    .jpeg({ quality: 40 })
    .toFile(outputPath);

  // delete original uploaded file
  fs.unlinkSync(filePath);

  return `${folder}/${fileName}`; // DB path
};

export default compressSliderImage;