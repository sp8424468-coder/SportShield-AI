from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os

from ai.detection import compare_images

router = APIRouter()

TEMP_DIR = "temp_images"
os.makedirs(TEMP_DIR, exist_ok=True)


@router.post("/scan")
async def scan(
    img1: UploadFile = File(...),
    img2: UploadFile = File(...)
):
    img1_path = os.path.join(TEMP_DIR, f"img1_{img1.filename}")
    img2_path = os.path.join(TEMP_DIR, f"img2_{img2.filename}")

    try:
        # Save uploaded images to disk
        with open(img1_path, "wb") as f:
            shutil.copyfileobj(img1.file, f)

        with open(img2_path, "wb") as f:
            shutil.copyfileobj(img2.file, f)

        # Call AI comparison function
        result = compare_images(img1_path, img2_path)

        # Return in fixed output format
        return {
            "similarity": result["similarity"],
            "status": result["status"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scan failed: {str(e)}")

    finally:
        # Clean up temp files
        if os.path.exists(img1_path):
            os.remove(img1_path)
        if os.path.exists(img2_path):
            os.remove(img2_path)