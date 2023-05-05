import "../styles/globals.css";
import { RPC_ENDPOINT } from "../utils/constants";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect, useMemo, useState } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ConnectionProvider
      endpoint={RPC_ENDPOINT}
      config={{ commitment: "confirmed" }}
    >
      <WalletProvider
        wallets={wallets}
        autoConnect
      >
        <WalletModalProvider>
        {mounted && (
          <Component {...pageProps} />
        )}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
