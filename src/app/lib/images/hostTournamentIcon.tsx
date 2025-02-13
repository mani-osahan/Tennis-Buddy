const HostTournamentIcon = () => {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Calendar frame */}
      <rect x="3" y="4" width="18" height="16" rx="2" />

      {/* Calendar dots/tabs at top */}
      <path d="M7 2v3M12 2v3M17 2v3" />

      {/* Trophy */}
      <path d="M9 14h6m-3-4c1.5 0 3-1 3-2.5V7h1.5m-9 0H9v.5c0 1.5 1.5 2.5 3 2.5m0 0v2" />
      <path d="M10.5 7H8m6 0h2.5" />
    </svg>
  );
};

export default HostTournamentIcon;
