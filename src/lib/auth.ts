import Cookies from 'js-cookie';
import client from '../api/apolloClient';
import { GET_TOKEN } from '../graphql/mutation/login';

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
            // Zugriffstoken sicher speichern
            Cookies.set('access_token', data.token.access_token, {
                expires: data.token.expires_in / 86400, // Ablaufzeit in Tagen
                secure: true,
                sameSite: 'Strict',
            });

           

            // Optional: Refresh Token setzen
            Cookies.set('refresh_token', data.token.refresh_token, {
                expires: data.token.refresh_expires_in / 86400, // Ablaufzeit in Tagen
                secure: true,
                sameSite: 'Strict',
            });
        } else {
            throw new Error('Token not received');
        }
    } catch (error) {
        console.error('Login failed:', error.message);

        // Differenziertes Error Handling
        if (error.networkError) {
            throw new Error('Netzwerkfehler: Bitte überprüfe deine Verbindung.');
        } else if (error.graphQLErrors?.[0]?.message === 'Unauthorized') {
            throw new Error('Ungültiger Benutzername oder Passwort.');
        } else {
            throw new Error('Ein unbekannter Fehler ist aufgetreten.');
        }
    }
};
