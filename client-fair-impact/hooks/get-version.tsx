//import { VERSION } from '../version';

export default function useAppVersion() {
    // Could get from the API, if needed
    // this is from the env
    //return `${process.env.NEXT_PUBLIC_APP_VERSION}` || 'dev';
    //return  VERSION || ''; // from prebuild, using the package.json version and a prebuild script
    return "0.0.0"; // hardcoded version, not from env or package.json
}