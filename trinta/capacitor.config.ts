import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mobicrowd.com',
  appName: 'Mobicrowd',
  webDir: 'dist/trinta/browser',
  server: {
    url: 'http://192.168.1.8:4200',  // Replace with your local IP and Angular dev server port
    cleartext: true
  },
};

export default config;
