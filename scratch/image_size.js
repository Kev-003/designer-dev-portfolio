const fs = require('fs');

function getWebpDimensions(filepath) {
  const buffer = fs.readFileSync(filepath);
  const header = buffer.toString('ascii', 0, 4);
  if (header !== 'RIFF') {
    throw new Error('Not a RIFF file');
  }
  const type = buffer.toString('ascii', 8, 12);
  if (type !== 'WEBP') {
    throw new Error('Not a WEBP file');
  }

  const format = buffer.toString('ascii', 12, 16);
  if (format === 'VP8 ') {
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height, format };
  } else if (format === 'VP8L') {
    // VP8L (lossless) dimensions are in a different place
    const val = buffer.readUInt32LE(21);
    const width = (val & 0x3fff) + 1;
    const height = ((val >> 14) & 0x3fff) + 1;
    return { width, height, format };
  } else if (format === 'VP8X') {
    // VP8X (extended)
    const width = (buffer.readUInt32LE(24) & 0xffffff) + 1;
    const height = (buffer.readUInt32LE(27) & 0xffffff) + 1;
    return { width, height, format };
  }
  return { format };
}

['1', '2', '3'].forEach(i => {
  try {
    console.log(`about_${i}.webp:`, getWebpDimensions(`public/about/about_${i}.webp`));
  } catch (err) {
    console.error(`Error reading about_${i}.webp:`, err.message);
  }
});
