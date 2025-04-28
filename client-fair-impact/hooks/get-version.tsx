import { VERSION } from '../version';

export default function useAppVersion() {
    // Could get from the API  or from an env, if needed
    return  VERSION || ''; // from prebuild, using the package.json version and a prebuild script
}