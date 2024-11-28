export function AccountTierText({
  accountTier,
  children,
}: {
  accountTier: string;
  children: React.ReactNode;
}) {
  if (accountTier === "pro") {
    return (
      <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">
        {children}
      </span>
    );
  } else if (accountTier === "premium") {
    return (
      <span className="bg-gradient-to-r from-pink-500 to-purple-300 bg-clip-text text-transparent font-bold">
        {children}
      </span>
    );
  } else {
    return <span>{children}</span>;
  }
}
