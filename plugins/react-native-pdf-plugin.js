const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withReactNativePdf(config) {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      const podfileContent = fs.readFileSync(podfilePath, 'utf8');

      // Add the PDF pod if not already present
      if (!podfileContent.includes('pod \'RNPdf\'')) {
        const updatedPodfile = podfileContent.replace(
          'target \'ArchiveEaseReactNativeApp-tvOS\' do',
          `pod 'RNPdf', :path => '../node_modules/react-native-pdf'

target \'ArchiveEaseReactNativeApp-tvOS\' do`
        );
        
        fs.writeFileSync(podfilePath, updatedPodfile);
      }

      return config;
    },
  ]);
};