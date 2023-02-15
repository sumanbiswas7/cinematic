import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    cache: new InMemoryCache(),
    headers: { apikey: process.env.NEXT_PUBLIC_API_KEY || "", 'Access-Control-Allow-Origin': "*" }
});

