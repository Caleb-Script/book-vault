import Cookies from 'js-cookie';
import { GET_TOKEN } from '../graphql/mutation/login';
import client from '../api/apolloClient';

export const loginService = async (
    username: string,
    password: string,
): Promise<void> => {
    try {
        const { data } = await client.mutate({
            mutation: GET_TOKEN,
            variables: { username, password },
        });

        if (data?.token?.access_token) {
            // Setze das Token in einem sicheren Cookie
            Cookies.set('access_token', data.token.access_token, {
                expires: data.token.expires_in / 86400, // Token-Ablaufzeit (in Tagen)
                secure: true, // Nur über HTTPS senden
                sameSite: 'Strict', // Schutz vor CSRF
            });

            // Optional: Refresh Token
            Cookies.set('refresh_token', data.token.refresh_token, {
                expires: data.token.refresh_expires_in / 86400, // Refresh-Token-Ablaufzeit
                secure: true,
                sameSite: 'Strict',
            });
        } else {
            throw new Error('Token not received');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid username or password');
    }
};
