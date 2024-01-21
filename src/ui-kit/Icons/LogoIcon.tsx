export const LogoIcon = () => {
  return (
    <svg width="300px" height="100px" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="clip-strip">
            <rect x="5" y="20" width="130" height="15" />
            <rect x="5" y="45" width="130" height="35" />
        </clipPath>
    </defs>

    <rect x="5" y="20" width="130" height="60" rx="10" ry="10" fill="black" clip-path="url(#clip-strip)"/>

    <text x="150" y="40" font-family="Arial" font-size="24" fill="black">DeCredit</text>

    <text x="150" y="70" font-family="Arial" font-size="24" fill="black">Wallet</text>
</svg>



  )
}
