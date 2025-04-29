// src/pages/_app.js
import '@/styles/admin.css';  // 글로벌 스타일 import는 여기서만

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
