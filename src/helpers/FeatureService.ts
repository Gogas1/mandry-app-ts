export default class FeatureService {
    static getFeatureIcon(name: string): string {
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
        return `${url}/${name}`;
    }
}