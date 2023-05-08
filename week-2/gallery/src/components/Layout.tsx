import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Navigation from './Navigation';
type Props = {
  children?: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Navigation />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
}
