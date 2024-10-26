package mobicrowd.com;

import android.content.Context;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.params.StreamConfigurationMap;
import android.os.Build;
import android.util.Log;
import android.util.Size;

import java.util.Arrays;

public class CameraInfoFetcher {

  private Context context;
  private static final String TAG = "CameraInfoFetcher";

  public CameraInfoFetcher(Context context) {
    this.context = context;
  }

  public void logCameraInfo() {
    CameraManager cameraManager = (CameraManager) context.getSystemService(Context.CAMERA_SERVICE);

    try {
      for (String cameraId : cameraManager.getCameraIdList()) {
        CameraCharacteristics characteristics = cameraManager.getCameraCharacteristics(cameraId);

        Integer lensFacing = characteristics.get(CameraCharacteristics.LENS_FACING);
        String lensFacingStr = (lensFacing == CameraCharacteristics.LENS_FACING_FRONT) ? "Front" : "Back";

        Integer sensorOrientation = characteristics.get(CameraCharacteristics.SENSOR_ORIENTATION);
        StreamConfigurationMap map = characteristics.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
        Size[] jpegSizes = map.getOutputSizes(android.graphics.ImageFormat.JPEG);

        Log.d(TAG, "Camera ID: " + cameraId);
        Log.d(TAG, "Lens Facing: " + lensFacingStr);
        Log.d(TAG, "Sensor Orientation: " + sensorOrientation);

        if (jpegSizes != null) {
          Log.d(TAG, "JPEG Sizes: " + Arrays.toString(jpegSizes));
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          Integer hardwareLevel = characteristics.get(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL);
          Log.d(TAG, "Hardware Level: " + hardwareLevel);
        }

        if (characteristics.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE) != null) {
          Log.d(TAG, "Sensor Pixel Array Size: " + characteristics.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE).toString());
        }

        if (characteristics.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE) != null) {
          Log.d(TAG, "Sensor Active Array Size: " + characteristics.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE).toString());
        }

        if (characteristics.get(CameraCharacteristics.SENSOR_INFO_SENSITIVITY_RANGE) != null) {
          Log.d(TAG, "Sensor Sensitivity Range: " + characteristics.get(CameraCharacteristics.SENSOR_INFO_SENSITIVITY_RANGE).toString());
        }

        if (characteristics.get(CameraCharacteristics.SENSOR_INFO_EXPOSURE_TIME_RANGE) != null) {
          Log.d(TAG, "Sensor Exposure Time Range: " + characteristics.get(CameraCharacteristics.SENSOR_INFO_EXPOSURE_TIME_RANGE).toString());
        }

        if (characteristics.get(CameraCharacteristics.LENS_INFO_MINIMUM_FOCUS_DISTANCE) != null) {
          Log.d(TAG, "Lens Minimum Focus Distance: " + characteristics.get(CameraCharacteristics.LENS_INFO_MINIMUM_FOCUS_DISTANCE).toString());
        }

        if (characteristics.get(CameraCharacteristics.LENS_INFO_HYPERFOCAL_DISTANCE) != null) {
          Log.d(TAG, "Lens Hyperfocal Distance: " + characteristics.get(CameraCharacteristics.LENS_INFO_HYPERFOCAL_DISTANCE).toString());
        }

        // Fetch focal lengths and apertures
        float[] focalLengths = characteristics.get(CameraCharacteristics.LENS_INFO_AVAILABLE_FOCAL_LENGTHS);
        float[] apertures = characteristics.get(CameraCharacteristics.LENS_INFO_AVAILABLE_APERTURES);

        if (focalLengths != null && apertures != null) {
          for (int i = 0; i < focalLengths.length; i++) {
            float focalLength = focalLengths[i];
            float aperture = apertures[i];
            Log.d(TAG, "Focal Length: " + focalLength + ", Aperture: " + aperture);

            // Identify common camera types based on focal length and aperture ranges
            if (lensFacingStr.equals("Back")) {
              if (focalLength >= 24.0f && focalLength <= 28.0f && aperture <= 2.0f) {
                Log.d(TAG, "Detected: Likely Wide Camera");
              } else if (focalLength >= 12.0f && focalLength <= 16.0f && aperture <= 2.8f) {
                Log.d(TAG, "Detected: Likely Ultrawide Camera");
              } else if (focalLength >= 50.0f && focalLength <= 100.0f && aperture >= 2.0f) {
                Log.d(TAG, "Detected: Likely Telephoto Camera");
              } else if (focalLength <= 5.0f && aperture >= 2.2f && aperture <= 2.8f) {
                Log.d(TAG, "Detected: Likely Macro Camera");
              } else if (focalLength <= 2.0f && aperture >= 2.4f) {
                Log.d(TAG, "Detected: Likely Depth Camera");
              }
            } else if (lensFacingStr.equals("Front")) {
              Log.d(TAG, "Detected: Likely Front Camera");
            }
          }
        }
      }
    } catch (CameraAccessException e) {
      Log.e(TAG, "Camera access exception: ", e);
    }
  }
}
