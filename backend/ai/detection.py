from PIL import Image
import imagehash

def compare_images(img1_path, img2_path):
    try:
        # Open images
        img1 = Image.open(img1_path)
        img2 = Image.open(img2_path)

        # Generate perceptual hashes (pHash)
        hash1 = imagehash.phash(img1)
        hash2 = imagehash.phash(img2)

        # Compute hash difference (Hamming distance)
        hash_diff = hash1 - hash2

        # Max bits for default phash (8x8) = 64
        max_bits = 64

        # Convert to similarity %
        similarity = (1 - (hash_diff / max_bits)) * 100
        similarity = round(similarity, 2)

        # Decide status
        status = "violation" if similarity > 80 else "safe"

        return {
            "similarity": similarity,
            "status": status
        }

    except Exception as e:
        return {
            "similarity": 0,
            "status": "error",
            "message": str(e)
        }