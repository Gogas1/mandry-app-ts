import { Parameter } from "../components/housing/HousingPage";

export default class FeatureService {
    static getFeatureIcon(name: string): string {
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
        return `${url}/${name}`;
    }

    static processParameters(params: Parameter[]) {
        const processedParams = params.reduce((acc, { value, parameterKey }) => {
            acc[parameterKey] = value;
            return acc;
        }, {} as { [key: string]: string })

        return processedParams;
    }
}