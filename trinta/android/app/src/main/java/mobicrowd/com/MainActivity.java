package mobicrowd.com;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  private static final String TAG = "MainActivity";
  private static final int CAMERA_PERMISSION_REQUEST_CODE = 100;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//      if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
//        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST_CODE);
//      } else {
//        logCameraInfo();
//      }
//    } else {
//      logCameraInfo();
//    }
  }
//
//  private void logCameraInfo() {
//    CameraInfoFetcher cameraInfoFetcher = new CameraInfoFetcher(this);
//    cameraInfoFetcher.logCameraInfo();
//  }
//
//  @Override
//  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//    if (requestCode == CAMERA_PERMISSION_REQUEST_CODE) {
//      if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//        logCameraInfo();
//      } else {
//        // Permission denied
//        Log.e(TAG, "Camera permission denied");
//      }
//    }
//  }
}
