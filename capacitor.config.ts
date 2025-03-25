import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yvplayer.app',
  appName: 'YVPlayer',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Comment out the following line for production
    // url: 'http://192.168.1.10:8080',
    // cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: process.env.KEYSTORE_PATH,
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreKeyAlias: process.env.KEY_ALIAS,
      keystoreKeyPassword: process.env.KEY_PASSWORD,
    },
  },
}

export default config; 