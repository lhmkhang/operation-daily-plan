'use client'
import './globals.css'
import { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { AuthProvider } from '../components/helpers/AuthenContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from '../redux/store/store';

const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ["cyrillic"] });

export const metadata = {
  title: 'Operation Webapp',
  description: 'Generated by create next app',
  viewport: "initial-scale=1, width=device-width"
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <html lang="en">
          <body className={`${roboto.className} m-0`}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </body>
        </html>
      </Provider>
    </AuthProvider>
  );
}
