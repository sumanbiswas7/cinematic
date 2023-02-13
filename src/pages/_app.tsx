import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const userContext = createContext<UserContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ primaryColor: "red" }}
    >
      <NotificationsProvider>
        <userContext.Provider value={{ user, setUser }}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </userContext.Provider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

interface UserContextType {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<null>>;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  country: string;
  createdAt: string;
  friends: string[];
  notifications?: {
    id: number;
    from: string;
    request: boolean;
    suggestion: boolean;
    createdAt: string;
  }[];
  movies: {
    id: number;
    name: string;
    image: string;
    type: string;
    rating: number;
  }[];
}
