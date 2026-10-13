export default function Logo({ className = "" }) {
  return (
    <img
      src="/images/rnd-logo.png"
      alt="RND Financials Logo"
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  );
}
