// IndexNow key for www.toponlinetherapy.io. Not a secret in the credential
// sense - the protocol requires it to be publicly served at /<key>.txt so
// engines can verify we own the host; it only authorizes submitting THIS
// host's URLs. Rotate by minting a new hex string, updating here, and
// renaming the public key file to match.
export const INDEXNOW_KEY = "2d1671c1d5dc75fc7676828d9b91404e3e2186a2fd58acf95f1d2cc8f84ae942";
export const INDEXNOW_HOST = "www.toponlinetherapy.io";
